
# ✅ Test Results of Backend API

---

## 📦 1. GET Requests on Products

### ➤ All Products

- **Scenario:** API URL is `http://localhost:portNumber/api/products`.
- **Expected:** Should fetch all products without requiring a token.
- **Actual:** Products fetched successfully.
- **HTTP Status:** 200 OK  
- ![All Products](./src/assests/get%20request%20for%20product.png)

### ➤ Single Product by ID

- **Scenario:** API URL is `http://localhost:portNumber/api/products/{id}`.
- **Expected:** Should fetch the product with the given ID.
- **Actual:** Product details returned.
- **HTTP Status:** 200 OK  
- ![Single Product](./src/assests/get%20request%20by%20id%20on%20product.png)

---

## 👤 2. User Registration and Login

### ➤ User Signup

- **Scenario:** API URL is `http://localhost:portNumber/api/user/signup`.
- **Expected:** Should register a new user.
- **Actual:** User registered and saved in DB.
- **HTTP Status:** 201 Created  
- ![Signup](./src/assests/registring%20user..png)  
- ![User in DB](./src/assests/user%20register%20on%20db.png)

### ➤ User Login

- **Scenario:** API URL is `http://localhost:portNumber/api/user/login`.
- **Expected:** Should log in and return a JWT token.
- **Actual:** Logged in and token received.
- **HTTP Status:** 200 OK  

- ```text
  token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  ```

- ![Login](./src/assests/login.png)

---

## 🛒 3. POST Request on Cart

### ➤ Without Token

- **Scenario:** API URL is `http://localhost:portNumber/api/cart/{productId}` without access token.
- **Expected:** Should return unauthorized error.
- **Actual:** Access denied.
- **HTTP Status:** 401 Unauthorized  
- ![No Token](./src/assests/no%20access%20token%20is%20provided.png)

### ➤ With Token

- **Scenario:** API URL is `http://localhost:portNumber/api/cart/{productId}` with access token.
- **Expected:** Product should be added to cart.
- **Actual:** Product added successfully.
- **HTTP Status:** 200 OK  
- ![Token Provided](./src/assests/access%20token.png)  
- ![Added to Cart](./src/assests/product%20added%20in%20cart%20atlas.png)

---

## 🔄 4. PUT Request on Cart

- **Scenario:** API URL is `http://localhost:portNumber/api/cart/{productId}` with token.
- **Expected:** Should update cart item.
- **Actual:** Cart updated successfully.
- **HTTP Status:** 200 OK  
- ![PUT Cart](./src/assests/put%20on%20cart.png)  
- ![PUT Atlas](./src/assests/put%20on%20atlas.png)

---

## ❌ 5. DELETE Request on Cart

- **Scenario:** API URL is `http://localhost:portNumber/api/cart/{productId}` with token.
- **Expected:** Should delete item from cart.
- **Actual:** Cart item deleted.
- **HTTP Status:** 200 OK  
- ![Delete Cart](./src/assests/delete.png)  
- ![Delete Atlas](./src/assests/delete%20atlas.png)
