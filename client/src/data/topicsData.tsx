import React from 'react';

export interface TopicPillar {
  title: string;
  description: string;
}

export interface TopicItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  accent: string;
  glowColor: string;
  cardBorder: string;
  badgeBg: string;
  arrowBorder: string;
  arrowHoverBg: string;
  cardTintStart: string;
  column: 'left' | 'right';
  loopAngle: number;
  seqIndex: number;
  summary: string;
  quote: string;
  pillars: TopicPillar[];
  reflectionQuestions: string[];
  keyOutcomes: string[];
  iconRenderer: (className?: string) => React.ReactNode;
}

export const TOPICS: TopicItem[] = [
  // 01: Health and Wellbeing
  {
    id: 'health-wellbeing',
    number: '01',
    title: 'Health and Wellbeing',
    tagline: 'Cultivate physical vitality, emotional calm, and sustainable daily balance.',
    accent: '#06b6d4',
    glowColor: 'rgba(6, 182, 212, 0.32)',
    cardBorder: 'border-cyan-200/90 hover:border-cyan-400',
    badgeBg: 'bg-gradient-to-br from-cyan-400 via-teal-500 to-cyan-600 text-white shadow-[0_4px_16px_rgba(6,182,212,0.4)]',
    arrowBorder: 'border-cyan-300 text-cyan-600',
    arrowHoverBg: 'group-hover:bg-cyan-500 group-hover:text-white group-hover:border-cyan-500',
    cardTintStart: 'rgba(236, 254, 255, 0.92)',
    column: 'left',
    loopAngle: -45,
    seqIndex: 0,
    summary:
      'True wellbeing is not merely the absence of illness; it is an integrated state of bodily energy, emotional equilibrium, and nervous system resilience that empowers every other sphere of your life.',
    quote: 'Your body is the instrument through which your life expresses itself. Care for it with reverence and rhythmic consistency.',
    pillars: [
      {
        title: 'Somatic Awareness & Circadian Vitality',
        description: 'Aligning sleep, natural movement, and nutrition to build steady physical endurance without relying on stimulants.',
      },
      {
        title: 'Nervous System Regulation',
        description: 'Cultivating daily micro-practices to discharge chronic tension, soothe cortisol spikes, and maintain centered calm.',
      },
      {
        title: 'Mindful Boundaries & Recovery',
        description: 'Protecting energy reserves from burnout by establishing restorative rest periods and psychological boundaries.',
      },
      {
        title: 'Long-term Preventive Health Mindset',
        description: 'Adopting sustainable lifestyle habits that compound into lifelong strength, agility, and cognitive sharpness.',
      },
    ],
    reflectionQuestions: [
      'What signals does your body send when you are overextending yourself, and do you listen to them?',
      'Which daily habits consistently drain your energy, and which ones replenish it?',
      'How would your work and relationships transform if you operated with 25% more physical and mental vitality?',
    ],
    keyOutcomes: [
      'Deep, restorative sleep cycles and morning mental clarity',
      'Effective emotional regulation tools during stressful situations',
      'Sustainable daily physical energy routines without burnout',
      'A deeply attuned, respectful connection with your physical health',
    ],
    iconRenderer: (className = 'h-6 w-6') => (
      <svg viewBox="0 0 24 24" className={className} fill="none">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#ffffff" fillOpacity="0.25" />
        <path d="M2.5 12h4l2-4 2.8 8 2.2-5 1.5 2h5.5" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },

  // 02: Personal Development
  {
    id: 'personal-development',
    number: '02',
    title: 'Personal Development',
    tagline: 'Master habits, sharpen focus, and unlock your highest personal potential.',
    accent: '#7c3aed',
    glowColor: 'rgba(124, 58, 237, 0.32)',
    cardBorder: 'border-violet-200/90 hover:border-violet-400',
    badgeBg: 'bg-gradient-to-br from-indigo-500 via-purple-600 to-violet-700 text-white shadow-[0_4px_16px_rgba(124,58,237,0.4)]',
    arrowBorder: 'border-violet-300 text-violet-600',
    arrowHoverBg: 'group-hover:bg-violet-600 group-hover:text-white group-hover:border-violet-600',
    cardTintStart: 'rgba(245, 243, 255, 0.92)',
    column: 'right',
    loopAngle: -45,
    seqIndex: 1,
    summary:
      'Personal growth is the deliberate process of becoming who you are capable of being. Through intentional systems, mental discipline, and emotional mastery, you close the gap between your present self and your potential.',
    quote: 'Growth is not an accidental occurrence; it is the natural consequence of consistent curiosity and disciplined agency.',
    pillars: [
      {
        title: 'Core Clarity & Self-Discovery',
        description: 'Uncovering authentic core values, personal strengths, and unexamined belief patterns that govern your decisions.',
      },
      {
        title: 'Habit Architecture & Atomic Systems',
        description: 'Designing frictionless daily routines and cue-routine-reward loops that automate excellence over time.',
      },
      {
        title: 'High-Agency & Inner Sovereignty',
        description: 'Transitioning from passive reactivity to proactive ownership over your mindset, time, and life trajectory.',
      },
      {
        title: 'Cognitive Reframing & Mental Models',
        description: 'Developing high-leverage mental models to solve complex problems, maintain composure, and execute decisively.',
      },
    ],
    reflectionQuestions: [
      'What is the single highest-leverage habit that, if practiced daily, would elevate your life in six months?',
      'Where in your life are you waiting for external permission instead of exercising your own agency?',
      'What unhelpful narrative about yourself are you finally ready to discard?',
    ],
    keyOutcomes: [
      'Clear definition of personal purpose and direction',
      'Disciplined daily execution without relying on fleeting motivation',
      'Resilient self-confidence grounded in proven self-trust',
      'Advanced decision-making and cognitive clarity',
    ],
    iconRenderer: (className = 'h-6 w-6') => (
      <svg viewBox="0 0 24 24" className={className} fill="none">
        <rect x="3.5" y="14" width="3" height="6" rx="0.8" fill="#ffffff" />
        <rect x="8.5" y="10" width="3" height="10" rx="0.8" fill="#ffffff" />
        <rect x="13.5" y="7" width="3" height="13" rx="0.8" fill="#ffffff" />
        <path d="M3.5 12l5-5 4 3 7.5-6.5" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 3.5h4v4" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },

  // 03: Love Relationships, Marriage and Family Dynamics
  {
    id: 'love-relationships',
    number: '03',
    title: 'Love Relationships, Marriage and Family Dynamics',
    tagline: 'Build deeper intimacy, mutual trust, and healthy emotional boundaries.',
    accent: '#f43f5e',
    glowColor: 'rgba(244, 63, 94, 0.32)',
    cardBorder: 'border-rose-200/90 hover:border-rose-400',
    badgeBg: 'bg-gradient-to-br from-rose-400 via-pink-500 to-rose-600 text-white shadow-[0_4px_16px_rgba(244,63,94,0.4)]',
    arrowBorder: 'border-rose-300 text-rose-500',
    arrowHoverBg: 'group-hover:bg-rose-500 group-hover:text-white group-hover:border-rose-500',
    cardTintStart: 'rgba(255, 241, 242, 0.92)',
    column: 'left',
    loopAngle: -15,
    seqIndex: 2,
    summary:
      'Human connection is the bedrock of our emotional wellbeing. Navigating love, marriage, and family dynamics with maturity requires honest vulnerability, conscious communication, and empathetic understanding.',
    quote: 'To love someone deeply is to create a secure harbor where both partners can grow without fear of diminishment.',
    pillars: [
      {
        title: 'Conscious Communication & Active Listening',
        description: 'Speaking your truth without defensiveness and learning to listen to underlying emotional needs beneath spoken words.',
      },
      {
        title: 'Attachment Security & Relational Patterns',
        description: 'Identifying anxious or avoidant tendencies and cultivating grounded emotional safety in partnerships.',
      },
      {
        title: 'Constructive Conflict & De-escalation',
        description: 'Transforming arguments into doorways for deeper intimacy by removing contempt and establishing mutual respect.',
      },
      {
        title: 'Intergenerational Healing & Healthy Boundaries',
        description: 'Honoring family lineage while defining gentle, firm boundaries against toxic dynamics or guilt-based manipulation.',
      },
    ],
    reflectionQuestions: [
      'When conflict arises with your partner or family, do you seek to understand or seek to win?',
      'What emotional need do you find hardest to express directly to those you love?',
      'How are past family dynamics unconsciously shaping your present relationship expectations?',
    ],
    keyOutcomes: [
      'Deeper emotional intimacy and enduring mutual trust',
      'The ability to resolve differences without lingering resentment',
      'Clear, compassionate personal boundaries with family members',
      'A revitalized partnership grounded in shared purpose and joy',
    ],
    iconRenderer: (className = 'h-6 w-6') => (
      <svg viewBox="0 0 24 24" className={className} fill="#ffffff">
        <circle cx="7" cy="11" r="2.3" />
        <circle cx="12" cy="8" r="2.6" />
        <circle cx="17" cy="11" r="2.3" />
        <path d="M3.2 18.5c0-2.4 2-4 4.5-4h1c.9 0 1.8.3 2.4.8.6-.5 1.5-.8 2.4-.8h1c2.5 0 4.5 1.6 4.5 4v.5H3.2v-.5z" opacity="0.95" />
      </svg>
    ),
  },

  // 04: Parenting and Child Development
  {
    id: 'parenting-child',
    number: '04',
    title: 'Parenting and Child Development',
    tagline: 'Nurture resilient, confident, and emotionally grounded children.',
    accent: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.32)',
    cardBorder: 'border-teal-200/90 hover:border-teal-400',
    badgeBg: 'bg-gradient-to-br from-teal-400 via-emerald-500 to-teal-600 text-white shadow-[0_4px_16px_rgba(16,185,129,0.4)]',
    arrowBorder: 'border-teal-300 text-teal-600',
    arrowHoverBg: 'group-hover:bg-teal-600 group-hover:text-white group-hover:border-teal-600',
    cardTintStart: 'rgba(240, 253, 250, 0.92)',
    column: 'right',
    loopAngle: -15,
    seqIndex: 3,
    summary:
      'Parenting is less about controlling behavior and more about cultivating connection. When parents model emotional self-regulation and empathetic firmness, children blossom into self-assured, compassionate individuals.',
    quote: 'Children do not learn from what we preach; they absorb who we are in moments of quiet pressure.',
    pillars: [
      {
        title: 'Connection Before Correction',
        description: 'Prioritizing emotional safety and attunement so discipline becomes an act of guidance rather than punishment.',
      },
      {
        title: 'Parental Self-Regulation',
        description: 'Recognizing your own emotional triggers and maintaining a steady, non-reactive presence during tantrums or pushback.',
      },
      {
        title: 'Fostering Intrinsic Motivation & Resilience',
        description: 'Encouraging problem-solving, healthy risk-taking, and emotional grit rather than cultivating fragile perfectionism.',
      },
      {
        title: 'Navigating Digital Age Challenges',
        description: 'Setting healthy screen boundaries, nurturing social literacy, and protecting adolescent mental health.',
      },
    ],
    reflectionQuestions: [
      'Do your reactions to your child stem from their present behavior or from your own unresolved anxieties?',
      'Does your child feel comfortable bringing their failures and struggles to you without fearing harsh judgment?',
      'What core values do you most wish your child to carry into adulthood?',
    ],
    keyOutcomes: [
      'A peaceful, connected home environment with reduced friction',
      'Confident, self-reliant children equipped with emotional intelligence',
      'Mutual trust and open communication across childhood and adolescence',
      'Freedom from parental guilt through grounded, conscious parenting practices',
    ],
    iconRenderer: (className = 'h-6 w-6') => (
      <svg viewBox="0 0 24 24" className={className} fill="#ffffff">
        <circle cx="9" cy="7" r="2.8" />
        <circle cx="16" cy="11" r="2" />
        <path d="M3.5 19c0-3.3 2.7-5.8 6-5.8h1.2c.8 0 1.5.2 2.2.6-.5.9-.9 2-.9 3.2v2H3.5z" />
        <path d="M13.5 18c0-1.8 1.5-3.2 3.2-3.2h.5c1.8 0 3.2 1.4 3.2 3.2v1h-7v-1z" opacity="0.9" />
      </svg>
    ),
  },

  // 05: Social Relationships, Social Reputation and Cultural Awareness
  {
    id: 'social-relationships',
    number: '05',
    title: 'Social Relationships, Social Reputation and Cultural Awareness',
    tagline: 'Navigate social circles, build authentic networks, and earn lasting respect.',
    accent: '#8b5cf6',
    glowColor: 'rgba(139, 92, 246, 0.32)',
    cardBorder: 'border-purple-200/90 hover:border-purple-400',
    badgeBg: 'bg-gradient-to-br from-purple-500 via-indigo-600 to-purple-700 text-white shadow-[0_4px_16px_rgba(139,92,246,0.4)]',
    arrowBorder: 'border-purple-300 text-purple-600',
    arrowHoverBg: 'group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600',
    cardTintStart: 'rgba(245, 243, 255, 0.92)',
    column: 'left',
    loopAngle: 10,
    seqIndex: 4,
    summary:
      'How we relate to our wider community, peers, and cultural context determines our social standing and inner sense of belonging. Genuine social fluency is built on integrity, generosity, and cultural dexterity.',
    quote: 'Reputation is what people whisper in your absence; integrity is who you remain when nobody is watching.',
    pillars: [
      {
        title: 'Authentic Influence & Social Fluency',
        description: 'Cultivating presence, charismatic listening, and conversational ease without superficial networking games.',
      },
      {
        title: 'Curating High-Vibration Circles',
        description: 'Surrounding yourself with peers who expand your perspective while stepping away from draining gossip dynamics.',
      },
      {
        title: 'Cultural Intelligence & Nuance',
        description: 'Understanding diverse cultural narratives, navigating cross-context environments, and honoring community traditions.',
      },
      {
        title: 'Long-term Reputation Stewardship',
        description: 'Building an unassailable reputation through consistency, ethical follow-through, and reliable character.',
      },
    ],
    reflectionQuestions: [
      'Do the five people you spend the most time with energize your growth or reinforce complacency?',
      'How do you show up in rooms where you have no formal authority or leverage?',
      'Are your public social actions aligned with your private moral principles?',
    ],
    keyOutcomes: [
      'A powerful, trusted personal reputation across personal and professional spheres',
      'Deep, mutually uplifting friendships that withstand life changes',
      'High cultural agility to lead and connect across diverse groups',
      'Freedom from social comparison and people-pleasing tendencies',
    ],
    iconRenderer: (className = 'h-6 w-6') => (
      <svg viewBox="0 0 24 24" className={className} fill="#ffffff">
        <circle cx="12" cy="7" r="2.8" />
        <path d="M6.5 18c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5v.8h-11V18z" />
        <circle cx="5" cy="9.2" r="2" opacity="0.8" />
        <path d="M1 18c0-2.2 1.6-3.8 3.8-3.8.7 0 1.4.2 1.9.6-.5.9-.7 2-.7 3.2v.8H1V18z" opacity="0.8" />
        <circle cx="19" cy="9.2" r="2" opacity="0.8" />
        <path d="M23 18c0-2.2-1.6-3.8-3.8-3.8-.7 0-1.4.2-1.9.6.5.9.7 2 .7 3.2v.8h5V18z" opacity="0.8" />
      </svg>
    ),
  },

  // 06: Student Life and Youth Development
  {
    id: 'student-life',
    number: '06',
    title: 'Student Life and Youth Development',
    tagline: 'Overcome academic anxiety, master learning, and build purposeful ambition.',
    accent: '#3b82f6',
    glowColor: 'rgba(59, 130, 246, 0.32)',
    cardBorder: 'border-blue-200/90 hover:border-blue-400',
    badgeBg: 'bg-gradient-to-br from-blue-400 via-indigo-500 to-cyan-600 text-white shadow-[0_4px_16px_rgba(59,130,246,0.4)]',
    arrowBorder: 'border-blue-300 text-blue-600',
    arrowHoverBg: 'group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600',
    cardTintStart: 'rgba(239, 246, 255, 0.92)',
    column: 'right',
    loopAngle: 10,
    seqIndex: 5,
    summary:
      'The formative years of youth set the foundation for a lifetime. We equip students and young adults with meta-learning skills, emotional resilience against academic pressure, and a clear sense of career direction.',
    quote: 'Education is not the memorization of facts; it is the ignition of an inquisitive, self-directed mind.',
    pillars: [
      {
        title: 'Meta-Learning & Deep Cognitive Focus',
        description: 'Mastering spaced repetition, conceptual synthesis, and deep work strategies to study with high efficiency.',
      },
      {
        title: 'Overcoming Academic Anxiety & Exam Pressure',
        description: 'Neutralizing performance anxiety, reframing fear of failure, and maintaining composure under high stakes.',
      },
      {
        title: 'Identity Formation & Peer Resistance',
        description: 'Cultivating authentic individuality, moral backbone, and self-worth that is immune to negative peer pressure.',
      },
      {
        title: 'Strategic Career Visioning & Pathway Design',
        description: 'Mapping unique talents to high-impact career possibilities with actionable, milestone-driven roadmaps.',
      },
    ],
    reflectionQuestions: [
      'Are you studying to fulfill external expectations or to cultivate genuine intellectual mastery?',
      'What fears hold you back from pursuing what genuinely excites your curiosity?',
      'How do you manage your time when no teacher or parent is monitoring you?',
    ],
    keyOutcomes: [
      'Superior academic retention and exam performance with less stress',
      'Bulletproof focus and immunity against digital distractions',
      'Clear, inspiring vision for college, career, and personal future',
      'Unshakeable self-esteem and independent critical thinking',
    ],
    iconRenderer: (className = 'h-6 w-6') => (
      <svg viewBox="0 0 24 24" className={className} fill="none">
        <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" fill="#ffffff" />
        <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" fill="#ffffff" opacity="0.85" />
      </svg>
    ),
  },

  // 07: Professional Development, Career Growth, Entrepreneurship and Financial Well-Being
  {
    id: 'professional-development',
    number: '07',
    title: 'Professional Development, Career Growth, Entrepreneurship and Financial Well-Being',
    tagline: 'Scale your career, create entrepreneurial value, and achieve financial security.',
    accent: '#059669',
    glowColor: 'rgba(5, 150, 105, 0.32)',
    cardBorder: 'border-emerald-200/90 hover:border-emerald-400',
    badgeBg: 'bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-600 text-white shadow-[0_4px_16px_rgba(5,150,105,0.4)]',
    arrowBorder: 'border-emerald-300 text-emerald-600',
    arrowHoverBg: 'group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500',
    cardTintStart: 'rgba(236, 253, 245, 0.92)',
    column: 'left',
    loopAngle: 35,
    seqIndex: 6,
    summary:
      'Professional fulfillment is the intersection of high competence, strategic positioning, and financial wisdom. Whether climbing executive ladders or founding ventures, long-term success is designed, not stumbled upon.',
    quote: 'Wealth and career elevation are the natural byproducts of solving hard problems with exceptional craftsmanship.',
    pillars: [
      {
        title: 'Executive Presence & Strategic Leadership',
        description: 'Communicating with authority, navigating corporate politics, and rallying teams toward ambitious outcomes.',
      },
      {
        title: 'Entrepreneurial Thinking & Value Creation',
        description: 'Identifying market inefficiencies, validating business models, and building antifragile commercial ventures.',
      },
      {
        title: 'Financial Architecture & Wealth Mindset',
        description: 'Cultivating disciplined capital allocation, diverse asset generation, and long-term financial independence.',
      },
      {
        title: 'Career Pivots & Positioning',
        description: 'Designing non-linear career leaps and establishing irreplaceable market differentiation.',
      },
    ],
    reflectionQuestions: [
      'Are you building career equity that you own, or simply trading hours for wages?',
      'What rare and valuable skill combination sets you apart in the global marketplace?',
      'Does your financial strategy create true freedom or merely higher golden handcuffs?',
    ],
    keyOutcomes: [
      'Rapid promotion and expanded executive leadership responsibilities',
      'Successful venture launch and sustainable commercial growth',
      'Robust financial clarity, compounding investments, and peace of mind',
      'A powerful professional brand that attracts high-value opportunities',
    ],
    iconRenderer: (className = 'h-6 w-6') => (
      <svg viewBox="0 0 24 24" className={className} fill="none">
        <rect x="2.5" y="7" width="19" height="13.5" rx="2.5" fill="#ffffff" />
        <path d="M15.5 7V5a2 2 0 0 0-2-2h-3a2 2 0 0 0-2 2v2" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M2.5 12h19" stroke="#059669" strokeWidth="1.8" />
        <rect x="10.2" y="10.5" width="3.6" height="3" rx="0.8" fill="#059669" />
      </svg>
    ),
  },

  // 08: Spirituality, Metaphysics, Philosophy and Questions Related to Existence
  {
    id: 'spirituality-philosophy',
    number: '08',
    title: 'Spirituality, Metaphysics, Philosophy and Questions Related to Existence',
    tagline: 'Explore existential purpose, inner peace, and timeless philosophical wisdom.',
    accent: '#c026d3',
    glowColor: 'rgba(192, 38, 211, 0.32)',
    cardBorder: 'border-fuchsia-200/90 hover:border-fuchsia-400',
    badgeBg: 'bg-gradient-to-br from-fuchsia-500 via-purple-600 to-pink-600 text-white shadow-[0_4px_16px_rgba(192,38,211,0.4)]',
    arrowBorder: 'border-fuchsia-300 text-fuchsia-600',
    arrowHoverBg: 'group-hover:bg-fuchsia-600 group-hover:text-white group-hover:border-fuchsia-600',
    cardTintStart: 'rgba(253, 244, 255, 0.92)',
    column: 'right',
    loopAngle: 35,
    seqIndex: 7,
    summary:
      'Beyond daily duties lies the eternal quest for meaning. By integrating Eastern contemplation, Western philosophical rigor, and metaphysical inquiries, we discover deep tranquility and clarity about our place in the cosmos.',
    quote: 'The unexamined life may not be worth living, but the deeply examined life opens into infinite quiet joy.',
    pillars: [
      {
        title: 'Existential Meaning & Purpose Discovery',
        description: 'Grappling courageously with mortality, destiny, and the core questions that define a purposeful existence.',
      },
      {
        title: 'Non-Dogmatic Contemplative Practice',
        description: 'Cultivating silent meditation, witness consciousness, and inner stillness amidst a noisy modern world.',
      },
      {
        title: 'Philosophical Stoicism & Equanimity',
        description: 'Mastering the dichotomy of control to maintain unshakeable inner calm regardless of external circumstances.',
      },
      {
        title: 'Metaphysical Unity & Transcendent Ethics',
        description: 'Experiencing interconnectedness with all life, fostering profound empathy, humility, and moral clarity.',
      },
    ],
    reflectionQuestions: [
      'Who are you when all your titles, possessions, and social roles are stripped away?',
      'What truth about life are you currently avoiding or resisting?',
      'How does an awareness of life’s impermanence clarify what matters to you right now?',
    ],
    keyOutcomes: [
      'Deep, unshakable inner peace that does not depend on circumstances',
      'Profound existential clarity and freedom from nihilistic anxiety',
      'Disciplined daily meditation and reflective contemplation habits',
      'A compassionate, grounded worldview anchored in universal wisdom',
    ],
    iconRenderer: (className = 'h-6 w-6') => (
      <svg viewBox="0 0 24 24" className={className} fill="#ffffff">
        <path d="M12 3.5 C12 7, 9.5 9.8 9.5 13.5 C9.5 16.5 10.8 18.5 12 18.5 C13.2 18.5 14.5 16.5 14.5 13.5 C14.5 9.8 12 3.5 12 3.5 Z" />
        <path d="M12 18.5 C9.2 18.5 5.5 15.5 5.5 12.8 C5.5 10 8.2 8.2 9.2 7.2 C8.2 10 9.8 13.8 12 16.5 Z" opacity="0.85" />
        <path d="M12 18.5 C14.8 18.5 18.5 15.5 18.5 12.8 C18.5 10 15.8 8.2 14.8 7.2 C15.8 10 14.2 13.8 12 16.5 Z" opacity="0.85" />
        <path d="M4.5 16.5 C4.5 14.5 6.5 12.8 8.2 12.8 C7.2 14.8 8.2 17.5 11 18.5 C7.5 19 4.5 18 4.5 16.5 Z" opacity="0.65" />
        <path d="M19.5 16.5 C19.5 14.5 17.5 12.8 15.8 12.8 C16.8 14.8 15.8 17.5 13 18.5 C16.5 19 19.5 18 19.5 16.5 Z" opacity="0.65" />
      </svg>
    ),
  },

  // 09: Life Transitions, Adversity and Human Resilience
  {
    id: 'life-transitions',
    number: '09',
    title: 'Life Transitions, Adversity and Human Resilience',
    tagline: 'Transform grief, unexpected upheaval, and major change into steady strength.',
    accent: '#ea580c',
    glowColor: 'rgba(234, 88, 12, 0.32)',
    cardBorder: 'border-orange-200/90 hover:border-orange-400',
    badgeBg: 'bg-gradient-to-br from-amber-400 via-orange-500 to-orange-600 text-white shadow-[0_4px_16px_rgba(234,88,12,0.4)]',
    arrowBorder: 'border-orange-300 text-orange-500',
    arrowHoverBg: 'group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500',
    cardTintStart: 'rgba(255, 247, 237, 0.92)',
    column: 'left',
    loopAngle: 60,
    seqIndex: 8,
    summary:
      'Change is the only constant. Whether navigating divorce, career loss, midlife reckoning, bereavement, or sudden disruption, human resilience allows us not merely to bounce back, but to grow antifragile through adversity.',
    quote: 'The oak fought the wind and broke, the willow bent when it must and survived. True resilience is fluid courage.',
    pillars: [
      {
        title: 'Navigating Disorientation & Liminal Space',
        description: 'Holding steady when old identities have fallen away and the new horizon has not yet fully materialized.',
      },
      {
        title: 'Grief Processing & Emotional Metabolism',
        description: 'Allowing the pain of loss to be felt and processed cleanly without hardening into cynicism or despair.',
      },
      {
        title: 'Psychological Antifragility',
        description: 'Developing mental mechanisms that use stress and unexpected shocks as fuel for wisdom and inner maturity.',
      },
      {
        title: 'Architecting the Next Chapter',
        description: 'Taking deliberate, courageous steps forward with renewed agency, self-respect, and clear intention.',
      },
    ],
    reflectionQuestions: [
      'What old season of your life has ended that you are still trying to keep alive?',
      'If this current crisis is preparing you for a greater purpose, what is it teaching you right now?',
      'What small act of courage can you take today to honor your future self?',
    ],
    keyOutcomes: [
      'Steadiness through major career, relationship, or geographic shifts',
      'Clean emotional processing and renewal after grief or setback',
      'An unshakeable inner compass that thrives through ambiguity',
      'A revitalized, purposeful vision for your next chapter',
    ],
    iconRenderer: (className = 'h-6 w-6') => (
      <svg viewBox="0 0 24 24" className={className} fill="#ffffff">
        <path d="M14 9l-4.5 7.5L7 13l-5 7h20L14 9z" opacity="0.9" />
        <path d="M14 4v5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
        <path d="M14 4l4.5 2.2L14 8.5V4z" fill="#ffffff" />
      </svg>
    ),
  },

  // 10: Technology Literacy, AI and Digital Life
  {
    id: 'technology-literacy',
    number: '10',
    title: 'Technology Literacy, AI and Digital Life',
    tagline: 'Thrive in an AI-driven era while preserving digital wellness and deep humanity.',
    accent: '#0284c7',
    glowColor: 'rgba(2, 132, 199, 0.32)',
    cardBorder: 'border-cyan-200/90 hover:border-cyan-400',
    badgeBg: 'bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 text-white shadow-[0_4px_16px_rgba(2,132,199,0.4)]',
    arrowBorder: 'border-cyan-300 text-cyan-600',
    arrowHoverBg: 'group-hover:bg-cyan-600 group-hover:text-white group-hover:border-cyan-600',
    cardTintStart: 'rgba(240, 249, 255, 0.92)',
    column: 'right',
    loopAngle: 60,
    seqIndex: 9,
    summary:
      'We stand at the threshold of the AI age. Thriving in this new paradigm requires rapid technological leverage, digital hygiene to prevent cognitive fragmentation, and a renewed commitment to our uniquely human qualities.',
    quote: 'As machines grow more human-like, the most valuable competitive advantage is to become more deeply human.',
    pillars: [
      {
        title: 'AI Fluency & Augmented Intelligence',
        description: 'Leveraging modern AI tools to amplify creativity, research, and productivity 10x without losing critical judgment.',
      },
      {
        title: 'Attention Sovereignty & Digital Hygiene',
        description: 'Reclaiming your dopamine system and cognitive focus from algorithmic addiction and continuous partial attention.',
      },
      {
        title: 'Future-Proof Human Skill Stacking',
        description: 'Cultivating irreplaceable capabilities: empathy, nuanced taste, moral courage, synthesis, and physical presence.',
      },
      {
        title: 'Conscious Relationship with Media & Tech',
        description: 'Using technology deliberately as a high-precision tool rather than passively consuming algorithmic feeds.',
      },
    ],
    reflectionQuestions: [
      'Is your smartphone serving your goals, or are you serving the algorithms designed to harvest your attention?',
      'How are you proactively upskilling your cognitive workflow with artificial intelligence this year?',
      'When was the last time you spent 48 hours completely disconnected from screens and notifications?',
    ],
    keyOutcomes: [
      'Mastery of high-leverage AI workflows and digital tools',
      'Restored cognitive focus and liberation from doom-scrolling',
      'Strategic career resilience against technological disruption',
      'A balanced, peaceful relationship with digital devices',
    ],
    iconRenderer: (className = 'h-6 w-6') => (
      <svg viewBox="0 0 24 24" className={className} fill="none">
        <rect x="3" y="4" width="18" height="12" rx="2" stroke="#ffffff" strokeWidth="2" fill="#0284c7" />
        <path d="M1 19h22" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 9.5l-2 1.5 2 1.5" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 9.5l2 1.5-2 1.5" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13 8.5l-2 4.5" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
];

function normalizeSlug(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}

export function getTopicById(id: string): TopicItem | undefined {
  if (!id) return undefined;
  // 1. Direct match by id
  const exact = TOPICS.find((t) => t.id === id);
  if (exact) return exact;

  // 2. Normalized match (e.g., 'health-and-wellbeing' vs 'health-wellbeing')
  const normId = normalizeSlug(decodeURIComponent(id));
  return TOPICS.find((t) => {
    const normTopicId = normalizeSlug(t.id);
    const normTitle = normalizeSlug(t.title);
    return (
      normTopicId === normId ||
      normTitle === normId ||
      normId.includes(normTopicId) ||
      normTitle.includes(normId)
    );
  });
}

export function getAllTopicSlugs(): string[] {
  return TOPICS.map((t) => t.id);
}
