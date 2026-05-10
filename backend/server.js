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
const duplicateRoutes = require("./routes/duplicateRoutes");
const cleaningRoutes = require("./routes/cleaningRoutes");
const priceRoutes = require("./routes/priceRoutes");

// API Routes
app.use("/api/taxonomy", taxonomyRoute);
app.use("/api/products", productRoutes);
app.use("/api/extract", extractionRoutes);
app.use("/api/duplicates", duplicateRoutes);
app.use("/api/cleaning", cleaningRoutes);
app.use("/api/price", priceRoutes);



// Home Route
app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

// Start Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});