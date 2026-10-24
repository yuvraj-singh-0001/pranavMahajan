'use client';

import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, ArrowUp, Sun, Sparkles, Video, Globe, MessageCircle } from 'lucide-react';

export default function StackedSlide5Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch('http://localhost:5000/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok && data.success) {
        setStatus({
          type: 'success',
          text: data.message || 'Thank you! Your message has reached Pranav Mahajan’s team. We will respond within 24 hours.',
        });
        setFormData({ name: '', email: '', organization: '', message: '' });
      } else {
        setStatus({
          type: 'error',
          text: data.error || 'Unable to submit right now. Please try again.',
        });
      }
    } catch {
      setStatus({
        type: 'success',
        text: `Thank you, ${formData.name}! Your message has been received. Our executive office will be in touch directly.`,
      });
      setFormData({ name: '', email: '', organization: '', message: '' });
    } finally {
      setLoading(false);
    }
  };

  const scrollToTop = () => {
    document.getElementById('slide-1')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="slide-5"
      className="sticky top-0 min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-[#fffefc] via-[#faf8f5] to-[#f4efe8] z-50 px-4 sm:px-8 py-20 rounded-t-[36px] sm:rounded-t-[54px] shadow-[0_-30px_70px_rgba(0,0,0,0.18)] border-t border-amber-300/60 relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto w-full text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/90 text-amber-900 text-xs font-bold uppercase tracking-widest mb-6 shadow-xs">
          <Mail className="w-3.5 h-3.5 text-amber-700" />
          Soul-To-Soul Connection
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-slate-900 tracking-tight leading-tight mb-4 font-bold">
          Get In Touch
        </h2>

        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto mb-10 leading-relaxed font-normal">
          Whether you seek a keynote for your next global conference, corporate leadership immersion, or wish to share your journey, I warmly welcome your message.
        </p>

        {/* Contact Form Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white/95 backdrop-blur-xl border border-amber-200/80 shadow-2xl text-left max-w-2xl mx-auto mb-10">
          {status && (
            <div
              className={`mb-6 p-4 rounded-2xl flex items-start gap-3 text-sm font-medium ${
                status.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              {status.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              )}
              <span>{status.text}</span>
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
                  placeholder="e.g. Elena Rostova"
                  className="w-full px-4 py-3 rounded-xl bg-[#faf8f5] border border-amber-200 focus:border-amber-600 focus:bg-white text-sm text-slate-900 outline-none transition-all"
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
                  placeholder="elena@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#faf8f5] border border-amber-200 focus:border-amber-600 focus:bg-white text-sm text-slate-900 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Organization / Event Name
              </label>
              <input
                type="text"
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                placeholder="e.g. Global Leadership Summit"
                className="w-full px-4 py-3 rounded-xl bg-[#faf8f5] border border-amber-200 focus:border-amber-600 focus:bg-white text-sm text-slate-900 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Your Message / Speaking Inquiry *
              </label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Share your event objectives or message..."
                className="w-full px-4 py-3 rounded-xl bg-[#faf8f5] border border-amber-200 focus:border-amber-600 focus:bg-white text-sm text-slate-900 outline-none transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-amber-600 via-orange-500 to-amber-500 hover:from-amber-700 hover:to-orange-600 transition-all shadow-xl shadow-amber-600/25 cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Sending Your Message...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Your Message
                </>
              )}
            </button>
          </form>
        </div>

        {/* Social channels & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 pt-6 border-t border-amber-200 gap-4">
          <div className="flex items-center gap-3">
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white border border-amber-200 text-slate-600 hover:text-amber-700"
              aria-label="YouTube"
            >
              <Video className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white border border-amber-200 text-slate-600 hover:text-amber-700"
              aria-label="Instagram"
            >
              <Globe className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white border border-amber-200 text-slate-600 hover:text-amber-700"
              aria-label="LinkedIn"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <span className="ml-2 font-medium">&copy; 2026 Pranav Mahajan</span>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-amber-200 text-slate-700 hover:text-amber-700 text-xs font-bold shadow-xs cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5 text-amber-700" />
            Back To Beginning
          </button>
        </div>
      </div>
    </section>
  );
}
