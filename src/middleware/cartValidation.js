// middlewares/cartValidation.js
import mongoose from "mongoose";
import {Product} from "../schema/productSchema.js";

export async function validateProductId(req, res, next) {
    // since we already handel it on db level if we want we can handel id on request level also ..
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: `Invalid product ID format: ${id}`,
        });
    }

    const product = await Product.findById(id);
    if (!product) {
        return res.status(404).json({
            success: false,
            message: `Product with ID ${id} not found in the product collection. ....validation error on request level`,
        });
    }

    next(); // ID is valid and product exists
}

export function validateQuantity(req, res, next) {
    const { quantity, newQuantity } = req.body;

    // using nullish collesing operator if quentity is present then set value as quenity else set value as newQueetity.
    // Using the nullish coalescing operator (??) to assign the value:
    // If `quantity` is defined (not null or undefined), use it.
    // Otherwise, fall back to `newQuantity`.
    const value = quantity ?? newQuantity;

    if (value === undefined || typeof value !== "number" || value < 1) {
        return res.status(400).json({
            success: false,
            message: `Invalid or missing quantity. Please provide a valid quantity >= 1.`,
        });
    }

    next();
}
