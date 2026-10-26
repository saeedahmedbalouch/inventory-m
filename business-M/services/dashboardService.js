const db = require("../config/db");

async function getProfit(businessID) {
    let profit = 0;
    const getSales = await db.query("select * from sales where business_id = $1",[businessID]);
    if(getSales.rows.length === 0){
        return {profit: 0}
    }

    for(const sale of getSales.rows){
        const getSaleItem = await db.query("select * from sale_items where sale_id = $1",[sale.id]);
        for(const saleItem of getSaleItem.rows){
            const productCostPrice = await db.query("select cost_price from sale_items where product_id = $1",[saleItem.product_id]);
            const productsalePrice = await db.query("select unit_price from sale_items where product_id = $1",[saleItem.product_id]);
            const productQuantity = saleItem.quantity;
            const productProfit = (productsalePrice.rows[0].unit_price - productCostPrice.rows[0].cost_price) * Number(productQuantity);
            profit += productProfit;
        }
    }

    return {
        profit: profit
    }
}

module.exports = {getProfit}