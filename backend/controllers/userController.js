const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const path = require("path");
const multer = require("multer");
require("dotenv").config();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads"); // Specify the upload directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, uniqueSuffix + extension);
  },
});

const upload = multer({ storage });

const User = require("../models/userModel");

// @desc Authenticate user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter all fields.");
  }

  // Check for user email
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = generateToken(user._id, user.admin, process.env.JWT_SECRET);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      account: user.account,
      balance: user.balance,
      admin: user.admin,
      image: user.image,
      token: token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user credentials");
  }
});

// @desc Get logged in user
// @route GET /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// @desc Create new user
// @route POST /api/users
// @access Public
const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, account } = req.body;

  if (!name || !email || !password || !account) {
    res.status(400);
    throw new Error("Please enter all fields.");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("That email is already in use. Please log in.");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    account,
  });

  if (user) {
    const token = generateToken(user._id, user.admin, process.env.JWT_SECRET);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      balance: user.balance,
      account: user.account,
      admin: user.admin,
      image: user.image,
      token: token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user credentials");
  }
});

// @desc Delete user
// @route DELETE /api/users/:id
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found. Please create an account.");
  }
  if (req.user.id !== user.id) {
    res.status(401);
    throw new Error("You are not authorized to delete this user.");
    }
    await user.remove();
    res.status(200).json({ id: req.params.id });
});

// @desc Update user by ID
// @route PUT /api/users/:id
// @access Private
const updateUser = async (req, res) => {
    const { id, email, balance } = req.body;
  
    if (!email || !balance) {
      res.status(400).json({ message: "Please enter a value for email and balance" });
      return;
    }
  
    try {
      // Get user by ID
      const user = await User.findById(req.params.id);
  
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
  
      // Update user
      user.email = email;
      user.balance = balance;

      if (req.file) {
        user.image = req.file.path;
      }

      await user.save();
  
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        balance: user.balance,
        account: user.account,
        admin: user.admin,
        image: user.image,
      });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Failed to update user" });
    }
  };  

// @desc Upload user image
// @route POST /api/users/upload-image
// @access Private
const uploadImage = upload.single("image");
const handleImageUpload = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Update the user's image field with the file path or other relevant information
    user.image = req.file.path; // Assuming the file path is saved to the `path` property of the uploaded file

    await user.save();

    res.status(200).json({ message: "Image uploaded successfully" });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ message: "Image upload failed" });
  }
};

// Generate JWT
const generateToken = (id, admin, secretKey) => {
    return jwt.sign({ id, admin }, secretKey, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

module.exports = {
    loginUser,
    getMe,
    createUser,
    updateUser,
    uploadImage,
    handleImageUpload,
    deleteUser,
};
