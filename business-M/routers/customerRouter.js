const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware")
const {addCustomer, deleteCustomer, updateCustomer}  = require("../Controllers/customerController");

router.post("/add",authMiddleware,  addCustomer);
router.delete('/delete', authMiddleware, deleteCustomer);
router.put("/update", authMiddleware, updateCustomer);

module.exports = router;