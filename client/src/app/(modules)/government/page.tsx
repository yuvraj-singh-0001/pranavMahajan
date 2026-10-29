import { Metadata } from 'next';
import PageSlider from '@/components/PageSlider';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pranavmahajan.com';

export const metadata: Metadata = {
  title: 'Government Department & Civil Service Keynotes | Pranav Mahajan',
  description:
    'Keynote addresses and leadership wellness retreats tailored for administrative cadres, ministry officials, and public sector conferences with Pranav Mahajan.',
  keywords: [
    'Government Keynote Speaker',
    'Civil Servant Leadership Summit',
    'Public Sector Keynote Speaker India',
    'Pranav Mahajan Government Keynote',
  ],
  alternates: {
    canonical: `${siteUrl}/government`,
  },
  openGraph: {
    title: 'Government Department & Civil Service Keynotes | Pranav Mahajan',
    description:
      'Statesmanship, public service wellness, and civil leadership keynotes by Pranav Mahajan.',
    url: `${siteUrl}/government`,
    siteName: 'Pranav Mahajan Official',
    locale: 'en_US',
    type: 'website',
  },
};

export default function GovernmentPage() {
  return <PageSlider initialPersona="government" />;
}
