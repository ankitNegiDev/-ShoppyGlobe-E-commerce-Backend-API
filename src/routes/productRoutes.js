// importing the express..
import express from 'express';
import { getAllProducts, getProductById } from '../controller/productController.js';
// import { validateProductId } from '../middleware/cartValidation.js';

// creating a router object.
const productRouter=express.Router();

// if the url start with /products then fetch all the products from the db...
/*
productRouter.get('/products',(req,res)=>{
    console.log("/products route");
    res.send("/product route");
})
*/
productRouter.get('/',getAllProducts);

// get product by id...

// productRouter.get('/products/:id',validateProductId ,getProductById);
productRouter.get('/:id', getProductById);



// Middleware to restrict usage of base /products route with unsupported HTTP methods
// For example, POST, PUT, DELETE on /products (without id) are not allowed directly
// For /products route without ID - only GET allowed
productRouter.all("/", function callback(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({
            success: false,
            message: `${req.method} method is not allowed on /api/products. Use GET /api/products to fetch all products.`,
        });
    }
    res.status(404).send(); // or pass control to your GET /products handler
});

// For /products/:id route - only GET allowed
productRouter.all("/:id", function callback(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({
            success: false,
            message: `${req.method} method is not allowed on /api/products/:id. Use GET /api/products/:id to fetch single product details.`,
        });
    }
    res.status(404).send(); // or pass control to your GET /products/:id handler
});

export default productRouter;
