import type { Metadata } from 'next';
import ParentingChildView from '../components/ParentingChildView';
import { getTopicById } from '@/data/topicsData';

const SLUG = 'parenting-child';

export function generateMetadata(): Metadata {
  const topic = getTopicById(SLUG);
  return {
    title: `Parenting and Child Development | Pranav Mahajan`,
    description: topic?.tagline ?? 'Transform daily friction into lifelong self-trust through connection over control.',
  };
}

export default function Page() {
  return <ParentingChildView />;
}
