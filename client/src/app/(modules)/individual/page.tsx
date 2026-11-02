import type { Metadata, Viewport } from 'next';
import IndividualLandingPage from '@/components/IndividualLandingPage';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pranavmahajan.com';

export const metadata: Metadata = {
  title: 'Personal Growth & Mindset Mentorship',
  description:
    'Explore personal growth mentorship with Pranav Mahajan. Build clarity, resilience, and purposeful habits at every age and life stage.',
  keywords: [
    'personal growth mentorship',
    'mindset mentor for individuals',
    'personal clarity and resilience',
    'purposeful habits and self development',
    'life stage personal growth',
    'Pranav Mahajan personal growth',
  ],
  alternates: {
    canonical: `${siteUrl}/individual`,
  },
  openGraph: {
    title: 'Personal Growth & Mindset Mentorship | Pranav Mahajan',
    description:
      'A thoughtful space to build personal clarity, resilience, and purposeful habits with Pranav Mahajan.',
    url: `${siteUrl}/individual`,
    siteName: 'Pranav Mahajan Official',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Personal Growth & Mindset Mentorship | Pranav Mahajan',
    description:
      'Explore personal growth for every age, background, and life stage with Pranav Mahajan.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#F7F1E5',
  width: 'device-width',
  initialScale: 1,
};

export default function IndividualPage() {
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Personal Growth & Mindset Mentorship',
    url: `${siteUrl}/individual`,
    description:
      'A thoughtful space to build personal clarity, resilience, and purposeful habits at every age and life stage.',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Pranav Mahajan Official',
      url: siteUrl,
    },
    about: {
      '@type': 'Person',
      name: 'Pranav Mahajan',
      url: siteUrl,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <IndividualLandingPage />
    </>
  );
}
