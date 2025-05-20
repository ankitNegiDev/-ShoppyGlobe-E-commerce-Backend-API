// cart logic..

// addToCart logic ........ post request method , url will be like http://localhost:portNumber/cart/id
/**
 * step 1 : create the route for /cart using express.Router()
 * step 2 : in controller we will be getting id and quantity..
 * step 3 : call service layer (any business logic implement it)...
 * step 4 : call the repository layer.. (import the schema for cart) and check if the given id exist in db products collection then  we need to check for is this same product also exist in the cart or not ..
    * if yes then update the quantity of that product only else create a new entry in cart collection.
 * But if we did not found any product in product collection of given id then return error.
 */

/**
 * Step 1: Create the route for /cart using express.Router().
 *
 * Step 2: In the controller, extract product ID and quantity from req.body.
 *
 * Step 3: Call the service layer — implement any business logic here if needed.
 *
 * Step 4: In the repository layer:
 *    - Import both Product and Cart schemas.
 *    - First, check if the product with the given ID exists in the Products collection.
 *       → If not found, return an error (404).
 *
 *    - Second , check if the same product already exists in the Cart collection.
 *        → If it exists, update the quantity (increment it).
 *        → If it doesn't exist, create a new entry in the Cart collection with the product ID and quantity.
 */

// updateCart logic...
/**
 * there might be question why to check for the product in product collection why can't we directly check in cart becasue in that case we need to pass the id of each item in cart... but assuming user will have access to only product id............
 * [PUT /cart/:productId]
Step 1: we will create a route for PUT /cart/:productId
Step 2: In controller we will extract productId from req.params and quantity from req.body this quantity is new quantity that user want to set.
Step 3: from controller call service layer  and pass data..
step 4 : in service layer implement  business logic if any else just call the repository layer..
Step 5: In repository:
    a. first check if productId exists in Products collection or not 
        if yes ---------
            1. then check if product exists in Cart
                - If yes → replace quantity with new quantity
                - if no -> then we will throw error that product is not in cart please add first...
        if no ---------
            -  return 404 invalid id or product with id not found..
 */


/**
    1. Check if productId is a valid ObjectId.
    2. Check if product exists in Product collection.
        - If not → throw 404
    3. Check if product exists in Cart collection.
        - If not → throw 404 (“Product not in cart. Please add first.”)
    4. If both pass, update `cart.quantity = newQuantity`
    5. Save & return updated cart item
*/



// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODJjMjFjZWViZWZmYmU3ZTg1MzFkMzIiLCJlbWFpbCI6ImFua2l0bmVnaTkxMDRAZ21haWwuY29tIiwiaWF0IjoxNzQ3NzIyNzM1LCJleHAiOjE3NDc4MDkxMzV9.R4Y2J59nBtljFqXheMmflj5Nnx0tK7igJFgIgzUujmw