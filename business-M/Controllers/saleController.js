const salesService = require("../services/saleService");

const addSales = async (req, res, next) => {
    try {
        const addSales = await salesService.addSales(req.business.id, req.body.customer_id, req.body.status, req.body.payment_status, req.body.items);
        if(!addSales){
            const error = new Error("failed to add sales!");
            error.status = 404;
            return next(error);
        }
        res.status(200).json({
            success: true,
            message: "sales added successfully!",
            data: addSales
        })
    } catch (error) {
        next(error);
    }
}

const deleteSale = async (req, res, next) => {
    try {
        const deleteSale = await salesService.deleteSales(req.business.id, req.body.sale_id);
        if(!deleteSale){
            const error = new Error("sale doesn't exist");
            error.status = 404;
            return next(error)
        }
        res.status(200).json({
            success: true,
            message: "Sales delelted successfully",
            data: deleteSale
        })
    } catch (error) {
        next(error)
    }
}

const updateSale = async (req, res, next) => {
    try {
        const updateSale = await salesService.updateSale(req.business.id, req.body.sale_id ,req.body.customer_id, req.body.status, req.body.payment_status, req.body.items);
        if(!updateSale){
            const error  = new Error("Server Error");
            error.status = 500;
            return next(error);
        }
        res.status(200).json({
            success: true,
            message: "Sale updated successfully",
            data: updateSale
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {addSales, deleteSale, updateSale}; 