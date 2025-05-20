// cart schema.
/**
 * The ref in Mongoose is short for "reference", and it's used to create a relationship between two collections — kind of like a foreign key in SQL.

productId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
}
 * type: mongoose.Schema.Types.ObjectId: This field stores the _id of another document (from the Product collection in this case).

 * ref: "Product": This tells Mongoose which collection this ObjectId is referencing. So here, it points to the Product model.
 */
import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity:{
        type:Number,
        required:true,
        min:1
    }
},{timestamps:true});

// this is how we create the scheam for cart.. now we have to create the model for cart..

export const Cart=mongoose.model("Cart",cartSchema);