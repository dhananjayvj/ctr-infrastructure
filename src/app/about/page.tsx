'use client';

import { Box, Container, Grid, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { motion, useReducedMotion } from 'framer-motion';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Reveal } from '@/components/Reveal';
import { Timeline } from '@/components/Timeline';
import { LearnMoreLink } from '@/components/audi/LearnMoreLink';
import { SiteFooter } from '@/components/SiteFooter';
import { heroItem, heroStagger, staggerContainer, staggerItem, viewportOnce } from '@/lib/motion';
import { gridGap, pageTopPad, sectionPy, sectionPyLg } from '@/lib/spacing';

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

export default function AboutPage() {
  const reducedMotion = useReducedMotion();

  return (
    <Box as="main" bg="dark.900" overflowX="hidden">
      {/* Hero */}
      <Box pt={pageTopPad} pb={sectionPy}>
        <Container maxW="1440px">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />

          <MotionBox
            variants={heroStagger}
            initial={reducedMotion ? false : 'hidden'}
            animate="visible"
          >
            <VStack align="flex-start" spacing={{ base: 5, md: 6 }} maxW="42rem">
              <MotionBox variants={heroItem}>
                <Text variant="caption">About Us</Text>
              </MotionBox>
              <MotionBox variants={heroItem}>
                <Heading fontSize="display-lg" fontWeight="300" lineHeight="1.1">
                  CTR Infrastructure
                </Heading>
              </MotionBox>
              <MotionBox variants={heroItem}>
                <Text variant="lead" maxW="none">
                  Architecture is a deeply contextual and collaborative practice. We
                  view each project as an opportunity to create spaces that are
                  responsive — to their environment, to their users, and to the
                  culture they emerge from.
                </Text>
              </MotionBox>
            </VStack>
          </MotionBox>
        </Container>
      </Box>

      {/* Our Legacy + Timeline */}
      <Box as="section" py={sectionPyLg} bg="dark.800" borderTop="1px solid" borderColor="whiteAlpha.120">
        <Container maxW="1440px">
          <Grid templateColumns={{ base: '1fr', lg: '1fr 1.2fr' }} gap={{ base: 10, lg: 20 }}>
            <Reveal>
              <VStack align="flex-start" spacing={5} maxW="28rem">
                <Text variant="caption">Our Legacy</Text>
                <Heading fontSize="display-md" fontWeight="400">
                  A legacy of more than 60 years
                </Heading>
                <Text variant="body" maxW="none">
                  CTR Infrastructure was officially established in 1990, building on
                  a strong foundation laid in the 1960s by Er. T.C. Chinnamuthu. His
                  pioneering work focused on the intersection of water resources and
                  landscape development, setting a vision rooted in sustainability
                  and environmental sensitivity.
                </Text>
                <Text color="dark.200" lineHeight="1.7" maxW="none">
                  Today, the firm is led by Er. C. Thillairajan, Managing Director
                  and Past President of the Federation of all Civil Engineers
                  Association of Tamil Nadu and Pondicherry (FACEAT&P). Our
                  approach seamlessly integrates planning, design, and execution,
                  resulting in built environments that are thoughtful, efficient,
                  and deeply connected to their context.
                </Text>
              </VStack>
            </Reveal>

            <Timeline items={timelineItems} />
          </Grid>
        </Container>
      </Box>

      {/* Our Reach */}
      <Box as="section" py={sectionPyLg} bg="dark.900">
        <Container maxW="1440px">
          <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={{ base: 10, lg: 20 }} alignItems="center">
            <Reveal>
              <VStack align="flex-start" spacing={5}>
                <Text variant="caption">Our Reach</Text>
                <Heading fontSize="display-md" fontWeight="400">
                  Rooted in South India
                </Heading>
                <Text variant="body" maxW="none">
                  Over the years, the geographical scope of our work has expanded
                  to span more than four states across South India, with projects
                  ranging from rural landscapes to dense urban contexts throughout
                  Tamil Nadu.
                </Text>
                <Text color="dark.200" lineHeight="1.7" maxW="none">
                  Regardless of location or scale, our core philosophies remain
                  unchanged: thoughtful consideration of the environment, a deep
                  respect for local materials and cultural narratives, and a strong
                  emphasis on collaboration with skilled craftspeople, artists, and
                  domain experts.
                </Text>
              </VStack>
            </Reveal>

            <Reveal delay={0.1}>
              <SimpleGrid columns={3} spacing={{ base: 6, md: 8 }}>
                {reachStats.map((stat) => (
                  <Box key={stat.label}>
                    <Text variant="stat">{stat.number}</Text>
                    <Text variant="caption" mt={2} textTransform="none">
                      {stat.label}
                    </Text>
                  </Box>
                ))}
              </SimpleGrid>
            </Reveal>
          </Grid>
        </Container>
      </Box>

      {/* Architecture practice */}
      <Box as="section" py={sectionPyLg} bg="dark.800" borderTop="1px solid" borderColor="whiteAlpha.120">
        <Container maxW="1440px">
          <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={{ base: 10, lg: 20 }}>
            <Reveal>
              <VStack align="flex-start" spacing={5} maxW="28rem">
                <Text variant="caption">Architecture</Text>
                <Heading fontSize="display-md" fontWeight="400">
                  A multidisciplinary studio
                </Heading>
              </VStack>
            </Reveal>
            <Reveal delay={0.1}>
              <VStack align="flex-start" spacing={5}>
                <Text variant="body" maxW="none">
                  CTR has evolved over the decades into a multidisciplinary practice
                  that now includes urban designers, planners, interior designers,
                  and more — a collective of designers with artistic sensibility,
                  architects and engineers with specialized technical expertise, and
                  planners with a deep understanding of policy and economics,
                  currently led by Ar. Vishnu Raj T.T. and Ar. Vaishnavi M. Pawar.
                </Text>
                <Text color="dark.200" lineHeight="1.7" maxW="none">
                  Our work spans a wide range of sectors — from sustainable
                  engineering and healthcare design, to regenerative city planning
                  and temple architecture. None of these areas stand in isolation;
                  each discipline is deeply interwoven with the others, shaped by a
                  rich exchange of ideas, perspectives, and knowledge.
                </Text>
              </VStack>
            </Reveal>
          </Grid>
        </Container>
      </Box>

      {/* About Our Work */}
      <Box as="section" py={sectionPyLg} bg="dark.900">
        <Container maxW="900px">
          <Reveal>
            <VStack align="flex-start" spacing={5} textAlign="left">
              <Text variant="caption">About Our Work</Text>
              <Heading fontSize="display-md" fontWeight="400">
                A contextual, collaborative practice
              </Heading>
              <Text variant="body" maxW="none">
                Our design approach is rooted in clarity, climate sensitivity, and
                material honesty. We work closely with engineers, craftspeople, and
                other specialists to ensure that every detail — from structure to
                finish — is considered and cohesive.
              </Text>
              <Text color="dark.200" lineHeight="1.7" maxW="none">
                Led by a studio that values both creative exploration and technical
                precision, we continuously engage with the evolving needs of modern
                living, while remaining attuned to tradition, craft, and local
                identity.
              </Text>
            </VStack>
          </Reveal>
        </Container>
      </Box>

      {/* Our Projects — sector grid */}
      <Box as="section" py={sectionPyLg} bg="dark.800" borderTop="1px solid" borderColor="whiteAlpha.120">
        <Container maxW="1440px">
          <VStack align="flex-start" spacing={4} mb={{ base: 10, md: 14 }}>
            <Text variant="caption">Diverse Works</Text>
            <Heading fontSize="display-md" fontWeight="400">
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
                _hover={{ borderColor: 'whiteAlpha.300', bg: 'whiteAlpha.30' }}
                transition="all 0.45s"
              >
                <Text fontSize="sm" color="dark.300" mb={4} sx={{ fontVariantNumeric: 'tabular-nums' }}>
                  {sector.number}
                </Text>
                <Heading fontSize="lg" fontWeight="500" mb={3}>
                  {sector.title}
                </Heading>
                <Text fontSize="sm" color="dark.200" lineHeight="1.7">
                  {sector.description}
                </Text>
              </MotionBox>
            ))}
          </MotionGrid>
        </Container>
      </Box>

      {/* Design Style */}
      <Box as="section" py={sectionPyLg} bg="dark.900">
        <Container maxW="1440px">
          <Grid templateColumns={{ base: '1fr', lg: '1fr 2fr' }} gap={{ base: 10, lg: 20 }}>
            <Reveal>
              <VStack align="flex-start" spacing={5} maxW="28rem">
                <Text variant="caption">Design Style</Text>
                <Heading fontSize="display-md" fontWeight="400">
                  Timeless, contemporary, and rooted
                </Heading>
                <Text variant="body" maxW="none">
                  Our design style blends the timeless with the contemporary.
                  Influenced by vernacular traditions and tropical living, we craft
                  spaces that are open, breathable, and deeply rooted in their
                  surroundings.
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
                  _hover={{ borderColor: 'whiteAlpha.300', bg: 'whiteAlpha.30' }}
                  transition="all 0.45s"
                >
                  <Text fontSize="sm" color="dark.300" mb={4} sx={{ fontVariantNumeric: 'tabular-nums' }}>
                    {pillar.number}
                  </Text>
                  <Heading fontSize="lg" fontWeight="500" mb={3}>
                    {pillar.title}
                  </Heading>
                  <Text fontSize="sm" color="dark.200" lineHeight="1.7">
                    {pillar.description}
                  </Text>
                </MotionBox>
              ))}
            </MotionGrid>
          </Grid>
        </Container>
      </Box>

      {/* Eco Design — closing */}
      <Box as="section" py={sectionPyLg} bg="dark.800" borderTop="1px solid" borderColor="whiteAlpha.120">
        <Container maxW="900px" textAlign="center">
          <Reveal>
            <VStack spacing={6} maxW="36rem" mx="auto">
              <Text variant="caption">Eco Design</Text>
              <Heading fontSize="display-md" fontWeight="400">
                Sustainability as a starting point
              </Heading>
              <Text variant="lead" maxW="none" mx="auto" textAlign="center">
                We approach sustainability as an intrinsic part of design, not an
                afterthought. By embracing local traditions, climate-responsive
                strategies, and natural materials, we craft spaces that breathe,
                conserve energy, and connect people with nature.
              </Text>
              <Box pt={2}>
                <LearnMoreLink href="/#contact">Discuss a project</LearnMoreLink>
              </Box>
            </VStack>
          </Reveal>
        </Container>
      </Box>

      <SiteFooter />
    </Box>
  );
}
