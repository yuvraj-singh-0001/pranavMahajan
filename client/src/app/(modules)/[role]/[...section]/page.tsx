import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import CorporateLandingPage from '@/components/CorporateLandingPage';
import IndividualLandingPage from '@/components/IndividualLandingPage';
import PageSlider from '@/components/PageSlider';
import StudentLandingPage from '@/components/StudentLandingPage';
import type { PersonaType } from '@/components/Identify';

const roles: PersonaType[] = ['student', 'individual', 'school', 'corporate', 'government', 'ngo', 'parent'];

export default function RoleSectionPage({
  params,
}: {
  params: Promise<{ role: string; section: string[] }>;
}) {
  return (
    <Suspense fallback={<RoleSectionFallback />}>
      <RoleSectionContent params={params} />
    </Suspense>
  );
}

async function RoleSectionContent({
  params,
}: {
  params: Promise<{ role: string; section: string[] }>;
}) {
  const { role, section } = await params;
  if (!roles.includes(role as PersonaType)) notFound();

  const initialSection = section[0];
  switch (role as PersonaType) {
    case 'student':
      return <StudentLandingPage initialSection={initialSection} />;
    case 'individual':
      return <IndividualLandingPage initialSection={initialSection} />;
    case 'corporate':
      return <CorporateLandingPage initialSection={initialSection} />;
    default:
      return <PageSlider initialPersona={role as PersonaType} initialSection={initialSection} />;
  }
}

function RoleSectionFallback() {
  return (
    <main className="grid min-h-dvh place-items-center bg-[#F7F1E5] px-6 text-[#163D29]">
      <p className="animate-pulse font-mono text-xs font-semibold uppercase tracking-[0.24em]">Opening your experience...</p>
    </main>
  );
}
