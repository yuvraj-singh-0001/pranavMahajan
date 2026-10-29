import { Metadata } from 'next';
import PageSlider from '@/components/PageSlider';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pranavmahajan.com';

export const metadata: Metadata = {
  title: 'Executive Life Architecture & 1-on-1 Coaching | Pranav Mahajan',
  description:
    'Dedicated portal for entrepreneurs, corporate leaders, and seekers booking private 1-on-1 life architecture immersions and burnout transcendence with Pranav Mahajan.',
  keywords: [
    'Executive Life Coach India',
    'Mindset Architect Pranav Mahajan',
    '1-on-1 Life Architecture',
    'Leadership Transformation Coach',
    'Burnout Transcendence Keynote',
    'High Performance Mindset Mastery',
  ],
  alternates: {
    canonical: `${siteUrl}/individual`,
  },
  openGraph: {
    title: 'Executive Life Architecture & 1-on-1 Coaching | Pranav Mahajan',
    description:
      'Transcending limitations, stress, and unlocking peak potential with bespoke 1-on-1 life architecture immersions by Pranav Mahajan.',
    url: `${siteUrl}/individual`,
    siteName: 'Pranav Mahajan Official',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Executive Life Architecture | Pranav Mahajan',
    description:
      'Private 1-on-1 life architecture and peak human potential immersions with Pranav Mahajan.',
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

export default function IndividualPage() {
  return <PageSlider initialPersona="individual" />;
}
