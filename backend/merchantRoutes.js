const express = require("express");
const router = express.Router();

// Merchant Dashboard
router.get("/merchant/dashboard", (req, res) => {
  res.json({ message: "Welcome to the Merchant Dashboard!" });
});

// Merchant Product Management
router.post("/merchant/add-product", (req, res) => {
  const { name, price } = req.body;
  res.json({ message: `Product '${name}' added successfully at $${price}!` });
});

module.exports = router;
