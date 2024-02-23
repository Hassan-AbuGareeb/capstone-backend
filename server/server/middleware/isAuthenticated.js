const jwt = require("jsonwebtoken");
const tokenBlackListModel = require("../models/tokenBlackList");
const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  //request doesn't contain a token
  if (!token) {
    return res.status(403).end();
  } else {
    //user has a token
    jwt.verify(token, process.env.SECRET_KEY, async (err, user) => {
      try {
        if (err) {
          res.status(403).end();
        } else {
          const isBlackListed = await tokenBlackListModel.findOne(
            { token: token },
            {}
          );
          if (isBlackListed) {
            res.status(403).end();
          } else {
            req.user = user;
            next();
          }
        }
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });
  }
};

module.exports = isAuthenticated;
