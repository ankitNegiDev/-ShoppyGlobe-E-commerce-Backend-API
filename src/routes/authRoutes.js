import express from "express";
import { loginUser, registerUser } from "../controller/userController.js";

const authRouter=express.Router();

// if the api url start with /signup then execute it ..
authRouter.post('/signup',registerUser);

// if the api url start with /login then execute it..
authRouter.post('/login',loginUser);



// for /user/signup route
authRouter.all("/signup", function (req, res, next) {
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: `${req.method} method is not allowed on /api/user/signup. Use POST to register.`,
        });
    }
    next();
});

// for /user/login rotue to prevetn the accidental get,put,patch,delte request
authRouter.all("/login", function (req, res, next) {
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: `${req.method} method is not allowed on /api/user/login. Use POST to log in.`,
        });
    }
    next();
});

export default authRouter;