const express = require("express");
const router = express.Router();
const {
    loginUser,
    getMe,
    createUser,
    updateUser,
    deleteUser,
    // transferMoney,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

//Define routes
router.route("/login").post(loginUser);
router.route("/me").get(protect, getMe);
router.route("/").post(createUser);
router.route("/:id").put(protect, updateUser);
// router.route("/transfer").put(protect, transferMoney);
router.route("/:id").delete(protect, deleteUser);

module.exports = router;
