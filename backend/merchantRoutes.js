const express = require("express");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

const router = express.Router();
const merchantsFile = path.join(__dirname, "merchants.json");

const SECRET_KEY = "your_secret_key"; // Change this to a secure key

// Function to read merchants.json
const readMerchants = () => {
  if (!fs.existsSync(merchantsFile)) return [];
  const data = fs.readFileSync(merchantsFile, "utf-8");
  return data ? JSON.parse(data) : [];
};

// Middleware to verify JWT token
const authenticateMerchant = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), SECRET_KEY);
    req.merchant = decoded; // Store merchant data in request
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token." });
  }
};

// Merchant Login API
router.post("/merchant/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const merchants = readMerchants();
  const merchant = merchants.find(
    (m) => m.email === email && m.password === password
  );

  if (!merchant) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  // Generate JWT token
  const token = jwt.sign(
    { merchantId: merchant.merchantId, email: merchant.email },
    SECRET_KEY,
    { expiresIn: "2h" }
  );

  res.json({
    message: "Login successful!",
    token, // Return JWT token
    merchant: { merchantId: merchant.merchantId, email: merchant.email },
  });
});

// Protected Merchant Dashboard
router.get("/merchant", authenticateMerchant, (req, res) => {
  res.json({
    message: "Welcome to the Merchant Dashboard!",
    merchant: req.merchant,
  });
});

module.exports = router;
