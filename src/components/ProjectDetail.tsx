'use client';

import { Box, Container, Flex, Heading, HStack, Link as ChakraLink, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import type { CompleteProject, ProjectMedia } from '@/data/projectCatalog';
import { ResponsiveGalleryImage } from '@/components/ResponsiveGalleryImage';
import { pageTopPad, sectionPy } from '@/lib/spacing';

const MotionBox = motion(Box);

function MediaItem({ media, projectTitle, eager }: { media: ProjectMedia; projectTitle: string; eager: boolean }) {
  return <ResponsiveGalleryImage alt={`${projectTitle} — ${media.label}`} sources={media.imageSources} eager={eager} />;
}

export function ProjectDetail({ project }: { project: CompleteProject }) {
  const reducedMotion = useReducedMotion();

  return (
    <Box as="main" bg="dark.900" overflowX="hidden">
      <Box pt={pageTopPad} pb={{ base: 12, md: 20 }}>
        <Container maxW="1440px">
          <ChakraLink as={Link} href="/projects/" display="inline-flex" alignItems="center" gap={2} color="dark.300" fontSize="sm" _hover={{ color: 'dark.50', textDecoration: 'none' }}>
            <FiArrowLeft aria-hidden="true" /> Back to all projects
          </ChakraLink>
          <Flex direction={{ base: 'column', lg: 'row' }} justify="space-between" gap={{ base: 10, lg: 20 }} mt={{ base: 12, md: 20 }}>
            <VStack align="flex-start" spacing={5} maxW="48rem">
              <HStack spacing={4}>
                <Text variant="caption">{project.category}</Text>
                <Text variant="caption" color="dark.400">{project.location}</Text>
              </HStack>
              <Heading fontSize={{ base: '4xl', md: '6xl', lg: '7xl' }} fontWeight="400" lineHeight="0.94">{project.title}</Heading>
              <Text variant="lead" maxW="39rem">{project.description}</Text>
            </VStack>
            <VStack align={{ base: 'flex-start', lg: 'flex-end' }} justify="flex-end" spacing={2} minW={{ lg: '12rem' }}>
              <Text variant="caption">{project.sections.length.toString().padStart(2, '0')} sections</Text>
              <Text fontSize="sm" color="dark.400">Project documentation</Text>
            </VStack>
          </Flex>
        </Container>
      </Box>

      {project.sections.length > 1 && (
        <Box position="sticky" top="5.5rem" zIndex={10} borderTop="1px solid" borderBottom="1px solid" borderColor="whiteAlpha.120" bg="rgba(10,10,10,0.94)" backdropFilter="blur(12px)">
          <Container maxW="1440px" overflowX="auto">
            <HStack spacing={0} minW="max-content">
              {project.sections.map((section, index) => (
                <ChakraLink key={section.id} as={Link} href={`#${section.id}`} px={{ base: 4, md: 6 }} py={4} borderRight="1px solid" borderColor="whiteAlpha.120" fontSize="10px" letterSpacing="0.12em" textTransform="uppercase" color="dark.300" _hover={{ color: 'dark.50', textDecoration: 'none', bg: 'whiteAlpha.50' }}>
                  {String(index + 1).padStart(2, '0')} / {section.title}
                </ChakraLink>
              ))}
            </HStack>
          </Container>
        </Box>
      )}

      <Container maxW="1440px" pb={sectionPy}>
        {project.sections.map((section, sectionIndex) => (
          <Box key={section.id} id={section.id} scrollMarginTop="8rem" pt={{ base: 16, md: 24 }}>
            <Flex justify="space-between" align="baseline" gap={5} mb={{ base: 6, md: 8 }}>
              <Heading fontSize={{ base: 'xl', md: '2xl' }} fontWeight="400">{section.title}</Heading>
              <Text variant="caption">{String(section.media.length).padStart(2, '0')} views</Text>
            </Flex>
            <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={{ base: 3, md: 5 }}>
              {section.media.map((media, mediaIndex) => (
                <MotionBox key={`${media.src}-${mediaIndex}`} initial={reducedMotion ? false : { opacity: 0, y: 18 }} whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.45, delay: Math.min(mediaIndex * 0.035, 0.2) }} aspectRatio={{ base: 1.1, md: 1.25 }} overflow="hidden" bg="dark.800" border="1px solid" borderColor="whiteAlpha.100">
                  <MediaItem media={media} projectTitle={project.title} eager={sectionIndex === 0 && mediaIndex < 3} />
                </MotionBox>
              ))}
            </SimpleGrid>
            {sectionIndex < project.sections.length - 1 && <Box mt={{ base: 16, md: 24 }} borderBottom="1px solid" borderColor="whiteAlpha.120" />}
          </Box>
        ))}
      </Container>
    </Box>
  );
}
