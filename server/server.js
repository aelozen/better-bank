const path = require("path");
const express = require("express");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const colors = require("colors");
const dotenv = require("dotenv").config();

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/userRoutes"));

// Serve frontend
console.log(`=== In ${process.env.NODE_ENV} environment ===`.red.underline.bold);
if (
    process.env.NODE_ENV === "production" ||
    process.env.NODE_ENV === "development"
) {
    app.use(express.static(path.join(__dirname, "../client/build")));
    app.get("*", (req, res) => {
        res.sendFile(
            path.resolve(__dirname, "../", "client", "build", "index.html")
        );
    });
}

app.use(errorHandler);

app.listen(process.env.PORT, () =>
    console.log(`Server started on port ${process.env.PORT}`)
);
