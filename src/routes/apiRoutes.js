// this is api routes that means our api will be like loclhost:portNu/api/products, /api/cart, /api/user, like this

/**
 * for 
 */

import express from 'express';
import productRouter from './productRoutes.js';
import cartRouter from './cartRoutes.js';
import authRouter from './authRoutes.js';

const apiRouter=express.Router();

// if url start with /products then handel it with product router.
apiRouter.use('/products',productRouter);

// if url start with /cart then handel it with cart router
apiRouter.use('/cart',cartRouter);

// if url start with /user then handel it with authRouter.
apiRouter.use('/user',authRouter);


export default apiRouter;