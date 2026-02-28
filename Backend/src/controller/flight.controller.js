import mongoose from 'mongoose';
import Flight from '../model/flight.model.js';

// Helper to validate MongoDB ID
const isValidId = (id, res) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({
            success: false,
            message: "Invalid ID format"
        });
        return false;
    }
    return true;
};

//------------------------create flight------------------------
export const createFlight = async (req, res) => {
    try {
        const data = req.body;

        const newFlight = await Flight.create({
            flightNumber: data.flightNumber,
            airline: data.airline,
            origin: data.origin,
            destination: data.destination,
            departureTime: data.departureTime,
            arrivalTime: data.arrivalTime,
            price: data.price,
            status: data.status,
            description: data.description,
            fees: data.fees,
            visaType: data.visaType
        });

        res.status(201).json({
            success: true,
            message: "Flight created successfully",
            flight: newFlight
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to create flight",
            error: error.message
        });
    }
};

//------------------------get all flights------------------------
export const getAllFlights = async (req, res) => {
    try {
        const { origin, destination } = req.query;
        let query = {};

        // Case-insensitive regex matching for flexible searching
        if (origin) {
            query.origin = { $regex: origin, $options: 'i' };
        }

        if (destination) {
            query.destination = { $regex: destination, $options: 'i' };
        }

        const flights = await Flight.find(query);

        res.status(200).json({
            success: true,
            message: "Flights fetched successfully",
            flights: flights
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch flights",
            error: error.message
        });
    }
};

//------------------------get flight by id------------------------
export const getFlightById = async (req, res) => {
    try {
        if (!isValidId(req.params.id, res)) return;

        const flight = await Flight.findById(req.params.id);

        if (!flight) {
            return res.status(404).json({
                success: false,
                message: "Flight not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Flight fetched successfully",
            flight: flight
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch flight",
            error: error.message
        });
    }
};

//------------------------update flight------------------------
export const updateFlight = async (req, res) => {
    try {
        if (!isValidId(req.params.id, res)) return;

        const flight = await Flight.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!flight) {
            return res.status(404).json({
                success: false,
                message: "Flight not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Flight updated successfully",
            flight: flight
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to update flight",
            error: error.message
        });
    }
};

//------------------------delete flight------------------------
export const deleteFlight = async (req, res) => {
    try {
        if (!isValidId(req.params.id, res)) return;

        const flight = await Flight.findByIdAndDelete(req.params.id);

        if (!flight) {
            return res.status(404).json({
                success: false,
                message: "Flight not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Flight deleted successfully",
            flight: flight
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete flight",
            error: error.message
        });
    }
};
