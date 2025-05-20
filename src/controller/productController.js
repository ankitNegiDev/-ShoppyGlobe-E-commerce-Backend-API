// controller...

import {
    getAllProducts as getAllProductsService ,
    getProductById as getProductByIdService
} from "../services/productService.js";

// to get all the products..
export async function getAllProducts(req,res){
    try{
        const response = await getAllProductsService();
        if (response.length <= 0) {
            return res.status(200).json({
                sucess: true,
                message: "sorry there are no product in the database please add data first",
                data:{
                    product:response
                }
            })
        }
        return res.status(200).json({
            sucess: true,
            message: "conguratualations all products fetched sucessfully",
            data:{
                product:response
            }
        })
    }catch(error){
        console.log("error occured in controoler : ",error);
        return res.status(500).json({
            message: "Sorry Internal server error",
            sucess: false
        })
    }
}

// to get product by id....
export async function getProductById(req,res){
    try{
        const response=await getProductByIdService(req.params.id);
        return res.status(200).json({
            sucess:true,
            message:`conguratualations product with id : ${req.params.id} fetched sucessfully`,
            data:{
                product:response
            }
        })
    }catch(error){
        // console.log("error occured in controoler : ",error);
        if(error.status){
            return res.status(error.status).json({
                message:error.message,
                sucess: false,
            })
        }
        return res.status(500).json({
            message: "Sorry Internal server error",
            sucess: false
        })
    }
}
