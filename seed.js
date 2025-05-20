// import mongoose from "mongoose";
import dotenv from "dotenv";
import { Product } from "./src/schema/productSchema.js";
import { MONGODB_URL } from "./src/config/serverConfig.js";
import { connectDB } from "./src/config/dbConfig.js";

dotenv.config();

const sampleProducts = [
    {
        name: "iPhone 14 Pro",
        price: 1299,
        description: "Apple smartphone with A16 chip",
        stockQuantity: 10,
    },
    {
        name: "Samsung Galaxy S22",
        price: 999,
        description: "Flagship Android phone",
        stockQuantity: 15,
    },
    {
        name: "Sony WH-1000XM4",
        price: 299,
        description: "Noise-cancelling headphones",
        stockQuantity: 20,
    },
];

const seedData = async () => {
    try {
        await connectDB(MONGODB_URL);
        await Product.deleteMany();
        await Product.insertMany(sampleProducts);
        console.log("Sample products inserted!");
        process.exit(0);
    } catch (error) {
        console.error("Seeding error:", error);
        process.exit(1);
    }
};

seedData();
