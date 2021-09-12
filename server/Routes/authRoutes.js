import express from 'express';
import { signIn, signOutOthers, signOut } from '../Controllers/authController.js';

const router = express.Router();

router.post('/signin', signIn);
router.post('/signout', signOut)
router.post('/signoutothers', signOutOthers);

export default router;