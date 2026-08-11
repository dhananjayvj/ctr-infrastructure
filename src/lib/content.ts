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
    title: 'New portfolio flagship — Hindustan Resort redefines hospitality design',
    subtitle: 'Commercial',
    date: '07/29/2026',
    image: '/images/projects/hindustan-resort/1.jpg',
    href: '/projects',
  },
  {
    id: 2,
    title: 'Treasure Trove Venue takes shape in Tiruppur',
    subtitle: 'Commercial',
    date: '07/23/2026',
    image: '/images/projects/treasure-trove-venue/1.jpg',
    href: '/projects',
  },
  {
    id: 3,
    title: 'A landmark fuel retail design for Hindustan Petroleum',
    subtitle: 'Infrastructure',
    date: '07/10/2026',
    image: '/images/projects/hindustan-petroleum/1.jpg',
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
  { id: 'hindustan-resort', label: 'Hindustan Resort', href: '/projects' },
  { id: 'treasure-trove', label: 'Treasure Trove Venue', href: '/projects' },
  { id: 'hindustan-petroleum', label: 'Hindustan Petroleum', href: '/projects' },
  { id: 'deepak-residence', label: 'Contemporary Residence, Tiruppur', href: '/projects' },
  { id: 'ganeshan-residence', label: 'Modern Residence, Avinashi', href: '/projects' },
  { id: 'eshwaren-farmhouse', label: 'Tiruchengode Farmhouse', href: '/projects' },
  { id: 'sathyamoorthy-farmhouse', label: 'Bhavani Farmhouse', href: '/projects' },
];

export const featureTiles: FeatureTile[] = [
  {
    id: 1,
    title: 'Behind the scenes',
    subtitle: 'How CTR is raising the bar on design efficiency',
    image: '/images/projects/deepak-residence/1.jpg',
    href: '/#about',
  },
  {
    id: 2,
    title: 'Infrastructure at scale',
    subtitle: 'Exploring the engineering behind civic transit and bridges',
    image: '/images/projects/hindustan-petroleum/2.jpg',
    href: '/#services',
  },
  {
    id: 3,
    title: 'Driving sustainability',
    subtitle: 'Embedding low-carbon design across the value chain',
    image: '/images/projects/eshwaren-farmhouse/1.jpg',
    href: '/#services',
  },
  {
    id: 4,
    title: 'Key statements',
    subtitle: 'Leadership on technological transformation in architecture',
    image: '/images/projects/ganeshan-residence/1.jpg',
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
    image: '/images/projects/treasure-trove-venue/1.jpg',
    href: '/projects',
  },
];

export const newsItems: NewsItem[] = [
  {
    id: 1,
    date: '07/27/2026',
    category: 'ctrinfrastructure.com',
    title: 'CTR Infrastructure maintains stable delivery across South India',
    image: '/images/projects/hindustan-resort/1.jpg',
    href: '/projects',
  },
  {
    id: 2,
    date: '07/15/2026',
    category: 'Projects',
    title: 'Hindustan Resort nears completion in Coimbatore',
    image: '/images/projects/hindustan-resort/3.jpg',
    href: '/projects',
  },
  {
    id: 3,
    date: '07/10/2026',
    category: 'Projects',
    title: 'Treasure Trove Venue opens in Tiruppur',
    image: '/images/projects/treasure-trove-venue/2.jpg',
    href: '/projects',
  },
  {
    id: 4,
    date: '06/25/2026',
    category: 'Projects',
    title: 'A landmark design takes shape for Hindustan Petroleum',
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
    title: 'Contemporary Residence, Tiruppur',
    category: 'Residential',
    location: 'Tiruppur, Tamil Nadu',
    year: '2025',
    image: '/images/projects/deepak-residence/1.jpg',
    description: 'A family residence balancing open-plan living with warm, textured interior materiality.',
  },
  {
    id: 5,
    title: 'Modern Residence, Avinashi',
    category: 'Residential',
    location: 'Avinashi, Tamil Nadu',
    year: '2025',
    image: '/images/projects/ganeshan-residence/1.jpg',
    description: 'A twilight-lit residence with arched openings and layered facade textures.',
  },
  {
    id: 6,
    title: 'Tiruchengode Farmhouse',
    category: 'Residential',
    location: 'Tiruchengode, Tamil Nadu',
    year: '2025',
    image: '/images/projects/eshwaren-farmhouse/1.jpg',
    description: 'A farmhouse retreat designed around open living spaces and natural light.',
  },
  {
    id: 7,
    title: 'Bhavani Farmhouse',
    category: 'Residential',
    location: 'Bhavani, Tamil Nadu',
    year: '2025',
    image: '/images/projects/sathyamoorthy-farmhouse/1.jpg',
    description: 'A farmhouse with a sculptural, timber-clad facade set within landscaped grounds.',
  },
];
