import express from 'express';
const router = express.Router();
import { createFlight, getAllFlights, getFlightById, updateFlight, deleteFlight } from '../controller/flight.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

router.post('/', protect, admin, createFlight);
router.get('/', getAllFlights);
router.get('/:id', getFlightById);
router.put('/:id', protect, admin, updateFlight);
router.delete('/:id', protect, admin, deleteFlight);

export default router;
