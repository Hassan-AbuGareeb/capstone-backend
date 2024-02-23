const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const restaurantRouter = require("./routes/Restaurant");
const customerRouter = require("./routes/customer");

require("dotenv").config();

const connectToMongo = require("./db/connection");

const app = express();
const port =
  process.env.NODE_ENV === "test"
    ? process.env.NODE_LOCAL_TEST_PORT
    : process.env.NODE_LOCAL_PORT;

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/customer", customerRouter);
app.use("/restaurants", restaurantRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  connectToMongo();
});

app.get("/test", (req, res) => {
  res.json(
    "Server connection to client works!!  Good Luck with your capstones :D"
  );
});

module.exports = app;
