import { Metadata } from 'next';
import PersonaSalesComingSoon from '@/components/PersonaSalesComingSoon';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pranavmahajan.com';

export const metadata: Metadata = {
  title: 'Conscious Parenting Blueprints & Family Resilience | Pranav Mahajan',
  description:
    'Dedicated portal for parents seeking mindful communication, practical screen addiction protocols, and emotional resilience masterclasses by Pranav Mahajan.',
  keywords: [
    'Conscious Parenting Speaker',
    'Parenting Masterclass Pranav Mahajan',
    'Child Screen Addiction Solution',
    'Teenage Communication Coaching',
    'Family Emotional Resilience Workshop',
    'Mindful Parenting Guide',
  ],
  alternates: {
    canonical: `${siteUrl}/parent`,
  },
  openGraph: {
    title: 'Conscious Parenting Blueprints & Family Resilience | Pranav Mahajan',
    description:
      'Nurturing emotionally resilient, purpose-driven children with Pranav Mahajan conscious parenting frameworks.',
    url: `${siteUrl}/parent`,
    siteName: 'Pranav Mahajan Official',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Conscious Parenting Blueprints | Pranav Mahajan',
    description:
      'Nurture emotionally resilient, purpose-driven children without conflict with Pranav Mahajan.',
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

export default function ParentPage() {
  return <PersonaSalesComingSoon persona="parent" />;
}
