// service layer -> call the repository and for business logic...


import { comparePassword, createUser, findUserByEmailId } from "../repository/userRepository.js";

export async function registerUser(userName,email,password){
    try{
        // we can add business logic here ...
        const newUser=await createUser(userName,email,password);
        return newUser;
    }catch(error){
        console.log("error in service in register user");
        throw error;
    }
}

// login..

export async function loginUser(email,password){
    try{
        const user= await findUserByEmailId(email);
        if(!user){
            const error=new Error('Invalid user email . Please enter valid email id');
            error.status=401;
            throw error;
        }
        // once we found the user in our db by email now we will compare the password.
        // user.password is the password that is stored in our db and it is hashed password.
        const isValidPassword=await comparePassword(password,user.password);
        if(!isValidPassword){
            const error=new Error('Invalid password . Please enter valid password');
            error.status=401;
            throw error;
        }

        // if user email and password matched then we will return the user where we will not return the password.
        return {
            id: user._id,
            userName: user.userName,
            email: user.email,
        };
    }catch(error){
        console.log("error in service in login user");
        throw error;
    }
}