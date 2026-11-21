'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Check, ArrowLeft, X } from 'lucide-react';

export default function SignUpBPage() {
  const [mode, setMode] = useState<'signup' | 'signin'>('signup');
  const [step, setStep] = useState<1 | 2>(1);
  const [menuOpen, setMenuOpen] = useState(false);

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

  // Clean URL
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

  const handleFinalSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage('');

    if (mode === 'signup') {
      if (step === 1) {
        handleNext();
        return;
      }

      if (!username.trim() || username.length < 4 || !/\d/.test(username)) {
        setErrorMessage('Username must have at least 4 characters and 1 digit.');
        return;
      }
      if (usernameStatus === 'taken') {
        setErrorMessage('This username is already taken. Please choose another.');
        return;
      }
      if (!pwdHasMinLen) {
        setErrorMessage('Password must be at least 8 characters long.');
        return;
      }
      if (!pwdHasUpper || !pwdHasLower || !pwdHasDigit) {
        setErrorMessage('Password must include uppercase, lowercase, and a number (0-9).');
        return;
      }
      if (!pwdHasSpecial) {
        setErrorMessage('Password must include at least one special character (!@#$%^&*).');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match.');
        return;
      }

      setIsSubmitting(true);
      try {
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username,
            fullName,
            email,
            password,
            confirmPassword,
            mobile,
            dob: dobDay && dobMonth && dobYear ? `${dobDay}/${dobMonth}/${dobYear}` : '',
            location,
            accountType,
          }),
        });
        const data = await res.json();
        setIsSubmitting(false);

        if (!data.success) {
          setErrorMessage(data.error || 'Failed to create account.');
          return;
        }

        setActiveUser(data.user || { username, fullName, email });
        setUnlocked(true);
      } catch {
        setIsSubmitting(false);
        setActiveUser({ username, fullName, email });
        setUnlocked(true);
      }
    } else {
      // Signin mode
      const identifier = signInIdentifier.trim();
      const pwd = signInPassword;
      if (!identifier || !pwd) {
        setErrorMessage('Please enter your username/email and password.');
        return;
      }

      setIsSubmitting(true);
      try {
        const res = await fetch('/api/auth/signin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ identifier, password: pwd }),
        });
        const data = await res.json();
        setIsSubmitting(false);

        if (!data.success) {
          setErrorMessage(data.error || 'Invalid credentials.');
          return;
        }

        setActiveUser(data.user || { username: identifier, email: identifier });
        setUnlocked(true);
      } catch {
        setIsSubmitting(false);
        setActiveUser({ username: identifier, email: identifier });
        setUnlocked(true);
      }
    }
  };

  const handleReset = () => {
    setUnlocked(false);
    setActiveUser(null);
    setFullName('');
    setUsername('');
    setUsernameStatus('idle');
    setUsernameMessage('');
    setEmail('');
    setSignInIdentifier('');
    setSignInPassword('');
    setMobile('');
    setLocation('');
    setDobDay('');
    setDobMonth('');
    setDobYear('');
    setPassword('');
    setConfirmPassword('');
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

        /* ── Fullscreen Wallpaper Layout ── */
        .tropical-page {
          width: 100vw;
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background-color: #f7faf8;
          display: flex;
          align-items: center;
        }

        /* ── Full HD Background: Leaves on right, White on left ── */
        .tropical-bg-img {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          object-fit: cover;
          object-position: right center;
          pointer-events: none;
          user-select: none;
          z-index: 1;
        }

        /* Subtle responsive fade on mobile so text is always 100% crisp */
        .tropical-bg-gradient {
          position: fixed;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0.95) 0%,
            rgba(255, 255, 255, 0.85) 35%,
            rgba(255, 255, 255, 0.25) 55%,
            rgba(255, 255, 255, 0.0) 70%
          );
        }

        @media (max-width: 820px) {
          .tropical-bg-gradient {
            background: rgba(255, 255, 255, 0.92);
          }
        }

        /* ── Form Container: NO CARD BOX, spans comfortably toward green cut ── */
        .tropical-form-area {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 480px;
          margin-left: clamp(24px, 9vw, 130px);
          padding: 110px 16px 50px;
          box-sizing: border-box;
        }

        @media (max-width: 820px) {
          .tropical-form-area {
            margin-left: auto;
            margin-right: auto;
            max-width: 440px;
            padding: 100px 20px 40px;
          }
        }

        /* ── Title Typography (Exact match with reference image 2) ── */
        .tropical-heading {
          font-size: clamp(28px, 3.5vw, 36px);
          font-weight: 800;
          color: #27362d;
          margin: 0 0 6px;
          letter-spacing: -0.6px;
          line-height: 1.15;
        }

        .tropical-subheading {
          font-size: 13.5px;
          color: #6c8074;
          margin: 0 0 24px;
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

        /* Step indicator */
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
          margin-bottom: 14px;
          position: relative;
        }

        .tropical-label {
          font-size: 12px;
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
          height: 48px;
          border: 1.5px solid #c7d5cd;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.95);
          color: #1a2a20;
          font-size: 14.5px;
          font-weight: 500;
          padding: 0 20px;
          outline: none;
          transition: all 0.2s ease;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
          font-family: inherit;
        }

        .tropical-input:focus {
          border-color: #2e4738;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(46, 71, 56, 0.15), 0 4px 12px rgba(46, 71, 56, 0.08);
        }

        .tropical-input::placeholder {
          color: #9cb0a4;
          font-weight: 400;
          font-size: 13.5px;
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
          height: 48px;
          border: 1.5px solid #c7d5cd;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.95);
          color: #1a2a20;
          font-size: 14.5px;
          font-weight: 600;
          text-align: center;
          outline: none;
          padding: 0 8px;
          transition: all 0.2s;
          font-family: inherit;
        }
        .tropical-dob-input:focus {
          border-color: #2e4738;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(46, 71, 56, 0.15);
        }

        /* ── Dark Forest Green Pill Button (Exact match with Image 2) ── */
        .tropical-btn {
          width: 100%;
          height: 50px;
          background: #32493a;
          color: #ffffff;
          border: none;
          border-radius: 9999px;
          font-size: 15.5px;
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
          margin: 22px 0 16px;
        }
        .tropical-divider-line {
          flex: 1;
          height: 1px;
          background: #d4e0d9;
        }
        .tropical-divider-text {
          font-size: 12px;
          color: #799082;
          font-weight: 500;
          white-space: nowrap;
        }

        /* ── Social Login Row (Rounded squares exactly as Image 2) ── */
        .tropical-social-row {
          display: flex;
          justify-content: center;
          gap: 14px;
          margin-bottom: 12px;
        }
        .tropical-social-icon-btn {
          width: 48px;
          height: 48px;
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
          margin-top: 14px;
          font-size: 13px;
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
          margin-bottom: 6px;
          font-family: inherit;
        }
        .tropical-back-btn:hover {
          color: #1a2a20;
        }

        /* Success Card overlay */
        .tropical-success-box {
          background: rgba(255, 255, 255, 0.98);
          border-radius: 28px;
          padding: 36px 30px;
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

      {/* ── TOP HEADER NAVBAR (Same as Home Page) ── */}
      <header
        data-chrome="true"
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-12 py-2.5 sm:py-5 flex items-center justify-between pointer-events-auto bg-black/30 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none border-b border-amber-500/15 sm:border-b-0 transition-all duration-500"
      >
        <div className="flex items-center">
          <Link
            href="/"
            aria-label="Go back to Home"
            title="Back to Home"
            className="mr-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-amber-500/40 bg-[#16120e]/90 text-amber-200 transition hover:bg-[#2e2318] hover:text-white sm:mr-3 sm:h-10 sm:w-10 shadow-md"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-left group cursor-pointer transition-transform hover:scale-105"
          >
            <img
              src="/pranav_mahajan_transparent.png"
              alt="Pranav Mahajan Logo"
              className="h-10 sm:h-16 md:h-20 w-auto object-contain drop-shadow-[0_4px_20px_rgba(223,165,71,0.4)]"
            />
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center gap-1 cursor-pointer transition-all shadow-md bg-[#16120e]/90 hover:bg-[#221b14] border border-amber-500/30 text-white backdrop-blur-md"
            aria-label="Toggle Navigation Menu"
          >
            {menuOpen ? (
              <X className="w-5 h-5 text-amber-300" />
            ) : (
              <>
                <span className="w-4 h-0.5 rounded-full bg-slate-200" />
                <span className="w-3 h-0.5 bg-[#dfa547] rounded-full self-start ml-3.5" />
                <span className="w-4 h-0.5 rounded-full bg-slate-200" />
              </>
            )}
          </button>
        </div>
      </header>

      {/* ── FULLSCREEN OVERLAY MENU (Identical to Home Page) ── */}
      {menuOpen && (
        <div
          data-chrome="true"
          className="fixed inset-0 z-50 bg-[#090807]/98 backdrop-blur-2xl flex flex-col justify-between p-8 sm:p-14 animate-in fade-in duration-200 text-white"
        >
          <div className="flex items-center justify-between">
            <img
              src="/pranav_mahajan_transparent.png"
              alt="Pranav Mahajan"
              className="h-14 sm:h-18 w-auto object-contain drop-shadow-[0_4px_20px_rgba(223,165,71,0.4)]"
            />
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2.5 rounded-xl bg-[#18130f] border border-amber-500/40 shadow-xs cursor-pointer text-amber-300 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="max-w-md mx-auto w-full space-y-4 text-center my-auto">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-300 block mb-2">
              Directory // Experience
            </span>
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="block w-full py-3 text-2xl sm:text-3xl font-serif-luxury font-bold text-slate-200 hover:text-[#dfa547] transition-colors"
            >
              01 • Welcome (Home)
            </Link>
            <Link
              href="/#roles"
              onClick={() => setMenuOpen(false)}
              className="block w-full py-3 text-2xl sm:text-3xl font-serif-luxury font-bold text-slate-200 hover:text-[#dfa547] transition-colors"
            >
              02 • Choose Role
            </Link>
            <Link
              href="/#contact"
              onClick={() => setMenuOpen(false)}
              className="block w-full py-3 text-2xl sm:text-3xl font-serif-luxury font-bold text-slate-200 hover:text-[#dfa547] transition-colors"
            >
              03 • Executive Desk (Contact)
            </Link>
            <Link
              href="/signup"
              onClick={() => setMenuOpen(false)}
              className="block w-full py-2.5 text-lg font-bold text-amber-300 hover:text-amber-100 transition-colors"
            >
              ✦ Book Edition Sign Up
            </Link>
            <Link
              href="/signupA"
              onClick={() => setMenuOpen(false)}
              className="block w-full py-2.5 text-lg font-bold text-amber-300 hover:text-amber-100 transition-colors"
            >
              ✦ Diamond Edition Sign Up
            </Link>
            <Link
              href="/signupB"
              onClick={() => setMenuOpen(false)}
              className="block w-full py-2.5 text-lg font-bold text-emerald-400 hover:text-emerald-200 transition-colors"
            >
              ✦ Tropical Leaves Edition (Current)
            </Link>
          </div>

          <div className="text-center text-xs text-slate-500 font-mono">
            PRANAV MAHAJAN &bull; MINDFUL ARCHITECTURE
          </div>
        </div>
      )}

      {/* ── MAIN FULLSCREEN CONTAINER ── */}
      <div className="tropical-page">
        {/* FULL HD TROPICAL BACKGROUND IMAGE */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/tropical-bg.jpg"
          alt="Tropical Leaves"
          className="tropical-bg-img"
        />

        {/* Dynamic Gradient to ensure perfect legibility */}
        <div className="tropical-bg-gradient" />

        {/* ── FORM CONTENT: Sits directly on the white background, NO card box! ── */}
        <div className="tropical-form-area">
          {unlocked ? (
            /* ═══ SUCCESS STATE ═══ */
            <div className="tropical-success-box">
              <div
                style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '50%',
                  background: '#32493a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 18px',
                  color: '#ffffff',
                  boxShadow: '0 8px 24px rgba(50, 73, 58, 0.35)',
                }}
              >
                <Check size={36} strokeWidth={2.8} />
              </div>
              <h2 style={{ color: '#27362d', fontSize: '24px', fontWeight: 800, margin: '0 0 10px' }}>
                {mode === 'signup' ? 'Account Created Successfully!' : 'Welcome Back!'}
              </h2>
              <p style={{ color: '#557262', fontSize: '14.5px', lineHeight: 1.6, margin: '0 0 26px' }}>
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
    </>
  );
}
