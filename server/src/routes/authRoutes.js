import { Router } from 'express';
import { checkUsername, register, login } from '../controllers/authController.js';

const router = Router();

// GET /api/auth/check-username?username=... (Instant real-time validation)
router.get('/check-username', checkUsername);

// POST /api/auth/signup (Create account with username)
router.post('/signup', register);

// POST /api/auth/signin (Sign in via username or email)
router.post('/signin', login);

export default router;
