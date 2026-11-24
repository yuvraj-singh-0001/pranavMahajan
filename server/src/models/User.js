import mongoose from 'mongoose';

/**
 * Username Validation Rules:
 * 1. Minimum 4 characters, maximum 30 characters
 * 2. Must contain at least 1 digit (0-9)
 * 3. Allowed characters: lowercase letters (a-z), digits (0-9), underscores (_), and periods (.)
 * 4. Must not be a reserved system name
 */
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
  'null',
  'undefined',
];

export function validateUsernameFormat(rawUsername) {
  if (!rawUsername || typeof rawUsername !== 'string') {
    return { valid: false, error: 'Username is required.' };
  }
  const clean = rawUsername.trim().toLowerCase();
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
  if (RESERVED_USERNAMES.includes(clean)) {
    return { valid: false, error: 'This username is reserved. Please choose another one.' };
  }
  return { valid: true, username: clean };
}

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      lowercase: true,
      minlength: [4, 'Username must be at least 4 characters'],
      maxlength: [30, 'Username must be 30 characters or fewer'],
      validate: {
        validator(val) {
          const res = validateUsernameFormat(val);
          return res.valid;
        },
        message: (props) => {
          const res = validateUsernameFormat(props.value);
          return res.error || 'Invalid username format';
        },
      },
      index: true,
    },
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      maxlength: [120, 'Full name must be 120 characters or fewer'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      maxlength: [254, 'Email must be 254 characters or fewer'],
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Enter a valid email address'],
      index: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
    },
    mobile: {
      type: String,
      trim: true,
      default: '',
    },
    dob: {
      type: String,
      trim: true,
      default: '',
    },
    location: {
      type: String,
      trim: true,
      default: '',
    },
    classGrade: {
      type: String,
      trim: true,
      default: '',
    },
    accountType: {
      type: String,
      default: 'Seeker',
      index: true,
    },
    accountCategory: {
      type: String,
      enum: ['individual', 'organization'],
      default: 'individual',
    },
    orgType: {
      type: String,
      trim: true,
      default: '',
    },
    bio: {
      type: String,
      trim: true,
      maxlength: [200, 'Bio must be 200 characters or fewer'],
      default: '',
    },
    avatar: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      enum: ['user', 'mentor', 'admin'],
      default: 'user',
      index: true,
    },
    status: {
      type: String,
      enum: ['active', 'suspended', 'pending'],
      default: 'active',
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.index({ createdAt: -1 });

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
