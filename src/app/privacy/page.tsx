'use client';

import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SiteFooter } from '@/components/SiteFooter';
import { pageTopPad, sectionPy } from '@/lib/spacing';

const sections = [
  {
    title: 'Information we collect',
    body: 'When you submit an enquiry through this website, we collect the information you provide directly — such as your name, email address, and message. We do not knowingly collect sensitive personal information through this site.',
  },
  {
    title: 'How we use your information',
    body: 'We use the information you submit solely to respond to your enquiry, discuss potential projects, and maintain records of our correspondence. We do not sell or rent your personal information to third parties.',
  },
  {
    title: 'Third-party services',
    body: 'Enquiry form submissions are processed by Formspree, a third-party form-handling service, which delivers your message to our team by email. Formspree processes this data on our behalf under its own privacy policy. We do not currently use website analytics or advertising cookies.',
  },
  {
    title: 'Data retention',
    body: 'We retain enquiry correspondence for as long as reasonably necessary to respond to your request and maintain business records, after which it is deleted or anonymized.',
  },
  {
    title: 'Your rights',
    body: 'You may request access to, correction of, or deletion of personal information you have submitted to us by contacting hello@ctrinfrastructure.com. We will respond to verified requests within a reasonable timeframe.',
  },
  {
    title: 'Contact us',
    body: 'Questions about this policy can be directed to hello@ctrinfrastructure.com.',
  },
];

export default function PrivacyPage() {
  return (
    <Box as="main" bg="dark.900" overflowX="hidden">
      <Box pt={pageTopPad} pb={sectionPy}>
        <Container maxW="800px">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]} />

          <VStack align="flex-start" spacing={5} mb={{ base: 10, md: 14 }}>
            <Text variant="caption">Legal</Text>
            <Heading fontSize="display-lg" fontWeight="300" lineHeight="1.1">
              Privacy Policy
            </Heading>
            <Text variant="lead" maxW="none">
              Last updated August 10, 2026. This policy explains how CTR
              Infrastructure handles personal information submitted through
              ctrinfrastructure.com.
            </Text>
          </VStack>

          <VStack align="flex-start" spacing={10}>
            {sections.map((section) => (
              <Box key={section.title}>
                <Heading fontSize="lg" fontWeight="500" mb={3}>
                  {section.title}
                </Heading>
                <Text color="dark.200" lineHeight="1.7">
                  {section.body}
                </Text>
              </Box>
            ))}
          </VStack>
        </Container>
      </Box>

      <SiteFooter />
    </Box>
  );
}
