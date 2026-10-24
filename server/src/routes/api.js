import express from 'express';
import { speakerData } from '../data/portfolioData.js';

const router = express.Router();

// Memory store for event bookings & inquiries
const bookings = [];
const subscribers = [];

// GET: Speaker profile & stats
router.get('/profile', (req, res) => {
  res.json({
    success: true,
    data: speakerData.profile
  });
});

// GET: Keynotes & programs
router.get('/keynotes', (req, res) => {
  const { category } = req.query;
  let list = [...speakerData.keynotes];
  if (category && category !== 'All') {
    list = list.filter(k => k.category.toLowerCase().includes(category.toLowerCase()));
  }
  res.json({
    success: true,
    count: list.length,
    data: list
  });
});

// GET: Upcoming world tour & speaking events
router.get('/events', (req, res) => {
  res.json({
    success: true,
    data: speakerData.upcomingEvents
  });
});

// GET: Daily random or indexed wisdom quote
router.get('/quotes/daily', (req, res) => {
  const quotes = speakerData.dailyQuotes;
  const randomIndex = Math.floor(Math.random() * quotes.length);
  res.json({
    success: true,
    data: {
      quote: quotes[randomIndex],
      speaker: speakerData.profile.name,
      id: randomIndex
    }
  });
});

// GET: Testimonials
router.get('/testimonials', (req, res) => {
  res.json({
    success: true,
    data: speakerData.testimonials
  });
});

// POST: Speaking / Keynote Booking Inquiry
router.post('/booking', (req, res) => {
  const { name, email, organization, eventDate, audienceSize, message, topic } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: 'Please provide full name, email, and event details.'
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: 'Please enter a valid business/personal email address.'
    });
  }

  const bookingRequest = {
    id: `book_${Date.now()}`,
    name: name.trim(),
    email: email.trim(),
    organization: organization?.trim() || 'Private / Organization',
    eventDate: eventDate || 'TBD',
    audienceSize: audienceSize || '100 - 500 Attendees',
    topic: topic || 'The Unstoppable Mind',
    message: message.trim(),
    status: 'RECEIVED',
    createdAt: new Date().toISOString()
  };

  bookings.unshift(bookingRequest);
  console.log(`[Keynote Inquiry] ${bookingRequest.name} from ${bookingRequest.organization} (${bookingRequest.email})`);

  res.status(201).json({
    success: true,
    message: `Thank you, ${bookingRequest.name}! Your speaking invitation has been delivered to Pranav Mahajan's executive team. We will review date availability and respond within 24 hours.`,
    data: { id: bookingRequest.id, createdAt: bookingRequest.createdAt }
  });
});

// POST: Newsletter / Daily Wisdom
router.post('/newsletter', (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, error: 'Please provide a valid email.' });
  }

  if (!subscribers.includes(email.toLowerCase())) {
    subscribers.push(email.toLowerCase());
  }

  res.json({
    success: true,
    message: 'Welcome to Daily Mindset Mastery! You will receive Pranav’s morning wisdom.'
  });
});

export default router;
