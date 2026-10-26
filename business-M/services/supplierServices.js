const db  = require("../config/db");

async function addSupplier(businessId, name, phone, email, address, note) {
    const newSupplier = await db.query("insert into suppliers (business_id, name, phone, email, address, note) values($1, $2, $3, $4, $5, $6) returning id, name, phone, email",[businessId, name, phone, email, address, note]);
    const newSupplierData = newSupplier.rows[0];
    if(!newSupplierData){
        return false
    }
    return newSupplierData;
}

async function deleteSupplier(SupplierID, businessID) {
    const deleteSupplier = await db.query("delete from Suppliers where id = $1 and business_id = $2 returning id", [SupplierID, businessID]);
    const deletedSupplier = deleteSupplier.rows[0];
    if(!deletedSupplier){
        return false;
    }
    return true;
}

async function updateSupplier(SupplierID, businessID, name, phone, email, address, note) {
    const updateSupplier = await db.query("update Suppliers set name = $1, phone = $2, email = $3, address = $4, note = $5 where id = $6 and business_id = $7 returning name, phone, email, address, note",[name, phone, email, address, note, SupplierID, businessID]);
    const updatedSupplier = updateSupplier.rows[0];
    if(!updatedSupplier){
        return false;
    }
    return updatedSupplier;
}

module.exports = {addSupplier, deleteSupplier, updateSupplier}