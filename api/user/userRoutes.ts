
import express from 'express';
import { register,loginController, profile,getAllUsers } from './userController';
import { authenticateToken } from '../../middleware/authMiddleware';

import {upload} from  '../../middleware/multerconfig'
const router = express.Router();
router.post('/register', upload.single('profileImage'), register);
router.post('/login', loginController);
router.get('/profile', authenticateToken, profile);
router.get('/users', getAllUsers);
export default router;
