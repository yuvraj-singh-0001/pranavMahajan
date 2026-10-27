import { Metadata } from 'next';
import PersonaSalesComingSoon from '@/components/PersonaSalesComingSoon';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pranavmahajan.com';

export const metadata: Metadata = {
  title: 'NGO & Social Sector Transformation Keynotes | Pranav Mahajan',
  description:
    'Dedicated portal for non-profit foundations, humanitarian organizations, and grassroots leaders booking Pranav Mahajan for youth awakening and social impact assemblies.',
  keywords: [
    'NGO Keynote Speaker',
    'Social Sector Motivational Speaker',
    'Youth Empowerment Keynotes',
    'Philanthropic Summit Addresses',
    'Pranav Mahajan Social Impact',
  ],
  alternates: {
    canonical: `${siteUrl}/ngo`,
  },
  openGraph: {
    title: 'NGO & Social Sector Transformation Keynotes | Pranav Mahajan',
    description:
      'Grassroots transformation, community healing, and purpose-driven keynotes by Pranav Mahajan.',
    url: `${siteUrl}/ngo`,
    siteName: 'Pranav Mahajan Official',
    locale: 'en_US',
    type: 'website',
  },
};

export default function NgoPage() {
  return <PersonaSalesComingSoon persona="ngo" />;
}
