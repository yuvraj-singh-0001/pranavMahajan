import type { Metadata } from 'next';
import TopicDetailView from '../components/TopicDetailView';
import { getTopicById } from '@/data/topicsData';

const SLUG = 'health-wellbeing';

export function generateMetadata(): Metadata {
  const topic = getTopicById(SLUG);
  return {
    title: `${topic?.title ?? 'Health and Wellbeing'} | Pranav Mahajan`,
    description: topic?.tagline,
  };
}

export default function Page() {
  return <TopicDetailView slug={SLUG} />;
}
