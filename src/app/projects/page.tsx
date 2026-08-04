'use client';

import {
  Box,
  Container,
  Grid,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  Image,
  Button,
} from '@chakra-ui/react';
import { motion, useReducedMotion } from 'framer-motion';
import { FiArrowUpRight, FiMapPin } from 'react-icons/fi';
import NextLink from 'next/link';
import { SiteHeader } from '@/components/SiteHeader';
import { Reveal } from '@/components/Reveal';
import { heroStagger, heroItem, staggerContainer, staggerItem, viewportOnce } from '@/lib/motion';

const MotionBox = motion(Box);
const MotionGrid = motion(Grid);
const MotionVStack = motion(VStack);

// All Projects Data
const allProjects = [
  {
    id: 1,
    title: 'Aurora Tower',
    category: 'Commercial',
    location: 'Vancouver, BC',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    description: 'A 45-story mixed-use development featuring sustainable design principles and LEED Platinum certification.',
    featured: true,
  },
  {
    id: 2,
    title: 'Riverside Residence',
    category: 'Residential',
    location: 'Toronto, ON',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    description: 'Contemporary waterfront home with panoramic city views and integrated smart home technology.',
    featured: true,
  },
  {
    id: 3,
    title: 'Heritage Bridge',
    category: 'Infrastructure',
    location: 'Montreal, QC',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=800&q=80',
    description: 'Iconic pedestrian bridge connecting historic and modern districts with innovative cable-stayed design.',
    featured: true,
  },
  {
    id: 4,
    title: 'The Glass Pavilion',
    category: 'Cultural',
    location: 'Calgary, AB',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&q=80',
    description: 'Award-winning arts center with innovative structural glazing and acoustic engineering.',
    featured: true,
  },
  {
    id: 5,
    title: 'Metro Central Station',
    category: 'Infrastructure',
    location: 'Edmonton, AB',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80',
    description: 'Modern transit hub serving 50,000 daily passengers with sustainable energy systems.',
    featured: false,
  },
  {
    id: 6,
    title: 'Harmony Towers',
    category: 'Residential',
    location: 'Vancouver, BC',
    year: '2022',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    description: 'Twin residential towers with shared amenity spaces and rooftop gardens.',
    featured: false,
  },
  {
    id: 7,
    title: 'Innovation Campus',
    category: 'Commercial',
    location: 'Waterloo, ON',
    year: '2022',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    description: 'Tech company headquarters featuring collaborative workspaces and biophilic design.',
    featured: false,
  },
  {
    id: 8,
    title: 'Sunset Marina',
    category: 'Mixed-Use',
    location: 'Victoria, BC',
    year: '2021',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80',
    description: 'Waterfront development combining retail, dining, and recreational boating facilities.',
    featured: false,
  },
];

const categories = ['All', 'Commercial', 'Residential', 'Infrastructure', 'Cultural', 'Mixed-Use'];

