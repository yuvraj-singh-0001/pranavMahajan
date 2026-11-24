import { NextResponse } from 'next/server';
import { validateUsernameFormat } from '../check-username/route';
import { createUser, isUsernameTaken, isEmailTaken } from '@/lib/userStore';

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

    // Uniqueness checks in persistent store
    if (isUsernameTaken(formatCheck.username!)) {
      return NextResponse.json({ success: false, error: 'This username is already taken. Please choose another.' }, { status: 409 });
    }
    if (isEmailTaken(cleanEmail)) {
      return NextResponse.json({ success: false, error: 'An account with this email already exists.' }, { status: 409 });
    }

    // Persist new user
    const createResult = createUser({
      username: formatCheck.username!,
      fullName: fullName.trim(),
      email: cleanEmail,
      password,
      mobile: body.mobile,
      accountType: body.accountType,
      accountCategory: body.accountCategory,
      orgType: body.orgType,
      location: body.location,
      dob: body.dob,
    });

    if (!createResult.success || !createResult.user) {
      return NextResponse.json({ success: false, error: createResult.error || 'Failed to save user account.' }, { status: 500 });
    }

    const savedUser = createResult.user;
    return NextResponse.json({
      success: true,
      message: 'Account created successfully!',
      user: {
        username: savedUser.username,
        fullName: savedUser.fullName,
        email: savedUser.email,
        accountType: savedUser.accountType,
        accountCategory: savedUser.accountCategory,
        orgType: savedUser.orgType,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'Signup failed' }, { status: 500 });
  }
}
