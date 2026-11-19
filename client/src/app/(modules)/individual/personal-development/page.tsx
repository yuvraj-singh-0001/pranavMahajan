import type { Metadata } from 'next';
import TopicDetailView from '../components/TopicDetailView';
import { getTopicById } from '@/data/topicsData';

const SLUG = 'personal-development';

export function generateMetadata(): Metadata {
  const topic = getTopicById(SLUG);
  return {
    title: `${topic?.title ?? 'Personal Development'} | Pranav Mahajan`,
    description: topic?.tagline,
  };
}

export default function Page() {
  return <TopicDetailView slug={SLUG} />;
}
