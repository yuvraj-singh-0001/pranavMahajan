import { NextResponse } from 'next/server';
import { verifyCredentials } from '@/lib/userStore';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { identifier, password } = body;

    if (!identifier || !identifier.trim()) {
      return NextResponse.json(
        { success: false, error: 'Please enter your username or email.' },
        { status: 400 }
      );
    }

    if (!password) {
      return NextResponse.json(
        { success: false, error: 'Please enter your password.' },
        { status: 400 }
      );
    }

    // 1. Try Express backend first if running
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 1200);
      const expressRes = await fetch('http://localhost:5000/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (expressRes.ok) {
        const data = await expressRes.json();
        return NextResponse.json(data);
      }
    } catch (_e) {
      // Express backend not responding, fallback to local userStore
    }

    // 2. Local fallback verification using persistent userStore
    const result = verifyCredentials(identifier, password);
    if (!result.valid || !result.user) {
      return NextResponse.json(
        { success: false, error: result.error || 'Invalid username or password.' },
        { status: 401 }
      );
    }

    const u = result.user;
    return NextResponse.json({
      success: true,
      message: 'Logged in successfully!',
      user: {
        username: u.username,
        fullName: u.fullName,
        email: u.email,
        accountType: u.accountType || 'Individual',
        accountCategory: u.accountCategory || (u.username.startsWith('OI-') ? 'organization' : 'individual'),
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Login failed.' },
      { status: 500 }
    );
  }
}
