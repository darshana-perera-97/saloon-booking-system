const express = require("express");
const router = express.Router();

// Home Page Content
router.get("/frontend/home", (req, res) => {
    res.json({ message: "Welcome to the Frontend Home Page!" });
});

// Fetch products for display
router.get("/frontend/products", (req, res) => {
    const products = [
        { id: 1, name: "Laptop", price: 1200 },
        { id: 2, name: "Phone", price: 800 }
    ];
    res.json(products);
});

module.exports = router;
