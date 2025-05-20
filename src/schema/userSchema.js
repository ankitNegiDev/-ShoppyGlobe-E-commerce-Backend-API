// creating userSchema..

import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    userName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique: true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
},{timestamp:true});

// now creating the User collection using this userSchema.
/**
 * mongoose.model(collectionName, schema)
 * defines a Model, where:

    * collectionName is the name of the model (not the literal collection name, but Mongoose uses it to create the collection).

    * schema is the structure/blueprint of documents in that collection.

 * Mongoose automatically pluralizes and lowercases the collectionName to determine the actual MongoDB collection name.
 ** The mongoose.model() function takes a model name (used to generate the MongoDB collection name) and a schema definition to create a Mongoose model.
 */
// model takes collectionName and schema.
export const User=mongoose.model("User",userSchema);

