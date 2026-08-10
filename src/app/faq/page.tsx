'use client';

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import { motion, useReducedMotion } from 'framer-motion';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { LearnMoreLink } from '@/components/audi/LearnMoreLink';
import { SiteFooter } from '@/components/SiteFooter';
import { heroItem, heroStagger } from '@/lib/motion';
import { pageTopPad, sectionPy } from '@/lib/spacing';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

const faqs = [
  {
    question: 'What services does CTR Infrastructure provide?',
    answer:
      'We offer architecture, infrastructure engineering, and strategic urban planning under one integrated team — covering everything from early feasibility studies through construction administration.',
  },
  {
    question: 'What kind of projects do you take on?',
    answer:
      'Commercial, residential, civic, and infrastructure work, including transit systems, bridges, and urban frameworks. Browse our project portfolio to see recent work across each category.',
  },
  {
    question: 'Where are you based, and what regions do you work in?',
    answer:
      'We are headquartered in Vancouver, BC, and have delivered 150+ projects across Canada and select international markets in 12 countries over the past 25 years.',
  },
  {
    question: 'How long does a typical project take?',
    answer:
      'Timelines vary by scope and sector — a feasibility study can take a few weeks, while a full commercial or infrastructure commission typically spans 12–36 months from concept to completion. We outline a project-specific timeline once we understand your brief.',
  },
  {
    question: 'How quickly will you respond to an enquiry?',
    answer:
      'We respond to every enquiry within 24 hours with next steps, and typically outline scope, team, and estimated timeline shortly after an initial call.',
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export default function FaqPage() {
  const reducedMotion = useReducedMotion();

  return (
    <Box as="main" bg="dark.900" overflowX="hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Box pt={pageTopPad} pb={sectionPy}>
        <Container maxW="1000px">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'FAQs' }]} />

          <MotionVStack
            align="flex-start"
            spacing={{ base: 5, md: 6 }}
            maxW="36rem"
            variants={heroStagger}
            initial={reducedMotion ? false : 'hidden'}
            animate="visible"
            mb={{ base: 10, md: 14 }}
          >
            <MotionBox variants={heroItem}>
              <Text variant="caption">Frequently asked questions</Text>
            </MotionBox>
            <MotionBox variants={heroItem}>
              <Heading fontSize="display-lg" fontWeight="300" lineHeight="1.1">
                Answers before you reach out
              </Heading>
            </MotionBox>
            <MotionBox variants={heroItem}>
              <Text variant="lead" maxW="none">
                Common questions about how we work, where we operate, and what to
                expect after you get in touch.
              </Text>
            </MotionBox>
          </MotionVStack>

          <Accordion allowToggle>
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.question}
                borderColor="whiteAlpha.120"
                _first={{ borderTopWidth: '1px' }}
              >
                <h3>
                  <AccordionButton py={5} _hover={{ bg: 'whiteAlpha.50' }}>
                    <Text flex="1" textAlign="left" fontSize="md" fontWeight="500" color="dark.50">
                      {faq.question}
                    </Text>
                    <AccordionIcon color="dark.200" />
                  </AccordionButton>
                </h3>
                <AccordionPanel pb={6} color="dark.200" lineHeight="1.7">
                  {faq.answer}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>

          <Box mt={{ base: 10, md: 14 }}>
            <Text variant="body" mb={4}>
              Still have questions?
            </Text>
            <LearnMoreLink href="/#contact">Get in touch</LearnMoreLink>
          </Box>
        </Container>
      </Box>

      <SiteFooter />
    </Box>
  );
}
