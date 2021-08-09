const express = require("express");
const PostModel = require("../Model/PostModel.js");
const UserModel = require("../Model/UserModel.js");
const checklogin = require("../checklogin.js");
const router = express.Router();
const path = require("path");

router.get("/post/new", checklogin, (req, res) => {
  res.sendFile(path.join(__dirname, "../public/html/post/newpost.html"));
});

router.get("/post/view", checklogin, (req, res) => {
  res.sendFile(path.join(__dirname, "../public/html/post/view.html"));
});

router.post("/post/new", checklogin, (req, res) => {
  let PostTitle = req.body.title;
  let PostContent = req.body.content;
  UserModel.findOne({ token: req.cookies.token }).then((data) => {
    let author = data._id;
    PostModel.create({
      title: PostTitle,
      content: PostContent,
      author: author,
      date: new Date().getTime(),
    })
      .then((data) => {
        res.json({
          mess: "tao bai viet thanh cong",
          data,
          status: 200,
        });
      })
      .catch((err) => {
        res.json({
          mess: "loi server",
          err,
          status: 500,
        });
      });
  });
});

router.post("/post/view", checklogin, (req, res) => {
  let skip = (req.query.page - 1) * req.query.view;
  let limit = req.query.view * 1;
  let sort = req.query.sort;
  PostModel.find()
    .sort({ date: sort })
    .skip(skip)
    .limit(limit)
    .then((data) => {
      console.log(data);
      res.json({
        mess: "lay post thanh cong",
        data: { data: data, role: req.role },
        status: 200,
      });
    })
    .catch((err) => {
      res.json({
        mess: "loi server",
        err,
        status: 500,
      });
    });
});

router.delete("/post/delete", checklogin, (req, res) => {
  if (req.role == "admin") {
    PostModel.deleteOne({ _id: req.body.id })
      .then((data) => {
        if (data) {
          res.json({
            mess: "xoa post thanh cong",
            data,
            status: 200,
          });
        } else {
          res.json({
            mess: "khong tim thay post",
            data,
            status: 400,
          });
        }
      })
      .catch((err) => {
        res.json({
          mess: "loi server",
          err,
          status: 500,
        });
      });
  } else {
    res.json({
      mess: "ban khong phai la admin",
      status: 400,
    });
  }
});
module.exports = router;
