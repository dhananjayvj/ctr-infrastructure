'use client';

import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  Link,
  Image,
  SimpleGrid,
  Button,
} from '@chakra-ui/react';
import { motion, useReducedMotion } from 'framer-motion';
import { FiMapPin, FiMail } from 'react-icons/fi';
import NextLink from 'next/link';
import { HeroCarousel } from '@/components/audi/HeroCarousel';
import { QuickNavPills, LearnMoreLink } from '@/components/audi/LearnMoreLink';
import { HorizontalStrip } from '@/components/audi/HorizontalStrip';
import { FeatureGrid } from '@/components/audi/FeatureGrid';
import { NewsSection } from '@/components/audi/NewsSection';
import { SiteFooter } from '@/components/SiteFooter';
import { Reveal } from '@/components/Reveal';
import { Timeline } from '@/components/Timeline';
import {
  heroSlides,
  quickLinks,
  projectStrip,
  featureTiles,
  newsItems,
  stats,
  services,
} from '@/lib/content';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/motion';
import { sectionPyLg, gridGap } from '@/lib/spacing';

const MotionBox = motion(Box);
const MotionGrid = motion(Grid);

const timelineItems = [
  {
    year: '1960s',
    title: 'A vision takes root',
    body: 'Er. T.C. Chinnamuthu pioneers work at the intersection of water resources and landscape development, setting a course rooted in sustainability and environmental sensitivity.',
  },
  {
    year: '1990',
    title: 'CTR Infrastructure is founded',
    body: 'The firm is officially established, building on three decades of prior groundwork and a clear vision for responsible, context-driven infrastructure.',
  },
  {
    year: 'Today',
    title: 'A multidisciplinary practice',
    body: 'Led by Er. C. Thillairajan — Managing Director and Past President, FACEAT&P — CTR Infrastructure operates as an integrated team of engineers, architects, and technical experts across South India.',
  },
];

const reachStats = [
  { number: '60+', label: 'Years legacy' },
  { number: '3+', label: 'Decades as CTR Infrastructure' },
  { number: '4+', label: 'States across South India' },
];

const projectSectors = [
  {
    number: '01',
    title: 'Residential Projects',
    description:
      'Our residential work is defined by a commitment to clarity in planning, refinement in detail, and a deep respect for the individuality of each site and client. We design homes that balance spatial efficiency with comfort, privacy with openness, and permanence with adaptability.',
  },
  {
    number: '02',
    title: 'Commercial & Multistorey Buildings',
    description:
      'Our expertise in multistorey developments brings together functionality, aesthetics, and sustainability — maximizing space efficiency, natural light, and ventilation while ensuring structural integrity. From residential complexes to commercial hubs, we design vertical spaces with a refined architectural identity.',
  },
  {
    number: '03',
    title: 'Archeology & Conservation',
    description:
      'Our work in archaeology and conservation is driven by a deep respect for cultural heritage. We collaborate with historians, conservation experts, and local communities to document, preserve, and sometimes reinterpret historic sites — minimal yet meaningful interventions guided by research and context.',
  },
];

const designPillars = [
  {
    number: '01',
    title: 'Minimalism',
    description:
      'Minimalism guides our form and detailing — clean lines, quiet compositions, and restrained palettes that allow architecture to speak through space, light, and proportion. Each design is stripped of excess, yet rich in thought and experience.',
  },
  {
    number: '02',
    title: 'Sustainability',
    description:
      'Sustainability forms the backbone of our approach. From local materials to climate-responsive planning, we create spaces that endure while fostering a meaningful connection between people, place, and nature.',
  },
];

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mnpadjev';

