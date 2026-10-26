const { body, validationResult } = require("express-validator");
const registerValidator = [
    body("name").trim().notEmpty().withMessage("name is required"),
    body("email").trim().notEmpty().withMessage("email is required").isEmail().withMessage("must be valid email"),
    body("phone").trim().notEmpty().withMessage("phone is required"),
    body("password").trim().notEmpty().withMessage("password is required").isLength({min: 8}).withMessage("password must be above 8 letters"),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                success: false,
                errors: errors.array()
            })
        }
        next();
    }
]

const loginValidator = [
    body("email").trim().notEmpty().withMessage("email is required").isEmail().withMessage("Must be valid email"),
    body("password").trim().notEmpty().withMessage("password is required"),
    (req, res, next) =>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                success: false,
                errors: errors.array()
            })
        }
        next();
    }
]

module.exports = {registerValidator, loginValidator};