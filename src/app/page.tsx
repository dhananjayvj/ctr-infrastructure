'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Icon,
  Link,
  Image,
  SimpleGrid,
} from '@chakra-ui/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowRight, FiArrowUpRight, FiMapPin, FiMail, FiPhone } from 'react-icons/fi';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

// Featured Projects Data
const featuredProjects = [
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

// Services Data
const services = [
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
    description: 'Thoughtful interior architecture that elevates the human experience.',
  },
];

// Stats Data
const stats = [
  { number: '150+', label: 'Projects Completed' },
  { number: '25', label: 'Years Experience' },
  { number: '40+', label: 'Awards Won' },
  { number: '12', label: 'Countries' },
];

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Box>
      {/* Grain Overlay */}
      <Box className="grain-overlay" />

      {/* Navigation */}
      <Box
        as="header"
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={100}
        bg="rgba(20, 24, 32, 0.88)"
        backdropFilter="blur(12px)"
        borderBottom="1px solid"
        borderColor="whiteAlpha.100"
      >
        <Container maxW="container.xl">
          <Flex h="80px" align="center" justify="space-between">
            <Link href="/" _hover={{ textDecoration: 'none' }}>
              <HStack spacing={3}>
                <Box
                  w="40px"
                  h="40px"
                  bg="brand.500"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontFamily="heading"
                  fontSize="xl"
                  fontWeight="600"
                  color="white"
                >
                  C
                </Box>
                <Text
                  fontFamily="heading"
                  fontSize="xl"
                  fontWeight="500"
                  letterSpacing="0.05em"
                >
                  CTR Infrastructure
                </Text>
              </HStack>
            </Link>

            <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
              {['Projects', 'Services', 'About', 'Contact'].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  fontSize="sm"
                  fontWeight="400"
                  letterSpacing="0.1em"
                  textTransform="uppercase"
                  color="dark.100"
                  _hover={{ color: 'brand.500' }}
                  transition="color 0.3s"
                >
                  {item}
                </Link>
              ))}
            </HStack>

            <Button
              variant="outline"
              size="sm"
              display={{ base: 'none', lg: 'flex' }}
              rightIcon={<FiArrowRight />}
            >
              Start a Project
            </Button>
          </Flex>
        </Container>
      </Box>

      {/* Hero Section */}
      <Box
        as="section"
        position="relative"
        h="100vh"
        minH="700px"
        overflow="hidden"
      >
        <MotionBox
          position="absolute"
          inset={0}
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          <Box
            position="absolute"
            inset={0}
            bgImage="url('https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1920&q=80')"
            bgSize="cover"
            bgPosition="center"
            filter="brightness(0.4)"
          />
        </MotionBox>

        <Container maxW="container.xl" h="full" position="relative" zIndex={1}>
          <Flex
            h="full"
            align="center"
            pt="80px"
          >
            <VStack align="flex-start" spacing={8} maxW="900px">
              <MotionText
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                fontSize="sm"
                fontWeight="500"
                letterSpacing="0.3em"
                textTransform="uppercase"
                color="brand.500"
              >
                Architecture • Infrastructure • Design
              </MotionText>

              <MotionHeading
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                as="h1"
                fontSize={{ base: '4xl', md: '6xl', lg: '7xl' }}
                fontWeight="400"
                lineHeight="1"
                color="white"
              >
                Building Tomorrow&apos;s
                <Box as="span" display="block" color="brand.400" mt={2}>
                  Landmarks Today
                </Box>
              </MotionHeading>

              <MotionText
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                fontSize={{ base: 'lg', md: 'xl' }}
                color="dark.100"
                maxW="600px"
                lineHeight="1.8"
              >
                We are a multidisciplinary architecture and infrastructure firm 
                dedicated to creating spaces that define cities and inspire communities.
              </MotionText>

              <MotionFlex
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                gap={4}
                pt={4}
              >
                <Button
                  size="lg"
                  bg="brand.600"
                  color="white"
                  _hover={{ bg: 'brand.500' }}
                  rightIcon={<FiArrowRight />}
                >
                  View Projects
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  borderColor="whiteAlpha.300"
                  _hover={{ bg: 'whiteAlpha.100' }}
                >
                  Our Story
                </Button>
              </MotionFlex>
            </VStack>
          </Flex>

          {/* Scroll Indicator */}
          <MotionBox
            position="absolute"
            bottom={10}
            left="50%"
            transform="translateX(-50%)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <VStack spacing={2}>
              <Text fontSize="xs" letterSpacing="0.2em" textTransform="uppercase" color="dark.100">
                Scroll
              </Text>
              <Box
                w="1px"
                h="60px"
                bg="linear-gradient(to bottom, var(--chakra-colors-brand-500), transparent)"
              />
            </VStack>
          </MotionBox>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box py={20} borderY="1px solid" borderColor="whiteAlpha.100">
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={8}>
            {stats.map((stat, index) => (
              <MotionBox
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                textAlign="center"
              >
                <Text
                  fontFamily="heading"
                  fontSize={{ base: '4xl', md: '5xl' }}
                  fontWeight="400"
                  color="brand.500"
                >
                  {stat.number}
                </Text>
                <Text
                  fontSize="sm"
                  letterSpacing="0.1em"
                  textTransform="uppercase"
                  color="dark.100"
                  mt={2}
                >
                  {stat.label}
                </Text>
              </MotionBox>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Featured Projects Section */}
      <Box as="section" id="projects" py={{ base: 20, md: 32 }}>
        <Container maxW="container.xl">
          <Flex
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
            align={{ base: 'flex-start', md: 'flex-end' }}
            mb={16}
            gap={6}
          >
            <VStack align="flex-start" spacing={4}>
              <Text
                fontSize="sm"
                fontWeight="500"
                letterSpacing="0.3em"
                textTransform="uppercase"
                color="brand.500"
              >
                Portfolio
              </Text>
              <Heading
                fontSize={{ base: '3xl', md: '5xl' }}
                fontWeight="400"
              >
                Featured Projects
              </Heading>
            </VStack>

            <Button
              variant="outline"
              rightIcon={<FiArrowRight />}
              borderColor="whiteAlpha.200"
              _hover={{ borderColor: 'brand.500', color: 'brand.500' }}
            >
              View All Projects
            </Button>
          </Flex>

          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
            gap={8}
          >
            {featuredProjects.map((project, index) => (
              <MotionBox
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                position="relative"
                role="group"
                cursor="pointer"
              >
                <Box
                  position="relative"
                  overflow="hidden"
                  aspectRatio={index === 0 || index === 3 ? 16/10 : 16/12}
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
                    bg="linear-gradient(to top, rgba(10,10,10,0.9) 0%, transparent 50%)"
                  />
                </Box>

                <Box
                  position="absolute"
                  bottom={0}
                  left={0}
                  right={0}
                  p={8}
                >
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
                    <Text fontSize="xs" color="dark.100">
                      {project.year}
                    </Text>
                  </HStack>

                  <Heading
                    fontSize={{ base: 'xl', md: '2xl' }}
                    fontWeight="400"
                    mb={2}
                    _groupHover={{ color: 'brand.400' }}
                    transition="color 0.3s"
                  >
                    {project.title}
                  </Heading>

                  <HStack color="dark.100" fontSize="sm">
                    <Icon as={FiMapPin} />
                    <Text>{project.location}</Text>
                  </HStack>

                  <Icon
                    as={FiArrowUpRight}
                    position="absolute"
                    top={8}
                    right={8}
                    boxSize={6}
                    color="white"
                    opacity={0}
                    transform="translateY(10px)"
                    _groupHover={{ opacity: 1, transform: 'translateY(0)' }}
                    transition="all 0.3s"
                  />
                </Box>
              </MotionBox>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Services Section */}
      <Box
        as="section"
        id="services"
        py={{ base: 20, md: 32 }}
        bg="dark.700"
      >
        <Container maxW="container.xl">
          <Grid
            templateColumns={{ base: '1fr', lg: '1fr 2fr' }}
            gap={{ base: 12, lg: 20 }}
          >
            <VStack align="flex-start" spacing={6}>
              <Text
                fontSize="sm"
                fontWeight="500"
                letterSpacing="0.3em"
                textTransform="uppercase"
                color="brand.500"
              >
                What We Do
              </Text>
              <Heading
                fontSize={{ base: '3xl', md: '4xl' }}
                fontWeight="400"
              >
                Comprehensive Design Services
              </Heading>
              <Text color="dark.100" lineHeight="1.8">
                From initial concept through construction administration, 
                we provide full-spectrum architectural and infrastructure 
                services tailored to each project&apos;s unique requirements.
              </Text>
              <Button
                variant="outline"
                rightIcon={<FiArrowRight />}
                borderColor="whiteAlpha.200"
                mt={4}
              >
                Learn More
              </Button>
            </VStack>

            <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)' }} gap={6}>
              {services.map((service, index) => (
                <MotionBox
                  key={service.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  p={8}
                  bg="dark.600"
                  border="1px solid"
                  borderColor="whiteAlpha.100"
                  _hover={{ borderColor: 'brand.500' }}
                  cursor="pointer"
                  role="group"
                >
                  <Text
                    fontFamily="heading"
                    fontSize="4xl"
                    color="brand.500"
                    mb={4}
                  >
                    {service.number}
                  </Text>
                  <Heading
                    fontSize="xl"
                    fontWeight="500"
                    mb={3}
                    _groupHover={{ color: 'brand.400' }}
                    transition="color 0.3s"
                  >
                    {service.title}
                  </Heading>
                  <Text fontSize="sm" color="dark.100" lineHeight="1.7">
                    {service.description}
                  </Text>
                </MotionBox>
              ))}
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* About Section */}
      <Box as="section" id="about" py={{ base: 20, md: 32 }}>
        <Container maxW="container.xl">
          <Grid
            templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
            gap={{ base: 12, lg: 20 }}
            alignItems="center"
          >
            <MotionBox
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Box position="relative">
                <Image
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80"
                  alt="CTR Infrastructure Team"
                  objectFit="cover"
                  w="full"
                  h={{ base: '400px', md: '600px' }}
                />
                <Box
                  position="absolute"
                  bottom={-6}
                  right={-6}
                  w="200px"
                  h="200px"
                  border="1px solid"
                  borderColor="brand.500"
                  display={{ base: 'none', md: 'block' }}
                />
              </Box>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <VStack align="flex-start" spacing={6}>
                <Text
                  fontSize="sm"
                  fontWeight="500"
                  letterSpacing="0.3em"
                  textTransform="uppercase"
                  color="brand.500"
                >
                  Our Story
                </Text>
                <Heading
                  fontSize={{ base: '3xl', md: '4xl' }}
                  fontWeight="400"
                >
                  Shaping Skylines Since 1999
                </Heading>
                <Text color="dark.100" lineHeight="1.8" fontSize="lg">
                  For over two decades, CTR Infrastructure has been at the forefront 
                  of architectural innovation. Our multidisciplinary team brings together 
                  architects, engineers, and designers who share a common passion for 
                  creating spaces that transcend expectations.
                </Text>
                <Text color="dark.100" lineHeight="1.8">
                  We believe that great architecture is born from deep understanding—of 
                  place, purpose, and the people who will inhabit our creations. Every 
                  project begins with listening and culminates in spaces that tell 
                  meaningful stories.
                </Text>
                <HStack spacing={8} pt={4}>
                  <VStack align="flex-start" spacing={1}>
                    <Text fontFamily="heading" fontSize="3xl" color="brand.500">
                      85+
                    </Text>
                    <Text fontSize="sm" color="dark.100" textTransform="uppercase" letterSpacing="0.1em">
                      Team Members
                    </Text>
                  </VStack>
                  <VStack align="flex-start" spacing={1}>
                    <Text fontFamily="heading" fontSize="3xl" color="brand.500">
                      $2B+
                    </Text>
                    <Text fontSize="sm" color="dark.100" textTransform="uppercase" letterSpacing="0.1em">
                      Project Value
                    </Text>
                  </VStack>
                </HStack>
                <Button
                  variant="outline"
                  rightIcon={<FiArrowRight />}
                  borderColor="whiteAlpha.200"
                  mt={4}
                >
                  Meet Our Team
                </Button>
              </VStack>
            </MotionBox>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        as="section"
        py={{ base: 20, md: 32 }}
        bg="dark.50"
        color="dark.900"
        borderY="1px solid"
        borderColor="blackAlpha.100"
      >
        <Container maxW="container.xl" textAlign="center">
          <VStack spacing={8} maxW="800px" mx="auto">
            <Heading
              fontSize={{ base: '3xl', md: '5xl' }}
              fontWeight="400"
              color="dark.900"
            >
              Ready to Build Something Extraordinary?
            </Heading>
            <Text fontSize="lg" color="dark.400" maxW="600px" lineHeight="1.8">
              Let&apos;s discuss how we can bring your vision to life. 
              Our team is ready to transform your ideas into architectural reality.
            </Text>
            <Button
              size="lg"
              bg="dark.900"
              color="dark.50"
              _hover={{ bg: 'dark.700', color: 'white' }}
              rightIcon={<FiArrowRight />}
            >
              Start Your Project
            </Button>
          </VStack>
        </Container>
      </Box>

      {/* Contact Section */}
      <Box as="section" id="contact" py={{ base: 20, md: 32 }}>
        <Container maxW="container.xl">
          <Grid
            templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
            gap={{ base: 12, lg: 20 }}
          >
            <VStack align="flex-start" spacing={8}>
              <Box>
                <Text
                  fontSize="sm"
                  fontWeight="500"
                  letterSpacing="0.3em"
                  textTransform="uppercase"
                  color="brand.500"
                  mb={4}
                >
                  Get In Touch
                </Text>
                <Heading
                  fontSize={{ base: '3xl', md: '4xl' }}
                  fontWeight="400"
                >
                  Let&apos;s Create Together
                </Heading>
              </Box>

              <VStack align="flex-start" spacing={6} pt={4}>
                <HStack spacing={4}>
                  <Box
                    w="50px"
                    h="50px"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Icon as={FiMapPin} color="brand.500" />
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="dark.100" mb={1}>
                      Headquarters
                    </Text>
                    <Text>1200 Main Street, Suite 500</Text>
                    <Text>Vancouver, BC V6B 4Y8</Text>
                  </Box>
                </HStack>

                <HStack spacing={4}>
                  <Box
                    w="50px"
                    h="50px"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Icon as={FiMail} color="brand.500" />
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="dark.100" mb={1}>
                      Email
                    </Text>
                    <Link href="mailto:hello@ctrinfrastructure.com" _hover={{ color: 'brand.500' }}>
                      hello@ctrinfrastructure.com
                    </Link>
                  </Box>
                </HStack>

                <HStack spacing={4}>
                  <Box
                    w="50px"
                    h="50px"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Icon as={FiPhone} color="brand.500" />
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="dark.100" mb={1}>
                      Phone
                    </Text>
                    <Link href="tel:+16045551234" _hover={{ color: 'brand.500' }}>
                      +1 (604) 555-1234
                    </Link>
                  </Box>
                </HStack>
              </VStack>
            </VStack>

            <Box
              as="form"
              p={10}
              bg="dark.700"
              border="1px solid"
              borderColor="whiteAlpha.100"
            >
              <VStack spacing={6}>
                <SimpleGrid columns={2} spacing={4} w="full">
                  <Box>
                    <Text fontSize="sm" mb={2} color="dark.100">First Name</Text>
                    <Box
                      as="input"
                      w="full"
                      p={4}
                      bg="transparent"
                      border="1px solid"
                      borderColor="whiteAlpha.200"
                      color="white"
                      _focus={{ borderColor: 'brand.500', outline: 'none' }}
                      placeholder="John"
                    />
                  </Box>
                  <Box>
                    <Text fontSize="sm" mb={2} color="dark.100">Last Name</Text>
                    <Box
                      as="input"
                      w="full"
                      p={4}
                      bg="transparent"
                      border="1px solid"
                      borderColor="whiteAlpha.200"
                      color="white"
                      _focus={{ borderColor: 'brand.500', outline: 'none' }}
                      placeholder="Doe"
                    />
                  </Box>
                </SimpleGrid>

                <Box w="full">
                  <Text fontSize="sm" mb={2} color="dark.100">Email</Text>
                  <Box
                    as="input"
                    type="email"
                    w="full"
                    p={4}
                    bg="transparent"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    color="white"
                    _focus={{ borderColor: 'brand.500', outline: 'none' }}
                    placeholder="john@example.com"
                  />
                </Box>

                <Box w="full">
                  <Text fontSize="sm" mb={2} color="dark.100">Project Type</Text>
                  <Box
                    as="select"
                    w="full"
                    p={4}
                    bg="transparent"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    color="white"
                    _focus={{ borderColor: 'brand.500', outline: 'none' }}
                  >
                    <option value="" style={{ background: '#141414' }}>Select a project type</option>
                    <option value="commercial" style={{ background: '#141414' }}>Commercial</option>
                    <option value="residential" style={{ background: '#141414' }}>Residential</option>
                    <option value="infrastructure" style={{ background: '#141414' }}>Infrastructure</option>
                    <option value="cultural" style={{ background: '#141414' }}>Cultural</option>
                  </Box>
                </Box>

                <Box w="full">
                  <Text fontSize="sm" mb={2} color="dark.100">Message</Text>
                  <Box
                    as="textarea"
                    w="full"
                    p={4}
                    h="150px"
                    bg="transparent"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    color="white"
                    _focus={{ borderColor: 'brand.500', outline: 'none' }}
                    placeholder="Tell us about your project..."
                    resize="none"
                  />
                </Box>

                <Button
                  w="full"
                  size="lg"
                  bg="brand.600"
                  color="white"
                  _hover={{ bg: 'brand.500' }}
                  rightIcon={<FiArrowRight />}
                >
                  Send Message
                </Button>
              </VStack>
            </Box>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        as="footer"
        py={16}
        borderTop="1px solid"
        borderColor="whiteAlpha.100"
        bg="dark.800"
      >
        <Container maxW="container.xl">
          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }}
            gap={12}
            mb={16}
          >
            <VStack align="flex-start" spacing={6}>
              <HStack spacing={3}>
                <Box
                  w="40px"
                  h="40px"
                  bg="brand.500"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontFamily="heading"
                  fontSize="xl"
                  fontWeight="600"
                  color="white"
                >
                  C
                </Box>
                <Text fontFamily="heading" fontSize="lg" fontWeight="500">
                  CTR Infrastructure
                </Text>
              </HStack>
              <Text fontSize="sm" color="dark.100" lineHeight="1.8">
                Creating extraordinary spaces that inspire and endure for generations.
              </Text>
            </VStack>

            <VStack align="flex-start" spacing={4}>
              <Text fontWeight="500" letterSpacing="0.1em" textTransform="uppercase" fontSize="sm">
                Navigation
              </Text>
              {['Projects', 'Services', 'About', 'Careers', 'Contact'].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  fontSize="sm"
                  color="dark.100"
                  _hover={{ color: 'brand.500' }}
                >
                  {item}
                </Link>
              ))}
            </VStack>

            <VStack align="flex-start" spacing={4}>
              <Text fontWeight="500" letterSpacing="0.1em" textTransform="uppercase" fontSize="sm">
                Services
              </Text>
              {['Architecture', 'Infrastructure', 'Urban Planning', 'Interior Design', 'Consulting'].map((item) => (
                <Link
                  key={item}
                  href="#services"
                  fontSize="sm"
                  color="dark.100"
                  _hover={{ color: 'brand.500' }}
                >
                  {item}
                </Link>
              ))}
            </VStack>

            <VStack align="flex-start" spacing={4}>
              <Text fontWeight="500" letterSpacing="0.1em" textTransform="uppercase" fontSize="sm">
                Connect
              </Text>
              {['LinkedIn', 'Instagram', 'Twitter', 'Behance'].map((item) => (
                <Link
                  key={item}
                  href="#"
                  fontSize="sm"
                  color="dark.100"
                  _hover={{ color: 'brand.500' }}
                >
                  {item}
                </Link>
              ))}
            </VStack>
          </Grid>

          <Box
            pt={8}
            borderTop="1px solid"
            borderColor="whiteAlpha.100"
          >
            <Flex
              direction={{ base: 'column', md: 'row' }}
              justify="space-between"
              align="center"
              gap={4}
            >
              <Text fontSize="sm" color="dark.100">
                © 2024 CTR Infrastructure. All rights reserved.
              </Text>
              <HStack spacing={6}>
                <Link href="#" fontSize="sm" color="dark.100" _hover={{ color: 'brand.500' }}>
                  Privacy Policy
                </Link>
                <Link href="#" fontSize="sm" color="dark.100" _hover={{ color: 'brand.500' }}>
                  Terms of Service
                </Link>
              </HStack>
            </Flex>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
