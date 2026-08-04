'use client';

import { useEffect, useState, useRef } from 'react';
import {
  Box,
  Container,
  Flex,
  HStack,
  Text,
  Link,
  Button,
  IconButton,
  VStack,
} from '@chakra-ui/react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useReducedMotion,
} from 'framer-motion';
import { FiArrowRight, FiMenu, FiX } from 'react-icons/fi';
import { drawerVariants, navLinks, overlayVariants, safeTransition } from '@/lib/motion';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

type SiteHeaderProps = {
  ctaHref?: string;
  ctaLabel?: string;
};

export function SiteHeader({
  ctaHref = '#contact',
  ctaLabel = 'Start a project',
}: SiteHeaderProps) {
  const reducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const lastScroll = useRef(0);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      const previous = lastScroll.current;
      lastScroll.current = latest;
      if (latest <= 80) {
        setHidden(false);
        setScrolled(false);
        return;
      }
      setScrolled(true);
      if (reducedMotion) return;
      setHidden(latest > previous && latest > 120);
    });
  }, [scrollY, reducedMotion]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <MotionBox
        as="header"
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={100}
        initial={false}
        animate={{
          y: hidden ? -88 : 0,
          backgroundColor: scrolled
            ? 'rgba(24, 29, 37, 0.97)'
            : 'rgba(24, 29, 37, 0.88)',
        }}
        transition={safeTransition(reducedMotion, {
          y: { duration: 0.28, ease: [0.4, 0, 0.2, 1] },
          backgroundColor: { duration: 0.25 },
        })}
        backdropFilter="blur(16px)"
        borderBottom="1px solid"
        borderColor="whiteAlpha.150"
        boxShadow="0 1px 0 rgba(255,255,255,0.04) inset"
      >
        <Container maxW="container.xl">
          <Flex h="80px" align="center" justify="space-between">
            <Link href="/" _hover={{ textDecoration: 'none' }} onClick={closeMenu}>
              <HStack spacing={3}>
                <Box
                  w="40px"
                  h="40px"
                  bg="brand.500"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontFamily="heading"
                  fontSize="xl"
                  fontWeight="600"
                  color="white"
                >
                  C
                </Box>
                <Text
                  fontFamily="heading"
                  fontSize="xl"
                  fontWeight="500"
                  letterSpacing="0.03em"
                >
                  CTR Infrastructure
                </Text>
              </HStack>
            </Link>

            <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  fontSize="sm"
                  fontWeight="500"
                  letterSpacing="0.04em"
                  color="dark.200"
                  _hover={{ color: 'dark.50' }}
                  transition="color 0.2s"
                >
                  {item.label}
                </Link>
              ))}
            </HStack>

            <HStack spacing={2}>
              <Button
                as="a"
                href={ctaHref}
                variant="outline"
                size="sm"
                display={{ base: 'none', lg: 'flex' }}
                minH="44px"
                rightIcon={<FiArrowRight />}
              >
                {ctaLabel}
              </Button>

              <IconButton
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                icon={menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
                variant="ghost"
                color="dark.100"
                minW="44px"
                minH="44px"
                display={{ base: 'flex', md: 'none' }}
                onClick={() => setMenuOpen((open) => !open)}
                _hover={{ bg: 'whiteAlpha.100' }}
              />
            </HStack>
          </Flex>
        </Container>
      </MotionBox>

      <AnimatePresence>
        {menuOpen && (
          <>
            <MotionBox
              position="fixed"
              inset={0}
              zIndex={110}
              bg="blackAlpha.700"
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="exit"
              onClick={closeMenu}
            />
            <MotionFlex
              as="nav"
              aria-label="Mobile navigation"
              position="fixed"
              top={0}
              right={0}
              bottom={0}
              zIndex={120}
              w="min(100vw, 320px)"
              direction="column"
              bg="dark.800"
              borderLeft="1px solid"
              borderColor="whiteAlpha.100"
              px={8}
              py={10}
              variants={drawerVariants}
              initial="closed"
              animate="open"
              exit="exit"
            >
              <Flex justify="space-between" align="center" mb={10}>
                <Text variant="eyebrow">Menu</Text>
                <IconButton
                  aria-label="Close menu"
                  icon={<FiX size={22} />}
                  variant="ghost"
                  minW="44px"
                  minH="44px"
                  onClick={closeMenu}
                />
              </Flex>

              <VStack align="stretch" spacing={2} flex={1}>
                {navLinks.map((item, index) => (
                  <MotionBox
                    key={item.label}
                    initial={reducedMotion ? false : { opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: reducedMotion ? 0 : 0.05 + index * 0.06,
                      duration: 0.3,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={item.href}
                      display="block"
                      py={3}
                      fontSize="lg"
                      fontWeight="500"
                      color="dark.50"
                      minH="44px"
                      onClick={closeMenu}
                      _hover={{ color: 'brand.300' }}
                    >
                      {item.label}
                    </Link>
                  </MotionBox>
                ))}
              </VStack>

              <Button
                as="a"
                href={ctaHref}
                w="full"
                size="lg"
                minH="48px"
                bg="brand.600"
                color="white"
                _hover={{ bg: 'brand.500' }}
                rightIcon={<FiArrowRight />}
                onClick={closeMenu}
                mt={6}
              >
                {ctaLabel}
              </Button>
            </MotionFlex>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
