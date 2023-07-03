const { Router } = require('express');
const router = Router();
const asyncHandler = require('express-async-handler');

const {
  loginUser,
  getMe,
  createUser,
  updateUser,
  deleteUser,
  uploadImage,
  handleImageUpload,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

// GET secret key
router.get('/secretKey', (req, res) => {
  const secretKey = process.env.JWT_SECRET;
  res.json({ secretKey });
});

// Define routes
router.post("/login", asyncHandler(loginUser));
router.get("/me", protect, asyncHandler(getMe));
router.post("/", asyncHandler(createUser));
router.post("/upload-image", protect, uploadImage, asyncHandler(handleImageUpload));
router.put("/:id", protect, asyncHandler(updateUser));
router.delete("/:id", protect, asyncHandler(deleteUser));

module.exports = router;
