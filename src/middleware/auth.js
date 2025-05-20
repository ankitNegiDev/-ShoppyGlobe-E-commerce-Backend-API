import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config/serverConfig.js';

// this is for authentication of token that user is passing in the api which he/she got afer first registering and then login sucessfully..

export function authenticateToken(req, res, next) {
    // Get the Authorization header from the request
    var authHeader = req.headers['authorization'];

    // Extract token from "Bearer <token>"
    var token = null;
    if (authHeader) {
        token = authHeader.split(' ')[1];
    }

    // If token is missing, return 401 error
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Access token is missing',
        });
    }

    // Verify the token using the secret key
    jwt.verify(token, JWT_SECRET_KEY, function (err, decodedUser) {
        if (err) {
            // Token invalid or expired, return 403 error
            return res.status(403).json({
                success: false,
                message: 'Invalid or expired token',
            });
        }

        // Save decoded user info in request object for next handlers
        req.user = decodedUser;

        // Call next middleware or route handler
        next();
    });
}
