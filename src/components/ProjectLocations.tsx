'use client';

import { useRef, useState } from 'react';
import { Box, Flex, Grid, Heading, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { motion, useReducedMotion } from 'framer-motion';
import { FiArrowUpRight, FiMapPin } from 'react-icons/fi';
import type { ProjectLocation } from '@/data/locations';
import { projectLocations } from '@/data/locations';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/motion';
import { sectionPy } from '@/lib/spacing';

const MotionBox = motion(Box);
const MIN_LAT = 10.4;
const MAX_LAT = 15.6;
const MIN_LNG = 76.4;
const MAX_LNG = 79.25;

function projectPosition(location: ProjectLocation) {
  const x = ((location.coordinates.lng - MIN_LNG) / (MAX_LNG - MIN_LNG)) * 100;
  const y = ((MAX_LAT - location.coordinates.lat) / (MAX_LAT - MIN_LAT)) * 100;
  return { left: `${Math.min(96, Math.max(4, x))}%`, top: `${Math.min(94, Math.max(6, y))}%` };
}

function LocationPin({ location, active, reducedMotion, onSelect, onHover }: {
  location: ProjectLocation;
  active: boolean;
  reducedMotion: boolean | null;
  onSelect: () => void;
  onHover: () => void;
}) {
  const position = projectPosition(location);

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
          borderColor="whiteAlpha.400"
          boxShadow="0 12px 30px rgba(0,0,0,0.28)"
          pointerEvents="none"
        >
          <Text fontFamily="mono" fontSize="10px" color="dark.400" letterSpacing="0.1em" mb={2}>{location.category.toUpperCase()}</Text>
          <Heading fontSize="lg" fontWeight="400" lineHeight="1.05">{location.name}</Heading>
          <Text fontSize="xs" color="dark.300" mt={2}>{location.city}, {location.state}</Text>
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
  const [activeId, setActiveId] = useState('');
  const cardRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const locationsInView = projectLocations;

  const selectLocation = (id: string, scrollToCard = false) => {
    setActiveId(id);
    if (scrollToCard) {
      window.requestAnimationFrame(() => cardRefs.current[id]?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'nearest' }));
    }
  };

  const activeLocation = projectLocations.find((location) => location.id === activeId);

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
            <Text variant="caption">{locationsInView.length.toString().padStart(2, '0')} locations</Text>
          </VStack>
        </Flex>

        <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} alignItems="start" gap={0} border="1px solid" borderColor="whiteAlpha.160">
          <Box position="relative" minH={{ base: '460px', md: '600px', lg: '680px' }} borderRight={{ lg: '1px solid' }} borderColor="whiteAlpha.160" overflow="hidden" bg="dark.800" backgroundImage="radial-gradient(circle at 27% 20%, rgba(255,255,255,0.10), transparent 30%), linear-gradient(135deg, #191919 0%, #0a0a0a 58%, #171717 100%)">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.7 }} aria-hidden="true">
              {[12, 24, 36, 48, 60, 72, 84].map((line) => <line key={`h-${line}`} x1="0" y1={line} x2="100" y2={line} stroke="rgba(255,255,255,0.08)" strokeWidth="0.12" />)}
              {[14, 28, 42, 56, 70, 84].map((line) => <line key={`v-${line}`} x1={line} y1="0" x2={line} y2="100" stroke="rgba(255,255,255,0.08)" strokeWidth="0.12" />)}
            </svg>
            {locationsInView.map((location) => <LocationPin key={location.id} location={location} active={location.id === activeLocation?.id} reducedMotion={reducedMotion} onSelect={() => selectLocation(location.id, true)} onHover={() => selectLocation(location.id)} />)}
            <Flex position="absolute" bottom={5} right={5} gap={4} fontFamily="mono" fontSize="xs" color="dark.300">
              <HStack spacing={2}><Box w="8px" h="8px" borderRadius="full" bg="dark.50" /><Text>highlight</Text></HStack>
              <HStack spacing={2}><Box w="8px" h="8px" borderRadius="full" border="1px solid" borderColor="dark.300" /><Text>project</Text></HStack>
            </Flex>
          </Box>

          <Box minW={0}>
            <VStack align="stretch" spacing={0} divider={<Box borderTop="1px solid" borderColor="whiteAlpha.120" />}>
              <Box px={{ base: 5, md: 7 }} py={5} bg="dark.900" borderBottom="1px solid" borderColor="whiteAlpha.120">
                <HStack justify="space-between"><Text variant="caption">Project register</Text><Text fontFamily="mono" fontSize="xs" color="dark.400">{locationsInView.length.toString().padStart(2, '0')} / {projectLocations.length.toString().padStart(2, '0')}</Text></HStack>
              </Box>
              <MotionBox variants={staggerContainer} initial={reducedMotion ? false : 'hidden'} whileInView="visible" viewport={viewportOnce}>
                {locationsInView.map((location, index) => (
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
