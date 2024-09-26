import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js'; // Ensure the correct import

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    // Log the token for debugging purposes
    console.log("access_token:", token);

    if (!token) return next(errorHandler(401, 'Unauthorized'));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorHandler(403, 'Forbidden'));

        req.user = user;
        next();
    });
};
