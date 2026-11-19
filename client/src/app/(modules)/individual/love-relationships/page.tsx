import type { Metadata } from 'next';
import LoveRelationshipsView from '../components/LoveRelationshipsView';
import { getTopicById } from '@/data/topicsData';

const SLUG = 'love-relationships';

export function generateMetadata(): Metadata {
  const topic = getTopicById(SLUG);
  return {
    title: `Love, Relationships, Marriage & Family Dynamics | Pranav Mahajan`,
    description: topic?.tagline ?? 'Build deeper intimacy, mutual trust, and healthy emotional boundaries.',
  };
}

export default function Page() {
  return <LoveRelationshipsView />;
}
