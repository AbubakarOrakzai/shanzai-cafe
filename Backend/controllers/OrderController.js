const Order = require("../models/Order");
const Product = require("../models/Product");

// POST /api/orders - admin creates an order for a walk-in customer
const createOrder = async (req, res) => {
  try {
    const { items } = req.body; // [{ productId, quantity }]

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Order must have at least one item" });
    }

    let totalAmount = 0;
    let totalProfit = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) continue;

      const quantity = item.quantity || 1;
      const price = Number(product.price) || 0;
      const costPrice = Number(product.costPrice) || 0; // falls back to 0 if missing on older products

      const lineTotal = price * quantity;
      const lineProfit = (price - costPrice) * quantity;

      totalAmount += lineTotal;
      totalProfit += lineProfit;

      orderItems.push({
        product: product._id,
        name: product.name,
        price,
        costPrice,
        quantity,
      });
    }

    const order = await Order.create({
      items: orderItems,
      totalAmount,
      totalProfit,
    });

    res.status(201).json(order);
  } catch (err) {
    console.error("createOrder error:", err);
    res.status(500).json({ message: "Failed to create order", error: err.message });
  }
};

// GET /api/orders - used by the dashboard to calculate sales/profit metrics
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("getOrders error:", err);
    res.status(500).json({ message: "Failed to fetch orders", error: err.message });
  }
};

module.exports = { createOrder, getOrders };