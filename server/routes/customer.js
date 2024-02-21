const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const customerController = require("../controllers/customer");

// router.get("/profile", customerController.getProfile);
// router.put("/profile", customerController.updateProfile);
// router.get("/basket",customerController.getCart);
// router.put("/basket",customerController.updateCart);
// router.delete("/basket",customerController.deleteCart);
// router.post("/checkout",customerController.checkout)
// router.post("/cancelOrder", customerController.cancelOrder);
module.exports = router;
