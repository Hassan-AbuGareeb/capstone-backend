const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const customerController = require("../controllers/customer");
const item = require("../models/item");

router.post("/signup", customerController.signup);
router.get("/getall", customerController.getUsers);
router.post("/signin", customerController.signin);
router.post("/signout", isAuthenticated, customerController.signout);
router.get("/items", customerController.viewAllItems);
router.get("/search", customerController.searchItems);
router.get("/profile", isAuthenticated,customerController.getProfile);
router.put("/profile", isAuthenticated, customerController.updateProfile);
router.get("/basket", isAuthenticated, customerController.getCart);
router.post("/basket/:id", isAuthenticated, customerController.addItem);
router.put("/basket/:id", isAuthenticated, customerController.updateCart);
router.delete("/basket", isAuthenticated, customerController.deleteCart);
router.post("/checkout", isAuthenticated, customerController.checkout);
router.post("/cancelOrder", customerController.cancelOrder);
router.post("/checkout", isAuthenticated, customerController.checkout);
router.post("/cancelOrder", isAuthenticated, customerController.cancelOrder);
router.get("/checktoken", isAuthenticated, customerController.checkToken);
router.get("/restaurant/:restaurantId",customerController.getRestaurantData);

module.exports = router;
