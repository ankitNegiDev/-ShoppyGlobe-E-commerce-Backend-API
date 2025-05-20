import express from 'express';
import { addToCart, removeProductFromCart, updateCart } from '../controller/cartController.js';
import { validateQuantity } from '../middleware/cartValidation.js';
import { authenticateToken } from '../middleware/auth.js';

// creating a router object
const cartRouter=express.Router();

cartRouter.use(authenticateToken);

// if the api url start with /id it will execute. (method is post).

cartRouter.post('/:id', validateQuantity,addToCart);

// if the api url start with /id then it will execute (method isd put)
cartRouter.put('/:id', validateQuantity,updateCart);

// if the api url start with /cart/id then it will execute (method is delete)
cartRouter.delete('/:id',removeProductFromCart);


cartRouter.all("/", function callback(req, res) {
    return res.status(405).json({
        success: false,
        message: `${req.method} method is not allowed on /api/cart. Use POST /api/cart/:id to add single product to cart.`,
    });
});



// For /cart route without ID - only POST allowed for creation of cart...
cartRouter.all("/:id", function callback(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: `${req.method} method is not allowed on /api/cart. Use POST /api/cart to add products.`,
        });
    }
    res.status(404).send(); // or pass control to your POST /cart handler
});



// For /cart/:productId route - only PUT and DELETE allowed
cartRouter.all("/:id", function callback(req, res) {
    if (req.method !== "PUT" && req.method !== "DELETE") {
        return res.status(405).json({
            success: false,
            message: `${req.method} method is not allowed on /api/cart/:id. Use PUT to update or DELETE to remove product from cart and provide the id..`,
        });
    }
    res.status(404).send(); // or pass control to your PUT or DELETE /cart/:productId handlers
});

export default cartRouter;

