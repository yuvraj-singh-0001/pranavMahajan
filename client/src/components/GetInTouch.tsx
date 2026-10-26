'use client';

import React, { useState, useEffect } from 'react';
import {
  Mail,
  Send,
  Check,
  Copy,
  MessageCircle,
  Sparkles,
  ExternalLink,
  Building,
  CheckCircle2,
} from 'lucide-react';
import { PersonaType } from './Identify';

interface GetInTouchProps {
  selectedPersona?: PersonaType;
  onBackToPathway?: () => void;
}

export default function GetInTouch({
  selectedPersona = 'student',
  onBackToPathway,
}: GetInTouchProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [role, setRole] = useState<PersonaType>(selectedPersona);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    org: '',
    message: '',
  });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (selectedPersona) {
      setRole(selectedPersona);
      let defaultMsg = '';
      if (selectedPersona === 'student') {
        defaultMsg = 'Hi Pranav, I am reaching out as a Student seeking guidance on focus, exam confidence, and mental clarity.';
      } else if (selectedPersona === 'school') {
        defaultMsg = 'Hi Pranav, we would like to invite you for an official Keynote Address / Youth Summit at our Educational Institution.';
      } else if (selectedPersona === 'individual') {
        defaultMsg = 'Hi Pranav, I am reaching out as an Individual seeking high-level private life architecture & mentorship.';
      } else if (selectedPersona === 'corporate') {
        defaultMsg = 'Hi Pranav, we would like to invite you for a Corporate Keynote on Executive Leadership & Burnout Immunity.';
      } else if (selectedPersona === 'government') {
        defaultMsg = 'Hi Pranav, we are reaching out regarding an official Keynote Address for our Government Department / Public Sector Summit.';
      } else if (selectedPersona === 'ngo') {
        defaultMsg = 'Hi Pranav, we are reaching out from the NGO / Social Sector regarding community & youth transformation.';
      } else if (selectedPersona === 'parent') {
        defaultMsg = 'Hi Pranav, I am reaching out as a Parent seeking counsel on conscious parenting and family harmony.';
      }
      setFormData((prev) => ({ ...prev, message: defaultMsg }));
    }
  }, [selectedPersona]);

  const copyEmailToClipboard = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText('speaking@pranavmahajan.com');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2200);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="max-w-6xl mx-auto w-full px-4 sm:px-10 lg:px-12 pt-20 sm:pt-14 pb-28 sm:pb-14 relative z-10 flex flex-col justify-center my-auto slide-content-anim">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-950/70 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest shadow-xs">
          <Sparkles className="w-4 h-4 text-[#dfa547]" />
          Executive Speaking Secretariat
        </div>
        <h2 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
          Get In Touch &bull; Connect
        </h2>
        <p className="text-slate-300 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed">
          Reach out directly to Pranav Mahajan’s office for keynote bookings, institutional summits, parenting circles, and private leadership advisory.
        </p>
      </div>

      {/* Main Grid: Left Direct Connect Cards, Right Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
        {/* Left Column: Direct Contact & Office Details */}
        <div className="lg:col-span-5 space-y-4">
          {/* Email Card */}
          <div className="rounded-3xl bg-[#14100c] border border-amber-500/30 p-6 shadow-xl space-y-3 relative overflow-hidden">
            <div className="flex items-center gap-2.5 text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
              <Mail className="w-4 h-4 text-[#dfa547]" />
              Official Executive Email
            </div>
            <a
              href="mailto:speaking@pranavmahajan.com"
              className="text-base sm:text-lg font-bold text-amber-200 hover:text-white transition-colors block break-all"
            >
              speaking@pranavmahajan.com
            </a>
            <button
              onClick={copyEmailToClipboard}
              className="w-full py-2 px-4 rounded-xl bg-[#1f1812] hover:bg-[#281f17] border border-amber-500/30 text-xs font-bold text-amber-200 hover:text-white flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#dfa547]" />
                  <span>Copy Official Email</span>
                </>
              )}
            </button>
          </div>

          {/* WhatsApp Direct Card */}
          <a
            href="https://wa.me"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-3xl bg-[#14100c] border border-amber-500/30 hover:border-amber-400/60 p-5 shadow-xl flex items-center gap-4 group transition-all cursor-pointer block"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-white group-hover:text-amber-200 truncate">
                WhatsApp Desk
              </div>
              <div className="text-xs text-slate-400">
                Direct Speaking &amp; Keynote Coordinator
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-amber-300 flex-shrink-0" />
          </a>

          {/* Global Bureau Locations */}
          <div className="rounded-3xl bg-[#14100c] border border-amber-500/25 p-5 shadow-xl text-xs space-y-2 text-slate-300">
            <div className="flex items-center gap-2 font-mono font-bold text-amber-300 uppercase tracking-wider text-[11px]">
              <Building className="w-3.5 h-3.5 text-[#dfa547]" />
              Global Presence
            </div>
            <p className="leading-relaxed text-slate-400">
              Representations in New Delhi, Mumbai, Dubai, and Singapore for international keynote tours &amp; retreats.
            </p>
          </div>
        </div>

        {/* Right Column: Tailored Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl bg-gradient-to-b from-[#18130e] via-[#14100c] to-[#120e0a] border border-amber-500/35 p-6 sm:p-8 shadow-2xl space-y-4">
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-white">
                Send Direct Inquiry
              </h3>
              <p className="text-xs text-slate-400">
                Select your profile and share your requirements. Pranav’s executive desk responds within 24 hours.
              </p>
            </div>

            {/* Profile Selection Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
              {[
                { id: 'student' as const, label: 'Student' },
                { id: 'individual' as const, label: 'Individual' },
                { id: 'school' as const, label: 'Institution' },
                { id: 'corporate' as const, label: 'Corporate' },
                { id: 'government' as const, label: 'Government' },
                { id: 'ngo' as const, label: 'NGO / Social' },
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setRole(p.id)}
                  className={`py-1.5 px-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer text-center ${
                    role === p.id
                      ? 'bg-gradient-to-r from-[#b8731b] to-[#dfa547] text-white border-[#dfa547] shadow-md'
                      : 'bg-[#100d0a] text-slate-400 border-amber-500/20 hover:text-white'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {sent ? (
              <div className="p-8 rounded-2xl bg-emerald-950/70 border border-emerald-500/40 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="font-bold text-white text-base">Inquiry Dispatched</h4>
                <p className="text-xs text-emerald-200">
                  Thank you. Pranav Mahajan’s speaking coordinator will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Your Full Name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0e0c0a] border border-amber-500/30 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#dfa547]"
                  />
                  <input
                    type="email"
                    placeholder="Your Email Address"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0e0c0a] border border-amber-500/30 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#dfa547]"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Organization / Institution / City"
                  value={formData.org}
                  onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#0e0c0a] border border-amber-500/30 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#dfa547]"
                />

                <textarea
                  placeholder="Tell us about your event, audience, or mentorship objectives..."
                  rows={3}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#0e0c0a] border border-amber-500/30 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#dfa547]"
                />

                <button
                  type="submit"
                  className="ochre-pill-button w-full py-3.5 text-sm font-bold shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-[1.01]"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Official Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Back */}
      {onBackToPathway && (
        <div className="pt-6 flex items-center justify-start text-xs">
          <button
            onClick={onBackToPathway}
            className="text-slate-400 hover:text-white uppercase font-bold tracking-wider cursor-pointer flex items-center gap-1.5"
          >
            &larr; Back to Pathway Selection
          </button>
        </div>
      )}
    </div>
  );
}
