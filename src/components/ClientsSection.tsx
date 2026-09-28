'use client';

import { Box, Container, Heading, SimpleGrid, VStack } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { clientLogos } from '@/data/clientLogoCatalog';
import { ResponsiveProjectImage } from '@/components/ResponsiveProjectImage';

export function ClientsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [nearViewport, setNearViewport] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (!('IntersectionObserver' in window)) {
      setNearViewport(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setNearViewport(true);
        observer.disconnect();
      },
      { rootMargin: '600px 0px', threshold: 0 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <Box ref={sectionRef} as="section" id="clients" py={{ base: 20, md: 28 }} bg="dark.800" borderTop="1px solid" borderColor="whiteAlpha.120">
      <Container maxW="1440px">
        <VStack align="center" spacing={{ base: 10, md: 14 }}>
          <Heading as="h2" fontSize="display-md" fontWeight="400" lineHeight="1" textAlign="center">
            Our Clients
          </Heading>

          <SimpleGrid columns={{ base: 3, sm: 4, md: 5, lg: 7 }} spacing={{ base: 4, md: 5, lg: 6 }} w="full">
            {clientLogos.map((logo) => (
              <Box
                key={logo.filename}
                display="flex"
                alignItems="center"
                justifyContent="center"
                minH={{ base: '68px', md: '96px', lg: '112px' }}
                px={{ base: 2, md: 4, lg: 5 }}
                py={{ base: 3, md: 4 }}
              >
                {nearViewport && (
                  <Box w="full" h={{ base: '36px', md: '56px', lg: '64px' }}>
                    <ResponsiveProjectImage
                      alt={`Client ${logo.id}`}
                      sources={logo.imageSources}
                      sizes="(min-width: 80em) 12vw, (min-width: 48em) 18vw, 28vw"
                      loading="lazy"
                      objectFit="contain"
                    />
                  </Box>
                )}
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}
