import type { Metadata } from 'next';
import TechnologyLiteracyView from '../components/TechnologyLiteracyView';
import { getTopicById } from '@/data/topicsData';

const SLUG = 'technology-literacy';

export function generateMetadata(): Metadata {
  const topic = getTopicById(SLUG);
  return {
    title: `${topic?.title ?? 'Technology & AI Literacy'} | Pranav Mahajan`,
    description: topic?.tagline,
  };
}

export default function Page() {
  return <TechnologyLiteracyView />;
}
