import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

const projectRoot = path.resolve('src/assets/project-media/Complete projects');
const projectMediaRoot = path.resolve('src/assets/project-media');
const clientLogoRoot = path.resolve('src/assets/client-logos');
const outputPath = path.resolve('src/data/projectCatalog.ts');
const generatedRoot = path.resolve('public/images/generated');
const responsiveWidths = [640, 1024, 1440];
const heroWidths = [768, 1440, 2560, 3200];
const logoWidths = [128, 256];
const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif']);
sharp.concurrency(4);

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === '.DS_Store') return [];
    const absolute = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(absolute) : [absolute];
  });
}

function slugify(value) {
  return value
    .replace(/[_’']/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

function sectionLabel(value) {
  const label = value.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
  if (/^site images?$/i.test(label)) return 'Site photography';
  if (/^interior site images?$/i.test(label)) return 'Interior photography';
  if (/^exterior site images?$/i.test(label)) return 'Exterior photography';
  if (/^interior views?$/i.test(label)) return 'Interior perspectives';
  if (/^exterior views?$/i.test(label)) return 'Exterior perspectives';
  if (/^interior renders?$/i.test(label)) return 'Interior perspectives';
  if (/^exterior renders?$/i.test(label)) return 'Exterior perspectives';
  if (/^renders?$/i.test(label)) return 'Perspectives';
  if (/^site output$/i.test(label)) return 'Site studies';
  if (/^exterior$/i.test(label)) return 'Exterior perspectives';
  if (/^interior$/i.test(label)) return 'Interior perspectives';
  if (/^drawings?$/i.test(label)) return 'Technical drawings';
  if (/^sketch(es)?$/i.test(label)) return 'Sketch studies';
  return label.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function coverScore(file) {
  if (file.type !== 'image') return Number.NEGATIVE_INFINITY;
  const value = file.absolute.toLowerCase();
  if (/(drawing|sketch|plan|section|detail|schedule|diagram|legend)/.test(value)) return -1000;

  let score = 0;
  if (/(exterior renders?|exterior views?|exterior perspectives?)/.test(value)) score += 80;
  if (/(^|[/ ])renders?([/ ])/.test(value)) score += 72;
  if (/(site images?|site output|site studies)/.test(value)) score += 58;
  if (/(interior views?|interior renders?|interior perspectives?)/.test(value)) score += 42;
  if (/(cover|hero|front elevation|facade|perspective|render|view)/.test(value)) score += 20;
  if (/(front|main|primary)/.test(value)) score += 8;
  if (/(^|[/ ])0(\(1\))?\./.test(value)) score -= 30;
  return score;
}

function publicPath(absolutePath) {
  return `/${path.relative('public', absolutePath).split(path.sep).join('/')}`;
}

function orientedDimensions(metadata) {
  const swapsAxes = [5, 6, 7, 8].includes(metadata.orientation ?? 1);
  return {
    width: swapsAxes ? metadata.height : metadata.width,
    height: swapsAxes ? metadata.width : metadata.height,
  };
}

function candidateWidths(sourceWidth, requestedWidths) {
  const candidates = requestedWidths.filter((width) => width < sourceWidth);
  if (sourceWidth <= requestedWidths.at(-1)) candidates.push(sourceWidth);
  return [...new Set(candidates)].sort((a, b) => a - b);
}

function imageKey(relativePath) {
  const basename = slugify(path.basename(relativePath, path.extname(relativePath))).slice(0, 42) || 'image';
  const hash = createHash('sha1').update(relativePath).digest('hex').slice(0, 10);
  return `${basename}-${hash}`;
}

async function writeVariant(sourcePath, outputPath, format, width, profile) {
  const pipeline = sharp(sourcePath).rotate().resize({ width, withoutEnlargement: true });
  if (format === 'avif') pipeline.avif({ quality: profile.avifQuality, effort: 6, chromaSubsampling: '4:4:4' });
  else if (format === 'webp') pipeline.webp({ quality: profile.webpQuality, effort: 6, lossless: profile.losslessWebp ?? false });
  else if (format === 'png') pipeline.png({ compressionLevel: 9 });
  else pipeline.jpeg({ quality: profile.jpegQuality, mozjpeg: true });
  const info = await pipeline.toFile(outputPath);
  return { src: publicPath(outputPath), width: info.width, height: info.height };
}

async function generateImageSources(sourcePath, relativeKey, requestedWidths, { fallbackFormat = 'jpeg', outputGroup = 'projects', profile = photographicProfile } = {}) {
  const metadata = await sharp(sourcePath).metadata();
  const intrinsic = orientedDimensions(metadata);
  const widths = candidateWidths(intrinsic.width, requestedWidths);
  const outputDirectory = path.join(generatedRoot, outputGroup, relativeKey);
  fs.mkdirSync(outputDirectory, { recursive: true });
  const formats = profile.formats ?? ['avif', 'webp'];
  const variants = await Promise.all(widths.flatMap((width) => formats.map((format) =>
    writeVariant(sourcePath, path.join(outputDirectory, `${width}.${format}`), format, width, profile)
      .then((value) => ({ ...value, format }))
  )));
  const fallbackWidth = Math.min(intrinsic.width, requestedWidths.at(-1));
  const extension = fallbackFormat === 'png' ? 'png' : 'jpg';
  const fallback = fallbackFormat
    ? await writeVariant(sourcePath, path.join(outputDirectory, `${fallbackWidth}.${extension}`), fallbackFormat, fallbackWidth, profile)
    : null;
  return {
    width: intrinsic.width,
    height: intrinsic.height,
    fallback,
    avif: variants.filter(({ format }) => format === 'avif').map(({ src, width, height }) => ({ src, width, height })),
    webp: variants.filter(({ format }) => format === 'webp').map(({ src, width, height }) => ({ src, width, height })),
  };
}

const photographicProfile = { avifQuality: 65, webpQuality: 86, jpegQuality: 86 };
const heroProfile = { avifQuality: 68, webpQuality: 88, jpegQuality: 88 };
const logoProfile = { formats: ['webp'], losslessWebp: true, webpQuality: 100, jpegQuality: 100 };

function imagesUnder(directory) {
  return walk(directory)
    .filter((absolute) => imageExtensions.has(path.extname(absolute).toLowerCase()))
    .sort((a, b) => a.localeCompare(b));
}

const portfolioMetadata = [
  {
    sourceFolder: 'Hindustan Petroleum - Nilgiris',
    id: 'hindustan-petroleum-nilgiris',
    title: 'Hindustan Petroleum - Nilgiris',
    category: 'Infrastructure',
    location: 'Nilgiris, Tamil Nadu',
    description: 'A resilient, weather-adapted structural canopy designed for high-altitude logistical operations.',
    cover: 'v13.png',
    client: 'Hindustan Petroleum', sector: 'Infrastructure', scope: ['Architectural design', 'Canopy engineering', 'Site planning'], year: '2026',
    brief: 'Create a durable fuel-station canopy and forecourt suited to a high-altitude setting.',
    outcomes: ['Weather-adapted structural canopy', 'Clear vehicle circulation', 'Integrated landscape lighting'], featured: true,
  },
  {
    sourceFolder: 'Karunya Unversity',
    id: 'karunya-university',
    title: 'Karunya University',
    category: 'Institutional',
    location: 'South India',
    description: 'A sprawling institutional masterplan focused on sustainable campus flow and naturally lit academic spaces.',
    cover: 'ChatGPT Image Sep 23, 2026, 11_33_42 PM.png',
    client: 'Karunya University', sector: 'Institutional', scope: ['Academic planning', 'Architecture', 'Campus circulation'], year: '2026',
    brief: 'Organise an academic block around daylight, intuitive movement, and long-term campus growth.',
    outcomes: ['Naturally lit learning spaces', 'Legible circulation', 'Climate-conscious massing'], featured: true,
  },
  {
    sourceFolder: 'Talakadu Temple - Mysore, Karnataka',
    id: 'talakad-temple-mysore-karnataka',
    title: 'Talakad Temple - Mysore, Karnataka',
    category: 'Institutional',
    location: 'Talakadu Temple, Karnataka',
    description: 'A sensitive restoration and spatial intervention integrating historic context with modern pedestrian flow.',
    cover: 'ChatGPT Image Sep 23, 2026, 11_51_16 PM.png',
    client: 'Temple precinct authority', sector: 'Institutional', scope: ['Heritage planning', 'Public realm design', 'Pedestrian circulation'], year: '2026',
    brief: 'Improve public access while respecting the temple precinct and its historic setting.',
    outcomes: ['Context-sensitive intervention', 'Improved pedestrian flow', 'Restoration-led public realm'], featured: false,
  },
  {
    sourceFolder: 'Chennai Silks',
    id: 'chennai-silks',
    title: 'Chennai Silks',
    category: 'Commercial',
    location: 'Chennai, Tamil Nadu',
    description: 'A multi-level commercial hub featuring a striking glass curtain wall and expansive, column-free retail floors.',
    client: 'Chennai Silks', sector: 'Commercial', scope: ['Retail architecture', 'Facade design', 'Interior planning'], year: '2026',
    brief: 'Deliver a flexible flagship retail environment with a distinct street presence.',
    outcomes: ['Column-free retail floors', 'High-visibility facade', 'Flexible merchandising zones'], featured: false,
  },
  {
    sourceFolder: 'Treasure Trove Venue - Tiruppur, Tamilnadu ',
    id: 'treasure-trove-venue-tiruppur-tamil-nadu',
    title: 'Treasure Trove Venue - Tiruppur, Tamil Nadu',
    category: 'Commercial',
    location: 'Tiruppur, Tamil Nadu',
    description: 'A large-scale event space characterized by wide-span structural roofing and seamless indoor-outdoor transitions.',
    client: 'Treasure Trove Venue', sector: 'Commercial', scope: ['Event architecture', 'Structural coordination', 'Landscape integration'], year: '2026',
    brief: 'Create an adaptable destination venue for large gatherings and changing event formats.',
    outcomes: ['Wide-span roof structure', 'Indoor-outdoor event sequence', 'Flexible guest capacity'], featured: false,
  },
  {
    sourceFolder: 'Hindustan resort ,Coimbatore, Tamilnadu',
    id: 'hindustan-resort-coimbatore-tamil-nadu',
    title: 'Hindustan Resort, Coimbatore, Tamil Nadu',
    category: 'Hospitality',
    location: 'Coimbatore, Tamil Nadu',
    description: 'A landscape-integrated hospitality project blending indigenous materials with modern luxury.',
    client: 'Hindustan Resort', sector: 'Hospitality', scope: ['Hospitality architecture', 'Landscape coordination', 'Guest experience planning'], year: '2026',
    brief: 'Shape a resort experience that connects contemporary hospitality with its landscape.',
    outcomes: ['Landscape-led arrival', 'Material warmth', 'Indoor-outdoor guest spaces'], featured: true,
  },
  {
    sourceFolder: 'mysore-sanctuary',
    id: 'mysore-sanctuary',
    title: 'The Mysore Sanctuary',
    category: 'Residential',
    location: 'Mysore, Karnataka',
    description: 'A grounded, modernist villa employing raw concrete and expansive glass to capture natural light.',
    client: 'Private client', sector: 'Residential', scope: ['Residential architecture', 'Material strategy', 'Landscape outlooks'], year: '2025',
    brief: 'Create a quiet private home centred on daylight, robust materials, and garden views.',
    outcomes: ['Raw-concrete expression', 'Light-filled interiors', 'Framed landscape views'], featured: false,
  },
  {
    sourceFolder: 'agrarian-retreat',
    id: 'agrarian-retreat',
    title: 'The Agrarian Retreat',
    category: 'Residential',
    location: 'Tiruchengode, Tamil Nadu',
    description: 'A contemporary farmhouse seamlessly integrated into its agricultural context with vernacular roofing techniques.',
    client: 'Private client', sector: 'Residential', scope: ['Farmhouse architecture', 'Climate response', 'Vernacular detailing'], year: '2025',
    brief: 'Develop a contemporary farmhouse that belongs to its working agricultural landscape.',
    outcomes: ['Vernacular roof language', 'Agrarian integration', 'Passive climate response'], featured: false,
  },
  {
    sourceFolder: 'riverside-farmhouse',
    id: 'riverside-farmhouse',
    title: 'Riverside Farmhouse',
    category: 'Residential',
    location: 'Bhavani, Tamil Nadu',
    description: 'A tranquil private estate designed to maximize cross-ventilation and views of the surrounding watershed.',
    cover: 'Exterior/Front view 1n_Photo - 4.jpg',
    client: 'Private client', sector: 'Residential', scope: ['Residential architecture', 'Passive ventilation', 'Site planning'], year: '2025',
    brief: 'Establish a riverside retreat with deep environmental connection and low-energy comfort.',
    outcomes: ['Cross-ventilated rooms', 'Watershed views', 'Calm private grounds'], featured: false,
  },
  {
    sourceFolder: 'urban-courtyard-house',
    id: 'urban-courtyard',
    title: 'Urban Courtyard House',
    category: 'Residential',
    location: 'Tiruppur, Tamil Nadu',
    description: 'An inward-looking urban residence featuring a central landscaped courtyard for privacy and thermal comfort.',
    cover: 'Exterior Views/front elevation day view 4.png',
    client: 'Private client', sector: 'Residential', scope: ['Urban residence', 'Courtyard planning', 'Thermal comfort'], year: '2025',
    brief: 'Create a protected family home that brings landscape and daylight into a dense urban plot.',
    outcomes: ['Central planted courtyard', 'Privacy from the street', 'Passive cooling strategy'], featured: false,
  },
  {
    sourceFolder: 'minimalist-canopy-haven',
    id: 'minimalist-haven',
    title: 'Minimalist Canopy Haven',
    category: 'Residential',
    location: 'Avinashi, Tamil Nadu',
    description: 'A sleek residential intervention focusing on deep roof overhangs and minimal material palettes.',
    client: 'Private client', sector: 'Residential', scope: ['Residential architecture', 'Climate shading', 'Material palette'], year: '2025',
    brief: 'Design a pared-back home with shade, material restraint, and a strong connection to the outdoors.',
    outcomes: ['Deep protective overhangs', 'Minimal palette', 'Comfortable shaded edges'], featured: false,
  },
  {
    sourceFolder: 'Shristi Vikas School',
    id: 'shristi-vikas-school',
    title: 'Shristi Vikas School',
    category: 'Institutional',
    location: 'South India',
    description: 'A dynamic learning environment designed with kinetic facades and open courtyards for early childhood development.',
    client: 'Shristi Vikas School', sector: 'Institutional', scope: ['Education architecture', 'Courtyard planning', 'Facade design'], year: '2026',
    brief: 'Provide an engaging learning environment that supports early-years education and outdoor activity.',
    outcomes: ['Open learning courtyards', 'Adaptable teaching spaces', 'Climate-responsive facade'], featured: false,
  },
];

fs.rmSync(generatedRoot, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 });
fs.mkdirSync(generatedRoot, { recursive: true });

const projects = await Promise.all(portfolioMetadata.map(async ({ sourceFolder, cover: coverOverride, ...project }) => {
  const absoluteFolder = path.join(projectRoot, sourceFolder);
  const sourceFiles = imagesUnder(absoluteFolder).map((absolute) => ({
    absolute,
    relative: path.relative(absoluteFolder, absolute).split(path.sep).join('/'),
    size: fs.statSync(absolute).size,
  }));
  const files = await Promise.all(sourceFiles.map(async (file) => ({
    ...file,
    type: 'image',
    imageSources: await generateImageSources(
      file.absolute,
      `${project.id}/${imageKey(file.relative)}`,
      responsiveWidths,
    ),
  })));
  const sections = new Map();

  files.forEach((file) => {
    const relativeParts = file.relative.split('/');
    const section = relativeParts.length > 1 ? sectionLabel(relativeParts[0]) : 'Overview';
    if (!sections.has(section)) sections.set(section, []);
    sections.get(section).push({
      src: file.imageSources.fallback.src,
      width: file.imageSources.width,
      height: file.imageSources.height,
      imageSources: file.imageSources,
      type: file.type,
      label: path.basename(file.relative, path.extname(file.relative)).replace(/[_-]+/g, ' '),
    });
  });

  const sectionRecords = Array.from(sections, ([title, media]) => ({ id: slugify(title), title, media }));
  const cover = coverOverride
    ? files.find((file) => file.relative === coverOverride)
    : files
      .map((file) => ({ ...file, score: coverScore({ ...file, absolute: file.relative }) }))
      .sort((a, b) => b.score - a.score || b.size - a.size)[0];

  return {
    ...project,
    cover: cover?.imageSources.fallback.src ?? null,
    coverSources: cover?.imageSources ?? null,
    sections: sectionRecords,
  };
}));

const projectSource = `// Generated by scripts/generate-project-catalog.mjs. Do not edit by hand.\n\nexport type ResponsiveImageSource = { src: string; width: number; height: number };\nexport type ResponsiveImageSources = { width: number; height: number; fallback: ResponsiveImageSource; webp: ResponsiveImageSource[]; avif: ResponsiveImageSource[] };\nexport type ProjectMedia = { src: string; width: number; height: number; imageSources: ResponsiveImageSources; type: 'image'; label: string };\nexport type ProjectSection = { id: string; title: string; media: ProjectMedia[] };\nexport type PortfolioProject = { id: string; title: string; category: 'Residential' | 'Commercial' | 'Hospitality' | 'Institutional' | 'Infrastructure'; location: string; sector: string; client: string; scope: string[]; year: string; brief: string; outcomes: string[]; featured: boolean; description: string; cover: string | null; coverSources: ResponsiveImageSources | null; sections: ProjectSection[] };\n\nexport const portfolioProjects: PortfolioProject[] = ${JSON.stringify(projects, null, 2)};\nexport const completeProjects = portfolioProjects;\nexport type CompleteProject = PortfolioProject;\n`;
fs.writeFileSync(outputPath, projectSource);

const heroAssets = [
  { id: 1, path: 'hindustan-petroleum/1.jpg' },
  { id: 2, path: 'hindustan-resort/1.jpg' },
  { id: 3, path: 'treasure-trove-venue/1.jpg' },
];
const heroImageSources = {};
for (const hero of heroAssets) {
  const sourcePath = path.join(projectMediaRoot, hero.path);
  heroImageSources[hero.id] = await generateImageSources(sourcePath, String(hero.id), heroWidths, { outputGroup: 'hero', profile: heroProfile });
}
fs.writeFileSync(
  path.resolve('src/data/heroImageCatalog.ts'),
  `// Generated by scripts/generate-project-catalog.mjs. Do not edit by hand.\nimport type { ResponsiveImageSources } from './projectCatalog';\nexport const heroImageSources: Record<number, ResponsiveImageSources> = ${JSON.stringify(heroImageSources, null, 2)};\n`,
);

const logoNames = [
  '01.png', '02.png', '03.png', '04.png', '05.png', '06.png', '07.png', '08.png', '09.png', '10.png',
  '010.png', '011.png', '012.png', '013.png', '014.png', '015.png', '017.png', '018.png', '019.png', '020.png', '021.png',
];
const logoRecords = await Promise.all(logoNames.map(async (filename, index) => {
  const sourcePath = path.join(clientLogoRoot, filename);
  const imageSources = await generateImageSources(sourcePath, imageKey(filename), logoWidths, { fallbackFormat: 'png', outputGroup: 'client-logos', profile: logoProfile });
  return { id: index + 1, filename, imageSources };
}));
fs.writeFileSync(
  path.resolve('src/data/clientLogoCatalog.ts'),
  `// Generated by scripts/generate-project-catalog.mjs. Do not edit by hand.\nimport type { ResponsiveImageSources } from './projectCatalog';\nexport type ClientLogo = { id: number; filename: string; imageSources: ResponsiveImageSources };\nexport const clientLogos: ClientLogo[] = ${JSON.stringify(logoRecords, null, 2)};\n`,
);

console.log(`Generated responsive assets and ${projects.length} projects at ${outputPath}`);
