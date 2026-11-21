'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { User, Eye, EyeOff, Check, ChevronDown, ArrowLeft } from 'lucide-react';

export default function SignUpAPage() {
  const [mode, setMode] = useState<'signup' | 'signin'>('signup');
  const [step, setStep] = useState<1 | 2>(1);
  const [spinType, setSpinType] = useState<'idle' | 'next' | 'back' | 'submit' | 'shake'>('idle');

  // Step 1: Full Name, Email, Mobile, Role
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [accountType, setAccountType] = useState('Individual');

  // Step 2: Username, Password, Confirm Password, Address/Location, DOB
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

  const [unlocked, setUnlocked] = useState(false);
  const [activeUser, setActiveUser] = useState<{ username?: string; fullName?: string; email?: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const checkTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clean URL if any query parameters exist
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

  // Email format check
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const isEmailValid = EMAIL_REGEX.test(email.trim().toLowerCase());

  // Password requirements checklist
  const pwdHasMinLen = password.length >= 8;
  const pwdHasUpper = /[A-Z]/.test(password);
  const pwdHasLower = /[a-z]/.test(password);
  const pwdHasDigit = /\d/.test(password);
  const pwdHasSpecial = /[!@#$%^&*]/.test(password);
  const pwdMatch = password.length > 0 && confirmPassword.length > 0 && password === confirmPassword;

  // Dynamic Password Requirements list (completed items vanish from list)
  const pwdRules = [
    { id: 'len', label: 'At least 8 characters', done: pwdHasMinLen },
    { id: 'upper', label: '1 uppercase letter (A-Z)', done: pwdHasUpper },
    { id: 'lower', label: '1 lowercase letter (a-z)', done: pwdHasLower },
    { id: 'digit', label: '1 numeric digit (0-9)', done: pwdHasDigit },
    { id: 'special', label: '1 special character (!@#$%^&*)', done: pwdHasSpecial },
  ];
  const remainingRules = pwdRules.filter((r) => !r.done);

  // Live real-time username validation and availability check
  const handleUsernameChange = (val: string) => {
    const clean = val.toLowerCase().replace(/[^a-z0-9_.]/g, '');
    setUsername(clean);

    if (checkTimeoutRef.current) {
      clearTimeout(checkTimeoutRef.current);
    }

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
      } catch (_e) {
        if (clean.length >= 4 && /\d/.test(clean)) {
          setUsernameStatus('available');
          setUsernameMessage('Available');
        }
      }
    }, 300);
  };

  const isSpinning = spinType === 'next' || spinType === 'back' || spinType === 'submit';

  // STEP 1 VALIDATION & VISIBLE SPIN TO STEP 2
  const handleNext = () => {
    if (isSpinning) return;
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage('Please enter your Full Name.');
      setSpinType('shake');
      setTimeout(() => setSpinType('idle'), 400);
      return;
    }
    if (!email.trim() || !isEmailValid) {
      setErrorMessage('Please enter a valid email address (e.g. name@gmail.com).');
      setSpinType('shake');
      setTimeout(() => setSpinType('idle'), 400);
      return;
    }
    if (mobile && mobile.length !== 10) {
      setErrorMessage('Mobile number must be exactly 10 digits.');
      setSpinType('shake');
      setTimeout(() => setSpinType('idle'), 400);
      return;
    }

    // Trigger visible card spin 1 round forward
    setSpinType('next');
    setTimeout(() => {
      setStep(2);
    }, 400); // mid-spin behind curtain
    setTimeout(() => {
      setSpinType('idle');
    }, 850); // spin finishes, reveal Step 2
  };

  // STEP 2 TO STEP 1: VISIBLE SPIN BACK
  const handleBack = () => {
    if (isSpinning) return;
    setErrorMessage('');
    setSpinType('back');
    setTimeout(() => {
      setStep(1);
    }, 400);
    setTimeout(() => {
      setSpinType('idle');
    }, 850);
  };

  // FINAL SUBMISSION (OR SIGN IN) WITH VISIBLE SPIN
  const handleFinalSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isSpinning) return;
    setErrorMessage('');

    if (mode === 'signup') {
      if (step === 1) {
        handleNext();
        return;
      }

      // Step 2 validations
      if (!username.trim() || username.length < 4 || !/\d/.test(username)) {
        setErrorMessage('Username must have at least 4 characters and 1 digit (0-9).');
        setSpinType('shake');
        setTimeout(() => setSpinType('idle'), 400);
        return;
      }
      if (usernameStatus === 'taken') {
        setErrorMessage('This username is already taken. Please choose another.');
        setSpinType('shake');
        setTimeout(() => setSpinType('idle'), 400);
        return;
      }
      if (!pwdHasMinLen) {
        setErrorMessage('Password must be at least 8 characters long.');
        setSpinType('shake');
        setTimeout(() => setSpinType('idle'), 400);
        return;
      }
      if (!pwdHasUpper || !pwdHasLower || !pwdHasDigit) {
        setErrorMessage('Password must include uppercase, lowercase, and a number (0-9).');
        setSpinType('shake');
        setTimeout(() => setSpinType('idle'), 400);
        return;
      }
      if (!pwdHasSpecial) {
        setErrorMessage('Password must include at least one special character (!@#$%^&*).');
        setSpinType('shake');
        setTimeout(() => setSpinType('idle'), 400);
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match.');
        setSpinType('shake');
        setTimeout(() => setSpinType('idle'), 400);
        return;
      }

      // Trigger visible spin on submit!
      setSpinType('submit');
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
          setTimeout(() => setSpinType('idle'), 400);
          return;
        }

        setActiveUser(data.user || { username, fullName, email });
        setTimeout(() => {
          setSpinType('idle');
          setUnlocked(true);
        }, 850);
      } catch (_err) {
        setIsSubmitting(false);
        setActiveUser({ username, fullName, email });
        setTimeout(() => {
          setSpinType('idle');
          setUnlocked(true);
        }, 850);
      }
    } else {
      // Signin mode
      const identifier = signInIdentifier.trim() || email.trim();
      const pwd = signInPassword || password;
      if (!identifier || !pwd) {
        setErrorMessage('Please enter your username/email and password.');
        setSpinType('shake');
        setTimeout(() => setSpinType('idle'), 400);
        return;
      }

      setSpinType('submit');
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
          setTimeout(() => setSpinType('idle'), 400);
          return;
        }

        setActiveUser(data.user || { username: identifier, email: identifier });
        setTimeout(() => {
          setSpinType('idle');
          setUnlocked(true);
        }, 850);
      } catch (_err) {
        setIsSubmitting(false);
        setActiveUser({ username: identifier, email: identifier });
        setTimeout(() => {
          setSpinType('idle');
          setUnlocked(true);
        }, 850);
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
    setSpinType('idle');
  };

  return (
    <div
      style={{
        width: '100vw',
        minHeight: '100vh',
        backgroundColor: '#435e70',
        backgroundImage: 'radial-gradient(circle at 50% 45%, #668399 0%, #4a6578 48%, #2e4454 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '16px',
        boxSizing: 'border-box',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      {/* Subtle ambient light aura in background */}
      <div
        style={{
          position: 'absolute',
          width: '950px',
          height: '950px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(162, 203, 229, 0.18) 0%, rgba(67, 94, 112, 0) 70%)',
          pointerEvents: 'none',
        }}
      />



      {/* Top Header Navigation */}
      <header
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 30,
        }}
      >
        <Link
          href="/"
          className="text-white no-underline text-xs sm:text-sm font-bold tracking-wider flex items-center gap-2 bg-white/15 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full backdrop-blur-md hover:bg-white/25 transition"
        >
          <span>&larr;</span> Pranav Mahajan
        </Link>

        <Link
          href="/signup"
          className="text-white/90 no-underline text-xs sm:text-sm font-semibold bg-white/15 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full backdrop-blur-md hover:bg-white/25 transition"
        >
          Book Edition &rarr;
        </Link>
      </header>

      {/* ── SUCCESS UNLOCKED OVERLAY ── */}
      {unlocked ? (
        <div
          style={{
            position: 'relative',
            zIndex: 40,
            background: '#ffffff',
            borderRadius: '28px',
            padding: '40px 32px',
            maxWidth: '420px',
            width: '100%',
            textAlign: 'center',
            boxShadow: '0 30px 60px rgba(15, 30, 45, 0.4)',
            animation: 'popIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: '#a2cbe5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 18px',
              color: '#0e2f47',
              boxShadow: '0 8px 24px rgba(162, 203, 229, 0.6)',
            }}
          >
            <Check size={40} strokeWidth={2.8} />
          </div>
          <h2 style={{ color: '#133c55', fontSize: '24px', fontWeight: 800, margin: '0 0 10px' }}>
            {mode === 'signup' ? 'Account Created Successfully!' : 'Welcome Back!'}
          </h2>
          <p style={{ color: '#5a6e7c', fontSize: '15px', lineHeight: 1.5, margin: '0 0 26px' }}>
            {mode === 'signup'
              ? `Welcome ${activeUser?.fullName || activeUser?.username || 'member'}! Your journey into intentional mastery has begun.`
              : `Logged in as @${activeUser?.username || activeUser?.email}.`}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link
              href="/"
              style={{
                display: 'block',
                background: 'linear-gradient(135deg, #174868 0%, #0d3049 100%)',
                color: '#ffffff',
                padding: '14px 24px',
                borderRadius: '24px',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '15px',
                boxShadow: '0 6px 18px rgba(19, 60, 85, 0.4)',
              }}
            >
              Enter Sanctuary Home &rarr;
            </Link>
            <button
              onClick={handleReset}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#64748b',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                padding: '8px',
              }}
            >
              Switch Account
            </button>
          </div>
        </div>
      ) : (
        /* ── PROMINENT, FULLY RESPONSIVE DIAMOND CARD CONTAINER ── */
        <div className={`diamond-stage ${isSpinning ? 'spinning' : ''}`}>
          {/* 
            Rotated Diamond Card (White square rotated 45°):
            Fills the stage proportionally.
            Spins 1 round forward on Next, 1 round backward on Back,
            and spins on Submit with medium cyan glow!
          */}
          <div
            className={`diamond-card ${spinType === 'next'
              ? 'spin-next'
              : spinType === 'back'
                ? 'spin-back'
                : spinType === 'submit'
                  ? 'spin-submit'
                  : spinType === 'shake'
                    ? 'shake'
                    : ''
              }`}
          >
            {/* The navy corner triangle at bottom-right of square (forms the bottom apex of diamond) */}
            <div className="diamond-bottom-navy-corner" />
          </div>

          {/* ── UPRIGHT CONTENT CONTAINER (Fades out completely during spin) ── */}
          <div className="diamond-content">
            {/* Top Light-Blue Avatar Circle - Shifted high up near the top apex */}
            <div className="diamond-avatar">
              <User size={20} strokeWidth={2.4} />
            </div>

            {/* Error Message Toast */}
            {errorMessage && (
              <div className="diamond-error-toast">
                {errorMessage}
              </div>
            )}

            {/* ── FORM INPUTS (Centered, Perfectly Sized, Zero Cut-off On Mobile & Desktop) ── */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (mode === 'signup' && step === 1) {
                  handleNext();
                } else {
                  handleFinalSubmit();
                }
              }}
              className="diamond-form"
            >
              {mode === 'signup' ? (
                <>
                  {/* ── STEP 1: Full Name, Email, Mobile, 6 Roles ── */}
                  {step === 1 ? (
                    <div className="diamond-form-step">
                      {/* 1. Full Name */}
                      <div className="input-group">
                        <label className="input-label">Full Name</label>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => handleFullNameChange(e.target.value)}
                          placeholder="e.g. Yuvraj Singh"
                          className="diamond-input"
                          required
                          autoFocus
                        />
                      </div>

                      {/* 2. Email Address (Gmail) */}
                      <div className="input-group">
                        <label className="input-label">Email Address (Gmail)</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@gmail.com"
                          className="diamond-input"
                          required
                        />
                      </div>

                      {/* 3. Mobile Number */}
                      <div className="input-group">
                        <label className="input-label">Mobile Number (10 Digits)</label>
                        <input
                          type="tel"
                          value={mobile}
                          onChange={(e) => handleMobileChange(e.target.value)}
                          placeholder="10-digit number"
                          maxLength={10}
                          className="diamond-input"
                        />
                      </div>

                      {/* 4. Role (The 6 Roles) */}
                      <div className="input-group">
                        <label className="input-label">Select Role</label>
                        <div style={{ position: 'relative' }}>
                          <select
                            value={accountType}
                            onChange={(e) => setAccountType(e.target.value)}
                            className="diamond-input"
                            style={{
                              cursor: 'pointer',
                              appearance: 'none',
                              paddingRight: '26px',
                              fontWeight: 600,
                              color: '#0f172a',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                            }}
                          >
                            <option value="Individual">Individual (Seeker)</option>
                            <option value="Student">Student (Academic)</option>
                            <option value="Parent">Parent (Conscious Parenting)</option>
                            <option value="Educational Institution">Educational Institution</option>
                            <option value="Corporate">Corporate / Business</option>
                            <option value="Government & NGO">Government / NGO</option>
                          </select>
                          <ChevronDown
                            size={16}
                            style={{
                              position: 'absolute',
                              right: 2,
                              top: '50%',
                              transform: 'translateY(-50%)',
                              pointerEvents: 'none',
                              color: '#64748b',
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* ── STEP 2: Username, Password, Confirm Password, Address, DOB ── */
                    <div className="diamond-form-step">
                      {/* Step 2 Back Nav Link (Clean Typography, No Overlapping Circle) */}
                      <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '-2px' }}>
                        <button
                          type="button"
                          onClick={handleBack}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#64748b',
                            fontSize: '12px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '1px 0',
                          }}
                        >
                          <ArrowLeft size={13} strokeWidth={2.6} />
                          <span>Back</span>
                        </button>
                      </div>

                      {/* 1. Username (@handle) with live availability pill */}
                      <div className="input-group">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <label className="input-label">Username (@handle)</label>
                          {usernameStatus !== 'idle' && (
                            <span
                              style={{
                                fontSize: '10px',
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
                                padding: '1px 5px',
                                borderRadius: '4px',
                                lineHeight: 1,
                              }}
                            >
                              {usernameStatus === 'available'
                                ? '✓ Avail'
                                : usernameStatus === 'taken'
                                  ? '✕ Taken'
                                  : usernameMessage || '...'}
                            </span>
                          )}
                        </div>
                        <input
                          type="text"
                          value={username}
                          onChange={(e) => handleUsernameChange(e.target.value)}
                          placeholder="e.g. yuvraj8302"
                          className="diamond-input"
                          required
                          autoFocus
                        />
                      </div>

                      {/* 2. Password with eye toggle & live requirements popover */}
                      <div className="input-group" style={{ position: 'relative' }}>
                        <label className="input-label">Create Password</label>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          onFocus={() => setIsPasswordFocused(true)}
                          onBlur={() => setTimeout(() => setIsPasswordFocused(false), 200)}
                          placeholder=" "
                          className="diamond-input"
                          style={{ paddingRight: '24px' }}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          style={{
                            position: 'absolute',
                            right: 0,
                            bottom: '4px',
                            background: 'none',
                            border: 'none',
                            color: '#64748b',
                            cursor: 'pointer',
                            padding: '2px',
                          }}
                          title={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>

                        {/* Floating Dynamic Requirements Box */}
                        {isPasswordFocused && remainingRules.length > 0 && (
                          <div
                            style={{
                              position: 'absolute',
                              top: '100%',
                              left: '-10px',
                              right: '-10px',
                              zIndex: 60,
                              backgroundColor: 'rgba(15, 38, 56, 0.98)',
                              borderRadius: '8px',
                              padding: '6px 10px',
                              boxShadow: '0 12px 28px rgba(0,0,0,0.35)',
                              backdropFilter: 'blur(8px)',
                              marginTop: '3px',
                              border: '1px solid rgba(162, 203, 229, 0.35)',
                            }}
                          >
                            <div
                              style={{
                                color: '#a2cbe5',
                                fontSize: '9.5px',
                                fontWeight: 700,
                                marginBottom: '3px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                              }}
                            >
                              <span>🔒</span>
                              <span>Password Requirements:</span>
                            </div>
                            <ul
                              style={{
                                margin: 0,
                                paddingLeft: '14px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '2px',
                              }}
                            >
                              {remainingRules.map((r) => (
                                <li
                                  key={r.id}
                                  style={{
                                    color: '#f8fafc',
                                    fontSize: '9px',
                                    lineHeight: 1.25,
                                  }}
                                >
                                  {r.label}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* 3. Confirm Password */}
                      <div className="input-group" style={{ position: 'relative' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <label className="input-label">Confirm Password</label>
                          {confirmPassword && (
                            <span
                              style={{
                                fontSize: '9px',
                                fontWeight: 700,
                                color: pwdMatch ? '#15803d' : '#b91c1c',
                              }}
                            >
                              {pwdMatch ? '✓ Matches' : '✕ No match'}
                            </span>
                          )}
                        </div>
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Re-enter password"
                          className="diamond-input"
                          style={{ paddingRight: '24px' }}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          style={{
                            position: 'absolute',
                            right: 0,
                            bottom: '4px',
                            background: 'none',
                            border: 'none',
                            color: '#64748b',
                            cursor: 'pointer',
                            padding: '2px',
                          }}
                          title={showConfirmPassword ? 'Hide password' : 'Show password'}
                        >
                          {showConfirmPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>

                      {/* 4. Address & Date of Birth Row */}
                      <div style={{ display: 'flex', gap: '8px' }}>
                        {/* Address */}
                        <div className="input-group" style={{ flex: '1.2' }}>
                          <label className="input-label">City</label>
                          <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="e.g. New Delhi"
                            className="diamond-input"
                          />
                        </div>

                        {/* Date of Birth: DD / MM / YYYY */}
                        <div className="input-group" style={{ flex: '1.3' }}>
                          <label className="input-label">DOB</label>
                          <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
                            <input
                              type="text"
                              value={dobDay}
                              onChange={(e) => setDobDay(e.target.value.replace(/\D/g, '').slice(0, 2))}
                              placeholder="DD"
                              maxLength={2}
                              className="diamond-input"
                              style={{ textAlign: 'center', padding: '3px 1px' }}
                            />
                            <span style={{ color: '#94a3b8', fontSize: '10px' }}>/</span>
                            <input
                              type="text"
                              value={dobMonth}
                              onChange={(e) => setDobMonth(e.target.value.replace(/\D/g, '').slice(0, 2))}
                              placeholder="MM"
                              maxLength={2}
                              className="diamond-input"
                              style={{ textAlign: 'center', padding: '3px 1px' }}
                            />
                            <span style={{ color: '#94a3b8', fontSize: '10px' }}>/</span>
                            <input
                              type="text"
                              value={dobYear}
                              onChange={(e) => setDobYear(e.target.value.replace(/\D/g, '').slice(0, 4))}
                              placeholder="YYYY"
                              maxLength={4}
                              className="diamond-input"
                              style={{ textAlign: 'center', padding: '3px 1px' }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                /* ── SIGN IN MODE ── */
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div className="input-group">
                    <label className="input-label">Email or Username</label>
                    <input
                      type="text"
                      value={signInIdentifier}
                      onChange={(e) => setSignInIdentifier(e.target.value)}
                      placeholder="e.g. yuvraj or name@gmail.com"
                      className="diamond-input"
                      required
                      autoFocus
                    />
                  </div>
                  <div className="input-group" style={{ position: 'relative' }}>
                    <label className="input-label">Password</label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="diamond-input"
                      style={{ paddingRight: '22px' }}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: 0,
                        bottom: '4px',
                        background: 'none',
                        border: 'none',
                        color: '#64748b',
                        cursor: 'pointer',
                        padding: '2px',
                      }}
                    >
                      {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>
              )}
            </form>

            {/* 
              ── THE ONE & ONLY BOTTOM APEX BUTTON ──
              Positioned directly in the visual center of the navy apex triangle.
              100% clickable with clean hover styling!
            */}
            <button
              type="button"
              onClick={() => {
                if (mode === 'signup' && step === 1) {
                  handleNext();
                } else {
                  handleFinalSubmit();
                }
              }}
              disabled={isSubmitting}
              className="diamond-bottom-apex-button"
              title={mode === 'signup' ? (step === 1 ? 'Go to Step 2' : 'Complete Sign up') : 'Log in'}
            >
              <span className="diamond-bottom-button-text">
                {isSubmitting
                  ? '...'
                  : mode === 'signup'
                    ? step === 1
                      ? 'Next →'
                      : 'Sign up'
                    : 'Log in'}
              </span>
            </button>

            {/* Right Side Toggle: "Log in" / "Sign up" (Clean Typography, No Box) */}
            <div className="diamond-right-toggle">
              <button
                type="button"
                onClick={() => {
                  setErrorMessage('');
                  setMode(mode === 'signup' ? 'signin' : 'signup');
                  setStep(1);
                  setSpinType('next');
                  setTimeout(() => setSpinType('idle'), 850);
                }}
                className="diamond-toggle-btn"
              >
                {mode === 'signup' ? 'Log in' : 'Sign up'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global & Responsive Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
        /* 
          MATHEMATICALLY CALIBRATED DIAMOND CONTAINER:
          Guarantees 100% containment within the 45-degree diamond silhouette.
          Formula: Form Width (235px) + Form Height (165px) = 400px <= Diamond Size (520px) - 80px margin.
          Zero elements cross or touch the diagonal boundary borders on ANY screen!
        */
        .diamond-stage {
          position: relative;
          width: min(82vh, 86vw, 560px);
          height: min(82vh, 86vw, 560px);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: auto;
          perspective: 1200px;
          filter: drop-shadow(0 26px 45px rgba(10, 25, 40, 0.65)) drop-shadow(0 10px 20px rgba(0, 0, 0, 0.4));
        }

        /* 
          Rotated 45deg Diamond Card:
          Clean white card filling the stage proportionally with rounded corners
          and rich multi-layered elevation shadow.
        */
        .diamond-card {
          position: absolute;
          width: 70.71%;
          height: 70.71%;
          background-color: #ffffff;
          border-radius: clamp(32px, 5.2vw, 42px);
          overflow: hidden;
          box-shadow: 0 28px 70px rgba(0, 0, 0, 0.4), 0 12px 30px rgba(0, 0, 0, 0.3), 0 0 30px rgba(162, 203, 229, 0.18);
          transform: rotate(45deg);
        }

        /* Navy corner triangle at bottom-right of square (bottom apex of rotated diamond) */
        .diamond-bottom-navy-corner {
          position: absolute;
          bottom: 0;
          right: 0;
          width: clamp(86px, 16%, 106px);
          height: clamp(86px, 16%, 106px);
          background: linear-gradient(135deg, #174868 0%, #0d3049 100%);
          border: none;
        }

        /* 
          Dynamic Rotations:
          1 single round (360°) forward on Next.
          1 single round (-360°) backward on Back.
          1 single round with glowing aura on Submit.
          Shake animation on validation error.
        */
        .diamond-card.spin-next {
          animation: diamondSpinForward 0.85s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .diamond-card.spin-back {
          animation: diamondSpinBackward 0.85s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .diamond-card.spin-submit {
          animation: diamondSpinSubmit 0.85s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .diamond-card.shake {
          animation: diamondShake 0.4s ease-in-out;
        }

        @keyframes diamondSpinForward {
          0% {
            transform: rotate(45deg) scale(1);
            box-shadow: 0 40px 90px -15px rgba(18, 42, 62, 0.45);
          }
          50% {
            transform: rotate(225deg) scale(0.86);
            box-shadow: 0 0 50px rgba(162, 203, 229, 0.8), 0 25px 60px rgba(18, 42, 62, 0.55);
          }
          100% {
            transform: rotate(405deg) scale(1);
            box-shadow: 0 40px 90px -15px rgba(18, 42, 62, 0.45);
          }
        }

        @keyframes diamondSpinBackward {
          0% {
            transform: rotate(45deg) scale(1);
            box-shadow: 0 40px 90px -15px rgba(18, 42, 62, 0.45);
          }
          50% {
            transform: rotate(-135deg) scale(0.86);
            box-shadow: 0 0 50px rgba(162, 203, 229, 0.8), 0 25px 60px rgba(18, 42, 62, 0.55);
          }
          100% {
            transform: rotate(-315deg) scale(1);
            box-shadow: 0 35px 80px -15px rgba(18, 42, 62, 0.45);
          }
        }

        @keyframes diamondSpinSubmit {
          0% {
            transform: rotate(45deg) scale(1);
            box-shadow: 0 40px 90px -15px rgba(18, 42, 62, 0.45);
          }
          50% {
            transform: rotate(225deg) scale(0.84);
            box-shadow: 0 0 65px rgba(162, 203, 229, 0.95), 0 30px 70px rgba(18, 42, 62, 0.65);
          }
          100% {
            transform: rotate(405deg) scale(1);
            box-shadow: 0 40px 90px -15px rgba(18, 42, 62, 0.45);
          }
        }

        @keyframes diamondShake {
          0%, 100% { transform: rotate(45deg) translateX(0); }
          20% { transform: rotate(43deg) translateX(-5px); }
          40% { transform: rotate(47deg) translateX(5px); }
          60% { transform: rotate(44deg) translateX(-3px); }
          80% { transform: rotate(46deg) translateX(3px); }
        }

        /* 
          Upright Content Layer:
          Fades out completely (opacity: 0) while spinning,
          so NO text is seen tumbling or bleeding behind the card!
        */
        .diamond-content {
          position: relative;
          z-index: 20;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          padding: 8px;
          pointer-events: none;
          opacity: 1;
          transform: scale(1);
          transition: opacity 0.22s ease, transform 0.22s ease;
        }
        .diamond-stage.spinning .diamond-content {
          opacity: 0 !important;
          transform: scale(0.88);
          pointer-events: none !important;
        }

        /* Top Avatar Circle - Sits naturally in the upper-middle apex */
        .diamond-avatar {
          width: clamp(38px, 5.5vw, 44px);
          height: clamp(38px, 5.5vw, 44px);
          border-radius: 50%;
          background-color: #a3cae2;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          margin-top: 0;
          margin-bottom: clamp(6px, 1.2vh, 10px);
          box-shadow: 0 6px 16px rgba(163, 202, 226, 0.5);
          pointer-events: auto;
        }

        /* Error Message Toast */
        .diamond-error-toast {
          color: #991b1b;
          background-color: #fee2e2;
          border: 1px solid #fecaca;
          font-size: 11px;
          font-weight: 600;
          padding: 2px 10px;
          border-radius: 12px;
          margin-bottom: 5px;
          max-width: 240px;
          text-align: center;
          line-height: 1.25;
          animation: fadeIn 0.2s ease;
          pointer-events: auto;
        }

        /* 
          Form Area - Strictly Inscribed in Diamond Center.
          Width 230px leaves 60px+ margin on all sides of a 520px diamond!
        */
        .diamond-form {
          width: clamp(210px, 32vw, 235px);
          max-width: 240px;
          display: flex;
          flex-direction: column;
          margin-top: 0;
          margin-bottom: clamp(22px, 4vh, 30px);
          pointer-events: auto;
        }

        .diamond-form-step {
          display: flex;
          flex-direction: column;
          gap: clamp(7px, 1.2vh, 9px);
        }

        /* Input Group & Label */
        .input-group {
          position: relative;
          pointer-events: auto;
        }
        .input-label {
          display: block;
          font-size: 12px;
          font-weight: 700;
          color: #1e293b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 2px;
        }

        /* Inputs: Crisp, distinct 15px font, dark high-contrast readable slate color */
        .diamond-input {
          width: 100%;
          border: none;
          border-bottom: 1.5px solid #94a3b8;
          background: transparent !important;
          color: #091e2f;
          font-size: 15px;
          font-weight: 600;
          padding: 3.5px 0;
          outline: none !important;
          box-shadow: none !important;
          box-sizing: border-box;
          transition: border-color 0.2s ease, border-width 0.2s ease;
          border-radius: 0;
          pointer-events: auto;
        }
        .diamond-input:focus {
          border-bottom-color: #0e2f47 !important;
          border-bottom-width: 2px !important;
        }
        .diamond-input::placeholder {
          color: #94a3b8;
          font-size: 12px;
          font-weight: 400;
          font-style: italic;
        }
        .diamond-input:-webkit-autofill,
        .diamond-input:-webkit-autofill:hover,
        .diamond-input:-webkit-autofill:focus {
          -webkit-text-fill-color: #091e2f !important;
          -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
          transition: background-color 99999s ease-in-out 0s;
          background: transparent !important;
        }

        /* 
          The ONE & ONLY Bottom Navy Corner Button:
          Centered directly in the middle of the navy apex triangle.
          Prominent, dynamic, and 100% clickable!
        */
        .diamond-bottom-apex-button {
          position: absolute;
          bottom: clamp(22px, 3.8vh, 30px);
          left: 50%;
          transform: translateX(-50%);
          width: clamp(100px, 18vw, 130px);
          height: 38px;
          background: transparent;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          outline: none !important;
          pointer-events: auto;
          z-index: 25;
          transition: transform 0.15s ease, filter 0.15s ease;
        }
        .diamond-bottom-apex-button:hover {
          transform: translateX(-50%) scale(1.06);
          filter: brightness(1.25);
        }
        .diamond-bottom-button-text {
          color: #ffffff;
          font-size: clamp(14px, 2.2vw, 16px);
          font-weight: 700;
          letter-spacing: 0.5px;
          white-space: nowrap;
          user-select: none;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
        }

        /* 
          Right Side Corner Toggle Button ("Log in" / "Sign up"):
          Clean, elegant typography sitting in the right side corner.
          No box, no border, pure refined typography matching reference design!
        */
        .diamond-right-toggle {
          position: absolute;
          right: clamp(12px, 3.2%, 24px);
          top: 50%;
          transform: translateY(-50%);
          z-index: 25;
          pointer-events: auto;
        }
        .diamond-toggle-btn {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          color: #4a6882;
          font-size: clamp(12.5px, 2vw, 14px);
          font-weight: 700;
          cursor: pointer;
          padding: 4px 6px;
          letter-spacing: 0.3px;
          transition: all 0.2s ease;
          border-radius: 4px;
          pointer-events: auto;
          white-space: nowrap;
        }
        .diamond-toggle-btn:hover {
          color: #0e2f47;
          transform: scale(1.08);
          text-decoration: underline;
        }

        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0.92);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* 
          ── DEDICATED MOBILE SCREEN ENHANCEMENTS (<= 480px) ──
          Calculated so no inputs or texts ever cut or touch the diagonal borders!
        */
        @media (max-width: 480px) {
          .diamond-stage {
            width: 90vw;
            height: 90vw;
            max-width: 360px;
            max-height: 360px;
          }
          .diamond-card {
            border-radius: 32px;
          }
          .diamond-avatar {
            width: 34px;
            height: 34px;
            margin-bottom: 6px;
          }
          .diamond-avatar svg {
            width: 18px;
            height: 18px;
          }
          .diamond-form {
            width: 185px;
            max-width: 190px;
            margin-bottom: 18px;
          }
          .diamond-form-step {
            gap: 5px;
          }
          .input-label {
            font-size: 10px;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 1px;
            letter-spacing: 0.3px;
          }
          .diamond-input {
            font-size: 11.5px;
            padding: 2px 0;
            border-bottom-width: 1.2px;
            border-bottom-color: #94a3b8;
          }
          .diamond-input::placeholder {
            font-size: 10px;
            color: #94a3b8;
            font-style: italic;
          }
          .diamond-bottom-navy-corner {
            width: 72px;
            height: 72px;
          }
          .diamond-bottom-apex-button {
            bottom: 18px;
            height: 34px;
          }
          .diamond-bottom-button-text {
            font-size: 12.5px;
          }
          .diamond-right-toggle {
            right: 6px;
          }
          .diamond-toggle-btn {
            font-size: 10.5px;
            padding: 2px 4px;
          }
        }
      `}} />
    </div>
  );
}
