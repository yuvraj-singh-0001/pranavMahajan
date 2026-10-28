'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Check,
  Sparkles,
  ShieldCheck,
  GraduationCap,
  Building,
  School,
  Landmark,
  Users,
  Heart,
} from 'lucide-react';

type PersonaRole =
  | 'student'
  | 'individual'
  | 'school'
  | 'corporate'
  | 'government'
  | 'ngo'
  | 'parent';

interface RoleOption {
  id: PersonaRole;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ROLES: RoleOption[] = [
  { id: 'student', label: 'Student', shortLabel: 'Student', icon: GraduationCap },
  { id: 'individual', label: 'Individual / Professional', shortLabel: 'Individual', icon: User },
  { id: 'school', label: 'Educational Institution', shortLabel: 'Institution', icon: School },
  { id: 'corporate', label: 'Corporate / Business', shortLabel: 'Corporate', icon: Building },
  { id: 'government', label: 'Government', shortLabel: 'Government', icon: Landmark },
  { id: 'ngo', label: 'NGO / Social Sector', shortLabel: 'NGO / Social', icon: Users },
  { id: 'parent', label: 'Parent', shortLabel: 'Parent', icon: Heart },
];

export default function SignUpPage() {
  const [mode, setMode] = useState<'signup' | 'signin'>('signup');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [selectedRole, setSelectedRole] = useState<PersonaRole>('student');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (mode === 'signup') {
      if (!fullName.trim()) {
        setErrorMessage('Please enter your full name.');
        return;
      }
      if (!phone.trim()) {
        setErrorMessage('Please enter your contact phone / WhatsApp number.');
        return;
      }
      if (password.length < 6) {
        setErrorMessage('Password must be at least 6 characters long.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match. Please verify.');
        return;
      }
      if (!agreeTerms) {
        setErrorMessage('Please agree to the Sanctum Terms & Privacy Policy to proceed.');
        return;
      }
    } else {
      if (!email.trim() || !password) {
        setErrorMessage('Please enter both your email address and password.');
        return;
      }
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1100);
  };

