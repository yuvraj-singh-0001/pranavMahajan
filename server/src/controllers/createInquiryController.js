import Inquiry from '../models/Inquiry.js';

export function createInquiryController(role) {
  return async function submitInquiry(req, res, next) {
    const name = typeof req.body?.name === 'string' ? req.body.name.trim() : '';
    const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
    const organization = typeof req.body?.organization === 'string'
      ? req.body.organization.trim()
      : '';
    const message = typeof req.body?.message === 'string' ? req.body.message.trim() : '';

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Name, email, and message are required.',
      });
    }

    try {
      const inquiry = await Inquiry.create({ name, email, organization, message, role });
      return res.status(201).json({
        success: true,
        message: 'Your inquiry has been received.',
        data: { id: inquiry.id, role: inquiry.role, status: inquiry.status },
      });
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({
          success: false,
          error: Object.values(error.errors).map((item) => item.message).join(' '),
        });
      }
      return next(error);
    }
  };
}
