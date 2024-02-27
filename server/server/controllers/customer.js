const moongose = require("mongoose");
const customerModel = require("../models/customer");
const itemModel = require("../models/item");
const tokenBlackListModel = require("../models/tokenBlackList");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Item = require("../models/item");

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

async function signin(req, res) {
  const { email, password } = req.body;
  try {
    //find the customer in the database
    const customer = await customerModel.findOne({ email });
    if (!customer) throw new Error("wrong username or password");
    //check if the entered password equals the stored password
    const isPasswordCorrect = await bcrypt.compare(password, customer.password);
    if (!isPasswordCorrect) throw new Error("wrong username or password");
    //log in successful, create and send the jwt
    const token = jwt.sign({ userId: customer._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json(token);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
}

async function signout(req, res) {
  try {
    await tokenBlackListModel.create({ token: req.headers.authorization });
    //should redirect the user to home page, will be changed during front end development
    res.status(200).json({ message: "signed out sucessfully" });
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
    const customer = await customerModel.findById(customerId);
    // .populate("basket.items"); // Corrected typo: changed 'Model' to 'customerModel'
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
//search items by name
async function searchItems(req, res) {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ message: "Please provide a name to search for" });
    }


    const items = await itemModel.find({ name: { $regex: name, $options: "i" } });

    if (!items.length) {
      return res.status(404).json({ message: "No items found with the provided name" });
    }

    res.status(200).json({ message: "Items found successfully", items });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while searching for items" });
  }
}


async function checkout(req, res) {
  const customerId = req.user.userId;
  try {
    //get the customer and fill the basket with the items data
    const customer = await customerModel
      .findById(customerId)
      .populate("basket.items.itemId");
    const basketItems = customer.basket.items;
    if (basketItems.length < 1) {
      //should redirect the user to home page, to be changed in front end
      return res.status(301).json({ message: "basket is empty!" });
    }
    //create the order object and fill it with data from the basket
    const order = {};
    order.restaurantId = basketItems[0].itemId.restaurantId;
    order.items = [...basketItems];
    order.status = "Pending";
    let totalBill = 0;
    //calculating the total bill
    for (let i = 0; i < order.items.length; i++) {
      let currentItem = order.items[i];
      totalBill +=
        parseFloat(currentItem.itemId.price.toString()) * currentItem.quantity; //converting from the decimal128 type to javascript number type
    }
    order.totalBill = totalBill;
    //add order to the customer orders
    customer.orders.push(order);
    //empty the customer basket
    const basket = customer.basket;
    basket.items = [];
    basket.notes = "";
    basket.quantity = 0;
    customer.basket = basket;
    await customer.save();
    res.status(201).json({ message: "order is pending!", order });
  } catch (err) {
    res.status(422).json({ message: err.message });

async function cancelOrder(req, res) {
  const customerId = req.user.userId;
  const orderId = req.body.orderId;
  try {
    const customer = await customerModel.findById(customerId);
    const order = customer.orders.find(
      (order) => order._id.toString() === orderId
    );
    if (!order) {
      return res.status(422).json({ message: "order not found" });
    }

    if (order.status === "Canceled")
      return res.status(302).json({ message: "order is already canceled" });
    else if (order.status !== "Pending")
      return res.status(302).json({ message: "order can't be canceled" });

    //calculate the time passed from the moment the order was placed
    const currentTime = new Date().toString().split(" ")[4];
    const orderTime = order.creationDate.toString().split(" ")[4];
    const currentMinutes = Number(currentTime.split(":")[1]);
    const orderMinutes = Number(orderTime.split(":")[1]);
    let canCancel = false;
    if (
      //check if the duration between the order and the cancellation is less than three minutes
      currentMinutes - orderMinutes >= 0 &&
      currentMinutes - orderMinutes <= 3
    ) {
      canCancel = true;
      //handles the case of the cancellation of the order being in the next hour after ordering but within 3 minutes limit
    } else if (currentMinutes - orderMinutes < 0) {
      canCancel = 60 - orderMinutes + currentMinutes + 1 <= 3;
    }
    if (canCancel) {
      const orderIndex = customer.orders.findIndex(
        (order) => order._id.toString() === orderId
      );
      customer.orders[orderIndex].status = "Canceled";
      await customer.save();
      return res.status(200).json({ message: "order canceled successfully" });
    }
    res.json({
      message: "order can't be canceled after three minutes has passed",
    });
  } catch (err) {
    res.status(422).json({ message: err.message });

async function viewAllItems(req, res) {
  try {
    const allItems = await Item.find({});
    res.json(allItems);
  } catch (err) {
    res.json(err.message);

  }
}

module.exports = {
  signup,
  signin,
  signout,
  getUsers,
  getCart,
  addItem,
  searchItems,
  updateCart,
  deleteCart,
  checkout,
  cancelOrder,
  viewAllItems
};
