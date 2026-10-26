const db  = require("../config/db");

async function addCustomer(businessId, name, phone, email, address, note) {
    const newCustomer = await db.query("insert into customers (business_id, name, phone, email, address, note) values($1, $2, $3, $4, $5, $6) returning id, name, phone, email",[businessId, name, phone, email, address, note]);
    const newCustomerData = newCustomer.rows[0];
    if(!newCustomerData){
        return false
    }
    return newCustomerData;
}

async function deleteCustomer(customerID, businessID) {
    const deleteCustomer = await db.query("delete from customers where id = $1 and business_id = $2 returning id", [customerID, businessID]);
    const deletedCustomer = deleteCustomer.rows[0];
    if(!deletedCustomer){
        return false;
    }
    return true;
}

async function updateCustomer(customerID, businessID, name, phone, email, address, note) {
    const updateCustomer = await db.query("update customers set name = $1, phone = $2, email = $3, address = $4, note = $5 where id = $6 and business_id = $7 returning name, phone, email, address, note",[name, phone, email, address, note, customerID, businessID]);
    const updatedCustomer = updateCustomer.rows[0];
    if(!updatedCustomer){
        return false;
    }
    return updatedCustomer;
}

module.exports = {addCustomer, deleteCustomer, updateCustomer}