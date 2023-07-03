const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
    // Exclude '/api/users/secretKey' endpoint from authentication
    if (req.path === "/secretKey" ||
        req.path === "/upload-image") {
        next(); // Skip authentication middleware
        return;
    }

    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(" ")[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from token
            req.user = await User.findById(decoded.id).select("-password");

            // Set the secret key on the request object
            req.secretKey = process.env.JWT_SECRET;

            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized");
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("Not authorized, token not found");
    }
});

module.exports = {
  protect,
};
