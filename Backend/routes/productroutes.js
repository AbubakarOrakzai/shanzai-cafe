const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// Public - customer panel calls this
router.get("/", getProducts);

// Admin only - auth middleware will be added here once admin login is built
router.post("/", upload.single("image"), createProduct);
router.put("/:id", upload.single("image"), updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;