import type { Metadata } from 'next';
import SpiritualityPhilosophyView from '../components/SpiritualityPhilosophyView';
import { getTopicById } from '@/data/topicsData';

const SLUG = 'spirituality-philosophy';

export function generateMetadata(): Metadata {
  const topic = getTopicById(SLUG);
  return {
    title: `${topic?.title ?? 'Spirituality, Metaphysics, Philosophy & Existence'} | Pranav Mahajan`,
    description: topic?.tagline,
  };
}

export default function Page() {
  return <SpiritualityPhilosophyView />;
}

