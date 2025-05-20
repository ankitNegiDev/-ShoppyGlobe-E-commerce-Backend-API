import dotenv from 'dotenv';

// Loading environment variables from the .env file into process.env
dotenv.config();

// Logging the PORT value from the .env file for verification
console.log('PORT from .env:', process.env.PORT);

// Exporting PORT variable from environment or default to 4000
export const PORT = process.env.PORT || 4000;

// Exporting MongoDB connection URL from environment variables
export const MONGODB_URL = process.env.MONGODB_URL;

// Exporting JWT secret key from environment variables
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
