const customerServices = require("../services/customerServives");

const addCustomer = async (req, res, next) => {
    try {
        const newCustomer = await customerServices.addCustomer(req.business.id, req.body.name, req.body.phone, req.body.email, req.body.address, req.body.note);
        if(!newCustomer){
            const error = new Error("cann't add new customer");
            error.status = 401;
            return next(error);
        }
        res.status(200).json({
            success: true,
            message: "Cutomer added successfully",
            data: newCustomer
        })
    } catch (error) {
        next(error);
    }

}


const deleteCustomer = async (req, res, next) => {
    try {
        const deleteCustomer = await customerServices.deleteCustomer(req.body.id, req.business.id);
        if(!deleteCustomer){
            const error = new Error("Customer doesn't found!")
            error.status = 404;
            return next(error);
        }
        res.status(200).json({
            success: true,
            message: "Customer deleted SuccessFully!",
        })
    } catch (error) {
        next(error);
    }
}

const updateCustomer = async (req, res, next) => {
    const updateCustomer = await customerServices.updateCustomer(req.body.id , req.business.id, req.body.name, req.body.phone, req.body.email, req.body.address, req.body.note);
    if(!updateCustomer){
        const error = new Error("Customer not found!");
        error.status = 404;
        return next(error);
    }
    res.status(200).json({
        success: true,
        message: "Customer updated",
        data: updateCustomer
    })
}

module.exports = {addCustomer, deleteCustomer, updateCustomer}