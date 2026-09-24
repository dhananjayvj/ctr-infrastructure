'use client';

import { Box, Container, Flex, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import type { CompleteProject } from '@/data/projectCatalog';

const MotionBox = motion(Box);

function assetSrc(src: string) {
  return encodeURI(src);
}

function ProjectVisual({ project }: { project: CompleteProject }) {
  if (!project.cover) {
    return (
      <Box position="relative" aspectRatio={{ base: 1.2, md: 1.45 }} overflow="hidden" bg="dark.800" border="1px solid" borderColor="whiteAlpha.120">
        <Box position="absolute" inset="12%" border="1px solid" borderColor="whiteAlpha.180" backgroundImage="linear-gradient(135deg, transparent 49.8%, rgba(255,255,255,0.18) 50%, transparent 50.2%), linear-gradient(45deg, transparent 49.8%, rgba(255,255,255,0.12) 50%, transparent 50.2%)" />
        <Text position="absolute" left={5} bottom={5} variant="caption">Portfolio archive</Text>
      </Box>
    );
  }

  return (
    <Box position="relative" aspectRatio={{ base: 1.2, md: 1.45 }} overflow="hidden" bg="dark.800">
      <MotionBox position="absolute" inset={0} transition="transform 700ms cubic-bezier(0.25, 0.1, 0.25, 1)" _groupHover={{ transform: 'scale(1.035)' }}>
        <Image src={assetSrc(project.cover)} alt={`${project.title} project view`} w="full" h="full" objectFit="cover" />
      </MotionBox>
      <Box position="absolute" inset={0} bgGradient="linear(to-t, rgba(0,0,0,0.48), transparent 55%)" pointerEvents="none" />
    </Box>
  );
}

export function ProjectDirectory({ projects }: { projects: CompleteProject[] }) {
  const reducedMotion = useReducedMotion();

  return (
    <Box as="section" id="all-projects" bg="dark.900">
      <Container maxW="1440px">
        <Flex borderTop="1px solid" borderColor="whiteAlpha.120" direction="column">
          {projects.map((project, index) => {
            const imageFirst = index % 2 === 1;
            return (
              <Box
                key={project.id}
                as={Link}
                href={`/projects/${project.id}/`}
                role="group"
                display="grid"
                gridTemplateColumns={{ base: '1fr', md: 'repeat(2, minmax(0, 1fr))' }}
                borderBottom="1px solid"
                borderColor="whiteAlpha.120"
                _hover={{ textDecoration: 'none' }}
                _focusVisible={{ outline: '2px solid', outlineColor: 'dark.50', outlineOffset: '-2px' }}
              >
                <Flex
                  direction="column"
                  justify="space-between"
                  minH={{ md: '420px', lg: '520px' }}
                  p={{ base: 6, sm: 8, md: 10, lg: 14 }}
                  order={{ base: 1, md: imageFirst ? 2 : 1 }}
                  borderRight={{ md: imageFirst ? 'none' : '1px solid' }}
                  borderLeft={{ md: imageFirst ? '1px solid' : 'none' }}
                  borderColor="whiteAlpha.120"
                >
                  <VStack align="flex-start" spacing={{ base: 5, md: 7 }}>
                    <HStack spacing={4} color="dark.400">
                      <Text variant="caption">{String(index + 1).padStart(2, '0')}</Text>
                      <Text variant="caption">{project.category}</Text>
                    </HStack>
                    <Heading fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }} fontWeight="400" lineHeight="1.02" maxW="30rem">
                      {project.title}
                    </Heading>
                    <Text color="dark.200" fontSize={{ base: 'sm', md: 'md' }} lineHeight="1.75" maxW="28rem">
                      {project.description}
                    </Text>
                  </VStack>
                  <Flex mt={10} justify="space-between" align="flex-end" gap={5}>
                    <VStack align="flex-start" spacing={1}>
                      <Text variant="caption">Location</Text>
                      <Text color="dark.200" fontSize="sm">{project.location}</Text>
                    </VStack>
                    <Text variant="caption" color="dark.100" transition="transform 220ms ease-out" _groupHover={{ transform: 'translateX(4px)' }}>Open project →</Text>
                  </Flex>
                </Flex>
                <Box order={{ base: 2, md: imageFirst ? 1 : 2 }}>
                  <ProjectVisual project={project} />
                </Box>
              </Box>
            );
          })}
        </Flex>
      </Container>
    </Box>
  );
}
