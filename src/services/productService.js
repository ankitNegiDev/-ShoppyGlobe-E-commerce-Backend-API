// service which calls the repository layer...........

import { 
    getAllProducts as getAllProductsRepository,
    getProductById as getProductByIdRepository,
}from "../repository/productRepository.js";
export async function getAllProducts(){
    try{
        const allProducts=await getAllProductsRepository();
        return allProducts;
    }catch(error){
        console.log("eror occured in service layer and error is : ",error);
    }
}

export async function getProductById(id){
    try{
        const singleProduct=await getProductByIdRepository(id);
        console.log("single product in service is : ",singleProduct);
        // the case when id was valid but no data found..
        if(!singleProduct){
            const error = new Error(`Sorry Product not found with ID : ${id} ... on db levle validation`);
            error.status = 404; // Not Found
            throw error;
        }
        return singleProduct;
    }catch(error){
        // console.log("error occureed in service layer \n",error);
        if(error.status){
            /*
                whatever the error caugth just throw it back to controller.. 
            */
            throw error;
        }
        // this is the case for normal internal server error those error which we don't know..io
        throw new Error(`Service Error in getProductByIdService: ${error.message}`);
    }
}

