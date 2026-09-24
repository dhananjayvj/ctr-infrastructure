import fs from 'node:fs';
import path from 'node:path';

const projectRoot = path.resolve('public/images/projects/Complete projects');
const outputPath = path.resolve('src/data/projectCatalog.ts');
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

const portfolioMetadata = [
  {
    sourceFolder: 'Karunya Unversity',
    id: 'karunya-university',
    title: 'Karunya University',
    category: 'Institutional',
    location: 'South India',
    description: 'A sprawling institutional masterplan focused on sustainable campus flow and naturally lit academic spaces.',
  },
  {
    sourceFolder: 'Talakadu Temple - Mysore, Karnataka',
    id: 'talakad-temple-mysore-karnataka',
    title: 'Talakad Temple - Mysore, Karnataka',
    category: 'Institutional',
    location: 'Talakadu Temple, Karnataka',
    description: 'A sensitive restoration and spatial intervention integrating historic context with modern pedestrian flow.',
  },
  {
    sourceFolder: 'Shristi Vikas School',
    id: 'shristi-vikas-school',
    title: 'Shristi Vikas School',
    category: 'Institutional',
    location: 'South India',
    description: 'A dynamic learning environment designed with kinetic facades and open courtyards for early childhood development.',
  },
  {
    sourceFolder: 'Hindustan Petroleum - Nilgiris',
    id: 'hindustan-petroleum-nilgiris',
    title: 'Hindustan Petroleum - Nilgiris',
    category: 'Infrastructure',
    location: 'Nilgiris, Tamil Nadu',
    description: 'A resilient, weather-adapted structural canopy designed for high-altitude logistical operations.',
  },
  {
    sourceFolder: 'Chennai Silks',
    id: 'chennai-silks',
    title: 'Chennai Silks',
    category: 'Commercial',
    location: 'Chennai, Tamil Nadu',
    description: 'A multi-level commercial hub featuring a striking glass curtain wall and expansive, column-free retail floors.',
  },
  {
    sourceFolder: 'Hindustan resort ,Coimbatore, Tamilnadu',
    id: 'hindustan-resort-coimbatore-tamil-nadu',
    title: 'Hindustan Resort, Coimbatore, Tamil Nadu',
    category: 'Hospitality',
    location: 'Coimbatore, Tamil Nadu',
    description: 'A landscape-integrated hospitality project blending indigenous materials with modern luxury.',
  },
  {
    sourceFolder: 'Treasure Trove Venue - Tiruppur, Tamilnadu ',
    id: 'treasure-trove-venue-tiruppur-tamil-nadu',
    title: 'Treasure Trove Venue - Tiruppur, Tamil Nadu',
    category: 'Hospitality',
    location: 'Tiruppur, Tamil Nadu',
    description: 'A large-scale event space characterized by wide-span structural roofing and seamless indoor-outdoor transitions.',
  },
  {
    sourceFolder: 'mysore-sanctuary',
    id: 'mysore-sanctuary',
    title: 'The Mysore Sanctuary',
    category: 'Residential',
    location: 'Mysore, Karnataka',
    description: 'A grounded, modernist villa employing raw concrete and expansive glass to capture natural light.',
  },
  {
    sourceFolder: 'agrarian-retreat',
    id: 'agrarian-retreat',
    title: 'The Agrarian Retreat',
    category: 'Residential',
    location: 'Tiruchengode, Tamil Nadu',
    description: 'A contemporary farmhouse seamlessly integrated into its agricultural context with vernacular roofing techniques.',
  },
  {
    sourceFolder: 'riverside-farmhouse',
    id: 'riverside-farmhouse',
    title: 'Riverside Farmhouse',
    category: 'Residential',
    location: 'Bhavani, Tamil Nadu',
    description: 'A tranquil private estate designed to maximize cross-ventilation and views of the surrounding watershed.',
  },
  {
    sourceFolder: 'urban-courtyard-house',
    id: 'urban-courtyard',
    title: 'Urban Courtyard House',
    category: 'Residential',
    location: 'Tiruppur, Tamil Nadu',
    description: 'An inward-looking urban residence featuring a central landscaped courtyard for privacy and thermal comfort.',
  },
  {
    sourceFolder: 'minimalist-canopy-haven',
    id: 'minimalist-haven',
    title: 'Minimalist Canopy Haven',
    category: 'Residential',
    location: 'Avinashi, Tamil Nadu',
    description: 'A sleek residential intervention focusing on deep roof overhangs and minimal material palettes.',
  },
];

const projects = portfolioMetadata.map(({ sourceFolder, ...project }) => {
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
    return {
      ...project,
      cover: cover?.score > -1000 ? publicPath(cover.absolute) : null,
      sections: sectionRecords,
    };
  });

const source = `// Generated by scripts/generate-project-catalog.mjs. Do not edit by hand.\n\nexport type ProjectMediaType = 'image' | 'video' | 'document';\n\nexport type ProjectMedia = {\n  src: string;\n  type: ProjectMediaType;\n  label: string;\n};\n\nexport type ProjectSection = {\n  id: string;\n  title: string;\n  media: ProjectMedia[];\n};\n\nexport type PortfolioProject = {\n  id: string;\n  title: string;\n  category: 'Residential' | 'Commercial' | 'Hospitality' | 'Institutional' | 'Infrastructure';\n  location: string;\n  description: string;\n  cover: string | null;\n  sections: ProjectSection[];\n};\n\nexport const portfolioProjects: PortfolioProject[] = ${JSON.stringify(projects, null, 2)};\n\n// Backwards-compatible alias for existing project route and sitemap consumers.\nexport const completeProjects = portfolioProjects;\nexport type CompleteProject = PortfolioProject;\n`;

fs.writeFileSync(outputPath, source);
console.log(`Generated ${projects.length} projects at ${outputPath}`);
