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
// router.post("/signout", customerController.signout);

// Items route - View all items
// router.get("/items", customerController.viewAllItems);

// Search route
// router.get("/search", customerController.searchItems);

// Filter route
// router.get("/filter", customerController.filterItems);

// router.get("/profile", customerController.getProfile);
// router.put("/profile", customerController.updateProfile);
// router.get("/basket",customerController.getCart);
// router.post("/basket/:id",customerController.addItem)
// router.put("/basket",customerController.updateCart);
// router.delete("/basket",customerController.deleteCart);
// router.post("/checkout",customerController.checkout)
// router.post("/cancelOrder", customerController.cancelOrder);
module.exports = router;
