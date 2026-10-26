const db = require("../config/db");

async function addProduct(businessId, name, description, price, cost_price, stock_quantity) {
    const newProduct = await db.query('insert into products (business_id, name, description, price, cost_price, stock_quantity) values ($1, $2, $3, $4, $5, $6) returning id, sku, name, description, price, stock_quantity',[businessId, name, description, price, cost_price, stock_quantity]);
    const productData = newProduct.rows[0];
    if(!productData){
        return false
    }
    return productData;
}

async function deleteProduct(productID, business_id) {
    const DeletedProduct = await db.query("delete from products where id = $1 and business_id = $2 returning id",[productID, business_id]);
    const data  = DeletedProduct.rows[0];
    if(!data){
        return false
    }
    return true;
}

async function updateProduct(productID, businessId, name, description, price, cost_price, stock_quantity) {
    const updateProduct = await db.query("update products set name = $1, description = $2, price  = $3, cost_price = $4, stock_quantity  = $5 where id = $6 and business_id = $7 returning id, name, description, price, cost_price, stock_quantity",[name, description, price, cost_price, stock_quantity, productID, businessId]);
    const updatedProduct = await updateProduct.rows[0];
    if(!updateProduct){
        const error = new Error("Product doesn't found");
        error.status = 404;
        return false
    }
    return updatedProduct;
}

module.exports = {addProduct, deleteProduct, updateProduct};