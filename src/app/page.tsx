'use client';

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
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { FiArrowRight, FiArrowUpRight, FiMapPin, FiMail, FiPhone } from 'react-icons/fi';
import { SiteHeader } from '@/components/SiteHeader';
import { Reveal } from '@/components/Reveal';
import {
  heroStagger,
  heroItem,
  staggerContainer,
  staggerItem,
  safeTransition,
  viewportOnce,
} from '@/lib/motion';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionGrid = motion(Grid);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionVStack = motion(VStack);

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
    description: 'Interior environments shaped by materiality, light, and proportion.',
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
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0.4]);
  const heroScale = useTransform(scrollYProgress, [0, 0.25], [1, 1.08]);
  const scrollLineY = useTransform(scrollYProgress, [0, 0.15], [0, 24]);

  return (
    <Box as="main">
      <Box className="grain-overlay" />

      <SiteHeader />

      {/* Hero Section */}
      <Box
        as="section"
        position="relative"
        minH={{ base: '700px', md: '100dvh' }}
        overflow="hidden"
      >
        <MotionBox
          position="absolute"
          inset={0}
          style={
            reducedMotion
              ? undefined
              : { opacity: heroOpacity, scale: heroScale }
          }
        >
          <Box
            position="absolute"
            inset={0}
            bgImage="url('https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1920&q=80')"
            bgSize="cover"
            bgPosition="center"
            filter="brightness(0.35)"
          />
          <Box
            position="absolute"
            inset={0}
            bgGradient="linear(to-r, rgba(16,19,25,0.92) 0%, rgba(16,19,25,0.55) 55%, rgba(16,19,25,0.25) 100%)"
          />
        </MotionBox>

        <Container maxW="container.xl" h="full" position="relative" zIndex={1}>
          <Flex
            h="full"
            align="center"
            pt="80px"
          >
            <MotionVStack
              align="flex-start"
              spacing={8}
              maxW="900px"
              variants={heroStagger}
              initial={reducedMotion ? false : 'hidden'}
              animate="visible"
            >
              <MotionText variant="eyebrow" variants={heroItem}>
                Architecture · Infrastructure · Design
              </MotionText>

              <MotionHeading
                as="h1"
                fontSize="display-xl"
                fontWeight="400"
                lineHeight="0.95"
                letterSpacing="-0.04em"
                color="dark.50"
                variants={heroItem}
              >
                Building tomorrow&apos;s
                <Box as="span" display="block" color="brand.300" mt={3}>
                  landmarks today
                </Box>
              </MotionHeading>

              <MotionText
                variant="lead"
                color="dark.100"
                maxW="36rem"
                variants={heroItem}
              >
                A multidisciplinary studio designing buildings, infrastructure, and public
                spaces with clarity, restraint, and long-term civic value.
              </MotionText>

              <MotionFlex gap={4} pt={4} variants={heroItem}>
                <Button
                  as="a"
                  href="#projects"
                  size="lg"
                  bg="brand.600"
                  color="white"
                  _hover={{ bg: 'brand.500', transform: 'translateY(-1px)' }}
                  rightIcon={<FiArrowRight />}
                >
                  View projects
                </Button>
                <Button
                  as="a"
                  href="#about"
                  size="lg"
                  variant="outline"
                  borderColor="whiteAlpha.400"
                  color="dark.50"
                  _hover={{ bg: 'whiteAlpha.100', borderColor: 'whiteAlpha.600' }}
                >
                  Our story
                </Button>
              </MotionFlex>
            </MotionVStack>
          </Flex>

          {/* Scroll Indicator */}
          <MotionBox
            position="absolute"
            bottom={10}
            left="50%"
            style={{ x: '-50%' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={safeTransition(reducedMotion, { duration: 0.6, delay: 0.9 })}
          >
            <VStack spacing={2} align="center">
              <Text fontSize="xs" letterSpacing="0.18em" textTransform="uppercase" color="dark.200">
                Scroll
              </Text>
              <MotionBox
                w="1px"
                h="60px"
                bg="linear-gradient(to bottom, var(--chakra-colors-brand-400), transparent)"
                style={reducedMotion ? undefined : { y: scrollLineY }}
              />
            </VStack>
          </MotionBox>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box py={{ base: 16, md: 24 }} borderY="1px solid" borderColor="whiteAlpha.100" bg="dark.900">
        <Container maxW="container.xl">
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
                textAlign={{ base: 'center', md: 'left' }}
                borderLeft={{ base: 'none', md: '2px solid' }}
                borderColor={{ base: 'transparent', md: 'brand.600' }}
                pl={{ base: 0, md: 6 }}
              >
                <Text variant="stat">
                  {stat.number}
                </Text>
                <Text variant="caption" mt={3}>
                  {stat.label}
                </Text>
              </MotionBox>
            ))}
          </SimpleGrid>
          </MotionBox>
        </Container>
      </Box>

      {/* Featured Projects Section */}
      <Box as="section" id="projects" py={{ base: 20, md: 32 }}>
        <Container maxW="container.xl">
          <Reveal mb={16}>
            <Flex
              direction={{ base: 'column', md: 'row' }}
              justify="space-between"
              align={{ base: 'flex-start', md: 'flex-end' }}
              gap={6}
            >
              <VStack align="flex-start" spacing={4} maxW="32rem">
                <Text variant="eyebrow">Portfolio</Text>
                <Heading fontSize="display-md" fontWeight="400">
                  Featured projects
                </Heading>
              </VStack>

              <Button
                as="a"
                href="/projects"
                variant="outline"
                rightIcon={<FiArrowRight />}
                borderColor="whiteAlpha.200"
                _hover={{ borderColor: 'brand.400', color: 'brand.300' }}
              >
                View all projects
              </Button>
            </Flex>
          </Reveal>

          <MotionGrid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
            gap={8}
            variants={staggerContainer}
            initial={reducedMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={viewportOnce}
          >
            {featuredProjects.map((project, index) => (
              <MotionBox
                key={project.id}
                variants={staggerItem}
                position="relative"
                role="group"
                cursor="pointer"
                whileHover={reducedMotion ? undefined : { y: -6 }}
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
                    transition="transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)"
                    _groupHover={{ transform: 'scale(1.04)' }}
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
                    <Text variant="eyebrow" fontSize="2xs">
                      {project.category}
                    </Text>
                    <Text fontSize="xs" color="dark.200" sx={{ fontVariantNumeric: 'tabular-nums' }}>
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

                  <HStack color="dark.200" fontSize="sm">
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
          </MotionGrid>
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
            <VStack align="flex-start" spacing={6} maxW="28rem">
              <Text variant="eyebrow">What we do</Text>
              <Heading fontSize="display-md" fontWeight="400">
                Design services across scale
              </Heading>
              <Text variant="body" maxW="none">
                From early feasibility through construction administration, we lead
                architecture, infrastructure, and planning with one integrated team.
              </Text>
              <Button
                as="a"
                href="#contact"
                variant="outline"
                rightIcon={<FiArrowRight />}
                borderColor="whiteAlpha.200"
                mt={2}
              >
                Discuss a project
              </Button>
            </VStack>

            <MotionGrid
              templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)' }}
              gap={6}
              variants={staggerContainer}
              initial={reducedMotion ? false : 'hidden'}
              whileInView="visible"
              viewport={viewportOnce}
            >
              {services.map((service) => (
                <MotionBox
                  key={service.number}
                  variants={staggerItem}
                  p={8}
                  bg="dark.600"
                  border="1px solid"
                  borderColor="whiteAlpha.100"
                  _hover={{
                    borderColor: 'brand.500',
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 40px rgba(16, 19, 25, 0.45)',
                  }}
                  cursor="pointer"
                  role="group"
                >
                  <Text
                    fontFamily="heading"
                    fontSize="4xl"
                    color="brand.500"
                    mb={4}
                    sx={{ fontVariantNumeric: 'tabular-nums' }}
                  >
                    {service.number}
                  </Text>
                  <Heading
                    fontSize="xl"
                    fontWeight="500"
                    mb={3}
                    _groupHover={{ color: 'brand.300' }}
                    transition="color 0.25s"
                  >
                    {service.title}
                  </Heading>
                  <Text fontSize="sm" color="dark.200" lineHeight="1.75">
                    {service.description}
                  </Text>
                </MotionBox>
              ))}
            </MotionGrid>
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
                <Text variant="eyebrow">Our story</Text>
                <Heading fontSize="display-md" fontWeight="400">
                  Shaping skylines since 1999
                </Heading>
                <Text variant="lead" maxW="none" fontSize="lg">
                  For more than twenty-five years, CTR Infrastructure has delivered
                  civic, commercial, and cultural work across Canada — with architects,
                  engineers, and planners working as one studio.
                </Text>
                <Text variant="body" maxW="none">
                  We begin every commission by understanding site, program, and context.
                  The result is architecture that reads clearly at street level and holds
                  up over decades of use.
                </Text>
                <HStack spacing={10} pt={4}>
                  <VStack align="flex-start" spacing={1}>
                    <Text variant="stat" fontSize="3xl">85+</Text>
                    <Text variant="caption">Team members</Text>
                  </VStack>
                  <VStack align="flex-start" spacing={1}>
                    <Text variant="stat" fontSize="3xl">$2.1B</Text>
                    <Text variant="caption">Built project value</Text>
                  </VStack>
                </HStack>
                <Button
                  as="a"
                  href="#contact"
                  variant="outline"
                  rightIcon={<FiArrowRight />}
                  borderColor="whiteAlpha.200"
                  mt={4}
                >
                  Meet the team
                </Button>
              </VStack>
            </MotionBox>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        as="section"
        py={{ base: 20, md: 28 }}
        bg="dark.50"
        color="dark.900"
        borderY="1px solid"
        borderColor="blackAlpha.80"
      >
        <Container maxW="container.xl" textAlign="center">
          <VStack spacing={8} maxW="42rem" mx="auto">
            <Text variant="eyebrow" color="brand.600">
              New commissions
            </Text>
            <Heading
              fontSize="display-md"
              fontWeight="400"
              color="dark.900"
            >
              Start a conversation about your project
            </Heading>
            <Text fontSize="lg" color="dark.400" lineHeight="1.8" fontWeight="300">
              Tell us about your site, timeline, and ambitions. We respond within two
              business days with next steps and the right team members to involve.
            </Text>
            <Button
              as="a"
              href="#contact"
              size="lg"
              bg="dark.900"
              color="dark.50"
              _hover={{ bg: 'dark.700', color: 'white', transform: 'translateY(-1px)' }}
              rightIcon={<FiArrowRight />}
            >
              Start your project
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
                <Text variant="eyebrow" mb={4}>Get in touch</Text>
                <Heading fontSize="display-md" fontWeight="400">
                  Let&apos;s create together
                </Heading>
              </Box>

              <VStack align="flex-start" spacing={6} pt={4}>
                <HStack spacing={4} align="flex-start">
                  <Box
                    w="50px"
                    h="50px"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexShrink={0}
                  >
                    <Icon as={FiMapPin} color="brand.400" />
                  </Box>
                  <Box>
                    <Text variant="caption" mb={1}>Headquarters</Text>
                    <Text color="dark.100">1200 Main Street, Suite 500</Text>
                    <Text color="dark.100">Vancouver, BC V6B 4Y8</Text>
                  </Box>
                </HStack>

                <HStack spacing={4} align="flex-start">
                  <Box
                    w="50px"
                    h="50px"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexShrink={0}
                  >
                    <Icon as={FiMail} color="brand.400" />
                  </Box>
                  <Box>
                    <Text variant="caption" mb={1}>Email</Text>
                    <Link href="mailto:hello@ctrinfrastructure.com" color="dark.50" _hover={{ color: 'brand.300' }}>
                      hello@ctrinfrastructure.com
                    </Link>
                  </Box>
                </HStack>

                <HStack spacing={4} align="flex-start">
                  <Box
                    w="50px"
                    h="50px"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexShrink={0}
                  >
                    <Icon as={FiPhone} color="brand.400" />
                  </Box>
                  <Box>
                    <Text variant="caption" mb={1}>Phone</Text>
                    <Link href="tel:+16045551234" color="dark.50" _hover={{ color: 'brand.300' }}>
                      +1 (604) 555-1234
                    </Link>
                  </Box>
                </HStack>
              </VStack>
            </VStack>

            <Box
              as="form"
              p={{ base: 8, md: 10 }}
              bg="dark.700"
              border="1px solid"
              borderColor="whiteAlpha.120"
            >
              <VStack spacing={6}>
                <SimpleGrid columns={2} spacing={4} w="full">
                  <Box>
                    <Text variant="caption" mb={2}>First name</Text>
                    <Box
                      as="input"
                      w="full"
                      p={4}
                      bg="dark.800"
                      border="1px solid"
                      borderColor="whiteAlpha.200"
                      color="dark.50"
                      transition="border-color 0.2s"
                      _focus={{ borderColor: 'brand.400', outline: 'none', boxShadow: '0 0 0 1px var(--chakra-colors-brand-400)' }}
                      placeholder="Amara"
                    />
                  </Box>
                  <Box>
                    <Text variant="caption" mb={2}>Last name</Text>
                    <Box
                      as="input"
                      w="full"
                      p={4}
                      bg="dark.800"
                      border="1px solid"
                      borderColor="whiteAlpha.200"
                      color="dark.50"
                      transition="border-color 0.2s"
                      _focus={{ borderColor: 'brand.400', outline: 'none', boxShadow: '0 0 0 1px var(--chakra-colors-brand-400)' }}
                      placeholder="Chen"
                    />
                  </Box>
                </SimpleGrid>

                <Box w="full">
                  <Text variant="caption" mb={2}>Email</Text>
                  <Box
                    as="input"
                    type="email"
                    w="full"
                    p={4}
                    bg="dark.800"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    color="dark.50"
                    transition="border-color 0.2s"
                    _focus={{ borderColor: 'brand.400', outline: 'none', boxShadow: '0 0 0 1px var(--chakra-colors-brand-400)' }}
                    placeholder="amara.chen@example.com"
                  />
                </Box>

                <Box w="full">
                  <Text variant="caption" mb={2}>Project type</Text>
                  <Box
                    as="select"
                    w="full"
                    p={4}
                    bg="dark.800"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    color="dark.50"
                    transition="border-color 0.2s"
                    _focus={{ borderColor: 'brand.400', outline: 'none', boxShadow: '0 0 0 1px var(--chakra-colors-brand-400)' }}
                  >
                    <option value="" style={{ background: '#181d25' }}>Select a project type</option>
                    <option value="commercial" style={{ background: '#181d25' }}>Commercial</option>
                    <option value="residential" style={{ background: '#181d25' }}>Residential</option>
                    <option value="infrastructure" style={{ background: '#181d25' }}>Infrastructure</option>
                    <option value="cultural" style={{ background: '#181d25' }}>Cultural</option>
                  </Box>
                </Box>

                <Box w="full">
                  <Text variant="caption" mb={2}>Message</Text>
                  <Box
                    as="textarea"
                    w="full"
                    p={4}
                    h="150px"
                    bg="dark.800"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    color="dark.50"
                    transition="border-color 0.2s"
                    _focus={{ borderColor: 'brand.400', outline: 'none', boxShadow: '0 0 0 1px var(--chakra-colors-brand-400)' }}
                    placeholder="Briefly describe your site, scope, and timeline..."
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
                  Send message
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
              <Text fontSize="sm" color="dark.200" lineHeight="1.8" maxW="16rem">
                Architecture and infrastructure for cities, campuses, and civic life.
              </Text>
            </VStack>

            <VStack align="flex-start" spacing={4}>
              <Text variant="caption" fontWeight="600" color="dark.100">
                Navigation
              </Text>
              {['Projects', 'Services', 'About', 'Contact'].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  fontSize="sm"
                  color="dark.200"
                  _hover={{ color: 'brand.300' }}
                >
                  {item}
                </Link>
              ))}
            </VStack>

            <VStack align="flex-start" spacing={4}>
              <Text variant="caption" fontWeight="600" color="dark.100">
                Services
              </Text>
              {['Architecture', 'Infrastructure', 'Urban planning', 'Interior design'].map((item) => (
                <Link
                  key={item}
                  href="#services"
                  fontSize="sm"
                  color="dark.200"
                  _hover={{ color: 'brand.300' }}
                >
                  {item}
                </Link>
              ))}
            </VStack>

            <VStack align="flex-start" spacing={4}>
              <Text variant="caption" fontWeight="600" color="dark.100">
                Connect
              </Text>
              {['LinkedIn', 'Instagram', 'Behance'].map((item) => (
                <Link
                  key={item}
                  href="#"
                  fontSize="sm"
                  color="dark.200"
                  _hover={{ color: 'brand.300' }}
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
              <Text fontSize="sm" color="dark.300">
                © 2026 CTR Infrastructure. All rights reserved.
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
