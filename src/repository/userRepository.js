// this is repository layer where we will write the db query in signup (register) and login function..
/**
 * * now before the sign in we need to do sign up and for this signup at least user info should be stored in db then only we can do sign in.

## 🔐 Authentication Flow: Sign-Up Before Sign-In

**sign-up must come before sign-in**. Here's why:

---

## ✅ Step-by-Step Flow

### 1. 📝 Sign-Up (User Registration)

* The user provides details such as:
  * **userName**
  * **Email**
  * **Password**

* We **store this information in the database**, making sure to:
  * Hash the password (e.g., using `bcrypt`)
  * Validate the input (e.g., unique email)

> This step **registers the user** in the system.

---

### 2. 🔑 Sign-In (User Login)

* The user enters their **email** and **password**.

* The backend:
  * Finds the user by email in the database
  * Compares the entered password with the **hashed password** in DB
* If it matches:
  * The user is **authenticated**
  * A **token** or **session** is generated

---

## 💡 Summary

> ✅ **User info must be stored in the DB during sign-up. Only then sign-in can verify and authenticate the user.**

---

🔒 bcryptjs is used to protect passwords (so we never store them in plain text).

🪪 jsonwebtoken is used to create login tokens to identify users securely after login.
 */

import { User } from "../schema/userSchema.js";
import bcrypt from "bcryptjs";

// node - e "console.log(require('crypto').randomBytes(64).toString('hex'))"

// sign up or register the user first..
export async function createUser(userName,email,password){
    try{
        // now before saving the password to db we need to hash it..
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({userName,email,password:hashedPassword});
        const userResponse = {
            userName: user.userName,
            email: user.email,
            id: user._id
        };
        return userResponse;
    }catch(error){
        console.log("error in repo in create user");
        throw error;
    }
}


// for login we will create two function one is compare by email inorder to know weather the user exist in our db or not... second is to compare the password inorder to actually loged in the user..

export async function findUserByEmailId(email){
    try{
        const user=await User.findOne({email});
        return user;
    }catch(error){
        console.log("error occure in finduserbyemail in repo\n");
        throw error;
    }
}

export async function comparePassword(userNormalPassword,hashedPassword){
    try{
        return await bcrypt.compare(userNormalPassword,hashedPassword);
    }catch(error){
        console.log("error occure in compoare pass in repo\n");
        throw error;
    }
}