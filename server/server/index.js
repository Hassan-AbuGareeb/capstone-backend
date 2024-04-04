const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const restaurantRouter = require("./routes/Restaurant");
const customerRouter = require("./routes/customer");
const PORT = process.env.PORT || 3003;

require("dotenv").config();

const connectToMongo = require("./db/connection");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/customer", customerRouter);
app.use("/restaurants", restaurantRouter);

app.listen(PORT,"0.0.0.0", () => {
  console.log(`Server listening on port ${PORT}`);
  connectToMongo();
});


module.exports = app;