export default function HomePage() {
  const reducedMotion = useReducedMotion();

  return (
    <Box as="main" overflowX="hidden" bg="dark.900">
      <HeroCarousel slides={heroSlides} />
      <QuickNavPills links={quickLinks} />
      <HorizontalStrip title="CTR Projects" items={projectStrip} />

      {/* Discover CTA — Audi "Discover the Models" pattern */}
      <Box as="section" py={{ base: 16, md: 24 }} bg="dark.900">
        <Container maxW="1440px">
          <Grid templateColumns={{ base: '1fr', lg: '1.05fr 0.95fr' }} gap={{ base: 10, lg: 8 }}>
            <Box
              position="relative"
              overflow="hidden"
              minH={{ base: '320px', md: '480px' }}
              border="1px solid"
              borderColor="whiteAlpha.120"
            >
              <Image
                src="/images/projects/ganeshan-residence/1.jpg"
                alt="CTR Infrastructure projects"
                objectFit="cover"
                w="full"
                h="full"
                position="absolute"
                inset={0}
                filter="brightness(0.62)"
              />
              <Box
                position="absolute"
                inset={0}
                bgGradient="linear(to-t, rgba(6,11,19,0.82) 0%, rgba(6,11,19,0.24) 60%, rgba(6,11,19,0.18) 100%)"
              />
            </Box>
            <Flex
              direction="column"
              justify="center"
              px={{ base: 0, lg: 10 }}
              py={{ base: 4, lg: 10 }}
            >
              <Text variant="eyebrow" mb={4}>
                Portfolio overview
              </Text>
              <Heading fontSize="display-lg" fontWeight="500" mb={5} maxW="12ch">
                Discover the built work behind the practice
              </Heading>
              <Text variant="lead" maxW="none" mb={8}>
                Review selected projects, sector expertise, and commissioning pathways for commercial, residential, and civic work.
              </Text>
              <LearnMoreLink href="/projects">Discover CTR Projects</LearnMoreLink>
            </Flex>
          </Grid>
        </Container>
      </Box>

      {/* Stats */}
      <Box py={{ base: 12, md: 16 }} borderY="1px solid" borderColor="whiteAlpha.120" bg="dark.900">
        <Container maxW="1440px">
          <MotionBox
            variants={staggerContainer}
            initial={reducedMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={viewportOnce}
          >
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={{ base: 8, md: 12 }}>
              {stats.map((stat) => (
                <MotionBox
                  key={stat.label}
                  variants={staggerItem}
                  p={{ base: 4, md: 5 }}
                  bg="surface.100"
                  border="1px solid"
                  borderColor="whiteAlpha.120"
                >
                  <Text variant="stat">{stat.number}</Text>
                  <Text variant="caption" mt={2} color="dark.100">
                    {stat.label}
                  </Text>
                </MotionBox>
              ))}
            </SimpleGrid>
          </MotionBox>
        </Container>
      </Box>

      <FeatureGrid
        title="Step into the world of CTR"
        tiles={featureTiles}
      />

      {/* Services */}
      <Box as="section" id="services" py={sectionPyLg} bg="dark.800">
        <Container maxW="1440px">
          <Grid templateColumns={{ base: '1fr', lg: '1fr 2fr' }} gap={{ base: 10, lg: 20 }}>
            <VStack align="flex-start" spacing={5} maxW="30rem">
              <Text variant="eyebrow">Integrated services</Text>
              <Heading fontSize="display-md" fontWeight="500">
                Design services across architecture and infrastructure
              </Heading>
              <Text variant="body" maxW="none">
                From feasibility to construction administration, CTR leads architecture, infrastructure, and planning through one coordinated technical team.
              </Text>
              <LearnMoreLink href="/#contact">Discuss a project</LearnMoreLink>
            </VStack>

            <MotionGrid
              templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)' }}
              gap={gridGap}
              variants={staggerContainer}
              initial={reducedMotion ? false : 'hidden'}
              whileInView="visible"
              viewport={viewportOnce}
            >
              {services.map((service) => (
                <MotionBox
                  key={service.number}
                  variants={staggerItem}
                  p={{ base: 6, md: 8 }}
                  border="1px solid"
                  borderColor="whiteAlpha.120"
                  bg="surface.100"
                  minH="100%"
                  _hover={{ borderColor: 'brand.400', bg: 'surface.200', transform: 'translateY(-2px)' }}
                  transition="all 0.45s"
                  role="group"
                >
                  <Text
                    fontSize="sm"
                    color="brand.300"
                    mb={4}
                    sx={{ fontVariantNumeric: 'tabular-nums' }}
                  >
                    {service.number}
                  </Text>
                  <Heading fontSize="xl" fontWeight="500" mb={3}>
                    {service.title}
                  </Heading>
                  <Text fontSize="sm" color="dark.100" lineHeight="1.7">
                    {service.description}
                  </Text>
                </MotionBox>
              ))}
            </MotionGrid>
          </Grid>
        </Container>
      </Box>

      {/* About */}
      <Box as="section" id="about" py={sectionPyLg} bg="dark.900">
        <Container maxW="1440px">
          <VStack align="flex-start" spacing={4} mb={{ base: 14, md: 16 }} maxW="42rem">
            <Text variant="eyebrow">About the studio</Text>
            <Heading fontSize="display-lg" fontWeight="500" lineHeight="1.02" maxW="12ch">
              CTR Infrastructure
            </Heading>
            <Text variant="lead" maxW="none">
              CTR approaches architecture as a contextual and collaborative discipline, balancing climate, materials, technical performance, and long-term use in every commission.
            </Text>
          </VStack>

          {/* Our Legacy */}
          <Reveal>
            <VStack align="flex-start" spacing={5} maxW="42rem" pb={{ base: 14, md: 16 }}>
              <Text variant="eyebrow">Our legacy</Text>
              <Heading fontSize="display-md" fontWeight="500">
                A legacy of more than 60 years
              </Heading>
              <Text variant="body" maxW="none">
                CTR Infrastructure was officially established in 1990, building
                on a strong foundation laid in the 1960s by Er. T.C.
                Chinnamuthu. His pioneering work focused on the intersection of
                water resources and landscape development, setting a vision
                rooted in sustainability and environmental sensitivity.
              </Text>
              <Text color="dark.100" lineHeight="1.7" maxW="none">
                Today, the firm is led by Er. C. Thillairajan, Managing
                Director and Past President of the Federation of all Civil
                Engineers Association of Tamil Nadu and Pondicherry
                (FACEAT&P). Our approach seamlessly integrates planning,
                design, and execution, resulting in built environments that
                are thoughtful, efficient, and deeply connected to their
                context.
              </Text>
            </VStack>
          </Reveal>

          {/* Timeline — full-width scroll showcase */}
          <Box maxW="640px" mx={{ base: 0, lg: 'auto' }} pb={{ base: 16, md: 20 }}>
            <Timeline items={timelineItems} />
          </Box>

          {/* Our Reach */}
          <Grid
            templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
            gap={{ base: 10, lg: 20 }}
            alignItems="center"
            py={{ base: 16, md: 20 }}
            borderTop="1px solid"
            borderColor="whiteAlpha.120"
          >
            <Reveal>
              <VStack align="flex-start" spacing={5}>
                <Text variant="eyebrow">Our reach</Text>
                <Heading fontSize="display-md" fontWeight="500">
                  Rooted in South India
                </Heading>
                <Text variant="body" maxW="none">
                  Over the years, the geographical scope of our work has
                  expanded to span more than four states across South India,
                  with projects ranging from rural landscapes to dense urban
                  contexts throughout Tamil Nadu.
                </Text>
                <Text color="dark.100" lineHeight="1.7" maxW="none">
                  Regardless of location or scale, our core philosophies remain
                  unchanged: thoughtful consideration of the environment, a deep
                  respect for local materials and cultural narratives, and a
                  strong emphasis on collaboration with skilled craftspeople,
                  artists, and domain experts.
                </Text>
              </VStack>
            </Reveal>

            <Reveal delay={0.1}>
              <SimpleGrid columns={3} spacing={{ base: 6, md: 8 }}>
                {reachStats.map((stat) => (
                  <Box
                    key={stat.label}
                    p={{ base: 4, md: 5 }}
                    bg="surface.100"
                    border="1px solid"
                    borderColor="whiteAlpha.120"
                  >
                    <Text variant="stat">{stat.number}</Text>
                    <Text variant="caption" mt={2} color="dark.100">
                      {stat.label}
                    </Text>
                  </Box>
                ))}
              </SimpleGrid>
            </Reveal>
          </Grid>

          {/* Architecture practice */}
          <Grid
            templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
            gap={{ base: 10, lg: 20 }}
            py={{ base: 16, md: 20 }}
            borderTop="1px solid"
            borderColor="whiteAlpha.120"
          >
            <Reveal>
              <VStack align="flex-start" spacing={5} maxW="28rem">
                <Text variant="eyebrow">Architecture</Text>
                <Heading fontSize="display-md" fontWeight="500">
                  A multidisciplinary studio
                </Heading>
              </VStack>
            </Reveal>
            <Reveal delay={0.1}>
              <VStack align="flex-start" spacing={5}>
                <Text variant="body" maxW="none">
                  CTR has evolved over the decades into a multidisciplinary
                  practice that now includes urban designers, planners, interior
                  designers, and more — a collective of designers with artistic
                  sensibility, architects and engineers with specialized
                  technical expertise, and planners with a deep understanding of
                  policy and economics, currently led by Ar. Vishnu Raj T.T. and
                  Ar. Vaishnavi M. Pawar.
                </Text>
                <Text color="dark.100" lineHeight="1.7" maxW="none">
                  Our work spans a wide range of sectors — from sustainable
                  engineering and healthcare design, to regenerative city
                  planning and temple architecture. None of these areas stand in
                  isolation; each discipline is deeply interwoven with the
                  others, shaped by a rich exchange of ideas, perspectives, and
                  knowledge.
                </Text>
              </VStack>
            </Reveal>
          </Grid>

          {/* About Our Work */}
          <Box py={{ base: 16, md: 20 }} borderTop="1px solid" borderColor="whiteAlpha.120">
            <Reveal>
              <VStack align="flex-start" spacing={5} maxW="900px">
                <Text variant="eyebrow">About our work</Text>
                <Heading fontSize="display-md" fontWeight="500">
                  A contextual, collaborative practice
                </Heading>
                <Text variant="body" maxW="none">
                  Our design approach is rooted in clarity, climate sensitivity,
                  and material honesty. We work closely with engineers,
                  craftspeople, and other specialists to ensure that every
                  detail — from structure to finish — is considered and
                  cohesive.
                </Text>
                <Text color="dark.100" lineHeight="1.7" maxW="none">
                  Led by a studio that values both creative exploration and
                  technical precision, we continuously engage with the evolving
                  needs of modern living, while remaining attuned to tradition,
                  craft, and local identity.
                </Text>
              </VStack>
            </Reveal>
          </Box>

          {/* Our Projects — sector grid */}
          <Box py={{ base: 16, md: 20 }} borderTop="1px solid" borderColor="whiteAlpha.120">
            <VStack align="flex-start" spacing={4} mb={{ base: 10, md: 14 }}>
              <Text variant="eyebrow">Diverse works</Text>
              <Heading fontSize="display-md" fontWeight="500">
                Our Projects
              </Heading>
            </VStack>

            <MotionGrid
              templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
              gap={gridGap}
              variants={staggerContainer}
              initial={reducedMotion ? false : 'hidden'}
              whileInView="visible"
              viewport={viewportOnce}
            >
              {projectSectors.map((sector) => (
                <MotionBox
                  key={sector.number}
                  variants={staggerItem}
                  p={{ base: 6, md: 8 }}
                  border="1px solid"
                  borderColor="whiteAlpha.120"
                  bg="surface.100"
                  _hover={{ borderColor: 'brand.400', bg: 'surface.200' }}
                  transition="all 0.45s"
                >
                  <Text fontSize="sm" color="brand.300" mb={4} sx={{ fontVariantNumeric: 'tabular-nums' }}>
                    {sector.number}
                  </Text>
                  <Heading fontSize="xl" fontWeight="500" mb={3}>
                    {sector.title}
                  </Heading>
                  <Text fontSize="sm" color="dark.100" lineHeight="1.7">
                    {sector.description}
                  </Text>
                </MotionBox>
              ))}
            </MotionGrid>
          </Box>

          {/* Design Style */}
          <Grid
            templateColumns={{ base: '1fr', lg: '1fr 2fr' }}
            gap={{ base: 10, lg: 20 }}
            py={{ base: 16, md: 20 }}
            borderTop="1px solid"
            borderColor="whiteAlpha.120"
          >
            <Reveal>
              <VStack align="flex-start" spacing={5} maxW="28rem">
                <Text variant="eyebrow">Design style</Text>
                <Heading fontSize="display-md" fontWeight="500">
                  Timeless, contemporary, and rooted
                </Heading>
                <Text variant="body" maxW="none">
                  Our design style blends the timeless with the contemporary.
                  Influenced by vernacular traditions and tropical living, we
                  craft spaces that are open, breathable, and deeply rooted in
                  their surroundings.
                </Text>
              </VStack>
            </Reveal>

            <MotionGrid
              templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)' }}
              gap={gridGap}
              variants={staggerContainer}
              initial={reducedMotion ? false : 'hidden'}
              whileInView="visible"
              viewport={viewportOnce}
            >
              {designPillars.map((pillar) => (
                <MotionBox
                  key={pillar.number}
                  variants={staggerItem}
                  p={{ base: 6, md: 8 }}
                  border="1px solid"
                  borderColor="whiteAlpha.120"
                  bg="surface.100"
                  _hover={{ borderColor: 'brand.400', bg: 'surface.200' }}
                  transition="all 0.45s"
                >
                  <Text fontSize="sm" color="brand.300" mb={4} sx={{ fontVariantNumeric: 'tabular-nums' }}>
                    {pillar.number}
                  </Text>
                  <Heading fontSize="xl" fontWeight="500" mb={3}>
                    {pillar.title}
                  </Heading>
                  <Text fontSize="sm" color="dark.100" lineHeight="1.7">
                    {pillar.description}
                  </Text>
                </MotionBox>
              ))}
            </MotionGrid>
          </Grid>

          {/* Eco Design — closing */}
          <Box pt={{ base: 16, md: 20 }} borderTop="1px solid" borderColor="whiteAlpha.120" textAlign="center">
            <Reveal>
              <VStack spacing={6} maxW="36rem" mx="auto">
                <Text variant="eyebrow">Eco design</Text>
                <Heading fontSize="display-md" fontWeight="500">
                  Sustainability as a starting point
                </Heading>
                <Text variant="lead" maxW="none" mx="auto" textAlign="center">
                  We approach sustainability as an intrinsic part of design, not
                  an afterthought. By embracing local traditions,
                  climate-responsive strategies, and natural materials, we craft
                  spaces that breathe, conserve energy, and connect people with
                  nature.
                </Text>
                <Box pt={2}>
                  <LearnMoreLink href="/#contact">Discuss a project</LearnMoreLink>
                </Box>
              </VStack>
            </Reveal>
          </Box>
        </Container>
      </Box>

      <NewsSection
        title="CTR Media Center"
        description="Find the latest project information, images, and updates from CTR Communications."
        items={newsItems}
      />

      {/* Contact */}
      <Box as="section" id="contact" py={sectionPyLg} bg="dark.800">
        <Container maxW="1440px">
          <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={{ base: 10, lg: 20 }}>
            <VStack align="flex-start" spacing={8}>
              <Box>
                <Text variant="eyebrow" mb={4}>Get in touch</Text>
                <Heading fontSize="display-md" fontWeight="500">
                  Start a conversation about the next commission
                </Heading>
              </Box>

              <VStack align="flex-start" spacing={6}>
                {[
                  {
                    icon: FiMapPin,
                    label: 'Headquarters',
                    lines: ['Tamil Nadu, South India'],
                  },
                  {
                    icon: FiMail,
                    label: 'Email',
                    lines: ['hello@ctrinfrastructure.com'],
                    href: 'mailto:hello@ctrinfrastructure.com',
                  },
                ].map((item) => (
                  <HStack key={item.label} spacing={4} align="flex-start">
                    <Box
                      w="48px"
                      h="48px"
                      border="1px solid"
                      borderColor="whiteAlpha.200"
                      bg="surface.100"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexShrink={0}
                    >
                      <Icon as={item.icon} color="dark.200" boxSize={5} />
                    </Box>
                    <Box>
                      <Text variant="caption" mb={1}>{item.label}</Text>
                      {item.lines.map((line) =>
                        item.href ? (
                          <Link key={line} href={item.href} color="dark.50" display="block" _hover={{ opacity: 0.8 }}>
                            {line}
                          </Link>
                        ) : (
                          <Text key={line} color="dark.50">{line}</Text>
                        )
                      )}
                    </Box>
                  </HStack>
                ))}
              </VStack>

              <LearnMoreLink href="/faq" size="sm">
                Have questions? Read our FAQs
              </LearnMoreLink>
            </VStack>

            <Box
              as="form"
              action={FORMSPREE_ENDPOINT}
              method="POST"
              p={{ base: 6, md: 10 }}
              border="1px solid"
              borderColor="whiteAlpha.120"
              bg="surface.200"
              backdropFilter="blur(24px)"
            >
              <VStack spacing={5}>
                <Box as="input" type="text" name="_gotcha" display="none" tabIndex={-1} autoComplete="off" />
                <Box as="input" type="hidden" name="_next" value="https://ctrinfrastructure.com/thank-you/" />
                <Box as="input" type="hidden" name="_subject" value="New enquiry from ctrinfrastructure.com" />

                <Grid templateColumns={{ base: '1fr', sm: '1fr 1fr' }} gap={4} w="full">
                  {[
                    { label: 'First name', name: 'first_name' },
                    { label: 'Last name', name: 'last_name' },
                  ].map((field) => (
                    <Box key={field.name}>
                      <Text as="label" htmlFor={field.name} variant="caption" mb={2} display="block">
                        {field.label}
                      </Text>
                      <Box
                        as="input"
                        id={field.name}
                        name={field.name}
                        required
                        w="full"
                        p={4}
                        bg="surface.100"
                        border="1px solid"
                        borderColor="whiteAlpha.200"
                        color="dark.50"
                        fontSize="sm"
                        _focus={{ borderColor: 'brand.400', outline: 'none', boxShadow: '0 0 0 1px var(--chakra-colors-brand-400)' }}
                      />
                    </Box>
                  ))}
                </Grid>
                <Box w="full">
                  <Text as="label" htmlFor="email" variant="caption" mb={2} display="block">Email</Text>
                  <Box
                    as="input"
                    id="email"
                    name="email"
                    type="email"
                    required
                    w="full"
                    p={4}
                    bg="surface.100"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    color="dark.50"
                    fontSize="sm"
                    _focus={{ borderColor: 'brand.400', outline: 'none', boxShadow: '0 0 0 1px var(--chakra-colors-brand-400)' }}
                  />
                </Box>
                <Box w="full">
                  <Text as="label" htmlFor="message" variant="caption" mb={2} display="block">Message</Text>
                  <Box
                    as="textarea"
                    id="message"
                    name="message"
                    required
                    w="full"
                    p={4}
                    h="140px"
                    bg="surface.100"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    color="dark.50"
                    fontSize="sm"
                    resize="none"
                    _focus={{ borderColor: 'brand.400', outline: 'none', boxShadow: '0 0 0 1px var(--chakra-colors-brand-400)' }}
                  />
                </Box>
                <Button
                  w="full"
                  size="lg"
                  minH="48px"
                  variant="solid"
                  type="submit"
                >
                  Send message
                </Button>
                <Text fontSize="xs" color="dark.200" textAlign="center">
                  We respond to every enquiry within 24 hours.
                </Text>
              </VStack>
            </Box>
          </Grid>
        </Container>
      </Box>

      <SiteFooter />
    </Box>
  );
}
