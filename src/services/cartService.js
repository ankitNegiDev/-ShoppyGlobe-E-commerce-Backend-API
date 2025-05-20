
// service layer...
/**
 * we can only use a variable like success, message, or anything else at the time of return, not while throwing an error — unless it is declared.
 */

import { 
        addToCart as addToCartRepository,
        updateCart as updateCartRepository,
        removeProductFromCart as removeProductFromCartRepository
    } from "../repository/cartRepository.js"
export async function addToCart(id,quantity){
    try{
        const response=  await addToCartRepository(id,quantity);
        // checking if response is null in that case we will throw error that product in Product collection is not found.
        if(!response){
            const error=new Error(`sorry Product in Product collection with id : ${id} not found`);
            error.status=404;
            //! sucess=false; //! reference error.
            throw error;
        }
        // else return response to controller.
        return response;

    }catch(error){
        // catch the error here if error.status is not undefine then throw that error to controller.
        if(error.status){
            console.log("error is thrown to controller");
            throw error;
        }

        // when a unkonw error comes..
        throw new Error(`Service Error in getProductByIdService: ${error.message}`);
    }
}


// update cart..

export async function updateCart(id,newQuantity){
    try{
        const response=updateCartRepository(id,newQuantity);
        if(!response){
            const error = new Error(`sorry Product in Product collection with id : ${id} not found`);
            error.status = 404;
            throw error;
        }
        return response;
    }catch(error){
        if(error.status){
            // throwing erro to controoler.
            throw error;
        }
        throw new Error(`Service Error in updateCart: ${error.message}`);
    }
}

// remove from cart....

export async function removeProductFromCart(id){
    try{
        const response= await removeProductFromCartRepository(id);
        if(!response){
            const error = new Error(`Sorry product in Product collection with id : ${id} is not found`);
            error.status=404;
            throw error;
        }
        return response;
    }catch(error){
        console.log("error in service : ",error);
        if(error.status){
            throw error;
        }
        throw new Error(`Service Error in removeProductFromCart : ${error.message}`);
    }
}