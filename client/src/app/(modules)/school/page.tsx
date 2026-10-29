import { Metadata } from 'next';
import PageSlider from '@/components/PageSlider';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pranavmahajan.com';

export const metadata: Metadata = {
  title: 'School & College Keynotes & Institutional Summits | Pranav Mahajan',
  description:
    'Official booking portal for School Principals, Deans, and Campus Curators to book Pranav Mahajan for annual day keynotes, faculty retreats, and youth assemblies.',
  keywords: [
    'School Keynote Speaker',
    'College Convocation Speaker India',
    'Pranav Mahajan School Keynotes',
    'Institutional Youth Summits',
    'Campus Motivation Speaker',
    'Faculty Wellness Retreats',
    'Student Screen Addiction Workshop',
  ],
  alternates: {
    canonical: `${siteUrl}/school`,
  },
  openGraph: {
    title: 'School & College Keynotes & Institutional Summits | Pranav Mahajan',
    description:
      'High-impact annual assemblies, faculty wellness, and youth resilience programs for institutions by Pranav Mahajan.',
    url: `${siteUrl}/school`,
    siteName: 'Pranav Mahajan Official',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'School & College Keynotes | Pranav Mahajan',
    description:
      'Transforming campus culture and empowering tomorrow leaders with Pranav Mahajan.',
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

export default function SchoolPage() {
  return <PageSlider initialPersona="school" />;
}
