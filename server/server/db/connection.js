const mongoose = require("mongoose");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, TEST_DB_HOST } =
  process.env;

const DB_URI = `mongodb+srv://shwarzar:mongo321@cluster420.x5njca5.mongodb.net/`

const url = DB_URI;

const connectToMongo = () => {
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

  db = mongoose.connection;

  db.once("open", () => {
    console.log("Database connected: ", url);
  });

  db.on("error", (err) => {
    console.error("Database connection error: ", err);
  });
};

module.exports = connectToMongo;
