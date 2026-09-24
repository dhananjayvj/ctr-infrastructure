'use client';

import { useState } from 'react';
import { Box, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { useReducedMotion } from 'framer-motion';
import type { ProjectLocation } from '@/data/locations';
import { projectLocations } from '@/data/locations';
import { sectionPy } from '@/lib/spacing';

const categoryColors: Record<ProjectLocation['category'], string> = {
  Residential: '#e8d8bd',
  Commercial: '#b9d4cf',
  Hospitality: '#d9b99d',
  Institutional: '#b9c9df',
  Corporate: '#c9bfdc',
};
const regionPositions: Record<ProjectLocation['state'], Array<{ left: number; top: number }>> = {
  Karnataka: [
    { left: 8, top: 13 }, { left: 19, top: 20 }, { left: 9, top: 36 }, { left: 21, top: 44 },
    { left: 8, top: 60 }, { left: 20, top: 67 }, { left: 10, top: 82 }, { left: 21, top: 88 },
  ],
  'Tamil Nadu': Array.from({ length: 24 }, (_, index) => {
    const column = index % 4;
    const row = Math.floor(index / 4);
    return { left: 33 + column * 10 + ((row + column) % 2), top: 11 + row * 15 + ((index * 5) % 3) };
  }),
  'Andhra Pradesh': [{ left: 89, top: 48 }],
};

function projectPosition(location: ProjectLocation) {
  const stateLocations = projectLocations.filter((project) => project.state === location.state);
  const index = stateLocations.findIndex((project) => project.id === location.id);
  const position = regionPositions[location.state][index] ?? regionPositions[location.state][0];
  return { left: `${position.left}%`, top: `${position.top}%` };
}

function LocationPin({ location, active, reducedMotion, onSelect, onHover }: {
  location: ProjectLocation;
  active: boolean;
  reducedMotion: boolean | null;
  onSelect: () => void;
  onHover: () => void;
}) {
  const position = projectPosition(location);
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

        <Box position="relative" minH={{ base: '520px', md: '660px', lg: '720px' }} border="1px solid" borderColor="whiteAlpha.160" overflow="hidden" bg="dark.800" backgroundImage="radial-gradient(circle at 27% 20%, rgba(255,255,255,0.10), transparent 30%), linear-gradient(135deg, #191919 0%, #0a0a0a 58%, #171717 100%)">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.7 }} aria-hidden="true">
              {[12, 24, 36, 48, 60, 72, 84].map((line) => <line key={`h-${line}`} x1="0" y1={line} x2="100" y2={line} stroke="rgba(255,255,255,0.08)" strokeWidth="0.12" />)}
              {[14, 28, 42, 56, 70, 84].map((line) => <line key={`v-${line}`} x1={line} y1="0" x2={line} y2="100" stroke="rgba(255,255,255,0.08)" strokeWidth="0.12" />)}
              <path d="M26 0 L34 100" fill="none" stroke="rgba(255,255,255,0.42)" strokeWidth="0.22" strokeDasharray="1.2 1.8" />
              <path d="M66 0 L74 100" fill="none" stroke="rgba(255,255,255,0.42)" strokeWidth="0.22" strokeDasharray="1.2 1.8" />
            </svg>
            <Text position="absolute" top={5} left="7%" fontFamily="mono" fontSize="10px" letterSpacing="0.16em" color="whiteAlpha.600">KARNATAKA</Text>
            <Text position="absolute" top={5} left="47%" transform="translateX(-50%)" fontFamily="mono" fontSize="10px" letterSpacing="0.16em" color="whiteAlpha.600">TAMIL NADU</Text>
            <Text position="absolute" top={5} right="6%" fontFamily="mono" fontSize="10px" letterSpacing="0.16em" color="whiteAlpha.600">ANDHRA PRADESH</Text>
            {locationsInView.map((location) => <LocationPin key={location.id} location={location} active={location.id === activeLocation?.id} reducedMotion={reducedMotion} onSelect={() => selectLocation(location.id)} onHover={() => selectLocation(location.id)} />)}
          </Box>
      </Box>
    </Box>
  );
}
