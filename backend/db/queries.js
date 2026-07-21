import { pool } from './db.js';

export async function updateProductprices(products){
    const currentDate = new Date();
    for(const [productId, { quick_status: { buyPrice, sellPrice, buyVolume, sellVolume } }] of Object.entries(products)){
        await pool.query(
            `INSERT INTO products (product_id, recorded_at, buy_price, sell_price, buy_volume, sell_volume) VALUES ($1, $2, $3, $4, $5, $6)`,
            [productId, currentDate, buyPrice, sellPrice, buyVolume, sellVolume]
        );
    }
}

export async function getCurrentProducts(){
    const products = await pool.query(
        `SELECT DISTINCT ON (product_id)
            product_id, buy_price, sell_price
         FROM products
         ORDER BY product_id, recorded_at DESC;
        `
    );
    console.log(products);
}


