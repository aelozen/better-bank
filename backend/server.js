const path = require("path");
const express = require("express");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const colors = require("colors");
require("dotenv").config();
const mongoose = require("mongoose");

connectDB();

const app = express();

//Enable CORS for all routes
app.use(
    cors({
    })
  );
  

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware to set secret key
app.use((req, res, next) => {
  req.secretKey = process.env.JWT_SECRET;
  next();
});

app.use("/api/users", require("./routes/userRoutes"));

// Serve frontend
console.log(`=== In ${process.env.NODE_ENV} status ===`.red.underline.bold);
if (
    process.env.NODE_ENV === "production" ||
    process.env.NODE_ENV === "development"
) {
    app.use(express.static(path.join(__dirname, "../frontend/build")));
    mongoose.connect(process.env.MONGO_URI)
    app.get("*", (req, res) => {
        res.sendFile(
            path.resolve(__dirname, "../", "frontend", "build", "index.html")
        );
    });
}

app.use(errorHandler);

app.listen(process.env.PORT, () =>
    console.log(`Server started on port ${process.env.PORT}`)
);
