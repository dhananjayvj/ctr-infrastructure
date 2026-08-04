export type HeroSlide = {
  id: number;
  title: string;
  subtitle: string;
  date: string;
  image: string;
  href: string;
};

export type QuickLink = {
  label: string;
  href: string;
};

export type StripItem = {
  id: string;
  label: string;
  href: string;
};

export type FeatureTile = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  href: string;
};

export type NewsItem = {
  id: number;
  date: string;
  category: string;
  title: string;
  image: string;
  href: string;
};

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: 'New portfolio flagship — Aurora Tower redefines urban scale',
    subtitle: 'Commercial',
    date: '07/29/2026',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=85',
    href: '/projects',
  },
  {
    id: 2,
    title: 'A seamless experience: integrated transit at Metro Central',
    subtitle: 'Infrastructure',
    date: '07/23/2026',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1920&q=85',
    href: '/projects',
  },
  {
    id: 3,
    title: 'Heritage Bridge at the city waterfront festival',
    subtitle: 'Infrastructure',
    date: '07/10/2026',
    image: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=1920&q=85',
    href: '/projects',
  },
];

export const quickLinks: QuickLink[] = [
  { label: 'At a glance', href: '/#about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Services', href: '/#services' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
  { label: 'Media', href: '/#news' },
];

export const projectStrip: StripItem[] = [
  { id: 'aurora', label: 'Aurora Tower', href: '/projects' },
  { id: 'riverside', label: 'Riverside Residence', href: '/projects' },
  { id: 'heritage', label: 'Heritage Bridge', href: '/projects' },
  { id: 'pavilion', label: 'Glass Pavilion', href: '/projects' },
  { id: 'metro', label: 'Metro Central', href: '/projects' },
  { id: 'harmony', label: 'Harmony Towers', href: '/projects' },
  { id: 'innovation', label: 'Innovation Campus', href: '/projects' },
  { id: 'marina', label: 'Sunset Marina', href: '/projects' },
];

export const featureTiles: FeatureTile[] = [
  {
    id: 1,
    title: 'Behind the scenes',
    subtitle: 'How CTR is raising the bar on design efficiency',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=80',
    href: '/#about',
  },
  {
    id: 2,
    title: 'Infrastructure at scale',
    subtitle: 'Exploring the engineering behind civic transit and bridges',
    image: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=900&q=80',
    href: '/#services',
  },
  {
    id: 3,
    title: 'Driving sustainability',
    subtitle: 'Embedding low-carbon design across the value chain',
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=900&q=80',
    href: '/#services',
  },
  {
    id: 4,
    title: 'Key statements',
    subtitle: 'Leadership on technological transformation in architecture',
    image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=900&q=80',
    href: '/#about',
  },
  {
    id: 5,
    title: 'Careers at CTR',
    subtitle: 'People who think ahead drive our progress',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80',
    href: '/#contact',
  },
  {
    id: 6,
    title: 'Innovation at our core',
    subtitle: 'Advanced technology and forward thinking in every commission',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80',
    href: '/projects',
  },
];

export const newsItems: NewsItem[] = [
  {
    id: 1,
    date: '07/27/2026',
    category: 'ctrinfrastructure.com',
    title: 'CTR Group maintains stable delivery across challenging markets',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    href: '/projects',
  },
  {
    id: 2,
    date: '07/15/2026',
    category: 'Projects',
    title: 'More technology, more utility: Aurora Tower upgrades for 2027',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    href: '/projects',
  },
  {
    id: 3,
    date: '07/10/2026',
    category: 'Projects',
    title: 'Heritage Bridge opens at the waterfront festival',
    image: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=800&q=80',
    href: '/projects',
  },
  {
    id: 4,
    date: '06/25/2026',
    category: 'Projects',
    title: 'The right design for any context: Glass Pavilion takes shape',
    image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&q=80',
    href: '/projects',
  },
];

export const stats = [
  { number: '150+', label: 'Projects completed' },
  { number: '25', label: 'Years experience' },
  { number: '40+', label: 'Awards won' },
  { number: '12', label: 'Countries' },
];

export const services = [
  {
    number: '01',
    title: 'Architecture',
    description: 'From concept to completion, we design spaces that inspire and endure.',
  },
  {
    number: '02',
    title: 'Infrastructure',
    description: 'Engineering excellence in bridges, transit systems, and urban frameworks.',
  },
  {
    number: '03',
    title: 'Planning',
    description: 'Strategic urban planning that shapes communities for generations.',
  },
  {
    number: '04',
    title: 'Interiors',
    description: 'Interior environments shaped by materiality, light, and proportion.',
  },
];

export const featuredProjects = [
  {
    id: 1,
    title: 'Aurora Tower',
    category: 'Commercial',
    location: 'Vancouver, BC',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    description: 'A 45-story mixed-use development featuring sustainable design principles.',
  },
  {
    id: 2,
    title: 'Riverside Residence',
    category: 'Residential',
    location: 'Toronto, ON',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    description: 'Contemporary waterfront home with panoramic city views.',
  },
  {
    id: 3,
    title: 'Heritage Bridge',
    category: 'Infrastructure',
    location: 'Montreal, QC',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=800&q=80',
    description: 'Iconic pedestrian bridge connecting historic and modern districts.',
  },
  {
    id: 4,
    title: 'The Glass Pavilion',
    category: 'Cultural',
    location: 'Calgary, AB',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&q=80',
    description: 'Award-winning arts center with innovative structural glazing.',
  },
];
