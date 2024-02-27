const express = require("express");
const router = express.Router();

const restaurantController = require("../controllers/Restaurant");

router.post('/signup', restaurantController.restaurantSignUp);
router.post('/signin', restaurantController.restaurantSignIn);
router.post('/signout', restaurantController.restaurantSignOut);
router.delete('/:id', restaurantController.removeRestaurant);
router.get('/', restaurantController.getRestaurants)
router.post('/', restaurantController.addItem);
router.get("/search", restaurantController.searchRestaurantItems);
router.put('/updateitem', restaurantController.updateMenuItem);
// router.delete('/removeItem/:itemId', restaurantController.removeMenuItem);

router.get('/profile', restaurantController.getRestaurantInfo);
router.put('/profile/update', restaurantController.updateRestaurantInfo);

module.exports = router;
