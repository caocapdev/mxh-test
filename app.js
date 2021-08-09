//import express
const express = require("express");
const path = require("path");
const UserRoutes = require("./routes/UserRoutes.js");
const PostRoutes = require("./routes/PostRoutes.js");
const cookieParser = require("cookie-parser");
const checklogin = require("./checklogin.js");

//tạo app
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.set("view engine", "ejs");

//express.static
app.use("/public", express.static(path.join(__dirname, "./public")));

app.use(UserRoutes);
app.use(PostRoutes);

app.get("/home", checklogin, function (req, res) {
  let data = ["vjp", "ảo", "thật", "đấy", "trùm"];
  res.render("pages/home", { username: req.username });
});

// app.get("/home", function (req, res) {
//   res.sendFile(path.join(__dirname, "./index.html"));
// });

// app.get("/css", function (req, res) {
//   res.sendFile(path.join(__dirname, "./style.css"));
// });

// app.get("/script", function (req, res) {
//   res.sendFile(path.join(__dirname, "./script.js"));
// });

//tạo port
app.listen(3000);
