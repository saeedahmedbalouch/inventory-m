const express = require("express");
const router = express.Router();
const {addProduct, deleteProduct, updateProduct} = require("../Controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/add", authMiddleware,addProduct);
router.delete("/delete", authMiddleware, deleteProduct);
router.put("/update", authMiddleware, updateProduct);

module.exports = router;