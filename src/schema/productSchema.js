// Each product should have fields like name, price, description, and stock quantity

import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        maxlength:40
    },
    price:{
        type:Number,
        required:true,
        trim:true,
        maxlength:30
    },
    description:{
        type:String,
        required:true,
        trim:true,
        maxlength:200
    },
    stockQuantity:{
        type:Number,
        required:true,
        trim:true,
        maxlength:10
    }
},{timestamps:true});

// now using the above scheam we will create model -> which is collection.

export const Product=mongoose.model("Product",productSchema);

