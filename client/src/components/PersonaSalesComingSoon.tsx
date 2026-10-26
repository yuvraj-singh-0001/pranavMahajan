'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  School,
  Heart,
  UserCheck,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Mail,
  Send,
  CheckCircle2,
  Clock,
  ShieldCheck,
  MessageCircle,
} from 'lucide-react';

export type PersonaType = 'student' | 'school' | 'parent' | 'individual';

interface PersonaSalesComingSoonProps {
  persona: PersonaType;
}

const PERSONA_CONFIG: Record<
  PersonaType,
  {
    badge: string;
    title: string;
    subtitle: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    features: { title: string; desc: string }[];
    whatsappPrefill: string;
  }
> = {
  student: {
    badge: 'Student Empowerment Hub',
    title: 'Peak Focus, Exam Calm & Mindset Architecture',
    subtitle: 'Dedicated portal, student courses & masterclasses launching soon.',
    description:
      'We are curating a high-impact transformation portal designed exclusively for school and college seekers. Discover subconscious concentration tools, anxiety-elimination frameworks, and purpose-alignment strategies.',
    icon: GraduationCap,
    features: [
      {
        title: '10x Retention & Concentration Blueprints',
        desc: 'Subconscious neuro-focus methods to eliminate digital distractions and retain complex concepts effortlessly.',
      },
      {
        title: 'Exam Pressure & Self-Doubt Neutralizer',
        desc: 'Mindset protocols that transform performance anxiety into calm, laser-sharp confidence on test day.',
      },
      {
        title: 'Career Purpose & Inner Fire Discovery',
        desc: 'Direct alignment techniques to find clarity in life direction and lead with self-belief.',
      },
    ],
    whatsappPrefill: 'Hi Pranav Mahajan Team, I am interested in upcoming Student Masterclasses and Keynotes.',
  },
  school: {
    badge: 'Campus & Institution Keynotes',
    title: 'High-Voltage Assemblies & Institutional Transformation',
    subtitle: 'Official booking dossiers, keynote curricula & leadership summits launching soon.',
    description:
      'A dedicated platform for School Principals, Deans, University Directors, and Summit Curators to review annual day keynote tracks, faculty wellness retreats, and student resilience summits.',
    icon: School,
    features: [
      {
        title: 'High-Impact Annual Day & Convocation Keynotes',
        desc: 'Electrifying stage addresses that inspire thousands of youth, faculty, and visiting dignitaries.',
      },
      {
        title: 'Compassionate Educational Leadership & Faculty Retreats',
        desc: 'Burnout relief and purpose revival sessions for educators shaping the next generation.',
      },
      {
        title: 'Campus-Wide Youth Resilience Against Screen Addiction',
        desc: 'Institution-scale workshops to reclaim attention, discipline, and emotional balance.',
      },
    ],
    whatsappPrefill: 'Hi Pranav Mahajan Office, I am reaching out from an educational institution for keynote booking.',
  },
  parent: {
    badge: 'Conscious Parenting Blueprint',
    title: 'Nurturing Emotionally Resilient & Purpose-Driven Children',
    subtitle: 'Parenting masterclasses, family harmony guides & workshops launching soon.',
    description:
      'Dedicated space for modern parents seeking deep emotional connection, mindful communication, and practical tools to guide children through modern digital overwhelm and academic pressure.',
    icon: Heart,
    features: [
      {
        title: 'Deep Connection Without Nagging or Conflict',
        desc: 'Transformative communication frameworks that make children listen willingly and share openly.',
      },
      {
        title: 'Holistic Screen Addiction & Behavioral Protocol',
        desc: 'Practical boundaries and dopamine regulation techniques that inspire self-governed discipline.',
      },
      {
        title: 'Emotional Resilience & Peer Pressure Armor',
        desc: 'Equip your child with emotional grounding so they thrive in high-pressure social environments.',
      },
    ],
    whatsappPrefill: 'Hi Pranav Mahajan Team, I am a parent interested in your Conscious Parenting Masterclasses.',
  },
  individual: {
    badge: 'Executive Mindset & Life Mastery',
    title: 'Transcending Limitations, Stress & Unlocking Peak Potential',
    subtitle: '1-on-1 life architecture immersions & executive coaching launching soon.',
    description:
      'A bespoke portal for entrepreneurs, corporate leaders, artists, and seekers wanting private life architecture sessions, deep subconscious rewiring, and burnout transcendence.',
    icon: UserCheck,
    features: [
      {
        title: 'Subconscious Reprogramming & Inner Stillness',
        desc: 'Transcend recurring mental blocks, imposter syndrome, and chronic stress to operate from deep peace.',
      },
      {
        title: 'High-Performance Decision Clarity Under High Stakes',
        desc: 'Frameworks to lead with sharp intuitive foresight without emotional exhaustion.',
      },
      {
        title: 'Bespoke 1-on-1 Life Architecture Engagements',
        desc: 'Confidential strategic advisory tailored to your unique personal and professional vision.',
      },
    ],
    whatsappPrefill: 'Hi Pranav Mahajan Desk, I would like to inquire about 1-on-1 Executive Life Architecture coaching.',
  },
};

