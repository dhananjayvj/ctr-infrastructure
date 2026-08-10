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
import { FiMapPin, FiMail, FiPhone } from 'react-icons/fi';
import NextLink from 'next/link';
import { HeroCarousel } from '@/components/audi/HeroCarousel';
import { QuickNavPills, LearnMoreLink } from '@/components/audi/LearnMoreLink';
import { HorizontalStrip } from '@/components/audi/HorizontalStrip';
import { FeatureGrid } from '@/components/audi/FeatureGrid';
import { NewsSection } from '@/components/audi/NewsSection';
import { SiteFooter } from '@/components/SiteFooter';
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

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

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
          <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={{ base: 10, lg: 0 }}>
            <Box
              position="relative"
              overflow="hidden"
              minH={{ base: '320px', md: '480px' }}
              mr={{ lg: 0 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&q=85"
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
                Information on the projects
              </Text>
              <Heading fontSize="display-lg" fontWeight="400" mb={5}>
                Discover the CTR portfolio
              </Heading>
              <Text variant="lead" maxW="none" mb={8}>
                Find featured work, sector expertise, and commissioning information
                for commercial, residential, and civic projects.
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

      <FeatureGrid
        title="Step into the world of CTR"
        tiles={featureTiles}
      />

      {/* Services */}
      <Box as="section" id="services" py={sectionPyLg} bg="dark.800">
        <Container maxW="1440px">
          <Grid templateColumns={{ base: '1fr', lg: '1fr 2fr' }} gap={{ base: 10, lg: 20 }}>
            <VStack align="flex-start" spacing={5} maxW="28rem">
              <Heading fontSize="display-md" fontWeight="400">
                Design services across scale
              </Heading>
              <Text variant="body" maxW="none">
                From early feasibility through construction administration, we lead
                architecture, infrastructure, and planning with one integrated team.
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
          <Grid
            templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
            gap={{ base: 10, lg: 20 }}
            alignItems="center"
          >
            <MotionBox
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true }}
            >
              <Box position="relative" overflow="hidden">
                <Image
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=80"
                  alt="CTR Infrastructure team"
                  objectFit="cover"
                  w="full"
                  h={{ base: '360px', md: '520px' }}
                />
              </Box>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true }}
            >
              <VStack align="flex-start" spacing={6}>
                <Heading fontSize="display-md" fontWeight="400">
                  Shaping skylines since 1999
                </Heading>
                <Text variant="lead" maxW="none">
                  For more than twenty-five years, CTR Infrastructure has delivered
                  civic, commercial, and cultural work across Canada.
                </Text>
                <Text variant="body" maxW="none">
                  We begin every commission by understanding site, program, and context.
                  The result is architecture that reads clearly at street level and holds
                  up over decades of use.
                </Text>
                <HStack spacing={10} pt={2}>
                  <VStack align="flex-start" spacing={1}>
                    <Text variant="stat" fontSize="2xl">85+</Text>
                    <Text variant="caption">Team members</Text>
                  </VStack>
                  <VStack align="flex-start" spacing={1}>
                    <Text variant="stat" fontSize="2xl">$2.1B</Text>
                    <Text variant="caption">Built project value</Text>
                  </VStack>
                </HStack>
                <LearnMoreLink href="/#contact">Meet the team</LearnMoreLink>
              </VStack>
            </MotionBox>
          </Grid>
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
                <Text variant="caption" mb={4}>Get in touch</Text>
                <Heading fontSize="display-md" fontWeight="400">
                  Let&apos;s create together
                </Heading>
              </Box>

              <VStack align="flex-start" spacing={6}>
                {[
                  {
                    icon: FiMapPin,
                    label: 'Headquarters',
                    lines: ['1200 Main Street, Suite 500', 'Vancouver, BC V6B 4Y8'],
                  },
                  {
                    icon: FiMail,
                    label: 'Email',
                    lines: ['hello@ctrinfrastructure.com'],
                    href: 'mailto:hello@ctrinfrastructure.com',
                  },
                  {
                    icon: FiPhone,
                    label: 'Phone',
                    lines: ['+1 (604) 555-1234'],
                    href: 'tel:+16045551234',
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
