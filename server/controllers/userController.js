const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
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
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      account: user.account,
      balance: user.balance,
      admin: user.admin,
      token: generateToken(user._id),
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

  if (!name || !email || !password) {
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
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      balance: user.balance,
      account: user.account,
      admin: user.admin,
      image: user.image,
      token: generateToken(user._id),
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
  
    if (!req.body) {
      res.status(400);
      throw new Error("Please enter a value");
  }
  
      // Get user by ID
      const user = await User.findById(req.params.id);

      if (!user) {
          res.status(404);
          throw new Error("User not found");
      }
  
      // Update user
      await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });

    const updatedUser = await User.findById(req.params.id);
  
      res.status(201).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        balance: updatedUser.balance,
        account: updatedUser.account,
        admin: updatedUser.admin,
        image: user.image,
        token: generateToken(user._id),
      });
    }; 

// Initiate transfer
const transferMoney = async (req, res) => {
  console.log('before req.body');
  const { senderId, receiverAccountNumber, amount } = req.body;
  console.log('req body', req.body);
  console.log("This is the senderID" + senderId);
  console.log("This is the receiverAccountNumber" + receiverAccountNumber);
  console.log("This is the amount" + amount);

  try {
    // Find the sender user by their ID
    const sender = await User.findById(senderId);

    if (!sender) {
      res.status(404).json({ message: "Sender not found" });
      return;
    }

    // Find the receiver user by their account number
    const receivers = await User.find({ account: receiverAccountNumber });
    console.log('Receiver account', receiverAccountNumber)
    if (receivers.length === 0) {
       res.status(404).json({ message: "Receiver not found" });
    return;
      }
const receiver = receivers[0]; // Choose the first receiver found

    if (!receiver) {
      res.status(404).json({ message: "Receiver not found" });
      return;
    }

    // Check if the sender has enough balance to transfer
    if (sender.balance < amount) {
      res.status(400).json({ message: "Insufficient balance for the transfer" });
      return;
    }

    // Update the sender's balance
    sender.balance -= amount;
    await sender.save();

    // Update the receiver's balance
    receiver.balance += amount;
    await receiver.save();

    res.status(200).json({ message: "Money transferred successfully" });
  } catch (error) {
    console.error("Error transferring money:", error);
    res.status(500).json({ message: "Failed to transfer money" });
  }
};

// Generate JWT
const generateToken = (id, admin) => {
    return jwt.sign({ id, admin }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

module.exports = {
    loginUser,
    getMe,
    createUser,
    updateUser,
    deleteUser,
    transferMoney,
};
