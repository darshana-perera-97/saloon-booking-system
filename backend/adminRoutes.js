const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const merchantsFile = path.join(__dirname, "merchants.json");

// Function to read merchants.json
const readMerchants = () => {
  if (!fs.existsSync(merchantsFile)) return [];
  const data = fs.readFileSync(merchantsFile, "utf-8");
  return data ? JSON.parse(data) : [];
};

// Function to write to merchants.json
const writeMerchants = (merchants) => {
  fs.writeFileSync(merchantsFile, JSON.stringify(merchants, null, 2), "utf-8");
};

// View All Merchants API
router.get("/admin/merchants", (req, res) => {
  const merchants = readMerchants();

  if (merchants.length === 0) {
    return res.status(404).json({ error: "No merchants found" });
  }

  res.json(merchants);
});

// Create Merchant API
router.post("/admin/create-merchant", (req, res) => {
  const {
    merchantName,
    merchantDescription,
    location,
    contactNumber,
    email,
    password,
    availability, // Expecting availability as a boolean value
  } = req.body;

  if (!merchantName || !email || !password) {
    return res
      .status(400)
      .json({ error: "merchantName, email, and password are required" });
  }

  if (availability === undefined) {
    return res.status(400).json({ error: "Availability is required" });
  }

  let merchants = readMerchants();
  const newMerchant = {
    merchantId: merchants.length + 1, // Incremental ID
    merchantName,
    merchantDescription,
    location,
    contactNumber,
    email,
    password, // Ideally, hash this before storing
    availability, // Include availability field
  };

  merchants.push(newMerchant);
  writeMerchants(merchants);

  res.json({
    message: "Merchant created successfully!",
    merchant: newMerchant,
  });
});

// Edit Merchant Availability API
router.put("/admin/merchants/:id/availability", (req, res) => {
  const { id } = req.params;
  const { availability } = req.body;

  if (availability === undefined || typeof availability !== "boolean") {
    return res.status(400).json({ error: "Availability must be a boolean" });
  }

  let merchants = readMerchants();
  const merchantIndex = merchants.findIndex(
    (merchant) => merchant.merchantId === parseInt(id)
  );

  if (merchantIndex === -1) {
    return res.status(404).json({ error: "Merchant not found" });
  }

  // Update the availability status
  merchants[merchantIndex].availability = availability;
  writeMerchants(merchants);

  res.json({
    message: `Merchant availability updated successfully!`,
    merchant: merchants[merchantIndex],
  });
});

module.exports = router;
