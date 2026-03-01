import mongoose from 'mongoose';

const bookFlightSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    flight: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flight',
        required: true
    },
    bookingReference: {
        type: String,
        required: true,
        unique: true
    },
    passengerDetails: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        passportNumber: {
            type: String
        },
        visaType: {
            type: String
        }
    },
    searchDetails: {
        travellers: {
            type: Number,
            required: true,
            default: 1
        },
        age: {
            type: String
        },
        tripType: {
            type: String
        }
    },
    paymentDetails: {
        basePrice: {
            type: Number,
            required: true
        },
        taxes: {
            type: Number,
            required: true
        },
        totalAmount: {
            type: Number,
            required: true
        }
    },
    bookingStatus: {
        type: String,
        enum: ['processing', 'confirmed', 'cancelled'],
        default: 'processing'
    }
}, {
    timestamps: true
});

const BookFlight = mongoose.model('BookFlight', bookFlightSchema);

export default BookFlight;
