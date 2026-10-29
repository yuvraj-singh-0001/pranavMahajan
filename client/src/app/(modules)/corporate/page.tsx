import { Metadata } from 'next';
import PageSlider from '@/components/PageSlider';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pranavmahajan.com';

export const metadata: Metadata = {
  title: 'Corporate Keynotes & Executive Leadership Retreats | Pranav Mahajan',
  description:
    'Dedicated corporate portal for enterprise leaders, C-suite executives, and organizational summits seeking keynote addresses on leadership stillness, burnout immunity, and vision alignment.',
  keywords: [
    'Corporate Keynote Speaker India',
    'Executive Leadership Coach',
    'Burnout Immunity Retreat',
    'Enterprise Motivation Speaker',
    'Pranav Mahajan Corporate Keynote',
  ],
  alternates: {
    canonical: `${siteUrl}/corporate`,
  },
  openGraph: {
    title: 'Corporate Keynotes & Executive Leadership Retreats | Pranav Mahajan',
    description:
      'High-performance corporate keynotes, strategic leadership retreats, and executive stillness architecture by Pranav Mahajan.',
    url: `${siteUrl}/corporate`,
    siteName: 'Pranav Mahajan Official',
    locale: 'en_US',
    type: 'website',
  },
};

export default function CorporatePage() {
  return <PageSlider initialPersona="corporate" />;
}
