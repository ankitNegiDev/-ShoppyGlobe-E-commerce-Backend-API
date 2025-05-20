
import { 
        addToCart as addToCartService ,
        updateCart as updateCartService,
        removeProductFromCart as removeProductFromCartService
} from "../services/cartService.js";

// creating a function for adding a product to cart.. please refere to cartLogic file inside notes for details.
export async function addToCart(req,res){
    try{
        const {quantity}=req.body;
        console.log("quantity is : ",quantity);
        const {id}=req.params;
        const response=await addToCartService(id,quantity);
        return res.status(201).json({
            success: true,
            message: `conguratualations product with id : ${id} is saved sucessfully in Cart`,
            data:{
                product:response
            }
        })
    }catch(error){
        if(error.status){
            return res.status(error.status).json({
                success:false,
                message:error.message
            })
        }
        return res.status(500).json({
            message: "Sorry Internal server error",
            success: false
        })
    }
}

// updating cart..
export async function updateCart(req,res){
    try{
        // getting the id and newQuantity..
        const {id}=req.params;
        // assuming weather user write queantity or newQuentit in put request we will accept both and at any poitn of time any one will be valid so using nullish collesing we can check that.
        const { newQuantity,quantity } = req.body;
        const value = quantity ?? newQuantity;
        const response=await updateCartService(id,value);
        return res.status(200).json({
            success: true,
            message: `conguratualations product with id : ${id} is updated sucessfully in Cart`,
            data:{
                product:response
            }
        })

    }catch(error){
        if(error.status){
            return res.status(error.status).json({
                success: false,
                message: error.message
            })
        }
        return res.status(500).json({
            success:false,
            message:"Sorry internal server error"
        })
    }
}


// removing product from cart.
export async function removeProductFromCart(req,res){
    try{
        console.log("remove cart in controller ");
        const response=await removeProductFromCartService(req.params.id);
        return res.status(200).json({
            success: true,
            message: `conguratualations product with id : ${req.params.id} is deleted sucessfully from Cart`,
            data:{
                product:response
            }
        })
    }catch(error){
        console.log("error in controller ",error);
        if(error.status){
            return res.status(error.status).json({
                success: false,
                message: error.message
            })
        }

        return res.status(500).json({
            success: false,
            message: "Sorry internal server error"
        })
    }
}
