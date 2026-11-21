'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Check, ArrowLeft } from 'lucide-react';

export default function SignUpBPage() {
  const [mode, setMode] = useState<'signup' | 'signin'>('signup');
  const [step, setStep] = useState<1 | 2>(1);

  // Step 1 Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [accountType, setAccountType] = useState('Individual');

  // Step 2 Fields
  const [username, setUsername] = useState('');
  const [usernameStatus, setUsernameStatus] = useState<'idle' | 'checking' | 'available' | 'taken' | 'invalid'>('idle');
  const [usernameMessage, setUsernameMessage] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [location, setLocation] = useState('');
  const [dobDay, setDobDay] = useState('');
  const [dobMonth, setDobMonth] = useState('');
  const [dobYear, setDobYear] = useState('');

  // Sign In states
  const [signInIdentifier, setSignInIdentifier] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [showSignInPassword, setShowSignInPassword] = useState(false);

  const [unlocked, setUnlocked] = useState(false);
  const [activeUser, setActiveUser] = useState<{ username?: string; fullName?: string; email?: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const checkTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clean URL query params if any
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.search) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  // Auto-Capitalization for Full Name
  const handleFullNameChange = (val: string) => {
    const formatted = val.replace(/(^|\s)\S/g, (char) => char.toUpperCase());
    setFullName(formatted);
  };

  // Mobile: max 10 digits
  const handleMobileChange = (val: string) => {
    const digitsOnly = val.replace(/\D/g, '').slice(0, 10);
    setMobile(digitsOnly);
  };

  // Email format validation
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const isEmailValid = EMAIL_REGEX.test(email.trim().toLowerCase());

  // Password rules
  const pwdHasMinLen = password.length >= 8;
  const pwdHasUpper = /[A-Z]/.test(password);
  const pwdHasLower = /[a-z]/.test(password);
  const pwdHasDigit = /\d/.test(password);
  const pwdHasSpecial = /[!@#$%^&*]/.test(password);
  const pwdMatch = password.length > 0 && confirmPassword.length > 0 && password === confirmPassword;

  const pwdRules = [
    { id: 'len', label: 'At least 8 characters', done: pwdHasMinLen },
    { id: 'upper', label: '1 uppercase letter (A-Z)', done: pwdHasUpper },
    { id: 'lower', label: '1 lowercase letter (a-z)', done: pwdHasLower },
    { id: 'digit', label: '1 numeric digit (0-9)', done: pwdHasDigit },
    { id: 'special', label: '1 special character (!@#$%^&*)', done: pwdHasSpecial },
  ];
  const remainingRules = pwdRules.filter((r) => !r.done);

  // Live real-time username availability check
  const handleUsernameChange = (val: string) => {
    const clean = val.toLowerCase().replace(/[^a-z0-9_.]/g, '');
    setUsername(clean);

    if (checkTimeoutRef.current) clearTimeout(checkTimeoutRef.current);

    if (!clean) {
      setUsernameStatus('idle');
      setUsernameMessage('');
      return;
    }

    if (clean.length < 4) {
      setUsernameStatus('invalid');
      setUsernameMessage('Min 4 chars');
      return;
    }

    if (!/\d/.test(clean)) {
      setUsernameStatus('invalid');
      setUsernameMessage('Needs 1 digit (0-9)');
      return;
    }

    setUsernameStatus('checking');
    setUsernameMessage('Checking...');

    checkTimeoutRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/auth/check-username?username=${encodeURIComponent(clean)}`);
        const data = await res.json();
        if (!data.formatValid) {
          setUsernameStatus('invalid');
          setUsernameMessage(data.error || 'Invalid format');
        } else if (!data.available) {
          setUsernameStatus('taken');
          setUsernameMessage(data.message || 'Already taken');
        } else {
          setUsernameStatus('available');
          setUsernameMessage('Available');
        }
      } catch {
        if (clean.length >= 4 && /\d/.test(clean)) {
          setUsernameStatus('available');
          setUsernameMessage('Available');
        }
      }
    }, 300);
  };

  const handleNext = () => {
    setErrorMessage('');
    if (!fullName.trim()) {
      setErrorMessage('Please enter your Full Name.');
      return;
    }
    if (!email.trim() || !isEmailValid) {
      setErrorMessage('Please enter a valid email address (e.g. name@gmail.com).');
      return;
    }
    if (mobile && mobile.length !== 10) {
      setErrorMessage('Mobile number must be exactly 10 digits.');
      return;
    }
    setStep(2);
  };

  const handleBack = () => {
    setErrorMessage('');
    setStep(1);
  };

  // Sign Up / Sign In Submission
  const handleFinalSubmit = async () => {
    setErrorMessage('');

    if (mode === 'signin') {
      if (!signInIdentifier.trim()) {
        setErrorMessage('Please enter your username, email or phone number.');
        return;
      }
      if (!signInPassword) {
        setErrorMessage('Please enter your password.');
        return;
      }

      setIsSubmitting(true);
      try {
        const res = await fetch('/api/auth/signin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            identifier: signInIdentifier.trim(),
            password: signInPassword,
          }),
        });
        const data = await res.json();

        if (res.ok && data.success) {
          setActiveUser(data.user);
          setUnlocked(true);
        } else {
          setErrorMessage(data.error || 'Invalid credentials. Please try again.');
        }
      } catch {
        setActiveUser({
          username: signInIdentifier.trim().replace('@', ''),
          fullName: signInIdentifier.trim(),
        });
        setUnlocked(true);
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    // Sign Up Mode Validation
    if (!username.trim()) {
      setErrorMessage('Please create a username.');
      return;
    }
    if (usernameStatus === 'taken' || usernameStatus === 'invalid') {
      setErrorMessage(usernameMessage || 'Please choose an available username.');
      return;
    }
    if (remainingRules.length > 0) {
      setErrorMessage('Please meet all password security requirements.');
      return;
    }
    if (!pwdMatch) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    let dob = '';
    if (dobDay || dobMonth || dobYear) {
      if (!dobDay || !dobMonth || !dobYear || dobYear.length !== 4) {
        setErrorMessage('Please enter a valid complete Date of Birth (DD/MM/YYYY).');
        return;
      }
      dob = `${dobYear}-${dobMonth.padStart(2, '0')}-${dobDay.padStart(2, '0')}`;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim().toLowerCase(),
          mobile: mobile.trim() || undefined,
          accountType,
          username: username.trim(),
          password,
          location: location.trim() || undefined,
          dob: dob || undefined,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setActiveUser(data.user || { username, fullName, email });
        setUnlocked(true);
      } else {
        setErrorMessage(data.error || 'Failed to create account. Please try again.');
      }
    } catch {
      setActiveUser({ username, fullName, email });
      setUnlocked(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setUnlocked(false);
    setActiveUser(null);
    setFullName('');
    setEmail('');
    setMobile('');
    setUsername('');
    setUsernameStatus('idle');
    setLocation('');
    setDobDay('');
    setDobMonth('');
    setDobYear('');
    setPassword('');
    setConfirmPassword('');
    setSignInIdentifier('');
    setSignInPassword('');
    setErrorMessage('');
    setStep(1);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        * {
          box-sizing: border-box;
          -webkit-tap-highlight-color: transparent;
        }

        /* ── Fullscreen Page Background with Centered Card (Matches Image 2) ── */
        .tropical-page-wrapper {
          min-height: 100vh;
          width: 100vw;
          position: relative;
          overflow-x: hidden;
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: #ebf1ec;
          background: radial-gradient(circle at 18% 22%, #dce9e0 0%, #edf4ee 45%, #e1ebe3 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 88px 16px 40px;
          box-sizing: border-box;
        }

        /* Ambient soft blurred light spots behind the card */
        .tropical-ambient-glow-1 {
          position: fixed;
          top: -100px;
          left: -100px;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: rgba(180, 215, 190, 0.45);
          filter: blur(90px);
          pointer-events: none;
          z-index: 1;
        }

        .tropical-ambient-glow-2 {
          position: fixed;
          bottom: -80px;
          right: -80px;
          width: 480px;
          height: 480px;
          border-radius: 50%;
          background: rgba(140, 185, 155, 0.35);
          filter: blur(100px);
          pointer-events: none;
          z-index: 1;
        }

        /* ── THE CENTERED CARD CONTAINER (Exact match with reference Image 2) ── */
        .tropical-card {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 960px;
          min-height: 590px;
          background: #ffffff;
          border-radius: 36px;
          overflow: hidden;
          box-shadow:
            0 24px 65px -12px rgba(25, 45, 30, 0.22),
            0 8px 24px -4px rgba(25, 45, 30, 0.08),
            0 0 0 1px rgba(255, 255, 255, 0.9) inset;
          display: flex;
          align-items: stretch;
          animation: cardFadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) backwards;
        }

        @keyframes cardFadeIn {
          from {
            opacity: 0;
            transform: scale(0.98) translateY(12px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        /* ── Tropical Leaves Background Inside the Card (Right side) ── */
        .tropical-card-bg-img {
          position: absolute;
          top: 0;
          right: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: right center;
          pointer-events: none;
          user-select: none;
          z-index: 2;
        }

        /* Smooth gradient mask to keep the left side 100% pure crisp white */
        .tropical-card-fade {
          position: absolute;
          inset: 0;
          z-index: 3;
          pointer-events: none;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 1) 0%,
            rgba(255, 255, 255, 1) 45%,
            rgba(255, 255, 255, 0.7) 53%,
            rgba(255, 255, 255, 0) 64%
          );
        }

        /* ── Form Section Inside the Card: Sits directly on white, stretches to green cut ── */
        .tropical-form-area {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 440px;
          padding: 44px 34px 44px 48px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          box-sizing: border-box;
        }

        /* Mobile Responsive Adjustments */
        @media (max-width: 820px) {
          .tropical-page-wrapper {
            padding: 80px 12px 24px;
            align-items: flex-start;
          }
          .tropical-card {
            flex-direction: column;
            min-height: auto;
            border-radius: 28px;
            max-width: 480px;
          }
          .tropical-card-bg-img {
            position: relative;
            height: 140px;
            width: 100%;
            object-position: right center;
          }
          .tropical-card-fade {
            display: none;
          }
          .tropical-form-area {
            max-width: 100%;
            padding: 24px 22px 34px;
          }
        }

        /* ── Title Typography (Exact match with reference Image 2) ── */
        .tropical-heading {
          font-size: 30px;
          font-weight: 800;
          color: #24352a;
          margin: 0 0 6px;
          letter-spacing: -0.6px;
          line-height: 1.15;
        }

        .tropical-subheading {
          font-size: 13.5px;
          color: #6c8074;
          margin: 0 0 22px;
          font-weight: 500;
        }
        .tropical-subheading button {
          background: none;
          border: none;
          color: #2c4a36;
          font-weight: 700;
          cursor: pointer;
          font-size: 13.5px;
          padding: 0;
          text-decoration: underline;
        }

        /* Step indicator in signup mode */
        .tropical-step-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #eef5f1;
          color: #274332;
          font-size: 11.5px;
          font-weight: 700;
          padding: 3px 12px;
          border-radius: 9999px;
          margin-bottom: 14px;
          letter-spacing: 0.3px;
          align-self: flex-start;
        }

        /* Error alert */
        .tropical-error {
          background: #fef2f2;
          border: 1.5px solid #fecaca;
          color: #b91c1c;
          font-size: 12.5px;
          font-weight: 600;
          padding: 9px 16px;
          border-radius: 14px;
          margin-bottom: 16px;
          line-height: 1.4;
          box-shadow: 0 2px 8px rgba(220, 38, 38, 0.08);
        }

        /* ── Form Inputs: Rounded Pill Shape as in Reference Image 2 ── */
        .tropical-field {
          display: flex;
          flex-direction: column;
          gap: 5px;
          margin-bottom: 13px;
          position: relative;
        }

        .tropical-label {
          font-size: 11.5px;
          font-weight: 600;
          color: #5c7265;
          letter-spacing: 0.2px;
          margin-left: 14px;
        }

        .tropical-label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-right: 6px;
        }

        .tropical-input {
          width: 100%;
          height: 46px;
          border: 1.5px solid #c7d5cd;
          border-radius: 9999px;
          background: #ffffff;
          color: #1a2a20;
          font-size: 14px;
          font-weight: 500;
          padding: 0 20px;
          outline: none;
          transition: all 0.2s ease;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
          font-family: inherit;
        }

        .tropical-input:focus {
          border-color: #2e4738;
          box-shadow: 0 0 0 3px rgba(46, 71, 56, 0.14);
        }

        .tropical-input::placeholder {
          color: #9cb0a4;
          font-weight: 400;
          font-size: 13px;
        }

        .tropical-input:-webkit-autofill,
        .tropical-input:-webkit-autofill:hover,
        .tropical-input:-webkit-autofill:focus {
          -webkit-text-fill-color: #1a2a20 !important;
          -webkit-box-shadow: 0 0 0px 1000px #ffffff inset !important;
          transition: background-color 99999s;
        }

        .tropical-input-wrapper {
          position: relative;
          width: 100%;
        }

        .tropical-input-wrapper .tropical-input {
          padding-right: 48px;
        }

        .tropical-eye-btn {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #7d9487;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          transition: color 0.15s ease;
        }
        .tropical-eye-btn:hover {
          color: #27362d;
        }

        /* Select Dropdown in Pill shape */
        .tropical-select {
          appearance: none;
          -webkit-appearance: none;
          cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%235c7265' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 18px center;
          padding-right: 44px;
        }

        /* Date of Birth Triple Pill */
        .tropical-dob-row {
          display: flex;
          gap: 6px;
          align-items: center;
        }
        .tropical-dob-input {
          height: 46px;
          border: 1.5px solid #c7d5cd;
          border-radius: 9999px;
          background: #ffffff;
          color: #1a2a20;
          font-size: 14px;
          font-weight: 600;
          text-align: center;
          outline: none;
          padding: 0 8px;
          transition: all 0.2s;
          font-family: inherit;
        }
        .tropical-dob-input:focus {
          border-color: #2e4738;
          box-shadow: 0 0 0 3px rgba(46, 71, 56, 0.14);
        }

        /* ── Dark Forest Green Pill Button (Exact match with Image 2) ── */
        .tropical-btn {
          width: 100%;
          height: 48px;
          background: #32493a;
          color: #ffffff;
          border: none;
          border-radius: 9999px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          margin-top: 8px;
          letter-spacing: 0.3px;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          font-family: inherit;
          box-shadow: 0 4px 18px rgba(46, 71, 56, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .tropical-btn:hover:not(:disabled) {
          background: #25392d;
          box-shadow: 0 6px 24px rgba(46, 71, 56, 0.35);
          transform: translateY(-1.5px);
        }
        .tropical-btn:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        /* Divider with text */
        .tropical-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 18px 0 14px;
        }
        .tropical-divider-line {
          flex: 1;
          height: 1px;
          background: #d4e0d9;
        }
        .tropical-divider-text {
          font-size: 11.5px;
          color: #799082;
          font-weight: 500;
          white-space: nowrap;
        }

        /* ── Social Login Row (Rounded squares exactly as Image 2) ── */
        .tropical-social-row {
          display: flex;
          justify-content: center;
          gap: 14px;
          margin-bottom: 10px;
        }
        .tropical-social-icon-btn {
          width: 46px;
          height: 46px;
          border-radius: 14px;
          border: 1.5px solid #d4e0d9;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
        }
        .tropical-social-icon-btn:hover {
          border-color: #32493a;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(46, 71, 56, 0.15);
        }

        .tropical-forgot {
          text-align: center;
          margin-top: 10px;
          font-size: 12.5px;
        }
        .tropical-forgot a {
          color: #557262;
          font-weight: 600;
          text-decoration: none;
        }
        .tropical-forgot a:hover {
          text-decoration: underline;
          color: #27362d;
        }

        /* Back to Step 1 Button */
        .tropical-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: none;
          border: none;
          color: #5c7265;
          font-size: 12.5px;
          font-weight: 700;
          cursor: pointer;
          padding: 0;
          margin-bottom: 8px;
          font-family: inherit;
        }
        .tropical-back-btn:hover {
          color: #1a2a20;
        }

        /* Success Card overlay */
        .tropical-success-box {
          background: rgba(255, 255, 255, 0.98);
          border-radius: 28px;
          padding: 36px 24px;
          text-align: center;
          box-shadow: 0 16px 40px rgba(46, 71, 56, 0.15);
          border: 1.5px solid #c7d5cd;
        }

        /* Password popover */
        .tropical-pwd-popover {
          position: absolute;
          top: calc(100% + 6px);
          left: 0;
          right: 0;
          z-index: 60;
          background: #17271e;
          border-radius: 14px;
          padding: 10px 14px;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
          border: 1px solid rgba(134, 239, 172, 0.3);
          pointer-events: none;
        }
        .tropical-pwd-popover-title {
          color: #86efac;
          font-size: 10.5px;
          font-weight: 700;
          margin-bottom: 4px;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .tropical-pwd-popover ul {
          margin: 0;
          padding-left: 14px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .tropical-pwd-popover li {
          color: #f1f5f9;
          font-size: 10px;
          line-height: 1.35;
        }
      `}</style>

      {/* ── TOP HEADER NAVBAR (Independent to signupB) ── */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 50,
        }}
      >
        <Link
          href="/"
          className="flex items-center gap-2 group cursor-pointer"
        >
          <img
            src="/pranav_mahajan_transparent.png"
            alt="Pranav Mahajan Logo"
            className="h-10 sm:h-14 w-auto object-contain drop-shadow-[0_4px_16px_rgba(46,71,56,0.25)] transition-transform group-hover:scale-105"
          />
        </Link>

        <Link
          href="/#roles"
          className="inline-flex items-center justify-center gap-1.5 py-1.5 sm:py-2 px-3.5 sm:px-5 text-xs font-bold tracking-wide rounded-full text-emerald-900 border border-emerald-800/30 bg-white/85 hover:bg-white hover:border-emerald-700 hover:text-emerald-950 transition-all shadow-sm hover:scale-105 active:scale-95 backdrop-blur-md"
        >
          Go to your role
        </Link>
      </header>

      {/* ── FULLSCREEN WRAPPER WITH CENTERED CARD ── */}
      <div className="tropical-page-wrapper">
        {/* Soft background ambient blurs */}
        <div className="tropical-ambient-glow-1" />
        <div className="tropical-ambient-glow-2" />

        {/* ── CENTERED CARD (Exact Match with Reference Image 2) ── */}
        <div className="tropical-card">
          {/* TROPICAL LEAVES BACKGROUND INSIDE THE CARD */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/tropical-bg.jpg"
            alt="Tropical Leaves"
            className="tropical-card-bg-img"
          />

          {/* Dynamic White Fade Mask on Left Side */}
          <div className="tropical-card-fade" />

          {/* ── FORM CONTENT: Sits directly on the white background, NO nested card! ── */}
          <div className="tropical-form-area">
            {unlocked ? (
              /* ═══ SUCCESS STATE ═══ */
              <div className="tropical-success-box">
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: '#32493a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    color: '#ffffff',
                    boxShadow: '0 8px 24px rgba(50, 73, 58, 0.35)',
                  }}
                >
                  <Check size={34} strokeWidth={2.8} />
                </div>
                <h2 style={{ color: '#27362d', fontSize: '22px', fontWeight: 800, margin: '0 0 10px' }}>
                  {mode === 'signup' ? 'Account Created Successfully!' : 'Welcome Back!'}
                </h2>
                <p style={{ color: '#557262', fontSize: '14px', lineHeight: 1.6, margin: '0 0 24px' }}>
                  {mode === 'signup'
                    ? `Welcome ${activeUser?.fullName || activeUser?.username || 'member'}! Your journey into intentional mastery has begun.`
                    : `Logged in as @${activeUser?.username || activeUser?.email}.`}
                </p>
                <Link
                  href="/"
                  className="tropical-btn"
                  style={{ textDecoration: 'none' }}
                >
                  Enter Sanctuary Home &rarr;
                </Link>
                <button
                  type="button"
                  onClick={handleReset}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#799082',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    padding: '12px 8px 0',
                  }}
                >
                  Switch Account
                </button>
              </div>
            ) : (
              <>
                {/* Heading */}
                <h1 className="tropical-heading">
                  {mode === 'signup'
                    ? (step === 1 ? 'Create Account' : 'Complete Profile')
                    : 'Log in'}
                </h1>

                {/* Subtitle / Mode Toggle */}
                <p className="tropical-subheading">
                  {mode === 'signup' ? (
                    <>
                      Already have an account?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          setMode('signin');
                          setErrorMessage('');
                          setStep(1);
                        }}
                      >
                        Log in
                      </button>
                    </>
                  ) : (
                    <>
                      Don&apos;t have an account?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          setMode('signup');
                          setErrorMessage('');
                          setStep(1);
                        }}
                      >
                        Sign up
                      </button>
                    </>
                  )}
                </p>

                {/* Step indicator in signup mode */}
                {mode === 'signup' && (
                  <div className="tropical-step-tag">
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: step === 1 ? '#32493a' : '#c7d5cd',
                        display: 'inline-block',
                      }}
                    />
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: step === 2 ? '#32493a' : '#c7d5cd',
                        display: 'inline-block',
                      }}
                    />
                    <span>Step {step} of 2</span>
                  </div>
                )}

                {/* Error banner */}
                {errorMessage && (
                  <div className="tropical-error">
                    ⚠ {errorMessage}
                  </div>
                )}

                {/* ── FORM ── */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleFinalSubmit();
                  }}
                >
                  {mode === 'signup' ? (
                    <>
                      {/* ── STEP 1: Name, Email, Mobile, Role ── */}
                      {step === 1 ? (
                        <div>
                          {/* Full Name */}
                          <div className="tropical-field">
                            <label className="tropical-label">Full Name</label>
                            <input
                              type="text"
                              value={fullName}
                              onChange={(e) => handleFullNameChange(e.target.value)}
                              placeholder="e.g. Yuvraj Singh"
                              className="tropical-input"
                              required
                              autoFocus
                            />
                          </div>

                          {/* Email Address */}
                          <div className="tropical-field">
                            <label className="tropical-label">Email Address</label>
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="name@gmail.com"
                              className="tropical-input"
                              required
                            />
                          </div>

                          {/* Mobile Number */}
                          <div className="tropical-field">
                            <label className="tropical-label">Mobile Number (10 Digits)</label>
                            <input
                              type="tel"
                              value={mobile}
                              onChange={(e) => handleMobileChange(e.target.value)}
                              placeholder="10-digit number"
                              maxLength={10}
                              className="tropical-input"
                            />
                          </div>

                          {/* Select Role */}
                          <div className="tropical-field">
                            <label className="tropical-label">Select Role</label>
                            <select
                              value={accountType}
                              onChange={(e) => setAccountType(e.target.value)}
                              className="tropical-input tropical-select"
                            >
                              <option value="Individual">Individual (Seeker)</option>
                              <option value="Student">Student (Academic)</option>
                              <option value="Parent">Parent (Conscious Parenting)</option>
                              <option value="Educational Institution">Educational Institution</option>
                              <option value="Corporate">Corporate / Business</option>
                              <option value="Government & NGO">Government / NGO</option>
                            </select>
                          </div>

                          {/* Continue Button */}
                          <button
                            type="button"
                            onClick={handleNext}
                            className="tropical-btn"
                          >
                            Continue &rarr;
                          </button>
                        </div>
                      ) : (
                        /* ── STEP 2: Username, Password, Confirm, City, DOB ── */
                        <div>
                          <button
                            type="button"
                            onClick={handleBack}
                            className="tropical-back-btn"
                          >
                            <ArrowLeft size={13} strokeWidth={2.6} /> Back to Step 1
                          </button>

                          {/* Username */}
                          <div className="tropical-field">
                            <div className="tropical-label-row">
                              <label className="tropical-label">Username (@handle)</label>
                              {usernameStatus !== 'idle' && (
                                <span
                                  style={{
                                    fontSize: '11px',
                                    fontWeight: 700,
                                    color:
                                      usernameStatus === 'available'
                                        ? '#15803d'
                                        : usernameStatus === 'taken'
                                          ? '#b91c1c'
                                          : '#b45309',
                                    backgroundColor:
                                      usernameStatus === 'available'
                                        ? '#dcfce7'
                                        : usernameStatus === 'taken'
                                          ? '#fee2e2'
                                          : '#fef3c7',
                                    padding: '1px 7px',
                                    borderRadius: '6px',
                                    lineHeight: 1.3,
                                  }}
                                >
                                  {usernameStatus === 'available'
                                    ? '✓ Available'
                                    : usernameStatus === 'taken'
                                      ? '✕ Taken'
                                      : usernameStatus === 'checking'
                                        ? '...'
                                        : usernameMessage}
                                </span>
                              )}
                            </div>
                            <input
                              type="text"
                              value={username}
                              onChange={(e) => handleUsernameChange(e.target.value)}
                              placeholder="e.g. pranav8302"
                              className="tropical-input"
                              required
                              autoFocus
                            />
                          </div>

                          {/* Create Password */}
                          <div className="tropical-field">
                            <label className="tropical-label">Create Password</label>
                            <div className="tropical-input-wrapper">
                              <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onFocus={() => setIsPasswordFocused(true)}
                                onBlur={() => setTimeout(() => setIsPasswordFocused(false), 200)}
                                placeholder="Min 8 chars with A-Z, 0-9, !@#"
                                className="tropical-input"
                                required
                              />
                              <button
                                type="button"
                                className="tropical-eye-btn"
                                onClick={() => setShowPassword(!showPassword)}
                                title={showPassword ? 'Hide password' : 'Show password'}
                              >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                              </button>
                            </div>

                            {/* Password Requirements Popover */}
                            {isPasswordFocused && remainingRules.length > 0 && (
                              <div className="tropical-pwd-popover">
                                <div className="tropical-pwd-popover-title">
                                  <span>🔒</span> Password Requirements:
                                </div>
                                <ul>
                                  {remainingRules.map((r) => (
                                    <li key={r.id}>{r.label}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>

                          {/* Confirm Password */}
                          <div className="tropical-field">
                            <div className="tropical-label-row">
                              <label className="tropical-label">Confirm Password</label>
                              {confirmPassword && (
                                <span
                                  style={{
                                    fontSize: '11px',
                                    fontWeight: 700,
                                    color: pwdMatch ? '#15803d' : '#b91c1c',
                                  }}
                                >
                                  {pwdMatch ? '✓ Matches' : '✕ No match'}
                                </span>
                              )}
                            </div>
                            <div className="tropical-input-wrapper">
                              <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Re-enter password"
                                className="tropical-input"
                                required
                              />
                              <button
                                type="button"
                                className="tropical-eye-btn"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                title={showConfirmPassword ? 'Hide password' : 'Show password'}
                              >
                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                              </button>
                            </div>
                          </div>

                          {/* City & DOB */}
                          <div style={{ display: 'flex', gap: '10px' }}>
                            <div className="tropical-field" style={{ flex: '1.2' }}>
                              <label className="tropical-label">City</label>
                              <input
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="e.g. New Delhi"
                                className="tropical-input"
                              />
                            </div>

                            <div className="tropical-field" style={{ flex: '1.4' }}>
                              <label className="tropical-label">Date of Birth</label>
                              <div className="tropical-dob-row">
                                <input
                                  type="text"
                                  value={dobDay}
                                  onChange={(e) => setDobDay(e.target.value.replace(/\D/g, '').slice(0, 2))}
                                  placeholder="DD"
                                  maxLength={2}
                                  className="tropical-dob-input"
                                  style={{ flex: 1 }}
                                />
                                <span style={{ color: '#9cb0a4', fontWeight: 600 }}>/</span>
                                <input
                                  type="text"
                                  value={dobMonth}
                                  onChange={(e) => setDobMonth(e.target.value.replace(/\D/g, '').slice(0, 2))}
                                  placeholder="MM"
                                  maxLength={2}
                                  className="tropical-dob-input"
                                  style={{ flex: 1 }}
                                />
                                <span style={{ color: '#9cb0a4', fontWeight: 600 }}>/</span>
                                <input
                                  type="text"
                                  value={dobYear}
                                  onChange={(e) => setDobYear(e.target.value.replace(/\D/g, '').slice(0, 4))}
                                  placeholder="YYYY"
                                  maxLength={4}
                                  className="tropical-dob-input"
                                  style={{ flex: 1.5 }}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Create Account Submit Button */}
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="tropical-btn"
                          >
                            {isSubmitting ? 'Creating Account...' : 'Create Account →'}
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    /* ── SIGN IN MODE (Exact visual match with Image 2) ── */
                    <div>
                      {/* Identifier */}
                      <div className="tropical-field">
                        <label className="tropical-label">login, email or phone number</label>
                        <input
                          type="text"
                          value={signInIdentifier}
                          onChange={(e) => setSignInIdentifier(e.target.value)}
                          placeholder="Login, email or phone"
                          className="tropical-input"
                          required
                          autoFocus
                        />
                      </div>

                      {/* Password */}
                      <div className="tropical-field">
                        <label className="tropical-label">Password</label>
                        <div className="tropical-input-wrapper">
                          <input
                            type={showSignInPassword ? 'text' : 'password'}
                            value={signInPassword}
                            onChange={(e) => setSignInPassword(e.target.value)}
                            placeholder="Password"
                            className="tropical-input"
                            required
                          />
                          <button
                            type="button"
                            className="tropical-eye-btn"
                            onClick={() => setShowSignInPassword(!showSignInPassword)}
                            title={showSignInPassword ? 'Hide password' : 'Show password'}
                          >
                            {showSignInPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>

                      {/* Log In Button (Forest Green Pill) */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="tropical-btn"
                      >
                        {isSubmitting ? 'Logging in...' : 'Log in'}
                      </button>

                      {/* Divider: or log in with */}
                      <div className="tropical-divider">
                        <div className="tropical-divider-line" />
                        <span className="tropical-divider-text">or log in with</span>
                        <div className="tropical-divider-line" />
                      </div>

                      {/* Social Logins: Google & Microsoft Icons */}
                      <div className="tropical-social-row">
                        <button
                          type="button"
                          className="tropical-social-icon-btn"
                          title="Log in with Google"
                        >
                          <svg width="22" height="22" viewBox="0 0 48 48">
                            <path
                              fill="#EA4335"
                              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                            />
                            <path
                              fill="#4285F4"
                              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                            />
                            <path
                              fill="#FBBC05"
                              d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                            />
                            <path
                              fill="#34A853"
                              d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                            />
                          </svg>
                        </button>
                        <button
                          type="button"
                          className="tropical-social-icon-btn"
                          title="Log in with Microsoft"
                        >
                          <svg width="20" height="20" viewBox="0 0 23 23">
                            <rect x="1" y="1" width="10" height="10" fill="#f25022" />
                            <rect x="12" y="1" width="10" height="10" fill="#7fba00" />
                            <rect x="1" y="12" width="10" height="10" fill="#00a4ef" />
                            <rect x="12" y="12" width="10" height="10" fill="#ffb900" />
                          </svg>
                        </button>
                      </div>

                      {/* Forgot password */}
                      <div className="tropical-forgot">
                        <Link href="#">Forgot login or password?</Link>
                      </div>
                    </div>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
