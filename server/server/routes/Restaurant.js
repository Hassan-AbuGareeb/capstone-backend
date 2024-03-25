const express = require("express");
const router = express.Router();
const verifyToken = require('../middleware/validateToken')
const upload = require('../middleware/upload')
const uploadItem = require('../middleware/uploadItem')
const restaurantController = require("../controllers/Restaurant");

router.get('/itemimages/:filename', restaurantController.getItemImages)
router.get('/images/:filename', restaurantController.getImages)
router.get('/enums', restaurantController.schemaEnums)
router.post('/signup', upload.single('image'), restaurantController.restaurantSignUp);
router.post('/signin', restaurantController.restaurantSignIn);
router.post('/signout', restaurantController.restaurantSignOut);
router.delete('/:id', restaurantController.removeRestaurant);
router.get('/', restaurantController.getRestaurants)
router.post('/menu/additem', verifyToken, uploadItem.single('image'), restaurantController.addItem);
router.get('/get', restaurantController.allItems)
router.get('/menu', verifyToken, restaurantController.restaurantMenu)
router.put('/menu/:itemId', verifyToken, restaurantController.updateMenuItem);
router.delete('/menu/:itemId', verifyToken, restaurantController.removeMenuItem);
router.get('/profile', verifyToken, restaurantController.restaurantProfile);
router.put('/profile', verifyToken, restaurantController.updateRestaurantProfile);

module.exports = router;
