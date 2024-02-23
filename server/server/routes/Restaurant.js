const express = require("express");
const router = express.Router();

const restaurantController = require("../controllers/Restaurant");

router.post('/signup', restaurantController.restaurantSignUp);
router.post('/signin', restaurantController.restaurantSignIn);
router.post('/signout', restaurantController.restaurantSignOut);
router.delete('/:id', restaurantController.removeRestaurant);
router.get('/', restaurantController.getRestaurants)
router.post('/:id', restaurantController.addItem);
router.get("/search", restaurantController.searchRestaurantItems);
router.put('/updateitem', restaurantController.updateMenuItem);
// router.delete('/removeItem/:itemId', restaurantController.removeMenuItem);

// router.get('/restaurantInfo/:restaurantId', restaurantController.getRestaurantInfo);
// router.put('/restaurantInfo/update/:restaurantId', restaurantController.updateRestaurantInfo);

module.exports = router;
