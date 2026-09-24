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
import { FiMapPin, FiMail, FiMessageCircle, FiPhone } from 'react-icons/fi';
import NextLink from 'next/link';
import { HeroCarousel } from '@/components/audi/HeroCarousel';
import { QuickNavPills, LearnMoreLink } from '@/components/audi/LearnMoreLink';
import { FeatureGrid } from '@/components/audi/FeatureGrid';
import { NewsSection } from '@/components/audi/NewsSection';
import { SiteFooter } from '@/components/SiteFooter';
import { Reveal } from '@/components/Reveal';
import { Timeline } from '@/components/Timeline';
import { ClientsSection } from '@/components/ClientsSection';
import {
  heroSlides,
  quickLinks,
  featureTiles,
  newsItems,
  stats,
  services,
} from '@/lib/content';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/motion';
import { SITE_URL } from '@/lib/site';
import { sectionPyLg, gridGap } from '@/lib/spacing';

const MotionBox = motion(Box);
const MotionGrid = motion(Grid);

const timelineItems = [
  {
    year: '1960s',
    title: 'A vision takes root',
    body: 'Er. T.C. Chinnamuthu begins a practice at the intersection of water resources, landscape, and environmental care.',
  },
  {
    year: '1990',
    title: 'CTR Infrastructure is founded',
    body: 'CTR Infrastructure is formally established, carrying forward three decades of context-driven groundwork.',
  },
  {
    year: 'Today',
    title: 'A multidisciplinary practice',
    body: 'Led by Er. C. Thillairajan, the practice brings engineers, architects, and technical experts together across South India.',
  },
];

const reachStats = [
  { number: '60+', label: 'Years legacy' },
  { number: '3+', label: 'Decades as CTR Infrastructure' },
  { number: '4+', label: 'States across South India' },
];

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mnpadjev';

