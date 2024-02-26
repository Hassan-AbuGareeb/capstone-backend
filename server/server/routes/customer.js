const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const customerController = require("../controllers/customer");

// Signup route
router.post("/signup", customerController.signup);
//for testing purposes
router.get("/getall", customerController.getUsers);
// Signin route
router.post("/signin", customerController.signin);

// Signout route
router.post("/signout", isAuthenticated, customerController.signout);

// Items route - View all items
 router.get("/items", customerController.viewAllItems);

// Search route
// router.get("/search", customerController.searchItems);

// Filter route
// router.get("/filter", customerController.filterItems);

// router.get("/profile", customerController.getProfile);
// router.put("/profile", customerController.updateProfile);
router.get("/basket", isAuthenticated, customerController.getCart);
router.post("/basket/:id", isAuthenticated, customerController.addItem);
router.put("/basket/:id", isAuthenticated, customerController.updateCart);
router.delete("/basket", isAuthenticated, customerController.deleteCart);
// router.post("/checkout",customerController.checkout)
// router.post("/cancelOrder", customerController.cancelOrder);
module.exports = router;
