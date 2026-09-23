'use client';

import { useState } from 'react';
import { Box, Container, Flex, Heading, Image, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { motion, useReducedMotion } from 'framer-motion';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/motion';

const MotionBox = motion(Box);

function ClientImage() {
  const [available, setAvailable] = useState(true);

  if (!available) {
    return (
      <Flex align="center" justify="center" h="full" minH="180px" bg="dark.700">
        <Text fontFamily="heading" fontSize={{ base: '4xl', md: '6xl' }} color="dark.200" letterSpacing="0.08em">K2BOX</Text>
      </Flex>
    );
  }

  return (
    <Image
      src="/images/clients/k2box.jpeg"
      alt="K2BOX client project"
      objectFit="cover"
      w="full"
      h="full"
      onError={() => setAvailable(false)}
      transition="transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)"
      _groupHover={{ transform: 'scale(1.03)' }}
    />
  );
}

const clientGroups = [
  {
    label: 'RESIDENTIAL',
    items: ['Individual residences', 'Villas', 'Apartment developments', 'Housing projects', 'Residential communities', 'Staff housing / quarters'],
  },
  {
    label: 'COMMERCIAL & CORPORATE',
    items: ['Larsen & Toubro (L&T)', 'TATA', 'JSW', 'Koday Group of Companies – Bengaluru', 'The Chennai Silks'],
  },
  {
    label: 'GOVERNMENT & CIVIC INFRASTRUCTURE',
    items: ['Tamil Nadu Government', 'HR&CE Department', 'Public Works Department', 'Water Resources Department', 'Municipal Administration & Water Supply Department', 'Central Public Works Department', 'Tamil Nadu Housing Board', 'Bangalore Development Authority'],
  },
  {
    label: 'PUBLIC SECTOR UNDERTAKINGS',
    items: ['Indian Oil Corporation Limited (IOCL)', 'Bharat Petroleum Corporation Limited (BPCL)', 'Hindustan Petroleum Corporation Limited (HPCL)'],
  },
  {
    label: 'TRANSPORTATION & CIVIL INFRASTRUCTURE',
    items: ['Indian Railways – Southern Railway', 'National Highways Authority of India (NHAI)', 'National Highways & Infrastructure Development Corporation Limited (NHIDCL)', 'Chennai Port Authority'],
  },
  {
    label: 'HEALTHCARE',
    items: ['Kauvery Hospitals', 'All India Institute of Medical Sciences (AIIMS)'],
  },
  {
    label: 'HOSPITALITY',
    items: ['GG Hotels'],
  },
  {
    label: 'RELIGIOUS & CULTURAL',
    items: ['ISKCON', 'THR&CE Department', 'KHR&CE Department'],
  },
];

export function ClientsSection() {
  const reducedMotion = useReducedMotion();

  return (
    <Box as="section" id="clients" py={{ base: 20, md: 32 }} bg="dark.800" borderTop="1px solid" borderColor="whiteAlpha.120">
      <Container maxW="1440px">
        <Flex direction={{ base: 'column', lg: 'row' }} gap={{ base: 12, lg: 24 }} align="flex-start" mb={{ base: 16, md: 24 }}>
          <VStack align="flex-start" spacing={5} flex="1" maxW="34rem">
            <Text variant="caption">Clients</Text>
            <Heading fontSize="display-lg" fontWeight="400" lineHeight="0.98">
              Clients across the built environment
            </Heading>
            <Text variant="lead" maxW="31rem">
              From private residences to public infrastructure, our work is shaped by long-term relationships and the responsibility each project carries.
            </Text>
          </VStack>

          <MotionBox
            variants={staggerContainer}
            initial={reducedMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={viewportOnce}
            flex="1"
            w="full"
            maxW="34rem"
          >
            <MotionBox variants={staggerItem} border="1px solid" borderColor="whiteAlpha.200" bg="dark.900" role="group">
              <Box position="relative" aspectRatio={16 / 8} overflow="hidden" bg="dark.700">
                <ClientImage />
              </Box>
              <Flex justify="space-between" align="center" gap={4} p={{ base: 5, md: 7 }}>
                <Box>
              <Text variant="caption" mb={2}>Featured client</Text>
                  <Heading fontSize={{ base: '2xl', md: '3xl' }} fontWeight="500">K2BOX</Heading>
                </Box>
                <Text variant="caption" textAlign="right" maxW="10rem">Client project</Text>
              </Flex>
            </MotionBox>
          </MotionBox>
        </Flex>

        <Text variant="caption" mb={5}>Category of work</Text>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={0} borderTop="1px solid" borderLeft="1px solid" borderColor="whiteAlpha.120">
          {clientGroups.map((group) => (
            <Box key={group.label} p={{ base: 5, md: 7 }} minH={{ md: '210px' }} borderRight="1px solid" borderBottom="1px solid" borderColor="whiteAlpha.120" _hover={{ bg: 'whiteAlpha.40' }} transition="background 0.3s">
              <Text variant="caption" mb={5} color="dark.100">{group.label}</Text>
              <VStack align="flex-start" spacing={2}>
                {group.items.map((item) => <Text key={item} fontSize="sm" color="dark.300" lineHeight="1.45">{item}</Text>)}
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
