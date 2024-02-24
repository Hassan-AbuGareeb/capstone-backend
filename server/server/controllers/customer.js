const moongose = require("mongoose");
const customerModel = require("../models/customer");
const itemModel = require("../models/item");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Basket = require("../models/basket");

async function signup(req, res) {
  const { password, password2 } = req.body;
  try {
    if (password !== password2) throw new Error("passwords doesn't match");
    const hashedPassword = await bcrypt.hash(password, 10);
    //remove the password confirmation from the request body
    delete req.body.password2;
    //replace the password with hashed password
    req.body.password = hashedPassword;
    const newCustomer = await customerModel.create(req.body);
    const token = jwt.sign(
      { userId: newCustomer._id },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.status(201).json({ token });
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
}
//for testing purposes
async function getUsers(req, res) {
  const users = await customerModel.find({});
  res.json(users);
}

//get basket
async function getBasket(req, res) {
  const customerId = req.user.id; 
  try {
    // Retrieve the customer's basket
    const basket = await Basket.findOne({ customerId }).populate("itemId.itemId");

    if (!basket) {
      return res.status(404).json({ message: "Basket not found" });
    }

    res.status(200).json({ message: "Basket retrieved successfully", basket });
  } catch (error) {
    console.error("Error retrieving basket:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
//add Item
async function addItem(req, res) {
  const { itemId, quantity } = req.body;
  const customerId = req.user.id; 
  try {
    let basket = await Basket.findOne({ customerId });
    if (!basket) {
      basket = new Basket({ customerId });
    }
    basket.itemId.push({ itemId, quantity });
    await basket.save();
    
    res.status(200).json({ message: "Item added to basket successfully", basket });
  } catch (error) {
    console.error("Error adding item to basket:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
//update item
async function updateItem(req, res) {
  const { itemId, quantity } = req.body;
  const customerId = req.user.id; 
  try {
    let basket = await Basket.findOne({ customerId });

    const itemIndex = basket.itemId.findIndex(id => id.toString() === itemId);

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in basket" });
    }
    basket.itemId[itemIndex].quantity = quantity;
    await basket.save();
    res.status(200).json({ message: "Item quantity updated successfully", basket });
  } catch (error) {
    console.error("Error updating item quantity:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

//delete item
async function deleteItem(req, res) {
  const { itemId } = req.params;
  const customerId = req.user.id; 
  try {
    let basket = await Basket.findOne({ customerId });
    const itemIndex = basket.itemId.findIndex(item => item.itemId.toString() === itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in basket" });
    }
    basket.itemId.splice(itemIndex, 1);
    await basket.save();

    res.status(200).json({ message: "Item deleted from basket successfully", basket });
  } catch (error) {
    console.error("Error deleting item from basket:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


module.exports = { signup, getUsers , getBasket, addItem, updateItem, deleteItem};