export default function PersonaSalesComingSoon({ persona }: PersonaSalesComingSoonProps) {
  const config = PERSONA_CONFIG[persona];
  const IconComponent = config.icon;

  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-[#090807] text-slate-100 relative overflow-x-hidden selection:bg-[#dfa547] selection:text-black">
      {/* Background ambient radial glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(circle_at_50%_0%,rgba(223,165,71,0.12),transparent_70%)]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_80%_80%,rgba(223,165,71,0.06),transparent_70%)]" />
      </div>

      {/* Top Navbar */}
      <header className="relative z-20 border-b border-amber-500/20 bg-[#0c0a08]/80 backdrop-blur-md sticky top-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <img
              src="/pranav_mahajan_transparent.png"
              alt="Pranav Mahajan"
              className="h-10 sm:h-12 w-auto object-contain drop-shadow-[0_2px_12px_rgba(223,165,71,0.35)]"
            />
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white px-3 py-1.5 rounded-full border border-amber-500/30 hover:border-amber-400 bg-[#16120e] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>

            <a
              href={`https://wa.me/919999999999?text=${encodeURIComponent(config.whatsappPrefill)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ochre-pill-button hidden sm:inline-flex items-center gap-1.5 text-xs font-bold py-1.5 px-4 shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Direct WhatsApp Desk</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 text-center space-y-10">
        {/* Breadcrumb / Persona Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#18130e] border border-amber-500/40 shadow-lg">
          <IconComponent className="w-4 h-4 text-[#dfa547]" />
          <span className="text-xs uppercase tracking-widest font-bold text-amber-300">
            {config.badge}
          </span>
        </div>

        {/* Hero Headings */}
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif-luxury font-bold text-white tracking-tight leading-tight">
            {config.title}
          </h1>
          <p className="text-base sm:text-lg text-amber-200/90 font-medium max-w-2xl mx-auto">
            {config.subtitle}
          </p>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {config.description}
          </p>
        </div>

        {/* Coming Soon Glowing Banner */}
        <div className="max-w-xl mx-auto rounded-2xl bg-gradient-to-r from-[#21180f] via-[#2f2215] to-[#21180f] border border-amber-500/50 p-6 sm:p-8 shadow-[0_0_35px_rgba(223,165,71,0.18)] space-y-3 relative overflow-hidden">
          <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-28 h-28 bg-[#dfa547]/20 rounded-full blur-2xl" />

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-[11px] font-mono font-bold uppercase tracking-wider text-amber-300">
            <Clock className="w-3.5 h-3.5 text-[#dfa547]" />
            Under Final Polish &bull; Coming Soon
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Official Dedicated Sales Page &amp; Course Portal
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            We are structuring high-definition video masterclasses, downloadable transformation
            workbooks, and direct keynote booking calendars. Get notified the exact moment we launch.
          </p>

          {/* Email Notification Form */}
          <div className="pt-2">
            {subscribed ? (
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-200 text-xs sm:text-sm font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>You are on the VIP priority invite list! We will notify you first.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <div className="relative flex-1">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email for launch invite..."
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#0e0c0a] border border-amber-500/40 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-hidden focus:border-[#dfa547]"
                  />
                </div>
                <button
                  type="submit"
                  className="ochre-pill-button py-2.5 px-5 text-xs sm:text-sm font-bold shadow-md cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap"
                >
                  <span>Notify Me</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Feature Blueprint Preview Grid */}
        <div className="pt-6 space-y-4 text-left">
          <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-amber-300">
            <Sparkles className="w-4 h-4 text-[#dfa547]" />
            What is Being Built for You
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {config.features.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-[#14100c] border border-amber-500/25 p-5 space-y-2.5 hover:border-amber-400/50 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-mono text-xs font-bold">
                  0{idx + 1}
                </div>
                <h3 className="text-sm font-bold text-white leading-snug">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Immediate Inquiries CTA */}
        <div className="pt-8 border-t border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="text-left">
            <p className="text-white font-semibold">Need urgent keynote booking or immediate consultation?</p>
            <p>Our executive bureau is actively scheduling dates for 2026&ndash;2027.</p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-amber-300 hover:text-white uppercase font-bold tracking-wider flex items-center gap-1"
            >
              <span>Explore Main Showcase</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
