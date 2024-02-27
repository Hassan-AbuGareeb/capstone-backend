const moongose = require("mongoose");
const Restaurant = require("../models/Restaurant");
const Item = require("../models/item");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../middleware/validateToken");
const signedInUsers = {};

async function restaurantSignUp(req, res) {
  const admin = req.body;

  try {
    const signUp = await Restaurant.create(admin);

    const hashIt = await bcrypt.hash(admin.password, 10);
    signUp.password = hashIt;
    await signUp.save();

    return res
      .status(201)
      .json({ message: "Restaurant Created Successfuly!", signUp });
  } catch (err) {
    return res.status(422).json(err.message);
  }
}

async function restaurantSignIn(req, res) {
  const { email, password } = req.body;
  try {
    if (signedInUsers[email]) {
      res.status(422).json({ message: "You are already signed in!" });
      return;
    }

    const admin = await Restaurant.findOne({ email });
    const matchPassword = await bcrypt.compare(password, admin.password);

    if (!admin || !matchPassword) {
      return res.status(422).json({ message: "Wrong email or password" });
    }
    const token = await generateToken(admin);
    signedInUsers[email] = token;

    return res
      .status(200)
      .json({ message: "Signed in successfully!", admin, token });
  } catch (err) {
    res.status(422).json(err.message);
  }
}

async function restaurantSignOut(req, res) {
  const token = req.headers.authorization;
  try {
    const extractedToken = jwt.verify(token, process.env.JWT_SECRET);
    const email = extractedToken.email;

    if (!signedInUsers[email]) {
      res.status(422).json({ message: "Already signed out" });
      return;
    }

    delete signedInUsers[email];
    return res.status(200).json({ message: "Signed out successfully!" });
  } catch (err) {
    res.status(422).json(err.message);
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

async function removeRestaurant(req, res) {
  const { id } = req.params;
  try {
    await Restaurant.findByIdAndDelete(id);
    return res.status(204).json("Restaurant Deleted Successfully!");
  } catch (err) {}
}

const searchRestaurantItems = async (req, res) => {
  try {
    const search = req.query;

    let query = {};
    if (search.name) {
      query.name = { $regex: new RegExp(search.name, "i") };
    }
    if (search.description) {
      query.description = { $regex: new RegExp(search.description, "i") };
    }
    if (search.category) {
      query.category = Array.isArray(searchParams.category)
        ? { $in: searchParams.category }
        : searchParams.category;
    }
    const searchResults = await Item.find(query);
    return res
      .status(200)
      .json({ message: "Search Results", items: searchResults });
  } catch (err) {
    res
      .status(422)
      .json({ message: "Error searching for items", error: err.message });
  }
};

async function addItem(req, res) {
  const token = req.headers.authorization;
  const item = req.body;
  try {
    const extractedToken = jwt.verify(token, process.env.JWT_SECRET);
    const restaurantId = extractedToken.userId;
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(401).json({ message: "Authentication error" });
    }

    const existingItem = await Item.findOne({
      name: item.name,
      restaurantId: restaurantId,
    });
    if (existingItem) {
      return res
        .status(422)
        .json({ message: "Item with the same name has already been created!" });
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
  const token = req.headers.authorization;
  const item = req.body;
  try {
    const extractedToken = jwt.verify(token, process.env.JWT_SECRET);
    const restaurantId = extractedToken.userId;

    const foundItem = await Item.findOne({
      restaurantId: restaurantId,
      name: item.name,
    });
    if (!foundItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    console.log(item.price);
    console.log(foundItem.price.toString());
    if (
      (item.name === foundItem.name ||
        item.description === foundItem.description,
      item.price.toString() === foundItem.price.toString())
    ) {
      return res.status(404).json({ message: "Nothing to change" });
    }

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(401).json({ message: "Authentication error" });
    }

    const updatedItem = await Item.findByIdAndUpdate(foundItem._id, item, {
      new: true,
    });
    return res
      .status(201)
      .json({ message: "Item updated successfully", updatedItem });
  } catch (err) {
    return res.status(422).json(err.message);
  }
}

async function removeMenuItem(req, res) {
  try {
    const { itemId } = req.params;
    await itemSchema.findByIdAndRemove(itemId);
    res.status(204).json("Item removed successfully");
  } catch (err) {
    res.status(422).json(err.message);
  }
}

async function getRestaurantInfo(req, res) {
  const token = req.headers.authorization;
  try {
    const extractedToken = jwt.verify(token, process.env.JWT_SECRET);
    const restaurantId = extractedToken.userId;
    const profile = await Restaurant.findById(restaurantId);
    res.status(200).json(profile);
  } catch (err) {
    res.status(422).json(err.message);
  }
}

async function updateRestaurantInfo(req, res) {
  const token = req.headers.authorization;
  try {
    const extractedToken = jwt.verify(token, process.env.JWT_SECRET);
    const restaurantId = extractedToken.userId;
    const updatedProfile = await Restaurant.findByIdAndUpdate(restaurantId, req.body, { new: true });
    res.status(201).json([updatedProfile, "Profile updated successfully"]);

  }catch(err){
    res.status(422).json(err.message);
  }
}

module.exports = {
  restaurantSignIn,
  restaurantSignUp,
  restaurantSignOut,
  removeRestaurant,
  getRestaurants,
  searchRestaurantItems,
  addItem,
  updateMenuItem,
  removeMenuItem,
  getRestaurantInfo,
  updateRestaurantInfo,
};
