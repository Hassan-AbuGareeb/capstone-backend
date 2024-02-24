const moongose = require("mongoose");
const customerModel = require("../models/customer");
const itemModel = require("../models/item");
const tokenBlackListModel = require("../models/tokenBlackList");
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

async function signin(req, res) {
  const { email, password } = req.body;
  try {
    //find the customer in the database
    const customer = await customerModel.findOne({ email });
    // console.log(customer);
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

module.exports = { signup, getUsers, signin, signout };
