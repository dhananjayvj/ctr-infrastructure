'use client';

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import { motion, useReducedMotion } from 'framer-motion';
import { LearnMoreLink } from '@/components/audi/LearnMoreLink';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SiteFooter } from '@/components/SiteFooter';
import { ProjectDirectory } from '@/components/ProjectDirectory';
import { ProjectLocations } from '@/components/ProjectLocations';
import { completeProjects } from '@/data/projectCatalog';
import { heroStagger, heroItem } from '@/lib/motion';
import { pageTopPad, sectionPy } from '@/lib/spacing';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

export default function ProjectsPage() {
  const reducedMotion = useReducedMotion();

  return (
    <Box as="main" bg="dark.900" overflowX="hidden">
      <Box pt={pageTopPad} pb={sectionPy}>
        <Container maxW="1440px">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Projects' }]} />

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

        </Container>
      </Box>

      <ProjectDirectory projects={completeProjects} />

      <ProjectLocations />

      <Box py={sectionPy} bg="dark.800" borderTop="1px solid" borderColor="whiteAlpha.120">
        <Container maxW="1440px" textAlign="center">
          <VStack spacing={6} maxW="32rem" mx="auto">
            <Heading fontSize="display-md" fontWeight="400">
              Have a project in mind?
            </Heading>
            <Text variant="lead" maxW="none" mx="auto" textAlign="center">
              Share your brief and we will respond within 24 hours with scope,
              team, and timeline.
            </Text>
            <LearnMoreLink href="/#contact">Start a conversation</LearnMoreLink>
          </VStack>
        </Container>
      </Box>

      <SiteFooter />
    </Box>
  );
}
