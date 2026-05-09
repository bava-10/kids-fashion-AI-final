const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const taxonomyRoute = require("./routes/taxonomyRoute");
const productRoutes = require("./routes/productRoutes");
const extractionRoutes = require("./routes/extractionRoutes");

// API Routes
app.use("/api/taxonomy", taxonomyRoute);
app.use("/api/products", productRoutes);
app.use("/api/extract", extractionRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

// Start Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});