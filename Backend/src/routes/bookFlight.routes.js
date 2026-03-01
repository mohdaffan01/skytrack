import express from 'express';
import { createBooking, getUserBookings } from '../controller/bookFlight.controller.js';

const router = express.Router();

router.post('/', createBooking);
router.get('/user/:userId', getUserBookings);

export default router;
