const UserModel = require("./Model/UserModel.js");
const jwt = require("jsonwebtoken");
async function checklogin(req, res, next) {
  try {
    let token = req.cookies.token;
    console.log(jwt.verify(token, "pass"));
    let data = await UserModel.find({
      username: jwt.verify(token, "pass").username,
    });
    if (data) {
      req.role = data[0].role;
      req.username = data[0].username;
      next();
    } else {
      res.redirect("/user/signin");
    }
  } catch (err) {
    if (err.name == "JsonWebTokenError") {
      res.redirect("/user/signin");
    } else {
      res.json({
        mess: "loi server",
        err,
        status: 500,
      });
    }
  }
}

module.exports = checklogin;
