const express = require("express");
const router = express.Router();
const verifyToken = require('../middleware/validateToken')

const restaurantController = require("../controllers/Restaurant");

router.post('/signup', restaurantController.restaurantSignUp);
router.post('/signin', restaurantController.restaurantSignIn);
router.post('/signout', verifyToken, restaurantController.restaurantSignOut);
router.delete('/:id', restaurantController.removeRestaurant); //تستنج
router.get('/', restaurantController.getRestaurants) //وهاظ
router.post('/', verifyToken, restaurantController.addItem);
router.get('/get', restaurantController.allItems) //تستنج ما عليك
router.get('/menu', verifyToken, restaurantController.restaurantMenu)
router.put('/menu/:itemId', verifyToken, restaurantController.updateMenuItem);
router.delete('/menu/:itemId', verifyToken, restaurantController.removeMenuItem);
// router.get('/profile', restaurantController.getRestaurantInfo);
// router.put('/profile/update', restaurantController.updateRestaurantInfo);

module.exports = router;
