import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as ctrl from '../controllers/auth.js'
import { protect } from '../middleware/auth.js';


const router = express.Router();

// Register
router.post('/register', ctrl.authRegister);
// body = {username, email, password}
router.post('/login', ctrl.authLogin);
// body = {username/email, password}
router.get('/me', protect, ctrl.authMe);
router.post('/logout', ctrl.authLogout);

export default router;