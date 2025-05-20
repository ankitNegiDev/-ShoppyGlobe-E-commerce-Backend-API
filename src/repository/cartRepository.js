// cart...

//! if we thought findById always return null ..... then it's not like that ... it will reutrn valid product when it found and when it does not found then it return the null only when valid format of id is provided ..

import mongoose from "mongoose";
import { Product } from "../schema/productSchema.js";
import { Cart } from "../schema/cartSchema.js";

// adding item in cart 
export async function addToCart(id,quantity){
    try{
        // step 1 :  check if id is not in valid format..
        if(!mongoose.Types.ObjectId.isValid(id)){
            const error = new Error(`Invalid product ID format: ${id}`);
            error.status=404;
            throw error;
        }
        // stpe 2 :  if id is correct format then search for this product with given id in Product collection.
        const product=await  Product.findById(id);
        console.log(`product with id : ${id} found in Product collection in db\n`);
        
        // step 3 : if we found the product in the Product collection then search for this same product in Cart collection.
        // checking product is not null..only when valid id format is provided but product is not in Product collection.
        if(product){
            // searching in Cart collection.
            const productInCart=await Cart.findOne({productId:id});
            // if product is present in cart then just update its quantity.
            if(productInCart){
                // update the quantity
                productInCart.quantity+=1;
                await productInCart.save();
                console.log("product quantity updated sucessfully in cart");
                return productInCart;
            }else{
                // if not in cart then create a entry in cart.
                const productSavedInCart= await Cart.create({
                    productId:id,
                    quantity:quantity
                });
                console.log("product saved in cart sucessfully");
                return productSavedInCart;
            }
        }else{
            console.log("returning null when id is in correct format but product is not found \n");
            return null;
        }
    }catch(error){
        const newError = new Error(`Error caught in Repository in addTocart : ==> ${error.message}`);
        newError.status = 500;
        throw newError;
    }
}

export async function updateCart(id,newQuantity){
    try{
        // validating the id.. we can do it directly on controller layer...while getting the id..
        if(!mongoose.Types.ObjectId.isValid(id)){
            const error = new Error(`Invalid product ID format: ${id}`);
            error.status=404;
            throw error;
        }
        // if id is valid. then search for product with given id in Product collection..
        const product=await Product.findById(id);
        console.log(`product with id : ${id} found in Product collection in db\n`);

        if(product){
            // if product is found in Product collection then check it in cart..
            const productInCart=await Cart.findOne({productId : id});
            // if product with given id is present in cart then update the quantity
            if(productInCart){
                // updating quantity..
                productInCart.quantity=newQuantity;
                await productInCart.save();
                return productInCart;
            }else{
                const error=new Error(`product with id ${id} is not present in cart please add product in cart first`);
                error.status=404;
                throw error;
            }
        }else{
            // if product is not found .....return null or product
            return null;
        }
        // return product;

    }catch(error){
        const newError=new Error(`Error caught in Repository in updateCart : ===> ${error.message}`);
        newError.status=500;
        throw newError;
    }
}

/**
 * {
  "success": false,
  "message": "Error caught in Repository in updateCart : ===> Cart validation failed: quantity: Path `quantity` is required."
}
 */


export async function removeProductFromCart(id){
    try{
        if(!mongoose.Types.ObjectId.isValid(id)){
            const error = new Error(`Invalid product ID format: ${id}`);
            error.status=404;
            throw error;
        }
        // first check for product in Product collection...
        const product=await Product.findById(id);
        if(product){
            // now check for product in cart.. and if present then delte it..
            //! const productInCart=await Product.findByIdAndDelete({productId:id}); //! It is used for deleting a document by its MongoDB _id field, not by other fields. If we want to delete by productId then we need to use Cart.findOneAndDelete({ productId: id }).
            const productInCart = await Cart.findOneAndDelete({ productId: id });
            if(!productInCart){
                // if no found in cart then
                const error = new Error(`product with id ${id} is not present in cart please add product in cart first inorder to remove it`);
                error.status = 404;
                throw error;
            }
            return productInCart;
        }else{
            return null;
        }
    }catch(error){
        console.log("error in repository : ",error.message);
        const newError = new Error(`Error caught in Repository in updateCart : ===> ${error.message}`);
        newError.status = 500;
        throw newError;
    }
}

