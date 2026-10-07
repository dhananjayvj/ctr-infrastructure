'use client';

import { Box, Button, Container, Flex, Grid, Heading, HStack, Icon, Link, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { motion, useReducedMotion } from 'framer-motion';
import { FiMail, FiMapPin, FiMessageCircle, FiPhone } from 'react-icons/fi';
import { ClientsSection } from '@/components/ClientsSection';
import { HeroCarousel } from '@/components/audi/HeroCarousel';
import { FeatureGrid } from '@/components/audi/FeatureGrid';
import { LearnMoreLink } from '@/components/audi/LearnMoreLink';
import { SiteFooter } from '@/components/SiteFooter';
import { completeProjects } from '@/data/projectCatalog';
import { heroSlides, services, stats } from '@/lib/content';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/motion';
import { SITE_URL } from '@/lib/site';
import { gridGap, sectionPyLg } from '@/lib/spacing';

const MotionBox = motion(Box);
const MotionGrid = motion(Grid);
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mnpadjev';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'ProfessionalService'],
  name: 'CTR Infrastructure',
  url: SITE_URL,
  description: 'CTR Infrastructure is a South India-based engineering and architecture firm specializing in commercial, residential, institutional, and infrastructure projects.',
  legalName: 'CTR Infrastructure',
  taxID: '33AAVFC9557H1ZU',
  areaServed: ['South India', 'Tamil Nadu', 'Karnataka'],
  knowsAbout: ['Commercial architecture', 'Residential architecture', 'Institutional infrastructure', 'Engineering design'],
  email: 'infodesk@ctrinfrastructure.com',
  sameAs: ['https://www.linkedin.com/company/ctr-architects/'],
  address: {
    '@type': 'PostalAddress',
    streetAddress: '37/12, Poochakkadu, Mangalam Road',
    addressLocality: 'Tiruppur',
    addressRegion: 'Tamil Nadu',
    postalCode: '641604',
    addressCountry: 'IN',
  },
  telephone: '+919900602928',
  contactPoint: [
    { '@type': 'ContactPoint', contactType: 'WhatsApp', telephone: '+919600622928', availableLanguage: ['English', 'Tamil'] },
    { '@type': 'ContactPoint', contactType: 'Office', telephone: '+919900602928', availableLanguage: ['English', 'Tamil'] },
  ],
};

const featuredCaseStudies = completeProjects
  .filter((project) => project.featured && project.cover)
  .map((project, index) => ({
    id: index + 1,
    title: project.title,
    subtitle: `${project.sector} · ${project.location}`,
    image: project.cover as string,
    imageSources: project.coverSources,
    href: `/projects/${project.id}/`,
  }));

const contactMethods = [
  { icon: FiMail, label: 'Mail', lines: ['infodesk@ctrinfrastructure.com'], href: 'mailto:infodesk@ctrinfrastructure.com' },
  { icon: FiMessageCircle, label: 'WhatsApp', lines: ['9600622928'], href: 'https://wa.me/919600622928' },
  { icon: FiPhone, label: 'Office', lines: ['9900602928'], href: 'tel:+919900602928' },
  { icon: FiMapPin, label: 'Registered office', lines: ['37/12, Poochakkadu, Mangalam Road', 'Tiruppur, Tamil Nadu 641604, India'] },
  { icon: FiMapPin, label: 'Coimbatore office', lines: ['Coimbatore, Tamil Nadu, India'] },
];

