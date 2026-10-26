const express = require("express");
const router = express.Router();

const busRouter = require("./busRouter");
const productRouter = require("./productRouter");
const customerRouter  = require('./customerRouter');
const supplierRouter = require("./supplierRouter");
const salesRouter = require("../routers/saleRouter");
const dashboardRouter = require("../routers/dashboardRouter");

router.use("/business", busRouter);
router.use("/product", productRouter);
router.use("/customer", customerRouter);
router.use("/supplier", supplierRouter);
router.use("/sales", salesRouter);
router.use("/dashboard", dashboardRouter);

module.exports = router;