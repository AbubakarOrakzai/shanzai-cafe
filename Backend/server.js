const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productroutes");
const orderRoutes = require("./routes/OrderRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Make sure the uploads folder exists before anything tries to read/write to it
// (needed because empty folders aren't tracked by git, so a fresh deploy won't have it)
const uploadsPath = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
  console.log("Created missing uploads folder");
}

// Serve uploaded product images statically
app.use("/uploads", express.static(uploadsPath));

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));