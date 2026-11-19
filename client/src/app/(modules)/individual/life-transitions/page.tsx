import type { Metadata } from 'next';
import TopicDetailView from '../components/TopicDetailView';
import { getTopicById } from '@/data/topicsData';

const SLUG = 'life-transitions';

export function generateMetadata(): Metadata {
  const topic = getTopicById(SLUG);
  return {
    title: `${topic?.title ?? 'Life Transitions'} | Pranav Mahajan`,
    description: topic?.tagline,
  };
}

export default function Page() {
  return <TopicDetailView slug={SLUG} />;
}
