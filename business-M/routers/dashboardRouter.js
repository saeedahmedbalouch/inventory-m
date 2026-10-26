const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {getProfit} = require("../Controllers/dashboardController");

router.get("/profit", authMiddleware, getProfit)

module.exports = router;