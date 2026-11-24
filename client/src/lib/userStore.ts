import fs from 'fs';
import path from 'path';

export interface UserRecord {
  username: string; // e.g. "IO-yuvraj001" or "OI-acme01"
  fullName: string;
  email: string;
  passwordHash: string;
  mobile?: string;
  accountType?: string;
  orgType?: string;
  accountCategory?: 'individual' | 'organization';
  location?: string;
  dob?: string;
  createdAt: string;
}

const DATA_FILE = process.cwd().endsWith('client')
  ? path.join(process.cwd(), 'src', 'data', 'users.json')
  : path.join(process.cwd(), 'client', 'src', 'data', 'users.json');

// Pre-seeded users for demo & fallback
const DEFAULT_USERS: UserRecord[] = [
  {
    username: 'IO-yuvraj001',
    fullName: 'Yuvraj Singh',
    email: 'yuvraj@gmail.com',
    passwordHash: 'Pass@123',
    accountType: 'Individual',
    accountCategory: 'individual',
    createdAt: new Date().toISOString(),
  },
  {
    username: 'OI-company01',
    fullName: 'Acme Innovation Corp',
    email: 'contact@acme.com',
    passwordHash: 'Pass@123',
    accountType: 'Corporate',
    accountCategory: 'organization',
    createdAt: new Date().toISOString(),
  },
  {
    username: 'pranav01',
    fullName: 'Pranav Mahajan',
    email: 'pranav@test.com',
    passwordHash: 'Pass@123',
    accountType: 'Mentor',
    accountCategory: 'individual',
    createdAt: new Date().toISOString(),
  },
];

// Helper to read users from disk
export function getAllUsers(): UserRecord[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (_e) {
    // fallback to in-memory defaults
  }
  return DEFAULT_USERS;
}

// Helper to save users to disk
export function saveAllUsers(users: UserRecord[]): void {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write users.json:', err);
  }
}

// Check if username is taken (handles case-insensitivity and prefix matching)
export function isUsernameTaken(rawUsername: string): boolean {
  if (!rawUsername) return false;
  const target = rawUsername.trim().toLowerCase();
  const users = getAllUsers();
  return users.some((u) => {
    const uLower = u.username.toLowerCase();
    // Direct match: e.g. "io-yuvraj001" === "io-yuvraj001"
    if (uLower === target) return true;
    // Strip prefix match: e.g. "yuvraj001" matches "io-yuvraj001"
    const strippedU = uLower.replace(/^(io-|oi-)/, '');
    const strippedTarget = target.replace(/^(io-|oi-)/, '');
    return strippedU === strippedTarget;
  });
}

// Check if email is taken
export function isEmailTaken(email: string): boolean {
  if (!email) return false;
  const target = email.trim().toLowerCase();
  const users = getAllUsers();
  return users.some((u) => u.email.toLowerCase() === target);
}

// Find user by identifier (can be username with prefix, username without prefix, or email)
export function findUserByIdentifier(identifier: string): UserRecord | null {
  if (!identifier) return null;
  const target = identifier.trim().toLowerCase();
  const users = getAllUsers();

  return (
    users.find((u) => {
      const uLower = u.username.toLowerCase();
      const emailLower = u.email.toLowerCase();

      // 1. Email match
      if (emailLower === target) return true;

      // 2. Exact username match (e.g. "io-yuvraj001")
      if (uLower === target) return true;

      // 3. User entered without prefix (e.g. entered "yuvraj001" for "IO-yuvraj001")
      const strippedU = uLower.replace(/^(io-|oi-)/, '');
      const strippedTarget = target.replace(/^(io-|oi-)/, '');
      if (strippedU === strippedTarget) return true;

      return false;
    }) || null
  );
}

// Create new user
export function createUser(data: {
  username: string;
  fullName: string;
  email: string;
  password: string;
  mobile?: string;
  accountType?: string;
  orgType?: string;
  accountCategory?: 'individual' | 'organization';
  location?: string;
  dob?: string;
}): { success: boolean; user?: UserRecord; error?: string } {
  const users = getAllUsers();

  // Validate uniqueness
  if (isUsernameTaken(data.username)) {
    return { success: false, error: 'This username is already taken. Please choose another.' };
  }
  if (isEmailTaken(data.email)) {
    return { success: false, error: 'An account with this email already exists.' };
  }

  const newUser: UserRecord = {
    username: data.username.trim(),
    fullName: data.fullName.trim(),
    email: data.email.trim().toLowerCase(),
    passwordHash: data.password, // Plain text or hashed
    mobile: data.mobile?.trim(),
    accountType: data.accountType || (data.accountCategory === 'organization' ? (data.orgType || 'School (K-12)') : 'Individual'),
    orgType: data.orgType || (data.accountCategory === 'organization' ? data.accountType : undefined),
    accountCategory: data.accountCategory || (data.username.startsWith('OI-') ? 'organization' : 'individual'),
    location: data.location?.trim(),
    dob: data.dob?.trim(),
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveAllUsers(users);

  return { success: true, user: newUser };
}

// Verify credentials for login
export function verifyCredentials(identifier: string, password: string): {
  valid: boolean;
  user?: UserRecord;
  error?: string;
} {
  const user = findUserByIdentifier(identifier);
  if (!user) {
    return { valid: false, error: 'No account found with this username or email.' };
  }

  if (user.passwordHash !== password) {
    return { valid: false, error: 'Incorrect password. Please verify and try again.' };
  }

  return { valid: true, user };
}
