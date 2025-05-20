// this si controllr layer that call the service layer and accpet the request from route and collect response from the service..

import { JWT_SECRET_KEY } from "../config/serverConfig.js";
import { loginUser as loginUserService, registerUser as registerUserService } from "../services/userService.js";
import jwt from 'jsonwebtoken';

// this is for registering the user or singup user..
export async function registerUser(req, res) {
    try {
        // validation we will write in middleware.. or in validators etc.
        // getting all userName,password ,email from the req.body.
        const { userName, email, password } = req.body;
        const newUser = await registerUserService(userName, email, password);
        return res.status(201).json({
            success: true,
            message: "User registred Sucessfully",
            data: {
                user: newUser
            }
        })

    } catch (error) {
        console.log("error in controller in register user \n");
        // Handling duplicate email error (from MongoDB unique index)
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Email already registered",
            });
        }
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

// login user..

export async function loginUser(req,res){
    try{

        const {email,password}=req.body;
        const user=await loginUserService(email,password);
        // oncde the loged in now to create jwt token.
        const token=jwt.sign(
            // (1) payload
            {
                userId:user.id,
                email:user.email
            },
            // (2) secret key to sign the token
            JWT_SECRET_KEY,
            // (3) expiry date : 1 day.
            {
                "expiresIn":"1d"
            }
        );
        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            data:{
                user
            }
        });
        

    }catch(error){
        console.log("error in controller in login \n");
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
}
