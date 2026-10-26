const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {addSales, deleteSale, updateSale} = require("../Controllers/saleController");

router.post("/add", authMiddleware, addSales);
router.delete("/delete", authMiddleware, deleteSale);
router.put("/update", authMiddleware, updateSale)

module.exports = router;
