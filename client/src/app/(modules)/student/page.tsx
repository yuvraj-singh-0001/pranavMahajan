import type { Metadata, Viewport } from 'next';
import StudentLandingPage from '@/components/StudentLandingPage';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pranavmahajan.com';

export const viewport: Viewport = {
  themeColor: '#F5FFF8',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Student Focus & Exam Confidence',
  description:
    'Help students build focus, exam confidence, and a resilient learning mindset with Pranav Mahajan. Explore practical mentorship for student growth and wellbeing.',
  keywords: [
    'student focus mentorship',
    'exam confidence for students',
    'student mindset and wellbeing',
    'study focus and concentration',
    'youth mindset mentor',
    'student growth programme',
    'Pranav Mahajan student keynote',
  ],
  alternates: {
    canonical: `${siteUrl}/student`,
  },
  openGraph: {
    title: 'Student Focus, Exam Confidence & Mindset Mentorship | Pranav Mahajan',
    description:
      'A student growth experience to strengthen focus, confidence, and a healthier mindset around learning and exams.',
    url: `${siteUrl}/student`,
    siteName: 'Pranav Mahajan Official',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Student Focus & Exam Confidence | Pranav Mahajan',
    description:
      'Explore practical mindset mentorship for student focus, exam confidence, and personal growth with Pranav Mahajan.',
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

export default function StudentPage() {
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Student Focus, Exam Confidence & Mindset Mentorship',
    url: `${siteUrl}/student`,
    description:
      'A student growth experience to strengthen focus, confidence, and a healthier mindset around learning and exams.',
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
      <StudentLandingPage />
    </>
  );
}
