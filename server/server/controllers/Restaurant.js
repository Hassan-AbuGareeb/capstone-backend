const mongoose = require("mongoose");
const Restaurant = require("../models/Restaurant");
const Item = require("../models/item");
const bcrypt = require("bcrypt");
const generateToken = require("../middleware/generateToken");
const signedInUsers = {};
const Location = require('../models/location')
const Category = require('../models/category')
const fs = require('fs');
const path = require('path');

async function schemaEnums(req, res) {
  try {
    const enums = {
      location: Location.schema.obj.location.enum,
      category: Category.schema.obj.category.enum
    };
    res.json(enums);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function restaurantSignUp(req, res) {
  const admin = req.body;
  const image = req.file;

  try {

    if (typeof admin.location === 'string') {
      admin.location = JSON.parse(admin.location);
    }
    if (typeof admin.category === 'string') {
      admin.category = JSON.parse(admin.category);
    }
    admin.image = image.filename

    if (!admin.location || admin.location.length === 0) {
      return res.status(400).json({ error: 'Location is required.' });
    } else if (!admin.category || admin.category.length === 0) {
      return res.status(400).json({ error: 'Category is required.' });
    } else {

    const signUp = await Restaurant.create(admin);

    const hashIt = await bcrypt.hash(admin.password, 10);
    signUp.password = hashIt;
    await signUp.save();

    if (image) {
      const destinationDirectory = path.join(__dirname, '../uploads');
      
      if (!fs.existsSync(destinationDirectory)) {
        fs.mkdirSync(destinationDirectory, { recursive: true });
    }
      const imagePath = path.join(destinationDirectory, image.filename);
      fs.copyFileSync(image.path, imagePath); //to manually copy the file to destination
      console.log(imagePath);
  }
  }
    return res.status(201).json({ message: "Restaurant Created Successfully!", signUp });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(error => error.message);
      return res.status(422).json({ errors });
    } else {
      console.error(err);
      return res.status(422).json({ error: err.message })
  }
}
}

async function restaurantSignIn(req, res) {
  const { email, password } = req.body;
  try {
    if (signedInUsers[email]) {
      return res.status(422).json({ message: "You are already signed in!" });
    }

    const admin = await Restaurant.findOne({ email });
    if (!admin) {
      return res.status(422).json({ message: "Wrong email or password" });
    }
    const matchPassword = await bcrypt.compare(password, admin.password);
    if (!matchPassword) {
      return res.status(422).json({ message: "Wrong email or password" });
    }
    const token = await generateToken(admin);
    signedInUsers[email] = token;

    return res.status(200).json({ message: "Signed in successfully!", admin, token });
  } catch (err) {
    return res.status(422).json(err.message);
  }
}

async function restaurantSignOut(req, res) {
  try {
    const email = req.headers.email;
    console.log(email)
    //to help with the testing
    // const token = req.user.userId
    // const header = req.headers.authorization
    // if (token !== header) {
    //   return res.status(401).json({ message: "Unauthorized access" });
    // }

    // if (!signedInUsers[email]) {
    //   return res.status(422).json({ message: "Already signed out" });
    // }

    delete signedInUsers[email];
    return res.status(200).json({ message: "Signed out successfully!" });
  } catch (err) {
    return res.status(422).json(err.message);
  }
}

//for testing purposes
async function getRestaurants(req, res) {
  try {
    const find = await Restaurant.find({});
    res.json(find);
  } catch (err) {
    res.json(err.message);
  }
}
//for testing purposes
const allItems = async (req, res) => {
  try {
    const items = await Item.find({})
    res.json(items)
  } catch (err) {
    res.json('nope')
  }
}
//for testing purposes
async function removeRestaurant(req, res) {
  const { id } = req.params;
  try {
    await Restaurant.findByIdAndDelete(id);
    return res.status(200).json("Restaurant Deleted Successfully!");
  } catch (err) {
    res.json(err.message)
  }
}

const restaurantMenu = async (req, res) => {
  try {
    //if no query provided, it will fetch all items
    const restaurantId = req.user.userId
    if (!restaurantId) {
      return res.status(403).json('Authentication Failed')
    }
    const menu = await Item.find({ restaurantId });
    if (menu.length === 0) {
      return res.status(404).json('Menu is empty. No items have been added yet')
    }

    //if a query provided, it will search for an item
    const { name, description, price, category } = req.query;

    const menuItems = menu.filter(item => {
      return (!name || item.name.match(new RegExp(name, 'i')))
      && (!description || item.description.match(new RegExp(description, 'i')))
      && (!category || item.category.includes(category))
      && (!price || parseFloat(item.price) === parseFloat(price));
    });

    if (menuItems.length === 0) {
      return res.status(404).json('No items found matching the query');
    }
    return res.status(200).json(menuItems)
  } catch (err) {
    return res.status(422).json(err.message);
  }
}

async function addItem(req, res) {
 
  const item = req.body;
  try {
        const restaurantId = req.user.userId;
        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
          return res.status(401).json({ message: "Authentication error" });
        }
  
        const existingItem = await Item.findOne({
          name: item.name,
          restaurantId: restaurantId,
        });
        if (existingItem) {
          return res.status(422).json({ message: "Item with the same name has already been created!" });
        }
  
        item.restaurantId = restaurantId;
  
        const newItem = await Item.create(item);
        restaurant.menu.push(newItem._id);
        await restaurant.save();
  
        return res
          .status(201)
          .json({ newItem, message: "Item added to your menu successfully!" });
  } catch (err) {
    res.status(422).json(err.message);
  }
}

