'use client';

import { useState } from 'react';
import { Box, Flex, Grid, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { motion, useReducedMotion } from 'framer-motion';
import type { ProjectLocation } from '@/data/locations';
import { projectLocations } from '@/data/locations';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/motion';
import { sectionPy } from '@/lib/spacing';

const MotionBox = motion(Box);
const categoryOrder: ProjectLocation['category'][] = ['Residential', 'Commercial', 'Hospitality', 'Institutional', 'Corporate'];
const categoryColors: Record<ProjectLocation['category'], string> = {
  Residential: '#e8d8bd',
  Commercial: '#b9d4cf',
  Hospitality: '#d9b99d',
  Institutional: '#b9c9df',
  Corporate: '#c9bfdc',
};
function projectPosition(index: number) {
  const columns = 6;
  const row = Math.floor(index / columns);
  const column = index % columns;
  const x = 10 + column * 15.2 + (row % 2 ? 2.5 : 0) + ((index * 7) % 3);
  const y = 10 + row * 13 + ((index * 11) % 4);
  return { left: `${x}%`, top: `${y}%` };
}

function LocationPin({ location, index, active, reducedMotion, onSelect, onHover }: {
  location: ProjectLocation;
  index: number;
  active: boolean;
  reducedMotion: boolean | null;
  onSelect: () => void;
  onHover: () => void;
}) {
  const position = projectPosition(index);
  const accent = categoryColors[location.category];

  return (
    <Box position="absolute" {...position} transform="translate(-50%, -50%)" zIndex={active ? 3 : 2}>
      {active && (
        <Box
          position="absolute"
          bottom="calc(100% + 12px)"
          left="50%"
          transform="translateX(-50%)"
          w={{ base: '180px', md: '210px' }}
          p={4}
          bg="dark.900"
          border="1px solid"
          borderColor={accent}
          boxShadow="0 12px 30px rgba(0,0,0,0.28)"
          pointerEvents="none"
        >
          <Text fontFamily="mono" fontSize="10px" color="dark.400" letterSpacing="0.1em" mb={2}>{location.category.toUpperCase()}</Text>
          <Heading fontSize="lg" fontWeight="400" lineHeight="1.05">{location.name}</Heading>
          <Text fontSize="xs" color="dark.300" mt={2}>{location.city}, {location.state}</Text>
          {location.client && <Text fontSize="xs" color="dark.400" mt={1}>{location.client}</Text>}
        </Box>
      )}
      <Box
        as="button"
        type="button"
        aria-label={`Show ${location.name}, ${location.city}`}
        aria-pressed={active}
        onClick={onSelect}
        onMouseEnter={onHover}
        onFocus={onHover}
        position="relative"
        w={active ? '36px' : '28px'}
        h={active ? '36px' : '28px'}
        display="flex"
        alignItems="center"
        justifyContent="center"
        border="1px solid"
        borderColor={active ? accent : `${accent}99`}
        borderRadius="full"
        bg={active ? accent : 'rgba(10,10,10,0.82)'}
        color={accent}
        transition="all 0.3s"
        _hover={{ transform: 'scale(1.08)', borderColor: accent }}
        _focusVisible={{ boxShadow: '0 0 0 2px var(--chakra-colors-dark-900), 0 0 0 4px var(--chakra-colors-dark-50)' }}
      >
        {active && !reducedMotion && (
          <Box position="absolute" inset="-7px" border="1px solid" borderColor={accent} borderRadius="full" opacity={0.7} />
        )}
        <Box w={active ? '8px' : '6px'} h={active ? '8px' : '6px'} borderRadius="full" bg="currentColor" />
      </Box>
    </Box>
  );
}

export function ProjectLocations() {
  const reducedMotion = useReducedMotion();
  const [activeId, setActiveId] = useState('');
  const locationsInView = projectLocations;

  const selectLocation = (id: string) => {
    setActiveId(id);
  };

  const activeLocation = projectLocations.find((location) => location.id === activeId);
  const categorySummary = categoryOrder.map((category) => ({
    category,
    count: locationsInView.filter((location) => location.category === category).length,
  }));

  return (
    <Box as="section" id="locations" py={sectionPy} bg="dark.900" borderTop="1px solid" borderColor="whiteAlpha.120">
      <Box maxW="1440px" mx="auto" px={{ base: 5, sm: 6, md: 10, lg: 14 }}>
        <Flex direction={{ base: 'column', lg: 'row' }} justify="space-between" gap={10} mb={{ base: 10, md: 14 }}>
          <VStack align="flex-start" spacing={4} maxW="42rem">
            <Text variant="caption">Project footprint</Text>
            <Heading fontSize="display-lg" fontWeight="400" lineHeight="0.98">A practice with a sense of place</Heading>
          <Text variant="lead" maxW="38rem">Completed and active work across Tamil Nadu, Karnataka, and Andhra Pradesh, plotted by city and category.</Text>
          </VStack>
          <VStack align={{ base: 'flex-start', lg: 'flex-end' }} justify="flex-end" spacing={2} minW={{ lg: '13rem' }}>
            <Text variant="caption">{locationsInView.length.toString().padStart(2, '0')} locations</Text>
          </VStack>
        </Flex>

        <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} alignItems="start" gap={0} border="1px solid" borderColor="whiteAlpha.160">
          <Box position="relative" minH={{ base: '460px', md: '600px', lg: '680px' }} borderRight={{ lg: '1px solid' }} borderColor="whiteAlpha.160" overflow="hidden" bg="dark.800" backgroundImage="radial-gradient(circle at 27% 20%, rgba(255,255,255,0.10), transparent 30%), linear-gradient(135deg, #191919 0%, #0a0a0a 58%, #171717 100%)">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.7 }} aria-hidden="true">
              {[12, 24, 36, 48, 60, 72, 84].map((line) => <line key={`h-${line}`} x1="0" y1={line} x2="100" y2={line} stroke="rgba(255,255,255,0.08)" strokeWidth="0.12" />)}
              {[14, 28, 42, 56, 70, 84].map((line) => <line key={`v-${line}`} x1={line} y1="0" x2={line} y2="100" stroke="rgba(255,255,255,0.08)" strokeWidth="0.12" />)}
            </svg>
            {locationsInView.map((location, index) => <LocationPin key={location.id} location={location} index={index} active={location.id === activeLocation?.id} reducedMotion={reducedMotion} onSelect={() => selectLocation(location.id)} onHover={() => selectLocation(location.id)} />)}
            <Flex position="absolute" bottom={5} left={5} right={5} gap={{ base: 3, md: 5 }} flexWrap="wrap" justify="flex-end" fontFamily="mono" fontSize="10px" color="dark.300">
              {categoryOrder.map((category) => <HStack key={category} spacing={2}><Box w="8px" h="8px" borderRadius="full" bg={categoryColors[category]} /><Text>{category.toLowerCase()}</Text></HStack>)}
            </Flex>
          </Box>

          <Box minW={0} px={{ base: 5, md: 7 }} py={{ base: 7, md: 9 }}>
            <MotionBox variants={staggerContainer} initial={reducedMotion ? false : 'hidden'} whileInView="visible" viewport={viewportOnce}>
              <Text variant="caption" mb={6}>Project types</Text>
              <VStack align="stretch" spacing={0}>
                {categorySummary.map(({ category, count }) => (
                  <MotionBox key={category} variants={staggerItem}>
                    <Flex py={4} borderBottom="1px solid" borderColor="whiteAlpha.120" align="center">
                      <Box w="10px" h="10px" borderRadius="full" bg={categoryColors[category]} mr={3} flexShrink={0} />
                      <Text fontSize="sm" color="dark.100">{category} ({count})</Text>
                    </Flex>
                  </MotionBox>
                ))}
              </VStack>
            </MotionBox>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
