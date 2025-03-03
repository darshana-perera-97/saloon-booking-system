const express = require("express");
const router = express.Router();

// Admin Dashboard
router.get("/admin/dashboard", (req, res) => {
  res.json({ message: "Welcome to the Admin Dashboard!" });
});

// Get all users (Admin only)
router.get("/admin/users", (req, res) => {
  const users = [
    { id: 1, name: "John Doe", role: "User" },
    { id: 2, name: "Jane Doe", role: "Merchant" },
  ];
  res.json(users);
});

module.exports = router;
