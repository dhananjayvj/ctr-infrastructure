'use client';

import { useState } from 'react';
import { Box, Flex, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { useReducedMotion } from 'framer-motion';
import type { ProjectLocation } from '@/data/locations';
import { projectLocations } from '@/data/locations';
import { sectionPy } from '@/lib/spacing';

const categoryColors: Record<ProjectLocation['category'], string> = {
  Residential: '#b89a70',
  Commercial: '#6f9992',
  Hospitality: '#ad786d',
  Institutional: '#788da8',
  Corporate: '#9685a3',
};
const categoryOrder: ProjectLocation['category'][] = ['Residential', 'Commercial', 'Hospitality', 'Institutional', 'Corporate'];
const categorySizes: Record<ProjectLocation['category'], number> = {
  Residential: 18,
  Commercial: 19,
  Hospitality: 20,
  Institutional: 21,
  Corporate: 22,
};
const regionPositions: Record<ProjectLocation['state'], Array<{ left: number; top: number }>> = {
  Karnataka: [
    { left: 12, top: 9 }, { left: 38, top: 9 }, { left: 64, top: 9 }, { left: 88, top: 9 },
    { left: 18, top: 19 }, { left: 43, top: 19 }, { left: 68, top: 19 }, { left: 92, top: 19 },
  ],
  'Tamil Nadu': Array.from({ length: 24 }, (_, index) => {
    const column = index % 4;
    const row = Math.floor(index / 4);
    return { left: 16 + column * 22 + ((row + column) % 2), top: 33 + row * 9 + ((index * 5) % 3) };
  }),
  'Andhra Pradesh': [{ left: 15, top: 93 }],
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
  const size = categorySizes[location.category];
  const tooltipBelow = location.state === 'Karnataka';
  const positionPercent = Number.parseFloat(position.left);
  const tooltipEdge = positionPercent < 20 ? 'left' : positionPercent > 80 ? 'right' : 'center';

  return (
    <Box position="absolute" {...position} transform="translate(-50%, -50%)" zIndex={active ? 3 : 2}>
      {active && (
        <Box
          position="absolute"
          top={tooltipBelow ? 'calc(100% + 12px)' : 'auto'}
          bottom={tooltipBelow ? 'auto' : 'calc(100% + 12px)'}
          left={tooltipEdge === 'left' ? 0 : tooltipEdge === 'center' ? '50%' : 'auto'}
          right={tooltipEdge === 'right' ? 0 : 'auto'}
          transform={tooltipEdge === 'center' ? 'translateX(-50%)' : 'none'}
          w={{ base: '160px', md: '210px' }}
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
        w={`${active ? size + 8 : size}px`}
        h={`${active ? size + 8 : size}px`}
        display="flex"
        alignItems="center"
        justifyContent="center"
        border="1px solid"
        borderColor={active ? accent : `${accent}b8`}
        borderRadius="full"
        bg="rgba(8,8,8,0.88)"
        color={accent}
        boxShadow={active ? `0 0 0 3px ${accent}33` : 'none'}
        transition="transform 180ms ease-out, border-color 180ms ease-out, box-shadow 180ms ease-out"
        _hover={{ transform: 'scale(1.08)', borderColor: accent, boxShadow: `0 0 0 3px ${accent}26` }}
        _focusVisible={{ boxShadow: '0 0 0 2px var(--chakra-colors-dark-900), 0 0 0 4px var(--chakra-colors-dark-50)' }}
      >
        {active && !reducedMotion && (
          <Box position="absolute" inset="-7px" border="1px solid" borderColor={accent} borderRadius="full" opacity={0.7} />
        )}
        <Box w={active ? '8px' : '6px'} h={active ? '8px' : '6px'} borderRadius="full" bg="currentColor" boxShadow={`0 0 0 1px ${accent}66`} />
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
  const categoryCounts = categoryOrder.reduce<Record<ProjectLocation['category'], number>>((counts, category) => {
    counts[category] = locationsInView.filter((location) => location.category === category).length;
    return counts;
  }, {} as Record<ProjectLocation['category'], number>);
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

        <Box border="1px solid" borderColor="whiteAlpha.160" overflow="hidden" bg="dark.800" backgroundImage="radial-gradient(circle at 27% 20%, rgba(255,255,255,0.06), transparent 30%), linear-gradient(135deg, #191919 0%, #0a0a0a 58%, #171717 100%)">
          <Box position="relative" minH={{ base: '500px', md: '620px', lg: '680px' }} overflow="hidden">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.7 }} aria-hidden="true">
              {[12, 24, 36, 48, 60, 72, 84].map((line) => <line key={`h-${line}`} x1="0" y1={line} x2="100" y2={line} stroke="rgba(255,255,255,0.08)" strokeWidth="0.12" />)}
              {[14, 28, 42, 56, 70, 84].map((line) => <line key={`v-${line}`} x1={line} y1="0" x2={line} y2="100" stroke="rgba(255,255,255,0.08)" strokeWidth="0.12" />)}
              <path d="M0 30 L100 26" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="0.18" strokeDasharray="1.1 2.2" />
              <path d="M0 85 L100 81" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="0.18" strokeDasharray="1.1 2.2" />
            </svg>
            <Text position="absolute" top={4} left={5} fontFamily="mono" fontSize="10px" letterSpacing="0.16em" color="whiteAlpha.600">KARNATAKA</Text>
            <Text position="absolute" top="31%" left={5} fontFamily="mono" fontSize="10px" letterSpacing="0.16em" color="whiteAlpha.600">TAMIL NADU</Text>
            <Text position="absolute" bottom={5} left={5} fontFamily="mono" fontSize="10px" letterSpacing="0.16em" color="whiteAlpha.600">ANDHRA PRADESH</Text>
            {locationsInView.map((location) => <LocationPin key={location.id} location={location} active={location.id === activeLocation?.id} reducedMotion={reducedMotion} onSelect={() => selectLocation(location.id)} onHover={() => selectLocation(location.id)} />)}
          </Box>
          <Flex
            borderTop="1px solid"
            borderColor="whiteAlpha.180"
            px={{ base: 4, md: 6 }}
            py={{ base: 4, md: 5 }}
            display="grid"
            gridTemplateColumns={{ base: 'repeat(2, minmax(0, 1fr))', sm: 'repeat(3, minmax(0, 1fr))', lg: 'repeat(5, minmax(0, 1fr))' }}
            gap={{ base: 3, md: 5 }}
            bg="rgba(10,10,10,0.72)"
          >
            {categoryOrder.map((category) => (
              <HStack key={category} spacing={2} align="center" minW={0}>
                <Box w={{ base: '9px', md: '10px' }} h={{ base: '9px', md: '10px' }} flexShrink={0} borderRadius="full" bg={categoryColors[category]} boxShadow={`0 0 0 1px ${categoryColors[category]}66`} />
                <Text fontFamily="mono" fontSize={{ base: '9px', md: '10px' }} lineHeight="1.2" color="dark.200" textTransform="lowercase" whiteSpace="nowrap">{category} ({categoryCounts[category]})</Text>
              </HStack>
            ))}
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
