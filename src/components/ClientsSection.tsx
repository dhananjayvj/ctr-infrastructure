'use client';

import { useState } from 'react';
import { Box, Container, Flex, Heading, Image, Link, SimpleGrid, Text, VStack } from '@chakra-ui/react';
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

const clientLogos = [
  { name: 'Archaeological Survey of India', image: '/images/clients/ASOI%20BLUE.jpg' },
  { name: 'Bharat Petroleum Corporation Limited', image: '/images/clients/Bharat_Petroleum_logo.svg' },
  { name: 'Central Power Research Institute', image: '/images/clients/CPRI.jpg' },
  { name: 'Hindustan Petroleum Corporation Limited', image: '/images/clients/HPCL.png' },
  { name: 'Indian Institute of Science', image: '/images/clients/IISc_Master_Seal.jpg' },
  { name: 'Indian Institute of Science — black mark', image: '/images/clients/IISc_Master_Seal_Black.jpg' },
  { name: 'Indian Institute of Science — transparent mark', image: '/images/clients/IISc_Master_Seal_Black_Transparent.png' },
  { name: 'Indian Institute of Science — reverse mark', image: '/images/clients/IISc_Master_Seal_Reverse.jpg' },
  { name: 'Indian Institute of Science — clear mark', image: '/images/clients/IISc_Master_Seal_Transparent.png' },
  { name: 'Indian Railways — Southern Railway', image: '/images/clients/INDIAN%20RAILWAYS_.png' },
  { name: 'ISKCON Bangalore', image: '/images/clients/ISKCON_Bangalore_logo.png' },
  { name: 'Khoday Group of Companies', image: '/images/clients/Khoday-india-logo.png' },
  { name: 'Military Engineer Services', image: '/images/clients/Military_Engineer_Services.png' },
  { name: 'National Highways Authority of India', image: '/images/clients/NHAI-Color.png' },
  { name: 'Bangalore Development Authority', image: '/images/clients/bda%20logo.jpg' },
  { name: 'Chennai Port Authority', image: '/images/clients/chennai%20port.png' },
  { name: 'The Chennai Silks', image: '/images/clients/chennai%20silks.png' },
  { name: 'GG Hotels', image: '/images/clients/gg%20hotels.png' },
  { name: 'Hindusthan', image: '/images/clients/hindusthan_logo.png' },
  { name: 'ISKCON Bangalore — alternate mark', image: '/images/clients/iskon%20banglore.png' },
  { name: 'ISKCON — alternate mark', image: '/images/clients/iskonn.jpeg' },
  { name: 'Karunya', image: '/images/clients/karunya.png' },
  { name: 'Kauvery Hospitals', image: '/images/clients/kavery.png' },
  { name: 'Larsen & Toubro', image: '/images/clients/larsen_%26_toubro-logo_brandlogos.net_egljc.png' },
  { name: 'R60', image: '/images/clients/r60.PNG' },
  { name: 'R60 — alternate mark', image: '/images/clients/r60.jpg' },
  { name: 'Tamil Nadu Government', image: '/images/clients/tn%20goverment.png' },
  { name: 'Indian Oil Corporation Limited', image: '/images/clients/toppng.com-indian-oil-corporation-vector-logo-400x400.png' },
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
              <Box position="relative" aspectRatio={527 / 414} overflow="hidden" bg="dark.700">
                <ClientImage />
              </Box>
              <Flex direction="column" align="flex-start" gap={2} p={{ base: 5, md: 7 }}>
                <Box>
                  <Heading fontSize={{ base: '2xl', md: '3xl' }} fontWeight="500">K2BOX</Heading>
                  <Text variant="caption" mt={1}>Fitness &amp; Nutrition Solutions</Text>
                </Box>
                <Link href="https://www.k2box.in/" isExternal fontSize="xs" color="dark.300" borderBottom="1px solid" borderColor="whiteAlpha.300" pb="2px" _hover={{ color: 'dark.50', textDecoration: 'none', borderColor: 'dark.50' }}>Visit k2box.in</Link>
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

        <Text variant="caption" mb={5} mt={{ base: 16, md: 24 }}>Client marks</Text>
        <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 6 }} gap={0} borderTop="1px solid" borderLeft="1px solid" borderColor="whiteAlpha.120">
          {clientLogos.map((logo) => (
            <Flex key={`${logo.name}-${logo.image}`} minH={{ base: '112px', md: '142px' }} p={{ base: 4, md: 6 }} align="center" justify="center" bg="dark.900" borderRight="1px solid" borderBottom="1px solid" borderColor="whiteAlpha.120" _hover={{ bg: 'whiteAlpha.60' }} transition="background 0.3s">
              <Image src={logo.image} alt={logo.name} maxW="100%" maxH={{ base: '58px', md: '76px' }} objectFit="contain" />
            </Flex>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
