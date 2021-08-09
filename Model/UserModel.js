const mongoose = require("./connect");

const UserSchema = mongoose.Schema(
  {
    username: String,
    password: String,
    role: {
      default: "user",
      type: String,
    },
  },
  { collection: "user" }
);

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;

// UserModel.create({
//   username: "nam",
//   password: "123",
// })
//   .then(function (data) {
//     console.log(data);
//   })
//   .catch(function (err) {
//     console.log(err);
//   });
