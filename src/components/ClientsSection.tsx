'use client';

import { Box, Container, Flex, Heading, Image, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { useReducedMotion } from 'framer-motion';

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
  { name: 'K2BOX', image: '/images/clients/k2box.jpeg' },
  { name: 'Archaeological Survey of India', image: '/images/clients/ASOI%20BLUE.jpg' },
  { name: 'Bharat Petroleum Corporation Limited', image: '/images/clients/Bharat_Petroleum_logo.svg' },
  { name: 'Central Power Research Institute', image: '/images/clients/CPRI.jpg' },
  { name: 'Hindustan Petroleum Corporation Limited', image: '/images/clients/HPCL.png' },
  { name: 'Indian Institute of Science', image: '/images/clients/IISc_Master_Seal_Transparent.png' },
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
  { name: 'Karunya', image: '/images/clients/karunya.png' },
  { name: 'Kauvery Hospitals', image: '/images/clients/kavery.png' },
  { name: 'Larsen & Toubro', image: '/images/clients/larsen_%26_toubro-logo_brandlogos.net_egljc.png' },
  { name: 'R60 — alternate mark', image: '/images/clients/r60.jpg' },
  { name: 'Tamil Nadu Government', image: '/images/clients/tn%20goverment.png' },
  { name: 'Indian Oil Corporation Limited', image: '/images/clients/toppng.com-indian-oil-corporation-vector-logo-400x400.png' },
];

export function ClientsSection() {
  const reducedMotion = useReducedMotion();
  const marqueeLogos = reducedMotion ? clientLogos : [...clientLogos, ...clientLogos];

  return (
    <Box as="section" id="clients" py={{ base: 20, md: 32 }} bg="dark.800" borderTop="1px solid" borderColor="whiteAlpha.120">
      <Container maxW="1440px">
        <Box mb={{ base: 12, md: 16 }} maxW="42rem">
          <VStack align="flex-start" spacing={5} flex="1" maxW="34rem">
            <Text variant="caption">Clients</Text>
            <Heading fontSize="display-lg" fontWeight="400" lineHeight="0.98">
              Clients across the built environment
            </Heading>
            <Text variant="lead" maxW="31rem">
              From private residences to public infrastructure, our work is shaped by long-term relationships and the responsibility each project carries.
            </Text>
          </VStack>
        </Box>

        <Box
          role="region"
          aria-label="Client marks"
          overflow="hidden"
          mx={{ base: -5, sm: -6, md: -10, lg: -14 }}
          px={{ base: 5, sm: 6, md: 10, lg: 14 }}
          py={1}
          sx={{
            '@keyframes clientMarksMarquee': {
              from: { transform: 'translateX(0)' },
              to: { transform: 'translateX(-50%)' },
            },
          }}
        >
          <Flex
            gap={{ base: 3, md: 4 }}
            w="max-content"
            sx={{
              animation: reducedMotion ? 'none' : 'clientMarksMarquee 72s linear infinite',
            }}
          >
            {marqueeLogos.map((logo, index) => (
              <Flex
                key={`${logo.image}-${index}`}
                w={{ base: '156px', sm: '180px', md: '220px' }}
                h={{ base: '104px', md: '132px' }}
                p={{ base: 4, md: 6 }}
                align="center"
                justify="center"
                flexShrink={0}
                bg="dark.900"
                border="1px solid"
                borderColor="whiteAlpha.120"
              >
                <Image src={logo.image} alt={index >= clientLogos.length ? '' : logo.name} maxW="100%" maxH={{ base: '54px', md: '72px' }} objectFit="contain" />
              </Flex>
            ))}
          </Flex>
        </Box>

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
