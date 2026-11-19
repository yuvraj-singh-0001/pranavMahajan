import type { Metadata } from 'next';
import HealthWellbeingView from '../components/HealthWellbeingView';
import { getTopicById } from '@/data/topicsData';

const SLUG = 'health-wellbeing';

export function generateMetadata(): Metadata {
  const topic = getTopicById(SLUG);
  return {
    title: `Health and Wellbeing | Pranav Mahajan`,
    description: topic?.tagline ?? 'Cultivate physical vitality, emotional calm, and sustainable daily balance.',
  };
}

export default function Page() {
  return <HealthWellbeingView />;
}
