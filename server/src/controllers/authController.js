import User, { validateUsernameFormat } from '../models/User.js';
import mongoose from 'mongoose';

/**
 * In-memory registry fallback for development when local MongoDB is offline.
 * This guarantees that real-time username validation and signups still work smoothly!
 */
const inMemoryUsers = new Map();

// Seed some test handles to demonstrate "already taken" logic in dev
inMemoryUsers.set('pranav01', { username: 'pranav01', email: 'pranav@test.com' });
inMemoryUsers.set('deepak77', { username: 'deepak77', email: 'deepak@test.com' });
inMemoryUsers.set('master99', { username: 'master99', email: 'master@test.com' });

/**
 * GET /api/auth/check-username?username=xyz1
 * Instant real-time verification of username format and availability
 */
export async function checkUsername(req, res) {
  try {
    const rawUsername = req.query.username || req.query.handle || '';
    
    // 1. Format validation (Min 4 chars, at least 1 digit, lowercase letters, numbers, _, .)
    const formatCheck = validateUsernameFormat(rawUsername);
    if (!formatCheck.valid) {
      return res.status(200).json({
        success: true,
        available: false,
        formatValid: false,
        username: rawUsername.trim().toLowerCase(),
        error: formatCheck.error,
      });
    }

    const cleanUsername = formatCheck.username;

    // 2. Database availability check
    let isTaken = false;

    if (mongoose.connection.readyState === 1) {
      const existingUser = await User.findOne({ username: cleanUsername }).select('_id username').lean();
      if (existingUser) {
        isTaken = true;
      }
    } else {
      // Development in-memory fallback
      if (inMemoryUsers.has(cleanUsername)) {
        isTaken = true;
      }
    }

    if (isTaken) {
      return res.status(200).json({
        success: true,
        available: false,
        formatValid: true,
        username: cleanUsername,
        message: 'This username is already taken. Try another!',
      });
    }

    return res.status(200).json({
      success: true,
      available: true,
      formatValid: true,
      username: cleanUsername,
      message: 'This username is available!',
    });
  } catch (error) {
    console.error('[checkUsername error]:', error.message);
    return res.status(500).json({
      success: false,
      available: false,
      error: 'Could not verify username right now. Please try again.',
    });
  }
}

/**
 * POST /api/auth/signup
 * Register a new user account with unique username and credentials
 */
