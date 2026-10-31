'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function SignUpPage() {
  const [mode, setMode] = useState<'signup' | 'signin'>('signup');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [dobDay, setDobDay] = useState('');
  const [dobMonth, setDobMonth] = useState('');
  const [dobYear, setDobYear] = useState('');
  const [location, setLocation] = useState('');
  const [classGrade, setClassGrade] = useState('');
  const [accountType, setAccountType] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (mode === 'signup') {
      if (!fullName.trim()) { setErrorMessage('Please enter your Full Name'); return; }
      if (!email.trim()) { setErrorMessage('Please enter your Email Address'); return; }
      if (password.length < 6) { setErrorMessage('Password must be at least 6 characters'); return; }
      if (password !== confirmPassword) { setErrorMessage('Passwords do not match'); return; }
    } else {
      if (!email.trim() || !password) { setErrorMessage('Email and password required'); return; }
    }
    setUnlocked(true);
  };

  const handleRelock = () => {
    setUnlocked(false);
    setFullName(''); setEmail(''); setMobile('');
    setDobDay(''); setDobMonth(''); setDobYear('');
    setLocation(''); setClassGrade(''); setAccountType('');
    setPassword(''); setConfirmPassword(''); setErrorMessage('');
  };

  return (
    <>
      <style>{`
        @keyframes velvetWaveLeft {
          0%, 100% { opacity: 0.55; transform: scale(1) translateY(0); }
          50% { opacity: 0.9; transform: scale(1.06) translateY(-8px); }
        }
        @keyframes velvetWaveRight {
          0%, 100% { opacity: 0.5; transform: scale(1) translateY(0); }
          50% { opacity: 0.85; transform: scale(1.05) translateY(6px); }
        }
        @keyframes goldGleamTop {
          0%, 100% { opacity: 0.4; transform: scaleX(1); }
          50% { opacity: 0.8; transform: scaleX(1.12); }
        }
        @keyframes goldGleamBottom {
          0%, 100% { opacity: 0.4; transform: scaleX(1); }
          50% { opacity: 0.8; transform: scaleX(1.08); }
        }
        @keyframes keyGlow {
          0%, 100% { opacity: 0.4; filter: blur(12px); transform: scale(1); }
          50% { opacity: 0.85; filter: blur(18px); transform: scale(1.2); }
        }
        @keyframes btnHoverGlow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(223, 165, 71, 0.4), inset 0 0 10px rgba(255, 230, 150, 0.3);
          }
          50% {
            box-shadow: 0 0 35px rgba(251, 191, 36, 0.75), inset 0 0 20px rgba(255, 240, 180, 0.6);
          }
        }
        .clean-input {
          outline: none;
          border: none;
          background: transparent;
          color: #ffffff;
          font-family: Georgia, serif;
          font-weight: 600;
          font-size: clamp(0.7rem, 1.25vw, 1.05rem);
          letter-spacing: 0.02em;
          text-shadow: 0 1px 3px rgba(0,0,0,0.9), 0 0 8px rgba(255,220,130,0.5);
          box-sizing: border-box;
          padding: 0 2px;
          caret-color: #ffd875;
          z-index: 20;
        }
        .clean-input:focus {
          background: rgba(255, 235, 170, 0.08);
          border-radius: 2px;
        }
      `}</style>

      {/* ── FULL SCREEN CONTAINER ── */}
      <div style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#070503',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>

        {/* ── 1. SEAMLESS MATCHING VELVET BACKGROUND (Edge to Edge, NO Black Bars) ── */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: mode === 'signup' ? "url('/book-signup.jpg')" : "url('/uploaded.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.75) contrast(1.1) saturate(1.15)',
          zIndex: 0,
        }} />

        {/* Subtle velvet vignette so center stays crisp */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(10,6,2,0) 40%, rgba(5,3,1,0.55) 80%, rgba(2,1,0,0.85) 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        }} />

        {/* ── 2. SEAMLESS LIVING AMBIENT ANIMATIONS ON THE 4 SIDES ── */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none', overflow: 'hidden' }}>
          {/* Left velvet folds wave animation */}
          <div style={{
            position: 'absolute',
            left: '-6%',
            top: '5%',
            bottom: '5%',
            width: '24vw',
            background: 'radial-gradient(ellipse at left center, rgba(223,165,71,0.3) 0%, rgba(184,115,27,0.15) 45%, transparent 75%)',
            filter: 'blur(35px)',
            animation: 'velvetWaveLeft 7s ease-in-out infinite',
          }} />

          {/* Right velvet folds & key glimmer */}
          <div style={{
            position: 'absolute',
            right: '-6%',
            top: '5%',
            bottom: '5%',
            width: '25vw',
            background: 'radial-gradient(ellipse at right center, rgba(251,191,36,0.38) 0%, rgba(184,115,27,0.18) 45%, transparent 75%)',
            filter: 'blur(40px)',
            animation: 'velvetWaveRight 6s ease-in-out infinite',
          }} />

          {/* Top border golden gleam */}
          <div style={{
            position: 'absolute',
            top: '-4%',
            left: '12%',
            right: '12%',
            height: '18vh',
            background: 'radial-gradient(ellipse at center top, rgba(251,215,130,0.3) 0%, rgba(184,115,27,0.12) 50%, transparent 75%)',
            filter: 'blur(30px)',
            animation: 'goldGleamTop 6.5s ease-in-out infinite',
          }} />

          {/* Bottom border golden gleam */}
          <div style={{
            position: 'absolute',
            bottom: '-4%',
            left: '12%',
            right: '12%',
            height: '18vh',
            background: 'radial-gradient(ellipse at center bottom, rgba(223,165,71,0.3) 0%, rgba(184,115,27,0.12) 50%, transparent 75%)',
            filter: 'blur(30px)',
            animation: 'goldGleamBottom 7.5s ease-in-out infinite',
          }} />

          {/* Golden Key aura flare */}
          <div style={{
            position: 'absolute',
            top: '48%',
            right: '8%',
            width: '8vw',
            height: '8vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,225,140,0.45) 0%, rgba(223,165,71,0.15) 50%, transparent 70%)',
            animation: 'keyGlow 4s ease-in-out infinite',
          }} />
        </div>

        {/* ── 3. MAIN CRISP BOOK CONTAINER (16:9 PROPORTIONAL & FULLY RESPONSIVE) ── */}
        <div style={{
          position: 'relative',
          width: 'min(100vw, calc(100vh * 1.7778))',
          height: 'min(100vh, calc(100vw / 1.7778))',
          aspectRatio: '16 / 9',
          zIndex: 5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>

          {/* Crisp Main Book Foreground Image */}
          <img
            src={mode === 'signup' ? '/book-signup.jpg' : '/uploaded.jpg'}
            alt="Sanctum Book"
            draggable={false}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              userSelect: 'none',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />

          {/* ── 4. INTERACTIVE OVERLAY EXACTLY ALIGNED OVER THE BOOK LINES ── */}
          <div style={{ position: 'relative', width: '100%', height: '100%', zIndex: 10 }}>

            {unlocked ? (
              /* ═══ UNLOCKED STATE ═══ */
              <div style={{
                position: 'absolute',
                top: '12%', left: '8%', right: '20%', bottom: '12%',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                background: 'rgba(18, 12, 6, 0.82)',
                backdropFilter: 'blur(8px)',
                borderRadius: '12px',
                border: '2px solid rgba(223, 165, 71, 0.6)',
                boxShadow: '0 0 50px rgba(0,0,0,0.9), 0 0 40px rgba(184,115,27,0.5)',
              }}>
                <div className="animate-book-open" style={{ textAlign: 'center', padding: '1.5rem' }}>
                  <p style={{
                    color: '#fbe6af',
                    fontSize: 'clamp(1.3rem, 3.5vw, 2.6rem)',
                    fontWeight: 700,
                    fontFamily: 'Georgia, serif',
                    textShadow: '0 2px 25px rgba(0,0,0,0.95), 0 0 40px rgba(184,115,27,0.7)',
                  }}>
                    {mode === 'signup' ? `Welcome, ${fullName || 'Seeker'}` : `Welcome back, ${email}`}
                  </p>
                  <p style={{
                    color: '#dfa547',
                    fontSize: 'clamp(0.75rem, 1.4vw, 1.05rem)',
                    marginTop: '0.6rem',
                    textShadow: '0 1px 10px rgba(0,0,0,0.85)',
                  }}>
                    ✦ The Sanctum Book is Unlocked ✦
                  </p>
                  <button onClick={handleRelock} style={{
                    marginTop: '2rem',
                    color: '#fbe6af',
                    background: 'linear-gradient(90deg, #8c5a18, #dfa547, #b8731b)',
                    border: '1.5px solid rgba(251,230,175,0.7)',
                    padding: '0.55rem 2.2rem',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: 'clamp(0.75rem, 1.2vw, 0.95rem)',
                    fontFamily: 'Georgia, serif',
                    fontWeight: 700,
                    boxShadow: '0 4px 20px rgba(184,115,27,0.6)',
                  }}>
                    🔒 Lock Again
                  </button>
                </div>
              </div>
            ) : mode === 'signup' ? (
              /* ═══ SIGNUP: ACCURATE INTERACTIVE INPUTS DIRECTLY ON THE LINES ═══ */
              <form onSubmit={handleSubmit} style={{ width: '100%', height: '100%', position: 'relative' }}>

                {/* Error Banner */}
                {errorMessage && (
                  <div style={{
                    position: 'absolute',
                    top: '7%',
                    left: '18%',
                    right: '25%',
                    zIndex: 30,
                    color: '#ffe0e0',
                    background: 'rgba(120, 20, 20, 0.92)',
                    border: '1.5px solid rgba(255, 100, 100, 0.7)',
                    backdropFilter: 'blur(5px)',
                    padding: '0.25rem 0.8rem',
                    borderRadius: '4px',
                    fontSize: 'clamp(0.55rem, 0.9vw, 0.75rem)',
                    textAlign: 'center',
                    fontWeight: 600,
                    boxShadow: '0 4px 15px rgba(0,0,0,0.6)',
                  }}>
                    ⚠️ {errorMessage}
                  </div>
                )}

                {/* 1. Full Name (Row 1 Left) */}
                <input
                  type="text"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="clean-input"
                  style={{
                    position: 'absolute',
                    left: '20.5%',
                    top: '24.2%',
                    width: '25.0%',
                    height: '4.2%',
                  }}
                  required
                />

                {/* 2. Class / Grade (Row 1 Right) */}
                <input
                  type="text"
                  value={classGrade}
                  onChange={e => setClassGrade(e.target.value)}
                  className="clean-input"
                  style={{
                    position: 'absolute',
                    left: '54.8%',
                    top: '24.2%',
                    width: '21.0%',
                    height: '4.2%',
                  }}
                />

                {/* 3. Email Address (Row 2 Left) */}
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="clean-input"
                  style={{
                    position: 'absolute',
                    left: '20.5%',
                    top: '37.5%',
                    width: '25.0%',
                    height: '4.2%',
                  }}
                  required
                />

                {/* 4. Account Type (Row 2 Right - Select) */}
                <select
                  value={accountType}
                  onChange={e => setAccountType(e.target.value)}
                  className="clean-input"
                  style={{
                    position: 'absolute',
                    left: '54.8%',
                    top: '37.5%',
                    width: '21.0%',
                    height: '4.2%',
                    cursor: 'pointer',
                    color: accountType ? '#ffffff' : 'transparent',
                    appearance: 'none',
                    WebkitAppearance: 'none',
                  }}
                >
                  <option value="" disabled style={{ background: '#241407', color: '#888' }}>Select Type</option>
                  <option value="Student" style={{ background: '#241407', color: '#fbe6af' }}>Student</option>
                  <option value="Teacher" style={{ background: '#241407', color: '#fbe6af' }}>Teacher</option>
                  <option value="Parent" style={{ background: '#241407', color: '#fbe6af' }}>Parent</option>
                  <option value="Seeker" style={{ background: '#241407', color: '#fbe6af' }}>Seeker</option>
                </select>

                {/* 5. Mobile Number (Row 3 Left) */}
                <input
                  type="tel"
                  value={mobile}
                  onChange={e => setMobile(e.target.value)}
                  className="clean-input"
                  style={{
                    position: 'absolute',
                    left: '20.5%',
                    top: '51.0%',
                    width: '25.0%',
                    height: '4.2%',
                  }}
                />

                {/* 6. Create Password (Row 3 Right) */}
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="clean-input"
                  style={{
                    position: 'absolute',
                    left: '54.8%',
                    top: '51.0%',
                    width: '18.5%',
                    height: '4.2%',
                  }}
                  required
                />
                {/* Click target over the drawn eye icon */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    left: '74.2%',
                    top: '50.2%',
                    width: '3.0%',
                    height: '5.2%',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    zIndex: 25,
                    borderRadius: '50%',
                  }}
                  title={showPassword ? 'Hide password' : 'Show password'}
                />

                {/* 7. Date of Birth (Row 4 Left: DD / MM / YYYY) */}
                <input
                  type="text"
                  value={dobDay}
                  onChange={e => setDobDay(e.target.value)}
                  maxLength={2}
                  className="clean-input"
                  style={{
                    position: 'absolute',
                    left: '20.2%',
                    top: '64.5%',
                    width: '3.2%',
                    height: '4.2%',
                    textAlign: 'center',
                  }}
                />
                <input
                  type="text"
                  value={dobMonth}
                  onChange={e => setDobMonth(e.target.value)}
                  maxLength={2}
                  className="clean-input"
                  style={{
                    position: 'absolute',
                    left: '24.5%',
                    top: '64.5%',
                    width: '3.2%',
                    height: '4.2%',
                    textAlign: 'center',
                  }}
                />
                <input
                  type="text"
                  value={dobYear}
                  onChange={e => setDobYear(e.target.value)}
                  maxLength={4}
                  className="clean-input"
                  style={{
                    position: 'absolute',
                    left: '29.2%',
                    top: '64.5%',
                    width: '6.2%',
                    height: '4.2%',
                    textAlign: 'center',
                  }}
                />

                {/* 8. Confirm Password (Row 4 Right) */}
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="clean-input"
                  style={{
                    position: 'absolute',
                    left: '54.8%',
                    top: '64.5%',
                    width: '18.5%',
                    height: '4.2%',
                  }}
                  required
                />
                {/* Click target over the drawn eye icon */}
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    position: 'absolute',
                    left: '74.2%',
                    top: '63.8%',
                    width: '3.0%',
                    height: '5.2%',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    zIndex: 25,
                    borderRadius: '50%',
                  }}
                  title={showConfirmPassword ? 'Hide password' : 'Show password'}
                />

                {/* 9. Location (Row 5 Left) */}
                <input
                  type="text"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  className="clean-input"
                  style={{
                    position: 'absolute',
                    left: '20.5%',
                    top: '78.2%',
                    width: '25.0%',
                    height: '4.2%',
                  }}
                />

                {/* 10. CREATE ACCOUNT BUTTON (Over the golden badge) */}
                <button
                  type="submit"
                  style={{
                    position: 'absolute',
                    left: '51.5%',
                    top: '72.0%',
                    width: '27.5%',
                    height: '9.8%',
                    background: 'transparent',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    zIndex: 25,
                    animation: 'btnHoverGlow 3s ease-in-out infinite',
                    transition: 'transform 0.15s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.02)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                  title="Click to Create Account"
                />

                {/* Toggle Link below book */}
                <div style={{
                  position: 'absolute',
                  bottom: '2.5%',
                  left: '14%',
                  right: '25%',
                  textAlign: 'center',
                  fontSize: 'clamp(0.55rem, 0.95vw, 0.75rem)',
                  zIndex: 25,
                }}>
                  <span style={{ color: 'rgba(251, 230, 175, 0.8)', textShadow: '0 1px 4px rgba(0,0,0,0.95)' }}>
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('signin')}
                      style={{
                        color: '#ffe699',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                        fontWeight: 700,
                        fontFamily: 'Georgia, serif',
                        fontSize: 'inherit',
                      }}
                    >
                      Sign In
                    </button>
                  </span>
                  <span style={{ color: 'rgba(223,165,71,0.4)', margin: '0 0.5rem' }}>|</span>
                  <Link href="/" style={{ color: 'rgba(251, 230, 175, 0.7)', textDecoration: 'underline', fontSize: 'inherit' }}>
                    Home
                  </Link>
                </div>
              </form>
            ) : (
              /* ═══ SIGNIN MODE (Centered Golden Plaque Modal on uploaded.jpg) ═══ */
              <div style={{
                position: 'absolute',
                top: '12%', left: '15%', right: '22%', bottom: '10%',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{
                  width: '100%',
                  maxWidth: '380px',
                  background: 'linear-gradient(145deg, rgba(50, 32, 14, 0.9) 0%, rgba(25, 15, 6, 0.95) 100%)',
                  border: '2px solid rgba(223, 165, 71, 0.75)',
                  borderRadius: '10px',
                  padding: 'clamp(1rem, 2.5vw, 1.8rem)',
                  boxShadow: '0 0 50px rgba(0,0,0,0.9), inset 0 1px 2px rgba(255,230,150,0.4)',
                  backdropFilter: 'blur(8px)',
                }}>
                  <h2 style={{
                    color: '#fbe6af',
                    fontFamily: 'Georgia, serif',
                    fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                    fontWeight: 700,
                    textAlign: 'center',
                    marginBottom: '1rem',
                    textShadow: '0 2px 10px rgba(0,0,0,0.8)',
                  }}>
                    ✦ Sanctum Sign In ✦
                  </h2>

                  {errorMessage && (
                    <div style={{
                      color: '#ffe0e0',
                      background: 'rgba(120, 20, 20, 0.85)',
                      border: '1px solid rgba(255, 100, 100, 0.5)',
                      padding: '0.3rem 0.8rem',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      marginBottom: '0.8rem',
                      textAlign: 'center',
                    }}>
                      {errorMessage}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                    <div>
                      <label style={{ display: 'block', color: '#dfa547', fontSize: '0.75rem', fontWeight: 700, fontFamily: 'Georgia, serif', marginBottom: '0.25rem' }}>
                        ✉ Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        style={{
                          width: '100%',
                          padding: '0.5rem 0.7rem',
                          background: 'rgba(15, 9, 3, 0.75)',
                          border: '1px solid rgba(184,115,27,0.5)',
                          borderRadius: '4px',
                          color: '#fff',
                          fontSize: '0.85rem',
                          fontFamily: 'Georgia, serif',
                          outline: 'none',
                          boxSizing: 'border-box',
                        }}
                        required
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', color: '#dfa547', fontSize: '0.75rem', fontWeight: 700, fontFamily: 'Georgia, serif', marginBottom: '0.25rem' }}>
                        🔒 Password
                      </label>
                      <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        style={{
                          width: '100%',
                          padding: '0.5rem 0.7rem',
                          background: 'rgba(15, 9, 3, 0.75)',
                          border: '1px solid rgba(184,115,27,0.5)',
                          borderRadius: '4px',
                          color: '#fff',
                          fontSize: '0.85rem',
                          fontFamily: 'Georgia, serif',
                          outline: 'none',
                          boxSizing: 'border-box',
                        }}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      style={{
                        marginTop: '0.5rem',
                        padding: '0.65rem',
                        background: 'linear-gradient(90deg, #8c5a18, #dfa547, #b8731b)',
                        color: '#fff',
                        fontFamily: 'Georgia, serif',
                        fontWeight: 700,
                        fontSize: '0.95rem',
                        border: '1.5px solid rgba(255,230,150,0.5)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 15px rgba(184,115,27,0.5)',
                        textShadow: '0 1px 3px rgba(0,0,0,0.6)',
                      }}
                    >
                      ✦ Sign In to Sanctum ✦
                    </button>
                  </form>

                  <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.78rem' }}>
                    <span style={{ color: 'rgba(251, 230, 175, 0.7)' }}>
                      Need an account?{' '}
                      <button
                        type="button"
                        onClick={() => setMode('signup')}
                        style={{
                          color: '#ffe699',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          textDecoration: 'underline',
                          fontWeight: 700,
                          fontFamily: 'Georgia, serif',
                        }}
                      >
                        Sign Up
                      </button>
                    </span>
                    <span style={{ color: 'rgba(223,165,71,0.4)', margin: '0 0.5rem' }}>|</span>
                    <Link href="/" style={{ color: 'rgba(251, 230, 175, 0.6)', textDecoration: 'underline' }}>
                      Home
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
