const productService = require("../services/productService");

const addProduct = async (req, res, next) => {
    try {
        const newProduct = await productService.addProduct( req.business.id, req.body.name, req.body.description, req.body.price, req.body.cost_price, req.body.stock_quantity);
        if(!newProduct){
            const error = new Error("adding product failed");
            next(error);
        }
        res.status(200).json({
            success: true,
            data: newProduct
        })
    } catch (error) {
        next(error);
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        const deleteProduct = await productService.deleteProduct(req.body.id, req.business.id);
        if(!deleteProduct){
            const error = new Error("product doesn't found");
            error.status = 401;
            return next(error)
        }
        res.status(200).json({
            success: true,
            message: "Product Deleted."
        })
    } catch (error) {
        next(error);
    }
}


const updateProduct = async (req, res, next) =>{
    try {
        const updateProduct = await productService.updateProduct(req.body.id, req.business.id, req.body.name, req.body.description, req.body.price, req.body.cost_price ,req.body.stock_quantity);
        if(!updateProduct){
            const error = new Error("product doesn't found!")
            error.status = 401;
            return next(error)
        }
        res.status(200).json({
            success: true,
            message: "product updated successfully",
            data: updateProduct
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {addProduct, deleteProduct, updateProduct};