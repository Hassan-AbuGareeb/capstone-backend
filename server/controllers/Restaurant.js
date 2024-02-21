const moongose = require("mongoose");
const restaurantSchema = require("../models/Restaurant");
// const itemSchema = require("../models/item");

//sign in
async function restaurantSignIn(req, res){

    // hashing password? + validation
    const { email, password } = req.body;
    try{
        const user = await restaurantSchema.findOne({email, password});
        res.status(200).json(user);
    }    
    catch(err){
        res.status(401).json('Wrong email or password');
    }
}

//sign up 
async function restaurantSignUp(req, res){
    try{
        const restaurantSignUp = await restaurantSchema.create(req.body);
        res.status(201).json([restaurantSignUp, 'User created successfuly']);
    }
    catch(err){
        res.status(422).json('Please enter all required fields')
    }
}

// add item
async function addMenuItem(req, res){

    try{
        const newItem = await itemSchema.create(req.body);
        res.status(201).json([newItem, 'Item added successfully']);
    }
    catch(err){
        res.staus(422).json(err.message)
    }
}

// update item
async function updateMenuItem(req, res){
    try{
        const {itemId} = req.params;
        const updatedItem = await itemSchema.getbyIdAndUpadate(itemId, req.body, {new: true});
        res.status(201).json({message: 'Item updated successfully', updatedItem});
    }
    catch(err){
        res.status(422).json(err.message);
    }
}

// remove item
async function removeMenuItem(req, res){
    try{
        const {itemId} = req.params;
        await itemSchema.findByIdAndRemove(itemId);
        res.status(204).json('Item removed successfully')
    }
    catch(err){
        res.status(422).json(err.message);
    }
}

// get rx info
async function getRestaurantInfo(req, res){
    try{
        const {rxId} = req.params;
        const restaurantInfo = await restaurantSchema.findbyId(rxId);
        res.status(200).json(restaurantInfo);
    }
    catch(err){
        res.status(422).json(err.message);
    }
}

// update rx info
async function updateRestaurantInfo(req, res){
    try{
        const {rxId} = req.params;
        const upadtedRestaurantInfo = await restaurantSchema.findByIdAndUpdate(req.body, rxId, {new: true});
        res.status(201).json([upadtedRestaurantInfo, 'Profile updated successfully']);
    }
    catch(err){
        res.status(422).json(err.message);
    }
}

module.exports = {
    restaurantSignIn,
    restaurantSignUp,
    addMenuItem,
    updateMenuItem,
    removeMenuItem,
    getRestaurantInfo,
    updateRestaurantInfo,
};