export function HomePageContent() {
  const reducedMotion = useReducedMotion();

  return (
    <Box as="main" overflowX="hidden" bg="dark.900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <HeroCarousel slides={heroSlides} />

      <Box as="section" aria-label="CTR Infrastructure at a glance" py={{ base: 12, md: 16 }} borderBottom="1px solid" borderColor="whiteAlpha.120">
        <Container maxW="1440px">
          <MotionBox variants={staggerContainer} initial={reducedMotion ? false : 'hidden'} whileInView="visible" viewport={viewportOnce}>
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={{ base: 8, md: 12 }}>
              {stats.map((stat) => (
                <MotionBox key={stat.label} variants={staggerItem}>
                  <Text variant="stat">{stat.number}</Text>
                  <Text variant="caption" mt={2} textTransform="none">{stat.label}</Text>
                </MotionBox>
              ))}
            </SimpleGrid>
          </MotionBox>
        </Container>
      </Box>

      <FeatureGrid
        title="Selected case studies"
        subtitle="A focused view of institutional, infrastructure, and hospitality work across South India."
        tiles={featuredCaseStudies}
      />

      <Box as="section" id="services" py={sectionPyLg} bg="dark.800">
        <Container maxW="1440px">
          <Grid templateColumns={{ base: '1fr', lg: '1fr 2fr' }} gap={{ base: 10, lg: 20 }}>
            <VStack align="flex-start" spacing={5} maxW="28rem">
              <Text variant="caption">What we do</Text>
              <Heading fontSize="display-lg" fontWeight="400">Architecture at every scale</Heading>
              <Text variant="body" maxW="none">Architecture, planning, and infrastructure from concept to completion.</Text>
              <LearnMoreLink href="/#contact">Discuss your project scope</LearnMoreLink>
            </VStack>

            <MotionGrid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)' }} gap={gridGap} variants={staggerContainer} initial={reducedMotion ? false : 'hidden'} whileInView="visible" viewport={viewportOnce}>
              {services.map((service) => (
                <MotionBox key={service.number} variants={staggerItem} p={{ base: 6, md: 8 }} borderTop="1px solid" borderColor="whiteAlpha.200" _hover={{ borderColor: 'whiteAlpha.500', bg: 'whiteAlpha.30' }} transition="background 220ms ease-out, border-color 220ms ease-out">
                  <Text fontSize="sm" color="dark.300" mb={4} sx={{ fontVariantNumeric: 'tabular-nums' }}>{service.number}</Text>
                  <Heading fontSize="lg" fontWeight="500" mb={3}>{service.title}</Heading>
                  <Text fontSize="sm" color="dark.200" lineHeight="1.7">{service.description}</Text>
                </MotionBox>
              ))}
            </MotionGrid>
          </Grid>

          <Flex id="about" direction={{ base: 'column', md: 'row' }} justify="space-between" align={{ base: 'flex-start', md: 'flex-end' }} gap={6} mt={{ base: 14, md: 20 }} pt={{ base: 8, md: 10 }} borderTop="1px solid" borderColor="whiteAlpha.120">
            <Heading fontSize={{ base: '2xl', md: '3xl' }} fontWeight="400">One integrated studio</Heading>
            <Text variant="body" maxW="34rem">Architects, planners, engineers, and interior designers work as one team across every commission.</Text>
          </Flex>
        </Container>
      </Box>

      <ClientsSection />

      <Box as="section" id="contact" py={sectionPyLg} bg="dark.900">
        <Container maxW="1440px">
          <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={{ base: 10, lg: 20 }}>
            <VStack align="flex-start" spacing={8}>
              <Box>
                <Text variant="caption" mb={4}>Start a project</Text>
                <Heading fontSize="display-md" fontWeight="400">Tell us what you are planning</Heading>
              </Box>
              <Text variant="lead" maxW="30rem">Share the site, ambition, and timeline. We will respond with the right next conversation.</Text>

              <VStack align="flex-start" spacing={6}>
                {contactMethods.map((item) => (
                  <HStack key={item.label} spacing={4} align="flex-start">
                    <Box w="48px" h="48px" border="1px solid" borderColor="whiteAlpha.200" display="flex" alignItems="center" justifyContent="center" flexShrink={0}>
                      <Icon as={item.icon} color="dark.200" boxSize={5} />
                    </Box>
                    <Box>
                      <Text variant="caption" mb={1}>{item.label}</Text>
                      {item.lines.map((line) => item.href ? <Link key={line} href={item.href} color="dark.50" display="block" _hover={{ opacity: 0.8 }}>{line}</Link> : <Text key={line} color="dark.100">{line}</Text>)}
                    </Box>
                  </HStack>
                ))}
              </VStack>

              <LearnMoreLink href="/faq/" size="sm">Read the project enquiry FAQs</LearnMoreLink>
            </VStack>

            <Box as="form" action={FORMSPREE_ENDPOINT} method="POST" p={{ base: 6, md: 10 }} borderTop="1px solid" borderColor="whiteAlpha.200" bg="dark.800">
              <VStack spacing={5}>
                <Box as="input" type="text" name="_gotcha" display="none" tabIndex={-1} autoComplete="off" />
                <Box as="input" type="hidden" name="_next" value={`${SITE_URL}/thank-you/`} />
                <Box as="input" type="hidden" name="_subject" value="New enquiry from CTR Infrastructure website" />
                <Grid templateColumns={{ base: '1fr', sm: '1fr 1fr' }} gap={4} w="full">
                  {[{ label: 'First name', name: 'first_name' }, { label: 'Last name', name: 'last_name' }].map((field) => (
                    <Box key={field.name}>
                      <Text as="label" htmlFor={field.name} variant="caption" mb={2} display="block">{field.label}</Text>
                      <Box as="input" id={field.name} name={field.name} required w="full" p={4} bg="transparent" border="1px solid" borderColor="whiteAlpha.200" color="dark.50" fontSize="sm" _focusVisible={{ borderColor: 'dark.50' }} />
                    </Box>
                  ))}
                </Grid>
                <Box w="full">
                  <Text as="label" htmlFor="email" variant="caption" mb={2} display="block">Email</Text>
                  <Box as="input" id="email" name="email" type="email" required w="full" p={4} bg="transparent" border="1px solid" borderColor="whiteAlpha.200" color="dark.50" fontSize="sm" _focusVisible={{ borderColor: 'dark.50' }} />
                </Box>
                <Box w="full">
                  <Text as="label" htmlFor="message" variant="caption" mb={2} display="block">Project brief</Text>
                  <Box as="textarea" id="message" name="message" required w="full" p={4} h="140px" bg="transparent" border="1px solid" borderColor="whiteAlpha.200" color="dark.50" fontSize="sm" resize="vertical" _focusVisible={{ borderColor: 'dark.50' }} />
                </Box>
                <Button w="full" size="lg" minH="48px" variant="solid" type="submit">Send project enquiry</Button>
                <Text fontSize="xs" color="dark.300" textAlign="center">We respond to every enquiry within 24 hours.</Text>
              </VStack>
            </Box>
          </Grid>
        </Container>
      </Box>

      <SiteFooter />
    </Box>
  );
}
