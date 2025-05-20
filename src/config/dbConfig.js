import mongoose from "mongoose";
// Importing MongoDB connection URL from config.js file
import { MONGODB_URL } from "./serverConfig.js";  

// creating a async function inorder to establish a connection with MongoDB database
export async function connectDB() {
    try {
        // here we are trying to connect to MongoDB using the connection URL
        await mongoose.connect(MONGODB_URL);
        console.log("connection is set-up with mongo db database\n");
    } catch (error) {
        // If connection fails then log an error message and the error object
        console.log("failed to connect with mongoDB..");
        console.log("error : ", error);
    }
}