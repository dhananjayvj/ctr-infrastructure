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
} from '@chakra-ui/react';
import { motion, useReducedMotion } from 'framer-motion';
import { FiMapPin } from 'react-icons/fi';
import NextLink from 'next/link';
import { HorizontalStrip } from '@/components/audi/HorizontalStrip';
import { LearnMoreLink } from '@/components/audi/LearnMoreLink';
import { SiteFooter } from '@/components/SiteFooter';
import { projectStrip, featuredProjects } from '@/lib/content';
import { heroStagger, heroItem, staggerContainer, staggerItem, viewportOnce, imageHover } from '@/lib/motion';
import { pageTopPad, sectionPy, gridGap } from '@/lib/spacing';

const MotionBox = motion(Box);
const MotionGrid = motion(Grid);
const MotionVStack = motion(VStack);

const categories = ['All', 'Commercial', 'Residential', 'Infrastructure', 'Cultural'];

export default function ProjectsPage() {
  const reducedMotion = useReducedMotion();

  return (
    <Box as="main" bg="dark.900" overflowX="hidden">
      <Box pt={pageTopPad} pb={sectionPy}>
        <Container maxW="1440px">
          <LearnMoreLink href="/" size="sm">
            Back to home
          </LearnMoreLink>

          <MotionVStack
            align="flex-start"
            spacing={{ base: 5, md: 6 }}
            maxW="36rem"
            variants={heroStagger}
            initial={reducedMotion ? false : 'hidden'}
            animate="visible"
            mt={{ base: 8, md: 12 }}
            mb={{ base: 10, md: 14 }}
          >
            <MotionBox variants={heroItem}>
              <Text variant="caption">Our work</Text>
            </MotionBox>
            <MotionBox variants={heroItem}>
              <Heading fontSize="display-lg" fontWeight="300" lineHeight="1.1">
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

          <HStack spacing={0} flexWrap="wrap" borderTop="1px solid" borderColor="whiteAlpha.120">
            {categories.map((category, index) => (
              <Box
                key={category}
                as="button"
                px={{ base: 5, md: 6 }}
                py={4}
                fontSize="sm"
                fontWeight="500"
                color={category === 'All' ? 'dark.50' : 'dark.300'}
                borderBottom="1px solid"
                borderRight="1px solid"
                borderColor="whiteAlpha.120"
                borderLeft={index === 0 ? '1px solid' : 'none'}
                borderLeftColor="whiteAlpha.120"
                bg={category === 'All' ? 'whiteAlpha.50' : 'transparent'}
                transition="all 0.35s"
                _hover={{ color: 'dark.50', bg: 'whiteAlpha.50' }}
              >
                {category}
              </Box>
            ))}
          </HStack>
        </Container>
      </Box>

      <HorizontalStrip title="All projects" items={projectStrip} />

      <Box pb={sectionPy}>
        <Container maxW="1440px">
          <MotionGrid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
            gap={0}
            borderTop="1px solid"
            borderColor="whiteAlpha.120"
            variants={staggerContainer}
            initial={reducedMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={viewportOnce}
          >
            {featuredProjects.map((project) => (
              <MotionBox
                key={project.id}
                variants={staggerItem}
                position="relative"
                role="group"
                borderBottom="1px solid"
                borderRight={{ md: '1px solid' }}
                borderColor="whiteAlpha.120"
                overflow="hidden"
                initial="rest"
                whileHover={reducedMotion ? undefined : 'hover'}
              >
                <Box position="relative" overflow="hidden" aspectRatio={16 / 10}>
                  <MotionBox position="absolute" inset={0} variants={imageHover}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      objectFit="cover"
                      w="full"
                      h="full"
                    />
                  </MotionBox>
                  <Box
                    position="absolute"
                    inset={0}
                    bgGradient="linear(to-t, rgba(0,0,0,0.9) 0%, transparent 55%)"
                  />
                </Box>

                <VStack align="flex-start" p={{ base: 6, md: 8 }} spacing={3}>
                  <HStack spacing={4}>
                    <Text variant="caption">{project.category}</Text>
                    <Text variant="date">{project.year}</Text>
                  </HStack>
                  <Heading fontSize={{ base: 'lg', md: 'xl' }} fontWeight="400">
                    {project.title}
                  </Heading>
                  <Text fontSize="sm" color="dark.200" noOfLines={2} lineHeight="1.7">
                    {project.description}
                  </Text>
                  <HStack color="dark.300" fontSize="sm">
                    <Icon as={FiMapPin} />
                    <Text>{project.location}</Text>
                  </HStack>
                  <LearnMoreLink href="/#contact" size="sm">Learn more</LearnMoreLink>
                </VStack>
              </MotionBox>
            ))}
          </MotionGrid>
        </Container>
      </Box>

      <Box py={sectionPy} bg="dark.800" borderTop="1px solid" borderColor="whiteAlpha.120">
        <Container maxW="1440px" textAlign="center">
          <VStack spacing={6} maxW="32rem" mx="auto">
            <Heading fontSize="display-md" fontWeight="400">
              Have a project in mind?
            </Heading>
            <Text variant="lead" maxW="none" mx="auto" textAlign="center">
              Share your brief and we will outline scope, team, and timeline within
              two business days.
            </Text>
            <Box as={NextLink} href="/#contact">
              <LearnMoreLink href="/#contact">Start a conversation</LearnMoreLink>
            </Box>
          </VStack>
        </Container>
      </Box>

      <SiteFooter />
    </Box>
  );
}
