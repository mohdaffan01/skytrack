import BookFlight from '../model/bookFlight.model.js';
import Flight from '../model/flight.model.js';
import User from '../model/user.model.js';

// @desc    Create a new flight booking
// @route   POST /api/bookings
// @access  Public (Should be private in production with auth)
export const createBooking = async (req, res) => {
    try {
        const {
            userId, // Assuming frontend sends this, or from auth middleware
            flightId,
            passengerDetails,
            searchDetails,
            paymentDetails
        } = req.body;

        // Validation
        if (!userId) {
            return res.status(401).json({ message: 'User must be logged in to book a flight. Please log in first.' });
        }

        if (!flightId || !passengerDetails || !searchDetails || !paymentDetails) {
            return res.status(400).json({ message: 'Please provide all required booking details' });
        }

        // Generate a random booking reference (e.g., SKY + 4 random digits + random 2 letters)
        const generateBookingRef = () => {
            const randomDigits = Math.floor(1000 + Math.random() * 9000);
            const randomLetters = Math.random().toString(36).substring(2, 4).toUpperCase();
            return `SKY${randomDigits}${randomLetters}`;
        };

        // Verify flight exists
        const flightExists = await Flight.findById(flightId);
        if (!flightExists) {
            return res.status(404).json({ message: 'Selected flight not found' });
        }

        // Create the booking
        const newBooking = new BookFlight({
            user: userId,
            flight: flightId,
            bookingReference: generateBookingRef(),
            passengerDetails,
            searchDetails,
            paymentDetails,
            bookingStatus: 'confirmed' // Or processing initially
        });

        const savedBooking = await newBooking.save();

        res.status(201).json({
            message: 'Booking successfully created',
            booking: savedBooking
        });

    } catch (error) {
        console.error('Error creating flight booking:', error);
        res.status(500).json({ message: 'Server error while creating booking', error: error.message });
    }
};

// @desc    Get all bookings for a specific user
// @route   GET /api/bookings/user/:userId
// @access  Private (Mock public for now)
export const getUserBookings = async (req, res) => {
    try {
        const bookings = await BookFlight.find({ user: req.params.userId })
            .populate('flight', 'flightNumber airline origin destination departureTime arrivalTime')
            .sort({ createdAt: -1 });

        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error fetching user bookings:', error);
        res.status(500).json({ message: 'Server error while fetching bookings' });
    }
};
