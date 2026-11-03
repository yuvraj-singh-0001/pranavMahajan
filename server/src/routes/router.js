import { Router } from 'express';
import { submitStudentInquiry } from '../controllers/students/inquiryController.js';
import { submitIndividualInquiry } from '../controllers/individual/inquiryController.js';
import { submitEducationalInquiry } from '../controllers/Educational/inquiryController.js';
import { submitCorporateInquiry } from '../controllers/CorporateBusiness/inquiryController.js';
import { submitGovernmentInquiry } from '../controllers/Gvt/inquiryController.js';
import { submitNgoInquiry } from '../controllers/NGO/inquiryController.js';
import { submitParentInquiry } from '../controllers/parents/inquiryController.js';
import { getPortfolio } from '../controllers/portfolioController.js';
import { INQUIRY_ROLES } from '../models/Inquiry.js';

const router = Router();

router.get('/', (_req, res) => {
  res.json({
    success: true,
    service: 'pranavmahajan-api',
    endpoints: {
      roles: 'GET /api/roles',
      inquiry: 'POST /api/inquiries/:role',
    },
  });
});

router.get('/roles', (_req, res) => {
  res.json({ success: true, data: INQUIRY_ROLES });
});

router.get('/portfolio', getPortfolio);

router.post('/inquiries/student', submitStudentInquiry);
router.post('/inquiries/individual', submitIndividualInquiry);
router.post('/inquiries/school', submitEducationalInquiry);
router.post('/inquiries/corporate', submitCorporateInquiry);
router.post('/inquiries/government', submitGovernmentInquiry);
router.post('/inquiries/ngo', submitNgoInquiry);
router.post('/inquiries/parent', submitParentInquiry);

export default router;
