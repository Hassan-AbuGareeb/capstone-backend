const moongose = require("mongoose");
const customerModel = require("../models/customer");
const itemModel = require("../models/item");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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

//get cart
async function getCart(req, res) {
  try {
    const customerId = req.user.userId;
    const customer = await customerModel
      .findById(customerId)
      .populate("basket.items");
    res.status(200).json({
      message: "Basket retrieved successfully",
      basket: customer.basket,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while retrieving the basket" });
  }
}
//add item to cart
async function addItem(req, res) {
  try {
    const customerId = req.user.userId; // Corrected typo: changed '.user' to 'req.user'
    const { id } = req.params;
    const { quantity } = req.body;

    const customer = await customerModel
      .findById(customerId)
      .populate("basket.items"); // Corrected typo: changed 'Model' to 'customerModel'
    const item = await itemModel.findById(id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    const itemIndex = customer.basket.items.findIndex(
      (item) => item.itemId.toString() === id
    ); // Corrected typo: changed 'itemId' to 'item'

    if (itemIndex === -1) {
      customer.basket.items.push({ itemId: id, quantity });
    } else {
      customer.basket.items[itemIndex].quantity += quantity;
    }
    customer.basket.quantity += quantity;
    await customer.save();

    res.status(200).json({
      message: "Item added to cart successfully",
      cart: customer.basket,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while adding the item to the cart" });
  }
}

//update item quantity in cart
async function updateCart(req, res) {
  try {
    const customerId = req.user.userId;
    const { id, quantity } = req.body;
    const customer = await customerModel
      .findById(customerId)
      .populate("basket.items");
    const item = customer.basket.items.find(
      (item) => item.itemId.toString() === id
    );
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    const itemIndex = customer.basket.items.findIndex(
      (itemId) => itemId.itemId.toString() === id
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    customer.basket.items[itemIndex].quantity = quantity;

    await customer.save();

    res.status(200).json({
      message: "Item quantity updated in cart successfully",
      cart: customer.basket,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while updating the item quantity in the cart",
    });
  }
}
//delete cart
async function deleteCart(req, res) {
  const userId = req.user.userId;
  try {
    const customer = await customerModel.findById(userId);
    const basket = customer.basket;
    if (!basket) {
      return res.status(404).json({ message: "Cart not found" });
    }

    basket.items = [];
    basket.notes = "";
    basket.quantity = 0;
    customer.basket = basket;
    await customer.save();
    res
      .status(200)
      .json({ message: "All items deleted from cart successfully", customer });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  signup,
  getUsers,
  getCart,
  addItem,
  updateCart,
  deleteCart,
};
