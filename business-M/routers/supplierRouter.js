const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware")
const {addSupplier, deleteSupplier, updateSupplier}  = require("../Controllers/supplierController");

router.post("/add",authMiddleware,  addSupplier);
router.delete('/delete', authMiddleware, deleteSupplier);
router.put("/update", authMiddleware, updateSupplier);

module.exports = router;