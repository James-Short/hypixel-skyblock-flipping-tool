import { pool } from './db.js';

export async function updateProductprices(products){
    const currentDate = new Date();
    for(const [productId, { quick_status: { buyPrice, sellPrice, buyVolume, sellVolume, sellMovingWeek, buyMovingWeek } }] of Object.entries(products)){
        await pool.query(
            `INSERT INTO products (product_id, recorded_at, buy_price, sell_price, buy_volume, sell_volume, sell_moving_week, buy_moving_week) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
            [productId, currentDate, buyPrice, sellPrice, buyVolume, sellVolume, sellMovingWeek, buyMovingWeek]
        );
    }
}

export async function getCurrentProducts(sortBy = 'Coins per hour', reverseSort=false){
    const sorts = {
        'Coins per hour': '(buy_price - sell_price) * LEAST(buy_moving_week, sell_moving_week) / (7 * 24.0)',
        'Margin': '(buy_price - sell_price)',
        'Margin %': '((buy_price - sell_price) / sell_price)',
        'Instasells': 'sell_moving_week',
        'Instabuys': 'buy_moving_week',
        'Buy order price': 'buy_price',
        'Sell order price': 'sell_price'
    }

    const currentSort = sorts[sortBy] ?? sorts['Coins per hour'];

    const products = await pool.query(
        `
        SELECT 
            product_id,
            buy_price,
            sell_price,
            buy_volume,
            sell_volume,
            sell_moving_week,
            buy_moving_week,
            (buy_price - sell_price) * LEAST(buy_moving_week, sell_moving_week) / (7 * 24.0) AS coins_per_hour
        FROM (
        SELECT DISTINCT ON (product_id)
            product_id, buy_price, sell_price, buy_volume, sell_volume, sell_moving_week, buy_moving_week
         FROM products
         WHERE buy_price > 0
            AND sell_price > 0
            AND buy_volume > 0
            AND sell_volume > 0
         ORDER BY product_id, recorded_at DESC
        ) AS current_prices
        ORDER BY ${currentSort} ${reverseSort ? 'ASC' : 'DESC'}
        LIMIT 500;
        `
    );
    return products.rows;
}

export async function getProductHistory(productId){
    const productHistory = await pool.query(
        `
        SELECT
            product_id,
            buy_price,
            sell_price,
            recorded_at
        FROM products
        WHERE product_id = '${productId}'
        ORDER BY recorded_at ASC;
        `
    );
    return productHistory.rows;
}


