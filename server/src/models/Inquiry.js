import mongoose from 'mongoose';

export const INQUIRY_ROLES = [
  'student',
  'individual',
  'school',
  'corporate',
  'government',
  'ngo',
  'parent',
];

const inquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [120, 'Name must be 120 characters or fewer'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      maxlength: [254, 'Email must be 254 characters or fewer'],
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Enter a valid email address'],
    },
    organization: {
      type: String,
      trim: true,
      maxlength: [180, 'Organization must be 180 characters or fewer'],
      default: '',
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      minlength: [8, 'Message must be at least 8 characters'],
      maxlength: [5000, 'Message must be 5000 characters or fewer'],
    },
    role: {
      type: String,
      required: true,
      enum: INQUIRY_ROLES,
      index: true,
    },
    status: {
      type: String,
      enum: ['new', 'in_progress', 'closed'],
      default: 'new',
      index: true,
    },
  },
  { timestamps: true, versionKey: false },
);

inquirySchema.index({ createdAt: -1 });

const Inquiry = mongoose.models.Inquiry || mongoose.model('Inquiry', inquirySchema);

export default Inquiry;
