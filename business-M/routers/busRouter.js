const express = require("express");
const router = express.Router();
const {busRegister, busLogin, busLogout, busRefresh} = require("../Controllers/busController");
const authMiddleware = require("../middlewares/authMiddleware");
const {registerValidator, loginValidator} = require('../validators/businessValidator');

router.post("/register",registerValidator, busRegister);
router.post("/login", loginValidator ,busLogin);
router.post("/logout", authMiddleware, busLogout);
router.post("/refresh_token", busRefresh)

module.exports = router;