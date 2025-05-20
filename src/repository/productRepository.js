// this is where we will write the db query....... and this repsoitory layer will communicate with db and schema and send the repsonse back to service layer.

import mongoose from "mongoose";
import { Product } from "../schema/productSchema.js";

// but we need to define the shcema of products.. once we created now we will use Schema in repository if we need...(Product collection)

export async function getAllProducts() {
    try {
        const allProducts = await Product.find();
        console.log("all products are : ", allProducts);
        return allProducts;
    } catch (error) {
        console.log("error occured in repository layer and error is : ", error.message);
    }
}

export async function getProductById(id) {
    try {
        // this mongoose.Types.ObjectId.isValid(ourId) is officially provided by mongoose to us.
        if (!mongoose.Types.ObjectId.isValid(id)) {
            const error = new Error(`Invalid product ID format: ${id}`);
            error.status = 400; // Bad Request
            throw error;
        }
        const singleProduct = await Product.findById(id);
        console.log("single product is : ", singleProduct);
        /*
        there is no point of throwing error here because findById return the null only when it found no product with id mention provided that it is in correct format not like 2,456 etc. other wise it will throw cast error and this pice of code never will execute becuae findById in that case throw erro and that will be catched by catch.. it better we should validate the id before passing it to findByid.

        * findById() returns null only when:
            The ID is a valid 24-character ObjectId format and there is no matching document in the database.
        * If the ID format is invalid (like "2", "456", "abc123"), Mongoose throws a CastError immediately — the call fails, and: The code never reaches if (!singleProduct) . The control jumps directly to catch(error)
        So, there is no point in checking if (!singleProduct) unless you're sure the ID format is already valid.
        if(!singleProduct){
            console.log("---------------------------------");
            const error = new Error(`Product not found with ID: ${id}`);
            error.status = 404; // Not Found
            throw error;
        }
        */
        return singleProduct;
    } catch (error) {
        // console.log("error occureed in repository layer :",error);
        // 
        /*
            throw new Error(`Repository Error in getAllUsers: ${error.message}`);
            if we just write this then what actually is happening suppose our id format is invalid so it will throw a error which catch will catch and then from here we are throwing a new error where we did no mention the status property so what will happen it will throw this error to the service layer but status will be undefined so service will then throw this same error to controller and in controller wheere we are doing if(error.status) in that case it will be false and our defautl erro which is internal server erro that will be show to user which we did not want we want to show a erro like invalid id format right.. so to do it we need to preserve the status code that's why we are creating the new eror and then throw it.
        */

        const newError = new Error(`Error caught in Repository in getProductById : ==> ${error.message}`);
        newError.status = 500;
        throw newError;
    }
}