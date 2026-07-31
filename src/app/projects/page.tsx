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
  Link,
  Button,
  SimpleGrid,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiMapPin, FiArrowLeft } from 'react-icons/fi';
import NextLink from 'next/link';

const MotionBox = motion(Box);

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
  return (
    <Box bg="dark.800" minH="100vh">
      {/* Grain Overlay */}
      <Box className="grain-overlay" />

      {/* Header */}
      <Box
        pt={{ base: 32, md: 40 }}
        pb={{ base: 16, md: 24 }}
        position="relative"
      >
        <Container maxW="container.xl">
          <NextLink href="/" passHref>
            <Button
              variant="ghost"
              leftIcon={<FiArrowLeft />}
              mb={8}
              color="dark.100"
              _hover={{ color: 'brand.500' }}
            >
              Back to Home
            </Button>
          </NextLink>

          <VStack align="flex-start" spacing={6} maxW="800px">
            <Text
              fontSize="sm"
              fontWeight="500"
              letterSpacing="0.3em"
              textTransform="uppercase"
              color="brand.500"
            >
              Our Work
            </Text>
            <Heading
              fontSize={{ base: '4xl', md: '6xl' }}
              fontWeight="400"
              lineHeight="1.1"
            >
              Featured Projects
            </Heading>
            <Text color="dark.100" fontSize="lg" lineHeight="1.8">
              Explore our portfolio of award-winning architectural and infrastructure 
              projects spanning commercial, residential, and public sectors.
            </Text>
          </VStack>

          {/* Category Filters */}
          <HStack spacing={4} mt={12} flexWrap="wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                size="sm"
                borderColor={category === 'All' ? 'brand.500' : 'whiteAlpha.200'}
                color={category === 'All' ? 'brand.500' : 'dark.100'}
                _hover={{ borderColor: 'brand.500', color: 'brand.500' }}
              >
                {category}
              </Button>
            ))}
          </HStack>
        </Container>
      </Box>

      {/* Projects Grid */}
      <Box pb={{ base: 20, md: 32 }}>
        <Container maxW="container.xl">
          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
            gap={8}
          >
            {allProjects.map((project, index) => (
              <MotionBox
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                position="relative"
                role="group"
                cursor="pointer"
              >
                <Box
                  position="relative"
                  overflow="hidden"
                  aspectRatio={4/3}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    objectFit="cover"
                    w="full"
                    h="full"
                    transition="transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
                    _groupHover={{ transform: 'scale(1.05)' }}
                  />
                  <Box
                    position="absolute"
                    inset={0}
                    bg="linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.3) 50%, transparent 100%)"
                  />

                  {/* Featured Badge */}
                  {project.featured && (
                    <Box
                      position="absolute"
                      top={4}
                      left={4}
                      px={3}
                      py={1}
                      bg="brand.500"
                      color="dark.800"
                      fontSize="xs"
                      fontWeight="600"
                      letterSpacing="0.1em"
                      textTransform="uppercase"
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
                    transition="all 0.3s"
                  />
                </Box>

                <Box p={6} bg="dark.700">
                  <HStack spacing={4} mb={3}>
                    <Text
                      fontSize="xs"
                      fontWeight="500"
                      letterSpacing="0.2em"
                      textTransform="uppercase"
                      color="brand.500"
                    >
                      {project.category}
                    </Text>
                    <Text fontSize="xs" color="dark.200">
                      {project.year}
                    </Text>
                  </HStack>

                  <Heading
                    fontSize="xl"
                    fontWeight="400"
                    mb={2}
                    _groupHover={{ color: 'brand.400' }}
                    transition="color 0.3s"
                  >
                    {project.title}
                  </Heading>

                  <Text fontSize="sm" color="dark.100" mb={4} noOfLines={2}>
                    {project.description}
                  </Text>

                  <HStack color="dark.200" fontSize="sm">
                    <Icon as={FiMapPin} />
                    <Text>{project.location}</Text>
                  </HStack>
                </Box>
              </MotionBox>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box py={{ base: 16, md: 24 }} bg="dark.700">
        <Container maxW="container.xl" textAlign="center">
          <VStack spacing={6}>
            <Heading
              fontSize={{ base: '2xl', md: '4xl' }}
              fontWeight="400"
            >
              Have a Project in Mind?
            </Heading>
            <Text color="dark.100" maxW="500px">
              We&apos;d love to hear about your vision. Let&apos;s discuss how we can bring it to life.
            </Text>
            <NextLink href="/#contact" passHref>
              <Button
                size="lg"
                bg="brand.500"
                color="dark.800"
                _hover={{ bg: 'brand.400' }}
              >
                Start a Conversation
              </Button>
            </NextLink>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
}

