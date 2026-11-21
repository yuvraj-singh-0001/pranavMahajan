import type { Metadata } from 'next';
import StudentLifeView from '../components/StudentLifeView';
import { getTopicById } from '@/data/topicsData';

const SLUG = 'student-life';

export function generateMetadata(): Metadata {
  const topic = getTopicById(SLUG);
  return {
    title: `${topic?.title ?? 'Student Life and Youth Development'} | Pranav Mahajan`,
    description: topic?.tagline,
  };
}

export default function Page() {
  return <StudentLifeView />;
}

