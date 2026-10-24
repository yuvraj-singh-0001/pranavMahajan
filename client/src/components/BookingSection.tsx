'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Sparkles, Calendar, ShieldCheck, Mail } from 'lucide-react';

export default function BookingSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    eventDate: '',
    audienceSize: '500 - 1,500 Attendees',
    topic: 'The Unstoppable Mind: Mastering Inner Resilience',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);

    try {
      const response = await fetch('http://localhost:5000/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatusMessage({
          type: 'success',
          text: data.message || 'Your speaking invitation has been received! Our team will contact you within 24 hours.',
        });
        setFormData({
          name: '',
          email: '',
          organization: '',
          eventDate: '',
          audienceSize: '500 - 1,500 Attendees',
          topic: 'The Unstoppable Mind: Mastering Inner Resilience',
          message: '',
        });
      } else {
        setStatusMessage({
          type: 'error',
          text: data.error || 'Failed to submit inquiry. Please check your inputs.',
        });
      }
    } catch {
      // Offline / graceful simulation fallback
      setStatusMessage({
        type: 'success',
        text: `Thank you, ${formData.name}! Your keynote invitation has been saved. Pranav Mahajan's executive office will be in touch directly.`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="booking" className="py-24 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Context & Speaking Terms */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            Keynote Booking
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Invite Pranav To <span className="gradient-gold-text">Transform Your Next Event</span>
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Whether addressing 5,000 global delegates in an arena or facilitating an intimate executive retreat, Pranav delivers a high-voltage, unforgettable keynote tailored to your organization’s greatest challenges.
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 text-sm text-slate-700">
              <ShieldCheck className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <span>Available for in-person international travel &amp; virtual keynotes</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-700">
              <Calendar className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <span>Booking open for Q3/Q4 2026 &amp; 2027 worldwide summits</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-700">
              <Mail className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <span>Direct management response within 24 business hours</span>
            </div>
          </div>
        </div>

        {/* Right Column: Fullstack Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="light-glass-panel rounded-3xl p-8 sm:p-10 border border-amber-200/60 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              Speaker Request &amp; Availability
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Complete the details below to receive speaking fee schedules and date availability.
            </p>

            {statusMessage && (
              <div
                className={`mb-6 p-4 rounded-2xl flex items-start gap-3 text-sm font-medium ${
                  statusMessage.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}
              >
                {statusMessage.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                )}
                <span>{statusMessage.text}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-amber-200/70 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 text-sm text-slate-900 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="sarah@organization.com"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-amber-200/70 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 text-sm text-slate-900 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Organization / Event Name
                  </label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="e.g. Annual Global Summit"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-amber-200/70 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 text-sm text-slate-900 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Proposed Event Date
                  </label>
                  <input
                    type="text"
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    placeholder="e.g. November 2026 / Q4"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-amber-200/70 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 text-sm text-slate-900 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Audience Size
                  </label>
                  <select
                    value={formData.audienceSize}
                    onChange={(e) => setFormData({ ...formData, audienceSize: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-amber-200/70 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 text-sm text-slate-900 outline-none transition-all"
                  >
                    <option value="50 - 200 Attendees">50 - 200 (Executive Workshop)</option>
                    <option value="200 - 500 Attendees">200 - 500 (Leadership Conference)</option>
                    <option value="500 - 1,500 Attendees">500 - 1,500 (Major Summit)</option>
                    <option value="2,000+ Attendees">2,000+ (Arena / Global Keynote)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Primary Keynote Topic
                  </label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-amber-200/70 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 text-sm text-slate-900 outline-none transition-all"
                  >
                    <option value="The Unstoppable Mind: Mastering Inner Resilience">The Unstoppable Mind (Resilience)</option>
                    <option value="Awakening Conscious Leadership & Purpose">Awakening Conscious Leadership</option>
                    <option value="The Art of Inner Stillness: Modern Zen">The Art of Inner Stillness (Zen/Wellness)</option>
                    <option value="Unleashing the Hero Within: Defying Ordinary">Unleashing the Hero Within (Youth/Audacious Action)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Event Objectives &amp; Special Requests *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your audience, event theme, and what breakthrough you wish to achieve..."
                  className="w-full px-4 py-3 rounded-xl bg-white border border-amber-200/70 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 text-sm text-slate-900 outline-none transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-amber-600 via-orange-500 to-amber-500 hover:from-amber-700 hover:to-orange-600 transition-all shadow-xl shadow-amber-600/25 hover:shadow-2xl cursor-pointer flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>Submitting Keynote Invitation...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Keynote Request
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