export default function HomePage() {
  const reducedMotion = useReducedMotion();

  return (
    <Box as="main" overflowX="hidden" bg="dark.900">
      <HeroCarousel slides={heroSlides} />
      <QuickNavPills links={quickLinks} />

      {/* Discover CTA — Audi "Discover the Models" pattern */}
      <Box as="section" py={{ base: 16, md: 24 }} bg="dark.900">
        <Container maxW="1440px">
          <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={{ base: 10, lg: 0 }}>
            <Box
              position="relative"
              overflow="hidden"
              minH={{ base: '320px', md: '480px' }}
              mr={{ lg: 0 }}
            >
              <Image
                src="/images/projects/Complete projects/Hindustan resort ,Coimbatore, Tamilnadu/Renders/ChatGPT Image Sep 23, 2026, 10_59_54 PM.png"
                alt="CTR Infrastructure projects"
                objectFit="cover"
                w="full"
                h="full"
                position="absolute"
                inset={0}
                filter="brightness(0.7)"
              />
            </Box>
            <Flex
              direction="column"
              justify="center"
              px={{ base: 0, lg: 14 }}
              py={{ base: 4, lg: 12 }}
            >
              <Text variant="caption" mb={4} color="dark.300">
                Selected work
              </Text>
              <Heading fontSize="display-lg" fontWeight="400" mb={5}>
                Explore the portfolio
              </Heading>
              <Text variant="lead" maxW="none" mb={8}>
                Public, commercial, and residential work across South India.
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
                <MotionBox key={stat.label} variants={staggerItem}>
                  <Text variant="stat">{stat.number}</Text>
                  <Text variant="caption" mt={2} textTransform="none">
                    {stat.label}
                  </Text>
                </MotionBox>
              ))}
            </SimpleGrid>
          </MotionBox>
        </Container>
      </Box>

      <FeatureGrid title="Selected work" tiles={featureTiles} />

      {/* Services */}
      <Box as="section" id="services" py={sectionPyLg} bg="dark.800">
        <Container maxW="1440px">
          <Grid templateColumns={{ base: '1fr', lg: '1fr 2fr' }} gap={{ base: 10, lg: 20 }}>
            <VStack align="flex-start" spacing={5} maxW="28rem">
              <Heading fontSize="display-md" fontWeight="400">
                Architecture at every scale
              </Heading>
              <Text variant="body" maxW="none">
                Architecture, planning, and infrastructure from concept to completion.
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
                  _hover={{ borderColor: 'whiteAlpha.300', bg: 'whiteAlpha.30' }}
                  transition="all 0.45s"
                  role="group"
                >
                  <Text
                    fontSize="sm"
                    color="dark.300"
                    mb={4}
                    sx={{ fontVariantNumeric: 'tabular-nums' }}
                  >
                    {service.number}
                  </Text>
                  <Heading fontSize="lg" fontWeight="500" mb={3}>
                    {service.title}
                  </Heading>
                  <Text fontSize="sm" color="dark.200" lineHeight="1.7">
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
            <Text variant="caption">About Us</Text>
            <Heading fontSize="display-lg" fontWeight="300" lineHeight="1.1">
              CTR Infrastructure
            </Heading>
            <Text variant="lead" maxW="none">
              Context-led work for people, place, and time.
            </Text>
          </VStack>

          {/* Our Legacy */}
          <Reveal>
            <VStack align="flex-start" spacing={5} maxW="42rem" pb={{ base: 14, md: 16 }}>
              <Text variant="caption">Our Legacy</Text>
              <Heading fontSize="display-md" fontWeight="400">
                60 years in practice
              </Heading>
              <Text variant="body" maxW="none">
                Founded in 1990 on work begun in the 1960s, CTR brings planning,
                design, and execution together.
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
                <Text variant="caption">Our Reach</Text>
                <Heading fontSize="display-md" fontWeight="400">
                  Rooted in South India
                </Heading>
                <Text variant="body" maxW="none">
                  From rural landscapes to dense urban contexts, our work follows
                  climate, material, and place.
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
                <Text variant="caption">Architecture</Text>
                <Heading fontSize="display-md" fontWeight="400">
                  One integrated studio
                </Heading>
              </VStack>
            </Reveal>
            <Reveal delay={0.1}>
              <VStack align="flex-start" spacing={5}>
                <Text variant="body" maxW="none">
                  Architects, planners, engineers, and interior designers work as
                  one team across every commission.
                </Text>
              </VStack>
            </Reveal>
          </Grid>

        </Container>
      </Box>

      <ClientsSection />

      <NewsSection
        title="Studio updates"
        description="Project news and studio notes."
        items={newsItems}
      />

      {/* Contact */}
      <Box as="section" id="contact" py={sectionPyLg} bg="dark.800">
        <Container maxW="1440px">
          <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={{ base: 10, lg: 20 }}>
            <VStack align="flex-start" spacing={8}>
              <Box>
                <Text variant="caption" mb={4}>Get in touch</Text>
                <Heading fontSize="display-md" fontWeight="400">
                  Contact
                </Heading>
              </Box>

              <VStack align="flex-start" spacing={6}>
                {[
                  {
                    icon: FiMail,
                    label: 'Mail',
                    lines: ['infodesk@ctrinfrasturre.com'],
                    href: 'mailto:infodesk@ctrinfrasturre.com',
                  },
                  {
                    icon: FiMessageCircle,
                    label: 'WhatsApp',
                    lines: ['9600622928'],
                    href: 'https://wa.me/919600622928',
                  },
                  {
                    icon: FiPhone,
                    label: 'Office',
                    lines: ['9600622928'],
                    href: 'tel:+919600622928',
                  },
                  {
                    icon: FiMapPin,
                    label: 'Head office',
                    lines: ['Coimbatore, Tamilnadu, India'],
                  },
                ].map((item) => (
                  <HStack key={item.label} spacing={4} align="flex-start">
                    <Box
                      w="48px"
                      h="48px"
                      border="1px solid"
                      borderColor="whiteAlpha.200"
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
                          <Text key={line} color="dark.100">{line}</Text>
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
              bg="dark.900"
            >
              <VStack spacing={5}>
                <Box as="input" type="text" name="_gotcha" display="none" tabIndex={-1} autoComplete="off" />
                <Box as="input" type="hidden" name="_next" value={`${SITE_URL}/thank-you/`} />
                <Box as="input" type="hidden" name="_subject" value="New enquiry from CTR Infrastructure website" />

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
                        bg="transparent"
                        border="1px solid"
                        borderColor="whiteAlpha.200"
                        color="dark.50"
                        fontSize="sm"
                        _focus={{ borderColor: 'dark.50', outline: 'none' }}
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
                    bg="transparent"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    color="dark.50"
                    fontSize="sm"
                    _focus={{ borderColor: 'dark.50', outline: 'none' }}
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
                    bg="transparent"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    color="dark.50"
                    fontSize="sm"
                    resize="none"
                    _focus={{ borderColor: 'dark.50', outline: 'none' }}
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
                <Text fontSize="xs" color="dark.300" textAlign="center">
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
