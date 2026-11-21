import type { Metadata } from 'next';
import ProfessionalDevelopmentView from '../components/ProfessionalDevelopmentView';
import { getTopicById } from '@/data/topicsData';

const SLUG = 'professional-development';

export function generateMetadata(): Metadata {
  const topic = getTopicById(SLUG);
  return {
    title: `${topic?.title ?? 'Professional Development, Career Growth & Financial Well-Being'} | Pranav Mahajan`,
    description: topic?.tagline,
  };
}

export default function Page() {
  return <ProfessionalDevelopmentView />;
}

