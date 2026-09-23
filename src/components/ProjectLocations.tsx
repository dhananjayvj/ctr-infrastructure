'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Box, Button, Flex, Grid, Heading, HStack, Icon, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { motion, useReducedMotion } from 'framer-motion';
import { FiArrowUpRight, FiMapPin } from 'react-icons/fi';
import type { ProjectLocation } from '@/data/locations';
import { projectLocations } from '@/data/locations';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/motion';
import { sectionPy } from '@/lib/spacing';

const MotionBox = motion(Box);
const categories = ['All', 'Residential', 'Commercial', 'Hospitality', 'Institutional', 'Corporate'] as const;
const states = ['All', 'Tamil Nadu', 'Karnataka'] as const;
type FilterState = (typeof states)[number];
type FilterCategory = (typeof categories)[number];

const MIN_LAT = 10.4;
const MAX_LAT = 15.6;
const MIN_LNG = 76.4;
const MAX_LNG = 79.25;

function projectPosition(location: ProjectLocation) {
  const x = ((location.coordinates.lng - MIN_LNG) / (MAX_LNG - MIN_LNG)) * 100;
  const y = ((MAX_LAT - location.coordinates.lat) / (MAX_LAT - MIN_LAT)) * 100;
  return { left: `${Math.min(96, Math.max(4, x))}%`, top: `${Math.min(94, Math.max(6, y))}%` };
}

function LocationPin({ location, active, reducedMotion, onSelect }: {
  location: ProjectLocation;
  active: boolean;
  reducedMotion: boolean | null;
  onSelect: () => void;
}) {
  const position = projectPosition(location);

  return (
    <Box position="absolute" {...position} transform="translate(-50%, -50%)" zIndex={active ? 3 : 2}>
      <Box
        as="button"
        type="button"
        aria-label={`Show ${location.name}, ${location.city}`}
        aria-pressed={active}
        onClick={onSelect}
        position="relative"
        w={active ? '36px' : '28px'}
        h={active ? '36px' : '28px'}
        display="flex"
        alignItems="center"
        justifyContent="center"
        border="1px solid"
        borderColor={active ? 'dark.50' : 'whiteAlpha.500'}
        borderRadius="full"
        bg={active ? 'dark.50' : 'rgba(10,10,10,0.82)'}
        color={active ? 'dark.900' : 'dark.50'}
        transition="all 0.3s"
        _hover={{ transform: 'scale(1.08)', borderColor: 'dark.50' }}
        _focusVisible={{ boxShadow: '0 0 0 2px var(--chakra-colors-dark-900), 0 0 0 4px var(--chakra-colors-dark-50)' }}
      >
        {active && !reducedMotion && (
          <Box position="absolute" inset="-7px" border="1px solid" borderColor="whiteAlpha.400" borderRadius="full" opacity={0.7} />
        )}
        <Box w={active ? '8px' : '6px'} h={active ? '8px' : '6px'} borderRadius="full" bg="currentColor" />
      </Box>
    </Box>
  );
}