export async function register(req, res) {
  try {
    const {
      username,
      fullName,
      email,
      password,
      confirmPassword,
      mobile,
      dob,
      location,
      classGrade,
      accountType,
    } = req.body;

    // 1. Basic presence & format validation
    if (!fullName || !fullName.trim()) {
      return res.status(400).json({ success: false, error: 'Full name is required.' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, error: 'Email address is required.' });
    }
    const cleanEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({ success: false, error: 'Please enter a valid email address with domain (e.g. name@gmail.com).' });
    }

    // Mobile validation: exactly 10 digits if provided
    if (mobile && mobile.trim()) {
      const cleanMobile = mobile.replace(/\D/g, '');
      if (cleanMobile.length !== 10) {
        return res.status(400).json({ success: false, error: 'Mobile number must be exactly 10 digits.' });
      }
    }

    // Password validation: min 8 chars, 1 uppercase, 1 lowercase, 1 number or special char
    if (!password || password.length < 8) {
      return res.status(400).json({ success: false, error: 'Password must be at least 8 characters long.' });
    }
    if (!/[A-Z]/.test(password)) {
      return res.status(400).json({ success: false, error: 'Password must contain at least 1 uppercase letter (A-Z).' });
    }
    if (!/[a-z]/.test(password)) {
      return res.status(400).json({ success: false, error: 'Password must contain at least 1 lowercase letter (a-z).' });
    }
    if (!/[\d\W_]/.test(password)) {
      return res.status(400).json({ success: false, error: 'Password must contain at least 1 number or special character.' });
    }
    if (confirmPassword && password !== confirmPassword) {
      return res.status(400).json({ success: false, error: 'Passwords do not match.' });
    }

    // 2. Validate username format (Min 4 chars, at least 1 digit)
    const formatCheck = validateUsernameFormat(username);
    if (!formatCheck.valid) {
      return res.status(400).json({ success: false, error: formatCheck.error });
    }
    const cleanUsername = formatCheck.username;

    // Normalize account type
    const normalizedAccountType = (accountType && typeof accountType === 'string')
      ? accountType.charAt(0).toUpperCase() + accountType.slice(1).toLowerCase()
      : 'Seeker';

    // 3. Check uniqueness in DB or in-memory
    if (mongoose.connection.readyState === 1) {
      const existingUser = await User.findOne({
        $or: [{ username: cleanUsername }, { email: cleanEmail }],
      }).lean();

      if (existingUser) {
        if (existingUser.username === cleanUsername) {
          return res.status(409).json({ success: false, error: 'This username is already taken.' });
        }
        if (existingUser.email === cleanEmail) {
          return res.status(409).json({ success: false, error: 'An account with this email already exists.' });
        }
      }

      const newUser = await User.create({
        username: cleanUsername,
        fullName: fullName.trim(),
        email: cleanEmail,
        password, // In production, hash with bcrypt
        mobile: mobile ? mobile.trim() : '',
        dob: dob ? dob.trim() : '',
        location: location ? location.trim() : '',
        classGrade: classGrade ? classGrade.trim() : '',
        accountType: normalizedAccountType,
      });

      return res.status(201).json({
        success: true,
        message: 'Account created successfully!',
        user: {
          id: newUser._id,
          username: newUser.username,
          fullName: newUser.fullName,
          email: newUser.email,
          accountType: newUser.accountType,
        },
      });
    } else {
      // In-memory fallback
      if (inMemoryUsers.has(cleanUsername)) {
        return res.status(409).json({ success: false, error: 'This username is already taken.' });
      }

      const userRecord = {
        id: 'mem_' + Date.now(),
        username: cleanUsername,
        fullName: fullName.trim(),
        email: cleanEmail,
        mobile: mobile ? mobile.trim() : '',
        dob: dob ? dob.trim() : '',
        location: location ? location.trim() : '',
        classGrade: classGrade ? classGrade.trim() : '',
        accountType: normalizedAccountType,
        createdAt: new Date().toISOString(),
      };

      inMemoryUsers.set(cleanUsername, userRecord);

      return res.status(201).json({
        success: true,
        message: 'Account created successfully!',
        user: userRecord,
      });
    }
  } catch (error) {
    console.error('[register error]:', error);
    if (error.name === 'ValidationError') {
      const firstMsg = Object.values(error.errors || {})[0]?.message || error.message;
      return res.status(400).json({ success: false, error: firstMsg });
    }
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern || {})[0] || 'field';
      return res.status(409).json({ success: false, error: `This ${field} is already in use.` });
    }
    return res.status(500).json({ success: false, error: error.message || 'Failed to create account. Please try again.' });
  }
}

/**
 * POST /api/auth/signin
 * Sign in using either username or email + password
 */
export async function login(req, res) {
  try {
    const { identifier, password } = req.body;
    if (!identifier || !identifier.trim()) {
      return res.status(400).json({ success: false, error: 'Username or Email is required.' });
    }
    if (!password) {
      return res.status(400).json({ success: false, error: 'Password is required.' });
    }

    const cleanIdentifier = identifier.trim().toLowerCase();

    if (mongoose.connection.readyState === 1) {
      const user = await User.findOne({
        $or: [{ username: cleanIdentifier }, { email: cleanIdentifier }],
      });

      if (!user || user.password !== password) {
        return res.status(401).json({ success: false, error: 'Invalid credentials. Please check your username/email and password.' });
      }

      return res.status(200).json({
        success: true,
        message: 'Welcome back!',
        user: {
          id: user._id,
          username: user.username,
          fullName: user.fullName,
          email: user.email,
          accountType: user.accountType,
        },
      });
    } else {
      // In-memory fallback
      let matched = null;
      for (const u of inMemoryUsers.values()) {
        if (u.username === cleanIdentifier || u.email === cleanIdentifier) {
          matched = u;
          break;
        }
      }
      if (!matched) {
        return res.status(401).json({ success: false, error: 'Invalid credentials. User not found.' });
      }
      return res.status(200).json({
        success: true,
        message: 'Welcome back!',
        user: matched,
      });
    }
  } catch (error) {
    console.error('[login error]:', error.message);
    return res.status(500).json({ success: false, error: 'Sign in failed. Please try again.' });
  }
}
