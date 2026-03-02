import express from 'express';
import { createBooking, getUserBookings, getAllBookings, deleteBooking } from '../controller/bookFlight.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', createBooking);
router.get('/user/:userId', getUserBookings);
router.get('/', protect, admin, getAllBookings);
router.delete('/:id', protect, admin, deleteBooking);

export default router;
