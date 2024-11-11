const db = require('../db/db');

class Stocks {

    constructor(symbol, name, logo_url, last_update) {
        this.symbol = symbol;
        this.name = name;
        this.logo_url = logo_url;
        this.last_update = last_update;
    }

    static async findBySymbol(symbol) {
        try {
            const [rows] = await db.execute("SELECT * FROM Stocks WHERE symbol = ?", [symbol]);
            if (rows.length > 0) {
                const {symbol, name, logo_url, last_update} = rows[0];
                return new Stocks(symbol, name, logo_url, last_update);
            }
            return null;
        } catch (err) {
            console.log('Error retrieving stock: ', err);
            throw err;
        }
    }

    static async addStock(symbol, name, logo_url, last_update) {
        try {
            const query = "INSERT INTO Stocks (symbol, name, logo_url, last_update) VALUES (?, ?, ?, ?)";
            await db.execute(query, [symbol, name, logo_url, last_update]);
            return new Stocks(symbol, name, logo_url, last_update);
        } catch (err) {
            console.log('Error adding stock: ', err);
            throw err;
        }
    }
    
    static async removeStock(symbol) {
        try {
            const query = "DELETE FROM Stocks WHERE symbol = ?";
            const result = await db.execute(query, [symbol]);
            return result;
        } catch (err) {
            console.log('Error removing stock: ', err);
            throw err;
        }
    }

    static async getAllStocks() {
        try {
            const [rows] = await db.execute('SELECT * FROM Stocks');
            return rows;
        } catch (err) {
            console.log('Error retrieving all stocks: ', err);
            throw err;
        }
    }

}

module.exports = Stocks;