export default function ProjectsPage() {
  const reducedMotion = useReducedMotion();

  return (
    <Box as="main" bg="dark.800" minH="100dvh">
      <Box className="grain-overlay" />
      <SiteHeader ctaHref="/#contact" />

      <Box pt={{ base: 28, md: 36 }} pb={{ base: 16, md: 24 }}>
        <Container maxW="container.xl">
          <Reveal mb={8}>
            <NextLink href="/" passHref>
              <Button
                variant="ghost"
                size="sm"
                minH="44px"
                color="dark.200"
                _hover={{ color: 'brand.300' }}
                pl={0}
              >
                ← Back to home
              </Button>
            </NextLink>
          </Reveal>

          <MotionVStack
            align="flex-start"
            spacing={6}
            maxW="36rem"
            variants={heroStagger}
            initial={reducedMotion ? false : 'hidden'}
            animate="visible"
            mb={12}
          >
            <MotionBox variants={heroItem}>
              <Text variant="eyebrow">Our work</Text>
            </MotionBox>
            <MotionBox variants={heroItem}>
              <Heading fontSize="display-lg" fontWeight="400" lineHeight="1.05">
                Project portfolio
              </Heading>
            </MotionBox>
            <MotionBox variants={heroItem}>
              <Text variant="lead" maxW="none">
                Award-winning architecture and infrastructure across commercial,
                residential, and public sectors.
              </Text>
            </MotionBox>
          </MotionVStack>

          <Reveal>
            <HStack spacing={3} flexWrap="wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant="outline"
                  size="sm"
                  minH="44px"
                  borderColor={category === 'All' ? 'brand.500' : 'whiteAlpha.200'}
                  color={category === 'All' ? 'brand.300' : 'dark.200'}
                  _hover={{ borderColor: 'brand.400', color: 'brand.200' }}
                >
                  {category}
                </Button>
              ))}
            </HStack>
          </Reveal>
        </Container>
      </Box>

      <Box pb={{ base: 20, md: 32 }}>
        <Container maxW="container.xl">
          <MotionGrid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
            gap={8}
            variants={staggerContainer}
            initial={reducedMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={viewportOnce}
          >
            {allProjects.map((project) => (
              <MotionBox
                key={project.id}
                variants={staggerItem}
                position="relative"
                role="group"
                cursor="pointer"
                whileHover={reducedMotion ? undefined : { y: -5 }}
              >
                <Box position="relative" overflow="hidden" aspectRatio={4 / 3}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    objectFit="cover"
                    w="full"
                    h="full"
                    transition="transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)"
                    _groupHover={{ transform: 'scale(1.04)' }}
                  />
                  <Box
                    position="absolute"
                    inset={0}
                    bg="linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.3) 50%, transparent 100%)"
                  />

                  {project.featured && (
                    <Box
                      position="absolute"
                      top={4}
                      left={4}
                      px={3}
                      py={1}
                      bg="brand.600"
                      color="white"
                      fontSize="xs"
                      fontWeight="600"
                      letterSpacing="0.08em"
                    >
                      Featured
                    </Box>
                  )}

                  <Icon
                    as={FiArrowUpRight}
                    position="absolute"
                    top={4}
                    right={4}
                    boxSize={6}
                    color="white"
                    opacity={0}
                    transform="translateY(10px)"
                    _groupHover={{ opacity: 1, transform: 'translateY(0)' }}
                    transition="all 0.25s ease-out"
                  />
                </Box>

                <Box p={6} bg="dark.700">
                  <HStack spacing={4} mb={3}>
                    <Text variant="eyebrow" fontSize="2xs">
                      {project.category}
                    </Text>
                    <Text fontSize="xs" color="dark.300" sx={{ fontVariantNumeric: 'tabular-nums' }}>
                      {project.year}
                    </Text>
                  </HStack>

                  <Heading
                    fontSize="xl"
                    fontWeight="400"
                    mb={2}
                    _groupHover={{ color: 'brand.300' }}
                    transition="color 0.25s"
                  >
                    {project.title}
                  </Heading>

                  <Text fontSize="sm" color="dark.200" mb={4} noOfLines={2} lineHeight="1.7">
                    {project.description}
                  </Text>

                  <HStack color="dark.300" fontSize="sm">
                    <Icon as={FiMapPin} />
                    <Text>{project.location}</Text>
                  </HStack>
                </Box>
              </MotionBox>
            ))}
          </MotionGrid>
        </Container>
      </Box>

      <Reveal>
        <Box py={{ base: 16, md: 24 }} bg="dark.50" color="dark.900">
          <Container maxW="container.xl" textAlign="center">
            <VStack spacing={6} maxW="36rem" mx="auto">
              <Text variant="eyebrow" color="brand.600">New work</Text>
              <Heading fontSize="display-md" fontWeight="400" color="dark.900">
                Have a project in mind?
              </Heading>
              <Text color="dark.400" lineHeight="1.8" fontWeight="300">
                Share your brief and we will outline scope, team, and timeline within
                two business days.
              </Text>
              <NextLink href="/#contact" passHref>
                <Button
                  size="lg"
                  minH="48px"
                  bg="dark.900"
                  color="dark.50"
                  _hover={{ bg: 'dark.700', transform: 'translateY(-1px)' }}
                >
                  Start a conversation
                </Button>
              </NextLink>
            </VStack>
          </Container>
        </Box>
      </Reveal>
    </Box>
  );
}
