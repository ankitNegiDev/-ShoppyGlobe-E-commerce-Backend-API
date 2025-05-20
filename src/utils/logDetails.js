/**
 * Logs detailed information about an incoming HTTP request and its response.
 *
 * @param {object} req - The Express request object containing request details.
 * @param {object} res - The Express response object containing response details.
 * @param {number} duration - The time taken to process the request (in milliseconds).
 *
 * This function logs the following information:
 * - Current timestamp (formatted to local string)
 * - HTTP method (GET, POST, etc.)
 * - Original URL requested
 * - HTTP status code of the response
 * - Duration of request processing in milliseconds
 * - Client IP address
 * - User-Agent header (identifies client software)
 * - Content-Type header of the request
 * - Query parameters as a JSON string
 * - Route parameters as a JSON string
 * - Request body as a JSON string
 * - Referrer header (or 'Direct' if no referrer)
 */
export function logRequestDetails(req, res, duration) {
    console.log(`--- Request Log ---`);
    console.log(`Time          : ${new Date().toLocaleString()}`);
    console.log(`Method        : ${req.method}`);
    console.log(`URL           : ${req.originalUrl}`);
    console.log(`Status Code   : ${res.statusCode}`);
    console.log(`Duration      : ${duration}ms`);
    console.log(`IP Address    : ${req.ip}`);
    console.log(`User-Agent    : ${req.headers['user-agent']}`);
    console.log(`Content-Type  : ${req.headers['content-type']}`);
    console.log(`Query Params  : ${JSON.stringify(req.query)}`);
    console.log(`Route Params  : ${JSON.stringify(req.params)}`);
    console.log(`Body          : ${JSON.stringify(req.body)}`);
    console.log(`Referrer      : ${req.headers.referer || 'Direct'}`);
    console.log(`--------------------`);
}
