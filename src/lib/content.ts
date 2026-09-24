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
    title: 'Hindustan Petroleum — Nilgiris',
    subtitle: 'Infrastructure',
    date: '07/10/2026',
    image: '/images/projects/hindustan-petroleum/1.jpg',
    href: '/projects',
  },
  {
    id: 2,
    title: 'Hindustan Resort — Coimbatore',
    subtitle: 'Hospitality',
    date: '07/29/2026',
    image: '/images/projects/hindustan-resort/1.jpg',
    href: '/projects',
  },
  {
    id: 3,
    title: 'Treasure Trove Venue — Tiruppur',
    subtitle: 'Commercial',
    date: '07/23/2026',
    image: '/images/projects/treasure-trove-venue/1.jpg',
    href: '/projects',
  },
];

export const quickLinks: QuickLink[] = [
  { label: 'At a glance', href: '/#about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Locations', href: '/projects/#locations' },
  { label: 'Services', href: '/#services' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
  { label: 'Media', href: '/#news' },
];

export const featureTiles: FeatureTile[] = [
  {
    id: 1,
    title: 'Studio process',
    subtitle: 'Work in progress',
    image: '/images/projects/urban-courtyard-house/1.jpg',
    href: '/#about',
  },
  {
    id: 2,
    title: 'Infrastructure',
    subtitle: 'Systems at scale',
    image: '/images/projects/hindustan-petroleum/2.jpg',
    href: '/#services',
  },
  {
    id: 3,
    title: 'Climate response',
    subtitle: 'Material and place',
    image: '/images/projects/agrarian-retreat/1.jpg',
    href: '/#services',
  },
  {
    id: 4,
    title: 'Residential work',
    subtitle: 'Light and form',
    image: '/images/projects/minimalist-canopy-haven/1.jpg',
    href: '/#about',
  },
  {
    id: 5,
    title: 'Studio life',
    subtitle: 'People and practice',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80',
    href: '/#contact',
  },
  {
    id: 6,
    title: 'Event space',
    subtitle: 'Tiruppur, Tamil Nadu',
    image: '/images/projects/treasure-trove-venue/1.jpg',
    href: '/projects',
  },
];

export const newsItems: NewsItem[] = [
  {
    id: 1,
    date: '07/27/2026',
    category: 'ctrinfrastructure.com',
    title: 'CTR Infrastructure across South India',
    image: '/images/projects/hindustan-resort/1.jpg',
    href: '/projects',
  },
  {
    id: 2,
    date: '07/15/2026',
    category: 'Projects',
    title: 'Hindustan Resort, Coimbatore',
    image: '/images/projects/hindustan-resort/3.jpg',
    href: '/projects',
  },
  {
    id: 3,
    date: '07/10/2026',
    category: 'Projects',
    title: 'Treasure Trove Venue, Tiruppur',
    image: '/images/projects/treasure-trove-venue/2.jpg',
    href: '/projects',
  },
  {
    id: 4,
    date: '06/25/2026',
    category: 'Projects',
    title: 'Hindustan Petroleum, Nilgiris',
    image: '/images/projects/hindustan-petroleum/3.jpg',
    href: '/projects',
  },
];

export const stats = [
  { number: '150+', label: 'Projects completed' },
  { number: '60+', label: 'Years legacy' },
  { number: '40+', label: 'Awards won' },
  { number: '4+', label: 'States across South India' },
];

export const services = [
  {
    number: '01',
    title: 'Architecture',
    description: 'Spaces shaped by light, material, and use.',
  },
  {
    number: '02',
    title: 'Infrastructure',
    description: 'Durable systems for complex sites.',
  },
  {
    number: '03',
    title: 'Planning',
    description: 'Clear frameworks for growth.',
  },
  {
    number: '04',
    title: 'Interiors',
    description: 'Interiors with material clarity.',
  },
];

export const featuredProjects = [
  {
    id: 1,
    title: 'Hindustan Resort',
    category: 'Commercial',
    location: 'Coimbatore, Tamil Nadu',
    year: '2026',
    image: '/images/projects/hindustan-resort/1.jpg',
    description: 'A resort development blending contemporary architecture with warm, landscaped hospitality spaces.',
  },
  {
    id: 2,
    title: 'Treasure Trove Venue',
    category: 'Commercial',
    location: 'Tiruppur, Tamil Nadu',
    year: '2026',
    image: '/images/projects/treasure-trove-venue/1.jpg',
    description: 'An event venue defined by sculptural rooflines and a sequence of landscaped courtyards.',
  },
  {
    id: 3,
    title: 'Hindustan Petroleum — Nilgiris',
    category: 'Infrastructure',
    location: 'The Nilgiris, Tamil Nadu',
    year: '2025',
    image: '/images/projects/hindustan-petroleum/1.jpg',
    description: 'A retail fuel station with integrated landscape and lighting design for a hillside setting.',
  },
  {
    id: 4,
    title: 'Urban Courtyard House',
    category: 'Residential',
    location: 'Tiruppur, Tamil Nadu',
    year: '2025',
    image: '/images/projects/urban-courtyard-house/1.jpg',
    description: 'A family residence balancing open-plan living with warm, textured interior materiality.',
  },
  {
    id: 5,
    title: 'Minimalist Canopy Haven',
    category: 'Residential',
    location: 'Avinashi, Tamil Nadu',
    year: '2025',
    image: '/images/projects/minimalist-canopy-haven/1.jpg',
    description: 'A twilight-lit residence with arched openings and layered facade textures.',
  },
  {
    id: 6,
    title: 'The Agrarian Retreat',
    category: 'Residential',
    location: 'Tiruchengode, Tamil Nadu',
    year: '2025',
    image: '/images/projects/agrarian-retreat/1.jpg',
    description: 'A farmhouse retreat designed around open living spaces and natural light.',
  },
  {
    id: 7,
    title: 'Riverside Farmhouse',
    category: 'Residential',
    location: 'Bhavani, Tamil Nadu',
    year: '2025',
    image: '/images/projects/riverside-farmhouse/1.jpg',
    description: 'A farmhouse with a sculptural, timber-clad facade set within landscaped grounds.',
  },
];
