'use client';

import { useEffect, useState, useRef } from 'react';
import {
  Box,
  Container,
  Flex,
  HStack,
  Text,
  Link,
  IconButton,
  VStack,
} from '@chakra-ui/react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useReducedMotion,
} from 'framer-motion';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { FiMenu, FiX } from 'react-icons/fi';
import { drawerVariants, navLinks, overlayVariants, safeTransition } from '@/lib/motion';
import { HEADER_HEIGHT } from '@/lib/spacing';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

export function SiteHeader() {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScroll = useRef(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      const previous = lastScroll.current;
      lastScroll.current = latest;
      setScrolled(latest > 40);
      if (reducedMotion) return;
      if (latest <= 80) {
        setHidden(false);
        return;
      }
      setHidden(latest > previous && latest > 160);
    });
  }, [scrollY, reducedMotion]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const closeMenu = () => setMenuOpen(false);

  const isLinkActive = (href: string) => {
    if (href === '/projects') return pathname === '/projects';
    if (href.startsWith('/#')) {
      return pathname === '/' && typeof window !== 'undefined' && window.location.hash === href.slice(1);
    }
    return pathname === href;
  };

  const headerBg = scrolled ? 'rgba(0, 0, 0, 0.96)' : 'transparent';
  const headerBorder = scrolled ? 'whiteAlpha.120' : 'transparent';

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
          y: hidden ? -80 : 0,
          backgroundColor: headerBg,
        }}
        transition={safeTransition(reducedMotion, {
          y: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
          backgroundColor: { duration: 0.45 },
        })}
        borderBottom="1px solid"
        borderColor={headerBorder}
        backdropFilter={scrolled ? 'blur(12px)' : 'none'}
      >
        <Container maxW="1440px">
          <Flex h={HEADER_HEIGHT} align="center" justify="space-between" gap={4}>
            <Link as={NextLink} href="/" _hover={{ textDecoration: 'none', opacity: 0.9 }} onClick={closeMenu}>
              <HStack spacing={3}>
                <HStack spacing={1}>
                  {[0, 1, 2, 3].map((i) => (
                    <Box
                      key={i}
                      w={{ base: '7px', md: '8px' }}
                      h={{ base: '7px', md: '8px' }}
                      borderRadius="full"
                      border="1.5px solid"
                      borderColor="dark.50"
                    />
                  ))}
                </HStack>
                <Text
                  fontSize={{ base: 'xs', md: 'sm' }}
                  fontWeight="600"
                  letterSpacing="0.12em"
                  textTransform="uppercase"
                  display={{ base: 'none', sm: 'block' }}
                >
                  CTR Infrastructure
                </Text>
              </HStack>
            </Link>

            <HStack spacing={{ base: 6, lg: 10 }} display={{ base: 'none', lg: 'flex' }}>
              {navLinks.map((item) => {
                const active = isLinkActive(item.href);
                return (
                  <Link
                    key={item.label}
                    as={NextLink}
                    href={item.href}
                    fontSize="sm"
                    fontWeight={active ? '600' : '400'}
                    color={active ? 'dark.50' : 'dark.200'}
                    _hover={{ color: 'dark.50', textDecoration: 'none' }}
                    transition="color 0.35s"
                  >
                    {item.label}
                  </Link>
                );
              })}
            </HStack>

            <IconButton
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              icon={menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
              variant="ghost"
              color="dark.50"
              minW="44px"
              minH="44px"
              display={{ base: 'flex', lg: 'none' }}
              onClick={() => setMenuOpen((open) => !open)}
              _hover={{ bg: 'whiteAlpha.100' }}
            />
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
              bg="blackAlpha.800"
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
              w="min(100vw, 360px)"
              direction="column"
              bg="dark.900"
              px={8}
              py={10}
              pt={20}
              variants={drawerVariants}
              initial="closed"
              animate="open"
              exit="exit"
            >
              <Flex justify="space-between" align="center" mb={10}>
                <Text fontSize="xs" fontWeight="600" letterSpacing="0.1em" textTransform="uppercase" color="dark.300">
                  Menu
                </Text>
                <IconButton
                  aria-label="Close menu"
                  icon={<FiX size={22} />}
                  variant="ghost"
                  minW="44px"
                  minH="44px"
                  onClick={closeMenu}
                />
              </Flex>

              <VStack align="stretch" spacing={0} flex={1}>
                {navLinks.map((item, index) => (
                  <MotionBox
                    key={item.label}
                    initial={reducedMotion ? false : { opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: reducedMotion ? 0 : 0.04 + index * 0.07,
                      duration: 0.45,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    borderBottom="1px solid"
                    borderColor="whiteAlpha.80"
                  >
                    <Link
                      as={NextLink}
                      href={item.href}
                      display="flex"
                      alignItems="center"
                      py={5}
                      fontSize="lg"
                      fontWeight="400"
                      color="dark.50"
                      onClick={closeMenu}
                      _hover={{ textDecoration: 'none', opacity: 0.8 }}
                    >
                      {item.label}
                    </Link>
                  </MotionBox>
                ))}
              </VStack>
            </MotionFlex>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
