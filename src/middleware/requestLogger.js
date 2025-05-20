import { logRequestDetails } from "../utils/logDetails.js";

/**
 * Middleware 1: Request Logger
 * this middleware logs the details about every incoming HTTP request including method, URL, status code, and duration.
 */
export function requestLogger(req, res, next) {
    const start = Date.now(); // Record start time

    // Waiting for response to finish inorder to calculate the duration
    res.on('finish', function callback() {
        const duration = Date.now() - start; // Total duration in milliseconds
        logRequestDetails(req, res, duration); // Logging the request details
    });

    next(); // Proceeding to next middleware once above task is finished.
}
