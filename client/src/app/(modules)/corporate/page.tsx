import { Metadata, Viewport } from 'next';
import CorporateLandingPage from '@/components/CorporateLandingPage';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pranavmahajan.com';

export const metadata: Metadata = {
  title: 'Corporate Keynotes & Executive Leadership Retreats | Pranav Mahajan',
  description:
    'Explore corporate keynotes and leadership experiences that help executives and teams build clarity, resilience, trust, and purposeful momentum at work.',
  keywords: [
    'Corporate Keynote Speaker India',
    'Corporate Leadership Keynote Speaker',
    'Executive Team Development',
    'Leadership Resilience Workshop',
    'Organisational Culture Keynote',
    'Pranav Mahajan Corporate Keynote',
  ],
  alternates: {
    canonical: `${siteUrl}/corporate`,
  },
  openGraph: {
    title: 'Corporate Keynotes & Executive Leadership Retreats | Pranav Mahajan',
    description:
      'People-centred leadership keynotes and team experiences for organisations navigating change, growth, and the demands of modern work.',
    url: `${siteUrl}/corporate`,
    siteName: 'Pranav Mahajan Official',
    locale: 'en_US',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#FFF4DC',
  width: 'device-width',
  initialScale: 1,
};

export default function CorporatePage() {
  return <CorporateLandingPage />;
}
