
# 🛒 ShoppyGlobe – E-commerce Backend API

A RESTful backend API for an e-commerce platform built using **Node.js**, **Express**, and **MongoDB**.  
It supports user authentication, product management, and cart operations with JWT-based route protection.

---

## 📚 Table of Contents

- [🛒 ShoppyGlobe – E-commerce Backend API](#-shoppyglobe--e-commerce-backend-api)
  - [📚 Table of Contents](#-table-of-contents)
  - [✅ Features](#-features)
  - [🧱 Tech Stack](#-tech-stack)
  - [📁 Project Structure](#-project-structure)
  - [Setup Instructions](#setup-instructions)
    - [1. Setup MongoDB Atlas (Cloud Database)](#1-setup-mongodb-atlas-cloud-database)
    - [2. Configure environment variables](#2-configure-environment-variables)
    - [3. JWT Secret Key](#3-jwt-secret-key)
    - [4. Seeding data for testing api](#4-seeding-data-for-testing-api)
  - [How to Run the Project](#how-to-run-the-project)
  - [API Endpoints](#api-endpoints)
    - [User Routes (`/api/user`)](#user-routes-apiuser)
    - [Product Routes (`/api/products`)](#product-routes-apiproducts)
    - [Cart Routes (`/api/cart`)](#cart-routes-apicart)
  - [Authentication](#authentication)
  - [🧪 API Testing Tools](#-api-testing-tools)
  - [🧠 Architecture Diagram](#-architecture-diagram)
  - [Troubleshooting \& Tips](#troubleshooting--tips)
  - [🤝 Contributions](#-contributions)
  - [📜 License](#-license)

---

## ✅ Features

- User Registration & Login (JWT-based authentication)
- Product CRUD functionality
- Cart operations (Add, Update, Remove)
- Protected routes with `auth` middleware
- Validation middleware for inputs
- Clean layered architecture
- Meaningful HTTP status codes and error handling

---

## 🧱 Tech Stack

- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **JWT** for authentication
- **bcrypt** for password hashing
- **dotenv** for environment config

---

## 📁 Project Structure

```planetext
/project-root
├── /config
│   ├── serverConfig.js          # Loads environment variables (PORT, DB_URI, JWT_SECRET)
│   └── dbConfig.js              # Initializes MongoDB connection using Mongoose
│
├── /middleware
│   ├── auth.js                  # JWT authentication middleware for protected routes
│   └── cartValidation.js        # Input validation for cart-related requests
│
├── /routes
│   ├── apiRoutes.js             # Central API router combining all sub-routes
│   ├── authRoutes.js            # Routes for user signup/login (mounted at /user)
│   ├── cartRoutes.js            # Routes to manage shopping cart (mounted at /cart)
│   └── productRoutes.js         # Routes to manage products (mounted at /products)
│
├── /controllers
│   ├── userController.js        # Handles signup and login requests
│   ├── cartController.js        # Handles cart-related operations
│   └── productController.js     # Handles product CRUD operations
│
├── /services
│   ├── userService.js           # Business logic for user authentication
│   ├── productService.js        # Business logic for product operations
│   └── cartService.js           # Business logic for cart management
│
├── /repository
│   ├── userRepository.js        # Handles DB operations for user data
│   ├── productRepository.js     # Handles DB operations for product data
│   └── cartRepository.js        # Handles DB operations for cart data
│
├── /schema
│   ├── userSchema.js            # Mongoose schema/model for User
│   ├── productSchema.js         # Mongoose schema/model for Product
│   └── cartSchema.js            # Mongoose schema/model for Cart
│
├── .env                         # Environment variables (e.g., DB_URI, JWT_SECRET)
├── server.js                    # Entry point – initializes Express app and DB
└── package.json                 # Project metadata, scripts, dependencies
```

---

## Setup Instructions

### 1. Setup MongoDB Atlas (Cloud Database)

If you don’t have MongoDB installed locally, you can use MongoDB Atlas, a cloud-hosted MongoDB service.

- Go to <https://www.mongodb.com/cloud/atlas> and create an account.
- Create a new project.
- Create a new cluster (free tier is fine for development).
- Under "Database Access", create a new database user with a username and password.
- Under "Network Access", whitelist your IP address or allow access from anywhere (`0.0.0.0/0`) for development.
- Go to "Clusters", click “Connect”, then “Connect your application”. Copy the connection string URI.

Example MongoDB URI:

```planetext
mongodb+srv://<username>:<password>@cluster0.mongodb.net/myDatabase?retryWrites=true&w=majority
```

Replace `<username>`, `<password>`, and `myDatabase` with your details.

---

### 2. Configure environment variables

Create a `.env` file in your project root and add the following:

```.env
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET_KEY=your_secret_key_here
```

- `MONGO_URI` is the connection string you got from MongoDB Atlas or your local MongoDB connection string.
- `JWT_SECRET_KEY` is a secret string used to sign JWT tokens. You can create any strong random string (e.g., using a password generator). Keep it secret!

---

### 3. JWT Secret Key

- Generate a secret key to sign JWT tokens.
- This can be any random string. For example, you can use an online generator or a long random string like:

  ```planetext
  s3cR3tK3yForJWT123!@#
  ```

### 4. Seeding data for testing api

- once all the setup is done then on the root folder write `node seed.js`
- on doing this it will seed some initial data on the database in product collection and we check it by `http://localhost:yourPortnumber/api/products` and if it fetch all the products then all good else if we get some error plse check your setup.

---

## How to Run the Project

- **Clone the repository**

    ```bash
    git clone https://github.com/ankitNegiDev/-ShoppyGlobe-E-commerce-Backend-API
    ```

- **Install dependencies**

    ```bash
    npm install
    ```

- **Create `.env` file as explained above**

- **Start the server**

    ```bash
    npm start
    ```

- Server will run on `http://localhost:5000` (or the port you configured).

---

## API Endpoints

All API routes are prefixed with `/api`

### User Routes (`/api/user`)

- **POST /api/user/signup**

  Request Body:

  ```json
  {
    "userName": "yourusername",
    "email": "youremail@example.com",
    "password": "yourpassword"
  }
  ```

  Response: User registered (without password)

- **POST /api/user/login**

  Request Body:

  ```json
  {
    "email": "youremail@example.com",
    "password": "yourpassword"
  }
  ```

  Response: JWT token and user details (without password)

---

### Product Routes (`/api/products`)

- **GET /api/products**

  Fetch all products.

- **GET /api/products/:id**

  Fetch product by ID.

- **POST /api/products**

  Create a new product (implement auth if needed).

- **PUT /api/products/:id**

  Update product by ID.

- **DELETE /api/products/:id**

  Delete product by ID.

---

### Cart Routes (`/api/cart`)

Protected routes - require `Authorization: Bearer <token>` header.

- **POST /api/cart/:id**

  Add product (id) to cart with quantity.

- **PUT /api/cart/:id**

  Update quantity of product (id) in cart.

- **DELETE /api/cart/:id**

  Remove product (id) from cart.

---

## Authentication

- To access protected routes like `/api/cart/*`, you must include the JWT token in the `Authorization` header:

```planetext
Authorization: Bearer <your_jwt_token>
```

---

## 🧪 API Testing Tools

Use **Postman** or **Thunder Client** with appropriate headers.

---

## 🧠 Architecture Diagram

```plaintext
Client (React / Postman)
        |
        v
  [ Express Server ]
        |
        ├── Routes (User, Products, Cart)
        ├── Middleware (Auth, Validation)
        ├── Controllers
        ├── Services
        ├── Repositories
        └── MongoDB (via Mongoose)
```

---

## Troubleshooting & Tips

- Make sure your `.env` file is correctly configured.
- MongoDB connection issues usually relate to incorrect URI or IP whitelist.
- Use Postman or similar API clients to test routes with correct headers.
- Always hash passwords before saving users.
- Token expiration is set to 1 day by default.
- For development, you can disable auth middleware temporarily but don't do this in production.

---

## 🤝 Contributions

PRs and suggestions are always welcome!

---

## 📜 License

MIT License
