const express = require("express");
const UserModel = require("../Model/UserModel.js");
const checklogin = require("../checklogin.js");
const router = express.Router();
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.get("/user/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/html/user/signup.html"));
});

router.get("/user/signin", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/html/user/signin.html"));
});

router.get("/user/view", checklogin, (req, res) => {
  res.sendFile(path.join(__dirname, "../public/html/user/view.html"));
});

router.get("/user/changepass", checklogin, (req, res) => {
  res.sendFile(path.join(__dirname, "../public/html/user/changepass.html"));
});

router.get("/user/:_id/", async (req, res) => {
  try {
    let data = await UserModel.find(req.params);
    res.json(data[0].username);
  } catch (err) {
    res.json({
      mess: "loi server",
      err,
      status: 500,
    });
  }
});

router.post("/user/checklogin", checklogin, async (req, res) => {
  try {
    let data = await UserModel.find({
      username: jwt.verify(token, "pass").username,
      password: jwt.verify(token, "pass").password,
    });
    console.log(data);
    if (data) {
      res.json({
        mess: "da dang nhap",
        status: 200,
      });
    } else {
      res.json({
        mess: "chua dang nhap",
        status: 400,
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      mess: "loi server",
      err,
      status: 500,
    });
  }
});
router.post("/user/signup", async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    let data = await UserModel.findOne({ username: req.body.username });
    console.log(data);
    if (data) {
      res.json({
        mess: "username da duoc su dung",
        data,
        status: 400,
      });
    } else {
      let data = await UserModel.create(req.body);
      res.json({
        mess: "dang ki thanh cong",
        data,
        status: 200,
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      mess: "loi server",
      err,
      status: 500,
    });
  }
});

router.post("/user/signin", async (req, res) => {
  try {
    let data = await UserModel.findOne({
      username: req.body.username,
    });
    if (data) {
      let compare = await bcrypt.compare(req.body.password, data.password);
      if (compare) {
        let token = jwt.sign({ username: req.body.username }, "pass");
        res.json({
          mess: "Dang nhap thanh cong",
          data: token,
          status: 200,
        });
      } else {
        res.json({
          mess: "sai username hoac password",
          status: 400,
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.json({
      mess: "loi server",
      err,
      status: 500,
    });
  }
});

router.post("/user/signout", async (req, res) => {
  try {
    let token = req.cookies.token;
    let data = await UserModel.updateOne(
      { token: token },
      { $pull: { token: token } }
    );
    res.json({
      mess: "dang xuat thanh cong",
      data,
      status: 200,
    });
  } catch (err) {
    console.log(err);
    res.json({
      mess: "loi server",
      err,
      status: 500,
    });
  }
});

router.post("/view", checklogin, async (req, res) => {
  try {
    let skip = (req.query.page - 1) * req.query.view;
    let limit = req.query.view * 1;
    let data = await UserModel.find().skip(skip).limit(limit);
    res.json({
      mess: "lay data thanh cong",
      data: { data: data, role: req.role },
      status: 200,
    });
  } catch (err) {
    console.log(err);
    res.json({
      mess: "loi server",
      err,
      status: 500,
    });
  }
});

router.post("/changepass", async (req, res) => {
  try {
    let data = await UserModel.findOne({
      username: req.body.username,
    });
    let compare = await bcrypt.compare(req.body.oldpassword, data.password);
    if (compare) {
      req.body.newpassword = await bcrypt.hash(req.body.newpassword, 10);
      data = await UserModel.updateOne(
        {
          username: req.body.username,
        },
        {
          password: req.body.newpassword,
        }
      );
      if (data.nModified == 0) {
        res.json({
          mess: "password moi giong password cu",
          data,
          status: 400,
        });
      } else {
        let token = req.cookies.token;
        let data = await UserModel.updateOne({ token: token }, { token: [] });
        res.json({
          mess: "doi password va dang xuat tat ca thiet bi thanh cong",
          data,
          status: 200,
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.json({
      mess: "loi server",
      err,
      status: 500,
    });
  }
});

router.delete("/delete", checklogin, async (req, res) => {
  try {
    if (req.role == "admin") {
      let data = await UserModel.deleteOne({ _id: req.body.id });
      if (data) {
        res.json({
          mess: "xoa user thanh cong",
          data,
          status: 200,
        });
      } else {
        res.json({
          mess: "khong tim thay user",
          data,
          status: 400,
        });
      }
    } else {
      res.json({
        mess: "ban khong phai la admin",
        status: 400,
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      mess: "loi server",
      err,
      status: 500,
    });
  }
});

module.exports = router;
