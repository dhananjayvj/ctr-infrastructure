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

function titleize(value) {
  const cleaned = value
    .replace(/[_]/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\bTamilnadu\b/gi, 'Tamil Nadu')
    .replace(/\bTalakadu\b/gi, 'Talakad')
    .replace(/\bUnversity\b/i, 'University')
    .replace(/^Micelleneous$/i, 'Miscellaneous')
    .replace(/\s*,\s*/g, ', ')
    .replace(/[., ]+$/, '');
  return cleaned;
}

function inferCategory(name) {
  const value = name.toLowerCase();
  if (/(residence|farmhouse|carmel)/.test(value)) return 'Residential';
  if (/(resort|motel|venue)/.test(value)) return 'Hospitality';
  if (/(school|university|temple|karunya)/.test(value)) return 'Institutional';
  if (/(petroleum|railways|helipad)/.test(value)) return 'Infrastructure';
  return 'Commercial';
}

function inferLocation(name) {
  const parts = name.split(' - ').map((part) => part.trim()).filter(Boolean);
  const suffix = parts[parts.length - 1]?.replace(/\s+/g, ' ').trim() ?? '';
  if (/karnataka/i.test(suffix) && parts.length > 1) return `${parts[parts.length - 2]}, Karnataka`;
  if (/tamilnadu|tamil nadu/i.test(suffix) && parts.length > 1) {
    const city = suffix.split(',')[0]?.trim() || parts[parts.length - 2];
    return `${city}, Tamil Nadu`;
  }
  if (parts.length > 1) return suffix;
  const value = name.toLowerCase();
  if (value.includes('chennai')) return 'Chennai, Tamil Nadu';
  if (value.includes('mysore')) return 'Mysore, Karnataka';
  if (value.includes('coimbatore')) return 'Coimbatore, Tamil Nadu';
  if (value.includes('tiruppur')) return 'Tiruppur, Tamil Nadu';
  if (value.includes('nilgiris')) return 'The Nilgiris, Tamil Nadu';
  if (value.includes('tiruchengode')) return 'Tiruchengode, Tamil Nadu';
  if (value.includes('bhavani')) return 'Bhavani, Tamil Nadu';
  if (value.includes('avinashi')) return 'Avinashi, Tamil Nadu';
  return 'South India';
}

function sectionLabel(value) {
  const label = value.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
  if (/^site images?$/i.test(label)) return 'Site images';
  if (/^interior site images?$/i.test(label)) return 'Interior views';
  if (/^exterior site images?$/i.test(label)) return 'Exterior views';
  if (/^interior renders?$/i.test(label)) return 'Interior renders';
  if (/^exterior renders?$/i.test(label)) return 'Exterior renders';
  if (/^site output$/i.test(label)) return 'Site output';
  return label.replace(/\b\w/g, (letter) => letter.toUpperCase());
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

const projects = fs.readdirSync(projectRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && entry.name !== '.DS_Store')
  .sort((a, b) => a.name.localeCompare(b.name))
  .map((entry) => {
    const folder = entry.name;
    const absoluteFolder = path.join(projectRoot, folder);
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
    const cover = sectionRecords.flatMap((section) => section.media).find((media) => media.type === 'image');
    const title = titleize(folder);
    const slug = slugify(title);

    return {
      id: slug,
      title,
      category: inferCategory(folder),
      location: inferLocation(folder),
      description: `${title} is a ${inferCategory(folder).toLowerCase()} project in ${inferLocation(folder)}. Explore the documentation by view, interior, drawing, and site section.`,
      cover: cover?.src ?? null,
      sections: sectionRecords,
    };
  });

const source = `// Generated by scripts/generate-project-catalog.mjs. Do not edit by hand.\n\nexport type ProjectMediaType = 'image' | 'video' | 'document';\n\nexport type ProjectMedia = {\n  src: string;\n  type: ProjectMediaType;\n  label: string;\n};\n\nexport type ProjectSection = {\n  id: string;\n  title: string;\n  media: ProjectMedia[];\n};\n\nexport type CompleteProject = {\n  id: string;\n  title: string;\n  category: 'Residential' | 'Commercial' | 'Hospitality' | 'Institutional' | 'Infrastructure';\n  location: string;\n  description: string;\n  cover: string | null;\n  sections: ProjectSection[];\n};\n\nexport const completeProjects: CompleteProject[] = ${JSON.stringify(projects, null, 2)};\n`;

fs.writeFileSync(outputPath, source);
console.log(`Generated ${projects.length} projects at ${outputPath}`);