export function ProjectLocations() {
  const reducedMotion = useReducedMotion();
  const [state, setState] = useState<FilterState>('All');
  const [category, setCategory] = useState<FilterCategory>('All');
  const [activeId, setActiveId] = useState('treasure-trove');
  const cardRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const filteredLocations = useMemo(
    () => projectLocations.filter((location) => (state === 'All' || location.state === state) && (category === 'All' || location.category === category)),
    [state, category]
  );

  useEffect(() => {
    if (!filteredLocations.some((location) => location.id === activeId)) {
      setActiveId(filteredLocations[0]?.id ?? '');
    }
  }, [activeId, filteredLocations]);

  const selectLocation = (id: string, scrollToCard = false) => {
    setActiveId(id);
    if (scrollToCard) {
      window.requestAnimationFrame(() => cardRefs.current[id]?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'nearest' }));
    }
  };

  const activeLocation = projectLocations.find((location) => location.id === activeId) ?? filteredLocations[0];

  return (
    <Box as="section" id="locations" py={sectionPy} bg="dark.900" borderTop="1px solid" borderColor="whiteAlpha.120">
      <Box maxW="1440px" mx="auto" px={{ base: 5, sm: 6, md: 10, lg: 14 }}>
        <Flex direction={{ base: 'column', lg: 'row' }} justify="space-between" gap={10} mb={{ base: 10, md: 14 }}>
          <VStack align="flex-start" spacing={4} maxW="42rem">
            <Text variant="caption">Project footprint</Text>
            <Heading fontSize="display-lg" fontWeight="400" lineHeight="0.98">A practice with a sense of place</Heading>
          <Text variant="lead" maxW="38rem">Completed and active work across Tamil Nadu and Karnataka, plotted by city and category.</Text>
          </VStack>
          <VStack align={{ base: 'flex-start', lg: 'flex-end' }} justify="flex-end" spacing={2} minW={{ lg: '13rem' }}>
            <Text variant="caption">{filteredLocations.length.toString().padStart(2, '0')} locations in view</Text>
          </VStack>
        </Flex>

        <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" gap={5} mb={5}>
          <HStack spacing={0} flexWrap="wrap" borderTop="1px solid" borderLeft="1px solid" borderColor="whiteAlpha.120">
            {states.map((option) => (
              <Button key={option} onClick={() => setState(option)} variant="ghost" borderRadius="0" borderRight="1px solid" borderBottom="1px solid" borderColor="whiteAlpha.120" color={state === option ? 'dark.50' : 'dark.300'} bg={state === option ? 'whiteAlpha.100' : 'transparent'} fontSize="xs" fontWeight="500" letterSpacing="0.04em" minH="42px" px={{ base: 4, md: 5 }} _hover={{ color: 'dark.50', bg: 'whiteAlpha.80' }}>{option}</Button>
            ))}
          </HStack>
          <HStack spacing={4} flexWrap="wrap" justify={{ md: 'flex-end' }}>
            {categories.slice(1).map((option) => (
              <Button key={option} onClick={() => setCategory(category === option ? 'All' : option)} variant="ghost" borderRadius="0" color={category === option ? 'dark.50' : 'dark.300'} fontSize="xs" fontWeight="400" px={0} minH="42px" borderBottom="1px solid" borderColor={category === option ? 'dark.50' : 'transparent'} _hover={{ color: 'dark.50' }}>{option}</Button>
            ))}
          </HStack>
        </Flex>

        <Grid templateColumns={{ base: '1fr', lg: '1.05fr 0.95fr' }} alignItems="start" gap={{ base: 8, lg: 0 }} border="1px solid" borderColor="whiteAlpha.160">
          <Box position="relative" minH={{ base: '500px', md: '700px' }} borderRight={{ lg: '1px solid' }} borderColor="whiteAlpha.160" overflow="hidden" bg="dark.800">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.7 }} aria-hidden="true">
              {[12, 24, 36, 48, 60, 72, 84].map((line) => <line key={`h-${line}`} x1="0" y1={line} x2="100" y2={line} stroke="rgba(255,255,255,0.08)" strokeWidth="0.12" />)}
              {[14, 28, 42, 56, 70, 84].map((line) => <line key={`v-${line}`} x1={line} y1="0" x2={line} y2="100" stroke="rgba(255,255,255,0.08)" strokeWidth="0.12" />)}
              <path d="M1 7 L23 3 L49 7 L62 18 L58 33 L47 42 L35 37 L23 42 L12 34 L2 23 Z" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.42)" strokeWidth="0.28" />
              <path d="M35 39 L49 35 L66 38 L82 48 L93 64 L88 79 L77 84 L70 96 L54 91 L43 79 L34 69 L25 59 L22 47 Z" fill="rgba(255,255,255,0.045)" stroke="rgba(255,255,255,0.52)" strokeWidth="0.3" />
              <path d="M16 78 C26 67, 33 59, 43 50 S58 35, 70 25" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.18" strokeDasharray="1.2 1.2" />
            </svg>
            <Text position="absolute" top={5} left={6} variant="caption" fontFamily="mono" letterSpacing="0.16em">SOUTH INDIA / FIELD INDEX</Text>
            <Text position="absolute" bottom={5} left={6} fontFamily="mono" fontSize="xs" color="dark.400">NORTH ↑</Text>
            <Text position="absolute" top="54%" left="39%" fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }} color="whiteAlpha.300" transform="rotate(-12deg)">TAMIL NADU</Text>
            <Text position="absolute" top="17%" left="29%" fontFamily="heading" fontSize={{ base: 'xl', md: '2xl' }} color="whiteAlpha.300" transform="rotate(-12deg)">KARNATAKA</Text>
            {filteredLocations.map((location) => <LocationPin key={location.id} location={location} active={location.id === activeLocation?.id} reducedMotion={reducedMotion} onSelect={() => selectLocation(location.id, true)} />)}
            <Flex position="absolute" bottom={5} right={5} gap={4} fontFamily="mono" fontSize="xs" color="dark.300">
              <HStack spacing={2}><Box w="8px" h="8px" borderRadius="full" bg="dark.50" /><Text>highlight</Text></HStack>
              <HStack spacing={2}><Box w="8px" h="8px" borderRadius="full" border="1px solid" borderColor="dark.300" /><Text>project</Text></HStack>
            </Flex>
          </Box>

          <Box>
            <VStack align="stretch" spacing={0} divider={<Box borderTop="1px solid" borderColor="whiteAlpha.120" />}>
              <Box px={{ base: 5, md: 7 }} py={5} bg="dark.900" borderBottom="1px solid" borderColor="whiteAlpha.120">
                <HStack justify="space-between"><Text variant="caption">Project register</Text><Text fontFamily="mono" fontSize="xs" color="dark.400">{filteredLocations.length.toString().padStart(2, '0')} / {projectLocations.length.toString().padStart(2, '0')}</Text></HStack>
              </Box>
              <MotionBox variants={staggerContainer} initial={reducedMotion ? false : 'hidden'} whileInView="visible" viewport={viewportOnce}>
                {filteredLocations.map((location, index) => (
                  <MotionBox key={location.id} variants={staggerItem}>
                    <Box
                      as="button"
                      type="button"
                      ref={(element: HTMLButtonElement | null) => { cardRefs.current[location.id] = element; }}
                      onClick={() => selectLocation(location.id)}
                      aria-pressed={location.id === activeLocation?.id}
                      w="full"
                      textAlign="left"
                      px={{ base: 5, md: 7 }}
                      py={{ base: 5, md: 6 }}
                      bg={location.id === activeLocation?.id ? 'whiteAlpha.80' : 'transparent'}
                      color="dark.50"
                      transition="background 0.3s"
                      _hover={{ bg: 'whiteAlpha.80' }}
                      _focusVisible={{ boxShadow: 'inset 0 0 0 2px var(--chakra-colors-dark-50)' }}
                    >
                      <Flex justify="space-between" gap={4} align="flex-start">
                        <HStack align="flex-start" spacing={4}>
                          <Text fontFamily="mono" fontSize="xs" color="dark.400" pt={1}>{String(index + 1).padStart(2, '0')}</Text>
                          <Box>
                            <Heading fontSize={{ base: 'xl', md: '2xl' }} fontWeight="400" lineHeight="1">{location.name}</Heading>
                            <Text mt={2} fontSize="sm" color="dark.300">{location.city}, {location.state}</Text>
                          </Box>
                        </HStack>
                        <Icon as={location.id === activeLocation?.id ? FiArrowUpRight : FiMapPin} color={location.id === activeLocation?.id ? 'dark.50' : 'dark.400'} boxSize={4} flexShrink={0} />
                      </Flex>
                      <Text fontSize="xs" color="dark.300" mt={5} ml={{ base: 8, md: 9 }}>{location.category} / {location.city}</Text>
                    </Box>
                  </MotionBox>
                ))}
              </MotionBox>
            </VStack>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
