const Product = require("../models/Product");

// GET /api/products - used by the customer panel to show everything
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// POST /api/products - used by the admin panel to add a new product
const createProduct = async (req, res) => {
  try {
    const { name, price, category, isBestSeller } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Product image is required" });
    }

    const product = await Product.create({
      name,
      price,
      category,
      isBestSeller: isBestSeller === "true",
      image: req.file.filename,
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: "Failed to create product" });
  }
};

// PUT /api/products/:id - admin edits a product
const updateProduct = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (updates.isBestSeller !== undefined) {
      updates.isBestSeller = updates.isBestSeller === "true";
    }
    if (req.file) {
      updates.image = req.file.filename;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Failed to update product" });
  }
};

// DELETE /api/products/:id - admin removes a product
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete product" });
  }
};

module.exports = { getProducts, createProduct, updateProduct, deleteProduct };