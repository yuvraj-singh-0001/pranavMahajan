import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTopicById, getAllTopicSlugs } from '@/data/topicsData';
import TopicDetailView from '../components/TopicDetailView';

interface TopicPageProps {
  params: Promise<{ topic: string }>;
}

export function generateStaticParams() {
  return getAllTopicSlugs().map((slug) => ({ topic: slug }));
}

export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
  const { topic: slug } = await params;
  const topic = getTopicById(slug);
  if (!topic) {
    return { title: 'Topic Not Found | Pranav Mahajan' };
  }

  return {
    title: `${topic.title} | Personal Growth Mentorship with Pranav Mahajan`,
    description: topic.tagline,
    openGraph: {
      title: `${topic.title} | Pranav Mahajan`,
      description: topic.summary,
    },
  };
}

export default function TopicPage({ params }: TopicPageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FBF7EE]" />}>
      <TopicPageContent params={params} />
    </Suspense>
  );
}

async function TopicPageContent({ params }: TopicPageProps) {
  const { topic: slug } = await params;
  const topic = getTopicById(slug);

  if (!topic) {
    notFound();
  }

  return <TopicDetailView slug={slug} />;
}
