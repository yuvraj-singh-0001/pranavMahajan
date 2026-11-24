import type { Metadata } from 'next';
import LifeTransitionsView from '../components/LifeTransitionsView';
import { getTopicById } from '@/data/topicsData';

const SLUG = 'life-transitions';

export function generateMetadata(): Metadata {
  const topic = getTopicById(SLUG);
  return {
    title: `${topic?.title ?? 'Life Transitions, Adversity & Resilience'} | Pranav Mahajan`,
    description: topic?.tagline,
  };
}

export default function Page() {
  return <LifeTransitionsView />;
}