async function updateMenuItem(req, res) {
  try {
    const restaurantId = req.user.userId
    if (!restaurantId) {
      return res.status(403).json('Authentication Error')
    }
    const { itemId } = req.params;
    if (!itemId || !mongoose.isValidObjectId(itemId)) { //handling an error caused by writing an incorrect itemId in params or leaving it empty
      return res.status(422).json('Valid Item ID required');
    }
    const restaurant = await Restaurant.findById(restaurantId)
    if (!restaurant.menu.includes(itemId)) {
      return res.status(403).json('Item not found');
    }    
    const item = await Item.findById(itemId)
    if (!item) {
      return res.status(404).json('Item not found')
    }

    const { name, description, price, category } = req.body;
    if (!name && !description && !price && !category) {
      return res.status(422).json('No changes requested to be updated');
    }
    originalItem = {
      name: item.name,
      description: item.description,
      price: parseFloat(item.price),
      category: item.category
    }
    if (req.body.name === originalItem.name) {
      return res.status(422).json('New item name matches the original item name')
    }
    if (req.body.description === originalItem.description) {
      return res.status(422).json('New item description matches the original item description')
    }
    if (parseFloat(req.body.price) === originalItem.name) {
      return res.status(422).json('New item price matches the original item price')
    }
    if (req.body.category === originalItem.category) {
      return res.status(422).json('New item category matches the original item category')
    }
    const updatedItem = await Item.findByIdAndUpdate(itemId, req.body, {new: true})
    res.status(200).json({message: 'Item updated successfully', updatedItem})
  } catch (err) {
    return res.status(422).json(err.message);
  }
}

async function removeMenuItem(req, res) {
  try {
    const restaurantId = req.user.userId
    if (!restaurantId) {
      return res.status(403).json('Authentication Error')
    }
    const { itemId } = req.params;
    if (!itemId || !mongoose.isValidObjectId(itemId)) { //handling an error caused by writing an incorrect itemId in params or leaving
      return res.status(422).json('Valid Item ID required');
    }
    const restaurant = await Restaurant.findOne(restaurantId)
    if (!restaurant.menu.includes(itemId)) {
      return res.status(403).json('Authentication Error');
    }

    const item = await Item.findById(itemId)
    if (!item) {
      return res.status(404).json('Item not found')
    }
    
    if (item.restaurantId.toString() !== restaurantId) {
      return res.status(404).json('Incorrect Item ID')
    }
    await Item.findByIdAndRemove(itemId);
    await Restaurant.findByIdAndRemove(itemId)
    res.status(200).json("Item removed successfully");
  } catch (err) {
    res.status(422).json(err.message);
  }
}

async function restaurantProfile(req, res) {
  try {
    const restaurantId = req.user.userId;
    if (!restaurantId) {
      return res.status(403).json('Authentication Error')
    }
    const profile = await Restaurant.findById(restaurantId);
    res.status(200).json(profile);
  } catch (err) {
    res.status(422).json(err.message);
  }
}

async function updateRestaurantProfile(req, res) {
  try {
    const restaurantId = req.user.userId;
    if (!restaurantId) {
      return res.status(403).json('Authentication Error')
    }

    const restaurant = await Restaurant.findById(restaurantId)
    const allowedCategories = ["Asian", "Bakery", "Beverages", "Breakfast", "Brunch", "Burgers", "Cafe", "Desserts", "Donuts", "Fast Food", "Grill", "Ice Cream", "Indian", "Italian", "Juices", "Middle Eastern", "Mexican", "Pastries", "Pizza", "Salads", "Sandwiches", "Seafood", "Smoothies", "Snacks", "Soups", "Traditional", "Vegan", "Vegetarian", "Wraps"]


    const { title, location, phoneNumber, category } = req.body
    if (!title && !location && !phoneNumber && !category) {
      return res.status(422).json('No changes requested to be updated');
    }
    if (req.body.category && req.body.category.some(category => !allowedCategories.includes(category))) {
      return res.status(422).json('Category is not allowed')
    }
    if (req.body.phoneNumber && req.body.phoneNumber.length !== 10) {
      return res.status(422).json('New phone number must be 10 digits')
    }
    originalRestaurant = {
      title: restaurant.title,
      location: restaurant.location,
      phoneNumber: restaurant.phoneNumber,
      category: restaurant.category,
    }
    if (req.body.title === originalRestaurant.title) {
      return res.status(422).json('New title matches the original title')
    }
    if (JSON.stringify(req.body.location) === JSON.stringify(originalRestaurant.location)) {
      return res.status(422).json('New location matches the original location')
    }
    if (req.body.phoneNumber === originalRestaurant.phoneNumber) {
      return res.status(422).json('New phone number matches the original phone number')
    }
    if (JSON.stringify(req.body.category) === JSON.stringify(originalRestaurant.category)) {
      return res.status(422).json('New category matches the original category')
    }
    const updatedProfile = await Restaurant.findByIdAndUpdate(restaurantId, req.body, { new: true });
    res.status(201).json({message :"Profile updated successfully", updatedProfile});

  }catch(err){
    res.status(422).json(err.message);
  }
}

module.exports = {
  schemaEnums,
  restaurantSignIn,
  restaurantSignUp,
  restaurantSignOut,
  removeRestaurant,
  getRestaurants,
  restaurantMenu,
  allItems,
  addItem,
  updateMenuItem,
  removeMenuItem,
  restaurantProfile,
  updateRestaurantProfile,
};
