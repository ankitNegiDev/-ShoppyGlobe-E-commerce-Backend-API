import express from 'express';
import { PORT } from './config/serverConfig.js';
import { connectDB } from './config/dbConfig.js';
import apiRouter from './routes/apiRoutes.js';
import { requestLogger } from './middleware/requestLogger.js';


const app=express();


// inbuilt middleware
app.use(express.json());

// logging the request info..
app.use(requestLogger);

// if url start with /api then handel it with api router.

app.use('/api',apiRouter);




app.listen(PORT,()=>{
    console.log("server is up on port ",PORT);
    connectDB();
})



app.get('/ping',function callback(req,res){
    console.log("/ping route");
    return res.json({
        message: 'hii ping sucessfully',
    });
})



// Middleware for handling 404 errors (route not found)
// This will catch any request that doesn't match defined routes
app.use((req, res) => {
    return res.status(404).json({
        success: false,
        message: `Method: ${req.method} and Route: ${req.originalUrl} ===> not found. Please use a valid API URL that starts with /api/products, /api/carts, or /api/user/login or signup`,
        expectedRoutes: [
            "/api/products",
            "/api/carts",
            "/api/user/signup",
            "/api/user/login"
        ]
    });
});

