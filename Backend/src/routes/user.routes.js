import express from 'express';
const router = express.Router();
import {
    signupUser,
    loginUser,
    getUserProfile,
    updateUser,
    deleteUser,
    getAllUsers
} from '../controller/user.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.get('/', protect, admin, getAllUsers);
router.get('/:id', getUserProfile);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
