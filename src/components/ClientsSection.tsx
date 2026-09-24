'use client';

import { Box, Container, Heading, Image, SimpleGrid, VStack } from '@chakra-ui/react';

const clientLogos = [
  '01.png', '02.png', '03.png', '04.png', '05.png', '06.png', '07.png',
  '08.png', '09.png', '10.png', '010.png', '011.png', '012.png', '013.png',
  '014.png', '015.png', '017.png', '018.png', '019.png', '020.png', '021.png',
];

export function ClientsSection() {
  return (
    <Box as="section" id="clients" py={{ base: 20, md: 28 }} bg="dark.800" borderTop="1px solid" borderColor="whiteAlpha.120">
      <Container maxW="1440px">
        <VStack align="center" spacing={{ base: 10, md: 14 }}>
          <Heading as="h2" fontSize="display-md" fontWeight="400" lineHeight="1" textAlign="center">
            Our Clients
          </Heading>

          <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 7 }} spacing={{ base: 3, md: 4, lg: 5 }} w="full">
            {clientLogos.map((filename, index) => (
              <Box
                key={filename}
                display="flex"
                alignItems="center"
                justifyContent="center"
                minH={{ base: '88px', md: '108px', lg: '120px' }}
                px={{ base: 3, md: 4, lg: 5 }}
                py={{ base: 4, md: 5 }}
                bg="dark.900"
                border="1px solid"
                borderColor="whiteAlpha.120"
              >
                <Image
                  src={`/images/clients/${filename}`}
                  alt={`Client logo ${index + 1}`}
                  maxW="100%"
                  maxH={{ base: '48px', md: '62px', lg: '70px' }}
                  objectFit="contain"
                  loading="lazy"
                />
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}
