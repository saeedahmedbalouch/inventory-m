const SupplierServices = require("../services/supplierServices");

const addSupplier = async (req, res, next) => {
    try {
        const newSupplier = await SupplierServices.addSupplier(req.business.id, req.body.name, req.body.phone, req.body.email, req.body.address, req.body.note);
        if(!newSupplier){
            const error = new Error("cann't add new Supplier");
            error.status = 401;
            return next(error);
        }
        res.status(200).json({
            success: true,
            message: "Supplier added successfully",
            data: newSupplier
        })
    } catch (error) {
        next(error);
    }

}


const deleteSupplier = async (req, res, next) => {
    try {
        const deleteSupplier = await SupplierServices.deleteSupplier(req.body.id, req.business.id);
        if(!deleteSupplier){
            const error = new Error("Supplier doesn't found!")
            error.status = 404;
            return next(error);
        }
        res.status(200).json({
            success: true,
            message: "Supplier deleted SuccessFully!",
        })
    } catch (error) {
        next(error);
    }
}

const updateSupplier = async (req, res, next) => {
    const updateSupplier = await SupplierServices.updateSupplier(req.body.id , req.business.id, req.body.name, req.body.phone, req.body.email, req.body.address, req.body.note);
    if(!updateSupplier){
        const error = new Error("Supplier not found!");
        error.status = 404;
        return next(error);
    }
    res.status(200).json({
        success: true,
        message: "Supplier updated",
        data: updateSupplier
    })
}

module.exports = {addSupplier, deleteSupplier, updateSupplier}