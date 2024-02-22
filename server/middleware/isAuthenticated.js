const jwt = require("jsonwebtoken");
const tokenBlackListModel = require("../models/tokenBlackList");
const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  //request doesn't contain a token
  if (!token) {
    const allowedEndpoints = ["items", "search", "viewiteminfo ", "filter"];
    const isUserAllowed = false;
    for (let i = 0; i < allowedEndpoints.length; i++)
      if (req.url.toLowerCase().includes(element)) {
        isUserAllowed = true;
        break;
      }
    if (isUserAllowed) {
      next();
    } else {
      return res.status(403).end();
    }
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

// const tokenBlackListModel = require("../models/tokensBlackList");
// module.exports = (req, res, next) => {
//   redirect = "/customer/signin";
//   const token = req.headers.authorization?.split(" ")[1];
//   //user doesn't have token, redirect to log in screen if request is get
//   if (!token) {
//     if (!req.url.split("/").includes("checkout")) res.redirect(redirect);
//     //if request not get show forbidden
//     else return res.status(403).end();
//   } else {
//     //user has a token
//     jwt.verify(token, process.env.SECRET_KEY, async (err, user) => {
//       if (err) {
//         //if the token expired or any other error do this
//         if (req.method === "GET") res.redirect(redirect);
//         else res.status(403).end();
//       } else {
//         //token is valid (not expired yet)
//         const isTokenBlackListed = await tokenBlackListModel.findOne({
//           token: token,
//         });
//         if (!!isTokenBlackListed) {
//           res.status(403).end();
//         }
//         req.user = user;
//         next();
//       }
//     });
//   }
// };

module.exports = isAuthenticated;
