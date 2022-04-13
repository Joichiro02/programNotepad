require("dotenv").config();
const {
  registerValidation,
  loginValidation,
} = require("../validation/validation");
const User = require("../model/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

// REGISTER USER
const register = asyncHandler(async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(400).send("This email is already registered");
  }

  const salt = bcrypt.genSaltSync(12);
  const hashPassword = bcrypt.hashSync(password, salt);

  const user = await User({
    name,
    email,
    password: hashPassword,
  });
  user.save();

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: genereteToken(user._id),
    });
  }
});

// LOGIN USER
const login = asyncHandler(async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send("Invalid Email");
  }

  const hashedPassword = bcrypt.compareSync(password, user.password);

  if (hashedPassword) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: genereteToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Wrong Password");
  }
});

// GETTING INFO
const getMe = asyncHandler(async (req, res) => {
  const { _id, name, email, password } = req.user;
  res.status(200).json({
    _id,
    name,
    email,
    password,
  });
});

// GENERATE TOKEN
const genereteToken = (id) => {
  return JWT.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = {
  register,
  login,
  getMe,
};
