import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'CTR Infrastructure traces its legacy to the 1960s and was formally established in 1990. Today the firm is a multidisciplinary architecture and engineering practice working across South India, led by Er. C. Thillairajan.',
  openGraph: {
    title: 'About Us | CTR Infrastructure',
    description: 'A legacy spanning more than 60 years — from Er. T.C. Chinnamuthu’s pioneering work in the 1960s to CTR Infrastructure’s multidisciplinary practice today.',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
