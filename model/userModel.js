const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please add a name"],
      min: 6,
      max: 500,
    },
    email: {
      type: String,
      require: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      require: [true, "Please add a password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", UserSchema);
