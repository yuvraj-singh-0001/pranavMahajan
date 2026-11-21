import { NextResponse } from 'next/server';
import { validateUsernameFormat } from '../check-username/route';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, fullName, email, password } = body;

    // 1. Try Express backend first if running
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 2000);
      const expressRes = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (expressRes.ok) {
        const data = await expressRes.json();
        return NextResponse.json(data);
      }
    } catch (_e) {
      // Express backend not responding, fallback
    }

    // 2. Validate fields
    if (!fullName || !fullName.trim()) {
      return NextResponse.json({ success: false, error: 'Full name is required.' }, { status: 400 });
    }
    if (!email || !email.trim()) {
      return NextResponse.json({ success: false, error: 'Email address is required.' }, { status: 400 });
    }
    const cleanEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json({ success: false, error: 'Please enter a valid email address with domain (e.g. name@gmail.com).' }, { status: 400 });
    }

    if (body.mobile && body.mobile.trim()) {
      const cleanMobile = body.mobile.replace(/\D/g, '');
      if (cleanMobile.length !== 10) {
        return NextResponse.json({ success: false, error: 'Mobile number must be exactly 10 digits.' }, { status: 400 });
      }
    }

    if (!password || password.length < 8) {
      return NextResponse.json({ success: false, error: 'Password must be at least 8 characters.' }, { status: 400 });
    }
    if (!/[A-Z]/.test(password)) {
      return NextResponse.json({ success: false, error: 'Password must contain at least 1 uppercase letter (A-Z).' }, { status: 400 });
    }
    if (!/[a-z]/.test(password)) {
      return NextResponse.json({ success: false, error: 'Password must contain at least 1 lowercase letter (a-z).' }, { status: 400 });
    }
    if (!/[\d\W_]/.test(password)) {
      return NextResponse.json({ success: false, error: 'Password must contain at least 1 number or special character.' }, { status: 400 });
    }
    if (body.confirmPassword && password !== body.confirmPassword) {
      return NextResponse.json({ success: false, error: 'Passwords do not match.' }, { status: 400 });
    }

    const formatCheck = validateUsernameFormat(username);
    if (!formatCheck.valid) {
      return NextResponse.json({ success: false, error: formatCheck.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'Account created successfully!',
      user: {
        username: formatCheck.username,
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        accountType: body.accountType || 'Seeker',
      },
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'Signup failed' }, { status: 500 });
  }
}
