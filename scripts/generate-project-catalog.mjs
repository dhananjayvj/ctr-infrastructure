import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const projectRoot = path.resolve('public/images/projects/Complete projects');
const outputPath = path.resolve('src/data/projectCatalog.ts');
const generatedCoverRoot = path.resolve('public/images/generated/project-covers');
const responsiveWidths = [640, 1024, 1600];
const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif']);
const videoExtensions = new Set(['.mp4', '.webm', '.mov']);
const documentExtensions = new Set(['.pdf']);
const maxTrackedMediaBytes = 95 * 1024 * 1024;

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

function mediaType(file) {
  const extension = path.extname(file).toLowerCase();
  if (imageExtensions.has(extension)) return 'image';
  if (videoExtensions.has(extension)) return 'video';
  if (documentExtensions.has(extension)) return 'document';
  return null;
}

function publicPath(absolutePath) {
  const relative = path.relative('public', absolutePath).split(path.sep).join('/');
  return `/${relative}`;
}

async function generateCoverSources(id, coverPath) {
  const sourcePath = path.resolve('public', `.${coverPath}`);
  const metadata = await sharp(sourcePath).metadata();
  const sourceWidth = metadata.width ?? responsiveWidths.at(-1);
  const widths = [...new Set([...responsiveWidths.filter((width) => width < sourceWidth), sourceWidth])];
  const outputDirectory = path.join(generatedCoverRoot, id);
  fs.mkdirSync(outputDirectory, { recursive: true });

  const variants = await Promise.all(widths.flatMap((width) => [
    (async () => {
      const output = path.join(outputDirectory, `${width}.webp`);
      await sharp(sourcePath).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 82 }).toFile(output);
      return { format: 'webp', src: publicPath(output), width };
    })(),
    (async () => {
      const output = path.join(outputDirectory, `${width}.avif`);
      await sharp(sourcePath).rotate().resize({ width, withoutEnlargement: true }).avif({ quality: 55, effort: 4 }).toFile(output);
      return { format: 'avif', src: publicPath(output), width };
    })(),
  ]));

  return {
    fallback: coverPath,
    sizes: '(min-width: 48em) 50vw, 100vw',
    webp: variants.filter((variant) => variant.format === 'webp').map(({ src, width }) => ({ src, width })),
    avif: variants.filter((variant) => variant.format === 'avif').map(({ src, width }) => ({ src, width })),
  };
}

const portfolioMetadata = [
  {
    sourceFolder: 'Hindustan Petroleum - Nilgiris',
    id: 'hindustan-petroleum-nilgiris',
    title: 'Hindustan Petroleum - Nilgiris',
    category: 'Infrastructure',
    location: 'Nilgiris, Tamil Nadu',
    description: 'A resilient, weather-adapted structural canopy designed for high-altitude logistical operations.',
    cover: '/images/projects/Complete projects/Hindustan Petroleum - Nilgiris/v13.png',
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
    cover: '/images/projects/Complete projects/Karunya Unversity/ChatGPT Image Sep 23, 2026, 11_33_42 PM.png',
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
    cover: '/images/projects/Complete projects/Talakadu Temple - Mysore, Karnataka/ChatGPT Image Sep 23, 2026, 11_51_16 PM.png',
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
    cover: '/images/projects/Complete projects/riverside-farmhouse/Exterior/Front view 1n_Photo - 4.jpg',
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
    cover: '/images/projects/Complete projects/urban-courtyard-house/Exterior Views/front elevation day view 4.png',
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

fs.rmSync(generatedCoverRoot, { recursive: true, force: true });

const projects = await Promise.all(portfolioMetadata.map(async ({ sourceFolder, cover: coverOverride, ...project }) => {
    const absoluteFolder = path.join(projectRoot, sourceFolder);
    const files = walk(absoluteFolder)
      .map((absolute) => ({ absolute, type: mediaType(absolute), size: fs.statSync(absolute).size }))
      .filter((file) => file.type && file.size <= maxTrackedMediaBytes)
      .sort((a, b) => a.absolute.localeCompare(b.absolute));
    const sections = new Map();

    files.forEach(({ absolute, type }) => {
      const relative = path.relative(absoluteFolder, absolute).split(path.sep);
      const section = relative.length > 1 ? sectionLabel(relative[0]) : 'Overview';
      if (!sections.has(section)) sections.set(section, []);
      sections.get(section).push({
        src: publicPath(absolute),
        type,
        label: path.basename(absolute, path.extname(absolute)).replace(/[_-]+/g, ' '),
      });
    });

    const sectionRecords = Array.from(sections, ([title, media]) => ({
      id: slugify(title),
      title,
      media,
    }));
    const cover = files
      .map((file) => ({ ...file, score: coverScore(file) }))
      .sort((a, b) => b.score - a.score || b.size - a.size)[0];
    const coverPath = coverOverride ?? (cover?.score > -1000 ? publicPath(cover.absolute) : null);
    return {
      ...project,
      cover: coverPath,
      coverSources: coverPath ? await generateCoverSources(project.id, coverPath) : null,
      sections: sectionRecords,
    };
  }));

const source = `// Generated by scripts/generate-project-catalog.mjs. Do not edit by hand.\n\nexport type ProjectMediaType = 'image' | 'video' | 'document';\n\nexport type ResponsiveImageSource = {\n  src: string;\n  width: number;\n};\n\nexport type ResponsiveImageSources = {\n  fallback: string;\n  sizes: string;\n  webp: ResponsiveImageSource[];\n  avif: ResponsiveImageSource[];\n};\n\nexport type ProjectMedia = {\n  src: string;\n  type: ProjectMediaType;\n  label: string;\n};\n\nexport type ProjectSection = {\n  id: string;\n  title: string;\n  media: ProjectMedia[];\n};\n\nexport type PortfolioProject = {\n  id: string;\n  title: string;\n  category: 'Residential' | 'Commercial' | 'Hospitality' | 'Institutional' | 'Infrastructure';\n  location: string;\n  sector: string;\n  client: string;\n  scope: string[];\n  year: string;\n  brief: string;\n  outcomes: string[];\n  featured: boolean;\n  description: string;\n  cover: string | null;\n  coverSources: ResponsiveImageSources | null;\n  sections: ProjectSection[];\n};\n\nexport const portfolioProjects: PortfolioProject[] = ${JSON.stringify(projects, null, 2)};\n\n// Backwards-compatible alias for existing project route and sitemap consumers.\nexport const completeProjects = portfolioProjects;\nexport type CompleteProject = PortfolioProject;\n`;

fs.writeFileSync(outputPath, source);
console.log(`Generated ${projects.length} projects at ${outputPath}`);
