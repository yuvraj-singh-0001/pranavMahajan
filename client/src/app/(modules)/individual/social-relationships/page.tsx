import type { Metadata } from 'next';
import SocialRelationshipsView from '../components/SocialRelationshipsView';
import { getTopicById } from '@/data/topicsData';

const SLUG = 'social-relationships';

export function generateMetadata(): Metadata {
  const topic = getTopicById(SLUG);
  return {
    title: `${topic?.title ?? 'Social Relationships & Reputation'} | Pranav Mahajan`,
    description: topic?.tagline,
  };
}

export default function Page() {
  return <SocialRelationshipsView />;
}