  return (
    <div className="relative h-screen w-full bg-[#090807] text-white flex flex-col justify-between overflow-y-auto lg:overflow-hidden selection:bg-[#dfa547] selection:text-black">
      {/* 1. LUXURY BACKGROUND VIDEO & CELESTIAL AMBIENCE */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-25 scale-105 filter blur-[0.5px]"
        >
          <source src="/ssecond-screen.mp4" type="video/mp4" />
        </video>
        {/* Ambient Dark Gradient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#090807]/90 via-[#090807]/85 to-[#090807] pointer-events-none" />
        {/* Radiant Celestial Golden Glows */}
        <div className="absolute top-1/4 left-1/3 w-[550px] h-[550px] rounded-full bg-[#dfa547]/10 blur-[160px]" />
        <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] rounded-full bg-[#b8731b]/10 blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#dfa547_1px,transparent_1px)] [background-size:36px_36px] opacity-15" />
      </div>

      {/* 2. ROYAL MASTER HEADER NAVBAR */}
      <header className="relative z-30 w-full px-4 sm:px-10 py-2 sm:py-2.5 flex items-center justify-between border-b border-amber-500/15 backdrop-blur-md bg-black/40 flex-shrink-0">
        <Link
          href="/"
          className="flex items-center gap-2 group cursor-pointer transition-transform hover:scale-105"
        >
          <img
            src="/pranav_mahajan_transparent.png"
            alt="Pranav Mahajan Logo"
            className="h-9 sm:h-12 w-auto object-contain drop-shadow-[0_4px_20px_rgba(223,165,71,0.4)]"
          />
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold text-amber-200/90 hover:text-white bg-white/5 hover:bg-white/10 border border-amber-500/30 transition-all shadow-sm hover:scale-105"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#dfa547]" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      {/* 3. MAIN SIGN UP / SIGN IN CARD (COMPACT SINGLE-SCREEN VIEWPORT) */}
      <main className="relative z-20 w-full flex-1 flex items-center justify-center px-3 sm:px-6 py-2 sm:py-3">
        <div
          className={`w-full ${
            mode === 'signup' ? 'max-w-4xl' : 'max-w-md'
          } mx-auto rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#18130e]/95 via-[#120e0a]/95 to-[#0b0805]/98 border border-[#dfa547]/35 shadow-[0_15px_50px_rgba(0,0,0,0.85),0_0_35px_rgba(223,165,71,0.15)] p-4 sm:p-5 md:p-6 backdrop-blur-xl relative overflow-hidden transition-all duration-300`}
        >
          {/* Antique Corner Engraved Notches */}
          <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 border-amber-500/50 pointer-events-none" />
          <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 border-amber-500/50 pointer-events-none" />
          <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b-2 border-l-2 border-amber-500/50 pointer-events-none" />
          <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 border-amber-500/50 pointer-events-none" />

          {/* SUCCESS CONFIRMATION STATE */}
          {submitted ? (
            <div className="py-6 sm:py-8 text-center space-y-4 animate-in zoom-in-95 duration-500">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-[#b8731b] mx-auto flex items-center justify-center text-black shadow-[0_0_35px_rgba(223,165,71,0.6)]">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div className="space-y-1.5">
                <h2
                  className="font-serif-luxury text-2xl sm:text-3xl font-extrabold tracking-tight"
                  style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #fbe6af 35%, #dfa547 70%, #b8731b 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {mode === 'signup' ? 'Welcome to the Sanctum!' : 'Welcome Back!'}
                </h2>
                <p className="text-amber-200/80 text-xs sm:text-sm max-w-sm mx-auto font-light">
                  {mode === 'signup'
                    ? `Your account has been created successfully as a ${selectedRole.toUpperCase()}. Check your email for confirmation.`
                    : 'You have signed in successfully.'}
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/"
                  className="ochre-pill-button w-full sm:w-auto py-2.5 px-7 text-xs sm:text-sm font-bold shadow-xl hover:scale-105"
                >
                  <span>Enter Sanctum &bull; Home</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFullName('');
                    setEmail('');
                    setPassword('');
                    setConfirmPassword('');
                  }}
                  className="outline-pill-button w-full sm:w-auto py-2.5 px-5 text-xs font-bold text-amber-200/80"
                >
                  Create Another Account
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* COMPACT CARD HEADER */}
              <div className="text-center space-y-1.5 mb-3.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-serif font-bold tracking-wider uppercase">
                  <Sparkles className="w-3 h-3 text-[#dfa547]" />
                  <span>Pranav Mahajan Master Sanctum</span>
                </div>

                <h1
                  className="font-serif-luxury text-2xl sm:text-3xl font-extrabold tracking-tight"
                  style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #fbe6af 35%, #dfa547 70%, #b8731b 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 2px 15px rgba(223, 165, 71, 0.3))',
                  }}
                >
                  {mode === 'signup' ? 'Create Your Account' : 'Welcome Back'}
                </h1>

                <p className="font-serif italic text-amber-200/70 text-[11px] sm:text-xs max-w-md mx-auto">
                  {mode === 'signup'
                    ? 'Begin your personalized journey with keynote archives, mindfulness modules & masterclasses.'
                    : 'Sign in to access your registered pathways and speaking portals.'}
                </p>

