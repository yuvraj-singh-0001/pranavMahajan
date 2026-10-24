import LishbosExperience from '@/components/LishbosExperience';

export default function Home() {
  return (
    <main className="w-screen h-screen overflow-hidden bg-[#fffcf7] text-slate-800">
      {/* 
        Exact Replica of lishbostechnologies.com Architecture:
        - Side-sweep white/gold board (#white-board) sweeping across on scroll
        - Staggered animated typography text-reveal (line-mask)
        - SVG Graphic with live glowing animation INSIDE the cutout words & symbols
        - Shifting giant background watermark text (lishbos-bg-text)
        - Lishbos styled button with circular hover rings
        - Fullscreen overlay menu & responsive wheel navigation
      */}
      <LishbosExperience />
    </main>
  );
}
