import { Metadata } from 'next';
import PersonaSalesComingSoon from '@/components/PersonaSalesComingSoon';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pranavmahajan.com';

export const metadata: Metadata = {
  title: 'Student Transformation Hub & Peak Focus Masterclasses | Pranav Mahajan',
  description:
    'Dedicated portal for students seeking peak concentration, exam calm, subconscious learning techniques, and academic mindset mastery with Pranav Mahajan.',
  keywords: [
    'Pranav Mahajan Student Masterclass',
    'Student Mindset Coach',
    'Exam Anxiety Relief',
    'Peak Concentration for Students',
    'Youth Transformation Speaker',
    'Subconscious Learning Methods',
    'Pranav Mahajan Youth Keynote',
  ],
  alternates: {
    canonical: `${siteUrl}/student`,
  },
  openGraph: {
    title: 'Student Transformation Hub & Peak Focus Masterclasses | Pranav Mahajan',
    description:
      'Discover subconscious concentration tools, exam-anxiety elimination, and high-performance youth mindsets with Pranav Mahajan.',
    url: `${siteUrl}/student`,
    siteName: 'Pranav Mahajan Official',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Student Transformation Hub | Pranav Mahajan',
    description:
      'Peak concentration, exam calm, and subconscious learning tools curated by Pranav Mahajan.',
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
  return <PersonaSalesComingSoon persona="student" />;
}
