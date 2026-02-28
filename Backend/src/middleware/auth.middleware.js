import jwt from 'jsonwebtoken';
import User from '../model/user.model.js';
import mongoose from 'mongoose';

// This function checks if the user is logged in
export const protect = async (req, res, next) => {
    let token;

    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access denied, no token provided"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        req.user = user;

        next();

    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Invalid or expired token",
            error: error.message
        });
    }
};

// This function checks if the logged-in user is an admin
export const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({
            success: false,
            message: "Access denied, only admins can see this"
        });
    }
};
