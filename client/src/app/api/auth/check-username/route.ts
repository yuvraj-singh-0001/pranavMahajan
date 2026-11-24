import { NextResponse } from 'next/server';
import { isUsernameTaken } from '@/lib/userStore';

export const USERNAME_REGEX = /^[a-zA-Z0-9_.-]+$/;
export const RESERVED_USERNAMES = [
  'admin',
  'administrator',
  'root',
  'superuser',
  'api',
  'pranav',
  'pranavmahajan',
  'official',
  'support',
  'help',
  'system',
  'moderator',
  'login',
  'signup',
  'auth',
];

// Fallback in-memory taken list for demo/dev
const TAKEN_USERNAMES = new Set(['pranav01', 'deepak77', 'master99', 'admin2026']);

export function validateUsernameFormat(rawUsername: string) {
  if (!rawUsername || typeof rawUsername !== 'string') {
    return { valid: false, error: 'Username is required.' };
  }
  const clean = rawUsername.trim();
  const lower = clean.toLowerCase();
  if (clean.length < 4) {
    return { valid: false, error: 'Username must be at least 4 characters long.' };
  }
  if (clean.length > 30) {
    return { valid: false, error: 'Username must be 30 characters or fewer.' };
  }
  if (!USERNAME_REGEX.test(clean)) {
    return { valid: false, error: 'Username can only contain letters, numbers, hyphens (-), underscores (_), and dots (.).' };
  }
  if (!/\d/.test(clean)) {
    return { valid: false, error: 'Username must contain at least 1 digit (0-9).' };
  }
  if (RESERVED_USERNAMES.includes(lower)) {
    return { valid: false, error: 'This username is reserved. Please choose another one.' };
  }
  return { valid: true, username: clean };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const usernameParam = searchParams.get('username') || searchParams.get('handle') || '';

  // 1. Try Express backend first if running
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 1200);
    const expressRes = await fetch(
      `http://localhost:5000/api/auth/check-username?username=${encodeURIComponent(usernameParam)}`,
      { signal: controller.signal, cache: 'no-store' }
    );
    clearTimeout(timeout);
    if (expressRes.ok) {
      const data = await expressRes.json();
      return NextResponse.json(data);
    }
  } catch (_e) {
    // Express backend not responding, fallback to local validation
  }

  // 2. Local Fallback Validation
  const formatCheck = validateUsernameFormat(usernameParam);
  if (!formatCheck.valid) {
    return NextResponse.json({
      success: true,
      available: false,
      formatValid: false,
      username: usernameParam.trim(),
      error: formatCheck.error,
    });
  }

  const clean = formatCheck.username!;
  const lower = clean.toLowerCase();
  if (TAKEN_USERNAMES.has(lower) || TAKEN_USERNAMES.has(clean) || isUsernameTaken(clean)) {
    return NextResponse.json({
      success: true,
      available: false,
      formatValid: true,
      username: clean,
      message: 'This username is already taken. Try another!',
    });
  }

  return NextResponse.json({
    success: true,
    available: true,
    formatValid: true,
    username: clean,
    message: 'This username is available!',
  });
}
