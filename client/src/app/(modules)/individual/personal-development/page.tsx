import type { Metadata } from 'next';
import PersonalDevelopmentView from '../components/PersonalDevelopmentView';
import { getTopicById } from '@/data/topicsData';

const SLUG = 'personal-development';

export function generateMetadata(): Metadata {
  const topic = getTopicById(SLUG);
  return {
    title: `Personal Development | Pranav Mahajan`,
    description: topic?.tagline ?? 'Master habits, sharpen focus, and unlock your highest personal potential.',
  };
}

export default function Page() {
  return <PersonalDevelopmentView />;
}
