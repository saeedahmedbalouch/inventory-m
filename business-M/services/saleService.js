const db = require("../config/db");

async function addSales(businessID, CustomerId, status, payment_status, items) {
    const client = await db.connect();
    try {
        await client.query("BEGIN");
        const addedItems = [];
        let total_amount = 0;

        for(const product of items){
            if(product.quantity <= 0){
                const error = new Error("quantity must be above 0");
                error.status  = 400;
                throw error;
            }

            const searchPrice = await client.query("select price from products where id = $1 and business_id = $2",[product.product_id, businessID]);
            if(!searchPrice.rows[0]){
                const error = new Error("product doesnot found");
                error.status = 404;
                throw error;
            }
            const unit_price = Number(searchPrice.rows[0].price);
            total_amount += unit_price * product.quantity;
        }

        const addsale = await client.query("insert into sales (business_id, customer_id, total_amount, status, payment_status) values($1, $2, $3, $4, $5) returning *",[businessID, CustomerId, total_amount, status, payment_status]);
        const addedSale = addsale.rows[0];
    
        if(!addedSale){
            const error  = new Error("Error adding sales");
            error.status = 500;
            throw error;
        }
    
        for(const product of items){
            const searchPriceQuantity = await client.query("select price, stock_quantity from products where id = $1 and business_id = $2",[product.product_id, businessID]);
            const productQuantity = Number(searchPriceQuantity.rows[0].stock_quantity);
            const unit_price = Number(searchPriceQuantity.rows[0].price);
            const subtotal = unit_price * product.quantity;

            if(product.quantity > productQuantity){
                const error = new Error("product quanity is lower then order");
                error.status = 404;
                throw error;
            }

            const addItem = await client.query("insert into sale_items (sale_id, product_id, quantity, unit_price, subtotal) values($1, $2, $3, $4, $5) returning *",[addedSale.id, product.product_id, product.quantity, unit_price, subtotal]);
            const decreaseQuantity = await client.query("update products set stock_quantity = $1 where id = $2 and business_id = $3 returning stock_quantity",[productQuantity - product.quantity, product.product_id, businessID]);
            
            if(!decreaseQuantity.rows[0]){
                const error = new Error("cannot decrease product quantity");
                error.status = 500;
                throw error;
            }

            if(!addItem.rows[0]){
                const error = new Error("error adding sale product");
                error.status = 500;
                throw error;
            } 
            addedItems.push(addItem.rows[0]);
        }

        await client.query("COMMIT");

        const result = {
            sales: {
                id: addedSale.id,
                CustomerId: addedSale.customer_id,
                status: addedSale.status,
                payment_status: addedSale.payment_status
            },
            items: addedItems
        }
        return result
    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally{
        client.release();
    }
}



async function deleteSales(businessID, salesID) {
    const deleteSale = await db.query("delete from sales where id = $1 and business_id = $2 returning id",[salesID, businessID]);
    const deletedSale = deleteSale.rows[0];
    if(!deletedSale){
        return false;
    }
    return deletedSale;
}


async function updateSale(businessID, salesID,  CustomerId, status, payment_status, items) {
    const client = await db.connect();
    try {
        await client.query("BEGIN");
        let total_amount = 0; 
        const updatedSaleItems = [];

        const findsale = await client.query("select id from sales where id = $1 and business_id = $2 ",[salesID, businessID]);
        if(!findsale.rows[0]){
            const error = new Error("cannot find sale");
            error.status = 404;
            throw error;
        }

        for(const product of items){
            const findSaleItem = await client.query("select * from sale_items where sale_id = $1 and product_id = $2",[salesID, product.product_id]);
            const findedSaleItem = findSaleItem.rows[0];
            if(!findedSaleItem){
                const error = new Error("Sale item doesnot found");
                error.status = 404;
                throw error;
            }
            const findProduct = await client.query("select price from products where id = $1 and business_id = $2",[product.product_id, businessID]);
            if(!findProduct.rows[0]){
                const error = new Error("Product doesn't found");
                error.status = 404;
                throw error;
            }
            total_amount += findProduct.rows[0].price * product.quantity;
        }

        const updateSale = await client.query("update sales set customer_id = $1, total_amount = $2, status = $3, payment_status = $4 where id = $5 and business_id = $6 returning *",[CustomerId, total_amount, status, payment_status, salesID, businessID]);
        const updatedSale = updateSale.rows[0];

        if(!updatedSale){
            const error = new Error("Cannot updated sales");
            error.status = 500;
            throw error;
        }

        for(const product of items){
            const findProduct = await client.query("select price from products where id = $1 and business_id = $2",[product.product_id, businessID]);
            if(!findProduct.rows[0]){
                const error = new Error("Product doesn't found");
                error.status = 404;
                throw error;
            }
            const findSaleItem = await client.query("select id from sale_items where id = $1 and sale_id = $2",[product.saleItemID, salesID]);
            if(!findSaleItem.rows[0]){
                const error = new Error("Sale Item doesn't found");
                error.status = 404;
                throw error;
            }
            const updateSaleItem = await client.query("update sale_items set quantity = $1, subtotal = $2 where id  = $3 and sale_id = $4 and product_id = $5 returning *",[product.quantity, product.quantity * Number(findProduct.rows[0].price), product.saleItemID, salesID, product.product_id]);
            const updatedSaleItem = updateSaleItem.rows[0];
            if(!updatedSaleItem){
                const error = new Error("Error while updating Sales item");
                error.status = 500;
                throw error;
            }
            updatedSaleItems.push(updatedSaleItem);
        }

        await client.query("COMMIT");

        const result = {
            sales: {
                id: updatedSale.id,
                CustomerId: updatedSale.customer_id,
                status: updatedSale.status,
                payment_status: updatedSale.payment_status
            },
            items: updatedSaleItems
        }

        return result;
    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    }finally{
        client.release()
    }
}
module.exports = {addSales, deleteSales, updateSale}