                {/* Pill Switcher */}
                <div className="inline-flex p-0.5 rounded-full bg-black/50 border border-amber-500/30 mt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setMode('signup');
                      setErrorMessage('');
                    }}
                    className={`py-1 px-5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      mode === 'signup'
                        ? 'bg-gradient-to-r from-[#b8731b] to-[#dfa547] text-white shadow-md'
                        : 'text-amber-200/70 hover:text-white'
                    }`}
                  >
                    Sign Up
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('signin');
                      setErrorMessage('');
                    }}
                    className={`py-1 px-5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      mode === 'signin'
                        ? 'bg-gradient-to-r from-[#b8731b] to-[#dfa547] text-white shadow-md'
                        : 'text-amber-200/70 hover:text-white'
                    }`}
                  >
                    Sign In
                  </button>
                </div>
              </div>

              {/* ERROR ALERT */}
              {errorMessage && (
                <div className="mb-2.5 p-2 rounded-lg bg-red-950/70 border border-red-500/40 text-red-200 text-xs text-center font-medium animate-in fade-in duration-200">
                  {errorMessage}
                </div>
              )}

              {/* FORM - SIGN UP (2-COLUMN GRID) */}
              {mode === 'signup' ? (
                <form onSubmit={handleSubmit} className="space-y-2.5 text-left">
                  {/* ROW 1: Full Name & Email Address */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-serif font-bold text-amber-200/80 mb-1">
                        Full Name <span className="text-[#dfa547]">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-amber-400/60" />
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Aryan Sharma"
                          className="w-full bg-[#1e1711]/80 border border-amber-500/30 focus:border-[#dfa547] focus:ring-1 focus:ring-[#dfa547] text-slate-100 placeholder-amber-200/35 rounded-xl py-2 pl-9 pr-3 text-xs outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-serif font-bold text-amber-200/80 mb-1">
                        Email Address <span className="text-[#dfa547]">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-amber-400/60" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@example.com"
                          className="w-full bg-[#1e1711]/80 border border-amber-500/30 focus:border-[#dfa547] focus:ring-1 focus:ring-[#dfa547] text-slate-100 placeholder-amber-200/35 rounded-xl py-2 pl-9 pr-3 text-xs outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* ROW 2: Select Your Role (7 Compact Pills in 1 line on desktop) */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-[11px] font-serif font-bold text-amber-200/80">
                        Select Your Role <span className="text-[#dfa547]">*</span>
                      </label>
                      <span className="text-[10px] text-[#dfa547] font-medium capitalize">
                        Active: {ROLES.find((r) => r.id === selectedRole)?.label}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-1.5">
                      {ROLES.map((role) => {
                        const IconComp = role.icon;
                        const isSel = selectedRole === role.id;
                        return (
                          <button
                            type="button"
                            key={role.id}
                            onClick={() => setSelectedRole(role.id)}
                            title={role.label}
                            className={`flex items-center justify-center gap-1 py-1.5 px-1.5 rounded-lg border text-[11px] font-medium transition-all cursor-pointer ${
                              isSel
                                ? 'bg-[#dfa547]/25 border-[#dfa547] text-amber-100 shadow-[0_0_12px_rgba(223,165,71,0.35)] ring-1 ring-[#dfa547]'
                                : 'bg-[#1e1711]/60 border-amber-500/20 text-slate-300 hover:border-amber-500/50 hover:bg-[#1e1711]'
                            }`}
                          >
                            <IconComp className={`w-3 h-3 flex-shrink-0 ${isSel ? 'text-amber-300' : 'text-amber-400/70'}`} />
                            <span className="truncate">{role.shortLabel}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* ROW 3: Phone / WhatsApp & Password */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-serif font-bold text-amber-200/80 mb-1">
                        Phone / WhatsApp <span className="text-[#dfa547]">*</span>
                      </label>
                      <div className="flex gap-1.5">
                        <select
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="bg-[#1e1711]/80 border border-amber-500/30 text-amber-200 text-xs rounded-xl px-2 py-2 outline-none cursor-pointer flex-shrink-0"
                        >
                          <option value="+91" className="bg-[#18130e]">🇮🇳 +91</option>
                          <option value="+1" className="bg-[#18130e]">🇺🇸 +1</option>
                          <option value="+44" className="bg-[#18130e]">🇬🇧 +44</option>
                          <option value="+971" className="bg-[#18130e]">🇦🇪 +971</option>
                          <option value="+65" className="bg-[#18130e]">🇸🇬 +65</option>
                          <option value="+61" className="bg-[#18130e]">🇦🇺 +61</option>
                          <option value="+49" className="bg-[#18130e]">🇩🇪 +49</option>
                        </select>
                        <div className="relative flex-1">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-amber-400/60" />
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="98765 43210"
                            className="w-full bg-[#1e1711]/80 border border-amber-500/30 focus:border-[#dfa547] focus:ring-1 focus:ring-[#dfa547] text-slate-100 placeholder-amber-200/35 rounded-xl py-2 pl-9 pr-3 text-xs outline-none transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-serif font-bold text-amber-200/80 mb-1">
                        Password <span className="text-[#dfa547]">*</span>
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-amber-400/60" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Min. 6 chars"
                          className="w-full bg-[#1e1711]/80 border border-amber-500/30 focus:border-[#dfa547] focus:ring-1 focus:ring-[#dfa547] text-slate-100 placeholder-amber-200/35 rounded-xl py-2 pl-9 pr-8 text-xs outline-none transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-amber-400/60 hover:text-amber-300 cursor-pointer"
                        >
                          {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* ROW 4: Confirm Password & Terms / Security */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 items-center">
                    <div>
                      <label className="block text-[11px] font-serif font-bold text-amber-200/80 mb-1">
                        Confirm Password <span className="text-[#dfa547]">*</span>
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-amber-400/60" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Re-enter password"
                          className="w-full bg-[#1e1711]/80 border border-amber-500/30 focus:border-[#dfa547] focus:ring-1 focus:ring-[#dfa547] text-slate-100 placeholder-amber-200/35 rounded-xl py-2 pl-9 pr-3 text-xs outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="pt-2 sm:pt-4">
                      <div className="flex items-start gap-2">
                        <input
                          id="terms"
                          type="checkbox"
                          checked={agreeTerms}
                          onChange={(e) => setAgreeTerms(e.target.checked)}
                          className="mt-0.5 accent-[#dfa547] w-3.5 h-3.5 rounded cursor-pointer"
                        />
                        <label htmlFor="terms" className="text-[10.5px] text-amber-200/70 leading-tight cursor-pointer select-none">
                          I agree to the{' '}
                          <span className="text-[#dfa547] underline">Terms</span> and{' '}
                          <span className="text-[#dfa547] underline">Privacy Policy</span> of Pranav Mahajan Mentorship.
                        </label>
                      </div>
                      <div className="flex items-center gap-1.5 text-[9.5px] text-amber-200/50 mt-1">
                        <ShieldCheck className="w-3 h-3 text-[#dfa547]" />
                        <span>256-Bit SSL Encrypted &bull; Strictly Confidential</span>
                      </div>
                    </div>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <div className="pt-1.5">
                    <button
                      type="submit"
                      disabled={loading}
                      className="ochre-pill-button w-full py-2.5 sm:py-3 text-xs sm:text-sm font-bold shadow-xl hover:shadow-[0_0_25px_rgba(223,165,71,0.45)] flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Registering Sanctum Account...</span>
                        </div>
                      ) : (
                        <>
                          <span>Create My Account</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                /* FORM - SIGN IN */
                <form onSubmit={handleSubmit} className="space-y-3 text-left max-w-sm mx-auto">
                  <div>
                    <label className="block text-xs font-serif font-bold text-amber-200/80 mb-1">
                      Email Address <span className="text-[#dfa547]">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400/60" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full bg-[#1e1711]/80 border border-amber-500/30 focus:border-[#dfa547] focus:ring-1 focus:ring-[#dfa547] text-slate-100 placeholder-amber-200/35 rounded-xl py-2.5 pl-10 pr-4 text-xs outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-serif font-bold text-amber-200/80">
                        Password <span className="text-[#dfa547]">*</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => alert('Password reset link sent to your registered email.')}
                        className="text-[11px] text-[#dfa547] hover:underline cursor-pointer"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400/60" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        className="w-full bg-[#1e1711]/80 border border-amber-500/30 focus:border-[#dfa547] focus:ring-1 focus:ring-[#dfa547] text-slate-100 placeholder-amber-200/35 rounded-xl py-2.5 pl-10 pr-9 text-xs outline-none transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-400/60 hover:text-amber-300 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="ochre-pill-button w-full py-2.5 text-xs sm:text-sm font-bold shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Signing In...</span>
                        </div>
                      ) : (
                        <>
                          <span>Sign In to Sanctum</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* FOOTER SWITCHER */}
              <div className="mt-3 pt-2.5 border-t border-amber-500/15 text-center text-xs text-amber-200/70 flex items-center justify-center gap-1.5">
                <span>{mode === 'signup' ? 'Already have an account?' : "Don't have an account yet?"}</span>
                <button
                  type="button"
                  onClick={() => {
                    setMode(mode === 'signup' ? 'signin' : 'signup');
                    setErrorMessage('');
                  }}
                  className="font-bold text-[#dfa547] hover:underline cursor-pointer"
                >
                  {mode === 'signup' ? 'Sign In' : 'Create an Account'}
                </button>
              </div>
            </>
          )}
        </div>
      </main>

      {/* 4. CLEAN ULTRA-COMPACT FOOTER */}
      <footer className="relative z-30 w-full py-1.5 px-4 text-center text-[10px] text-amber-200/50 border-t border-amber-500/10 backdrop-blur-sm bg-black/30 flex-shrink-0">
        <p>
          &copy; 2026 Pranav Mahajan Official &bull; Empowering 150,000+ Lives Across 18 Countries.
        </p>
      </footer>
    </div>
  );
}
