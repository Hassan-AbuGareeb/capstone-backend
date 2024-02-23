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

async function signin(req, res) {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const customer = customerModel.findOne({ email, hashedPassword });
    if (!customer) throw new Error("wrong username or password");
    const token = jwt.sign({ userId: customer._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json(token);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
}

module.exports = { signup, getUsers, signin };
