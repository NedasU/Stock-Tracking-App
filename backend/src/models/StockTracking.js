const db = require('../db/db');

class StockTracking {

    constructor(user_id, stock_symbol) {
        this.user_id = user_id;
        this.stock_symbol = stock_symbol;
    }

    static async getTrackingList(user_id) {
        try {
            const query = 'SELECT * FROM userstocktracking WHERE user_id = ?';
            const [rows] = await db.execute(query, [user_id]);
            return rows;
        } catch (err) {
            console.error("Error retrieving user tracking list: ", err);
            throw err;
        }
    }

    static async trackStock(user_id, stock_symbol) {
        try {
            const query = 'INSERT INTO userstocktracking (user_id, stock_symbol) VALUES (?, ?)';
            await db.execute(query, [user_id, stock_symbol]);
            return new StockTracking(user_id, stock_symbol);
        } catch (err) {
            console.error("Error adding stock to tracking: ", err);
            throw err;
        }
    }

    static async untrackStock(user_id, stock_symbol) {
        try {
            const query = 'DELETE FROM userstocktracking WHERE user_id = ? AND stock_symbol = ?';
            const result = await db.execute(query, [user_id, stock_symbol]);
            return result;
        } catch (err) {
            console.error("Error removing stock from tracking: ", err);
            throw err;
        }
    }

}

module.exports = StockTracking;