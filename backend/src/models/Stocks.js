const db = require('../db/db');

class Stocks {

    constructor(symbol, name, logo_url, last_update) {
        this.symbol = symbol;
        this.name = name;
        this.logo_url = logo_url;
        this.last_update = last_update;
    }

    static async findBySymbol(symbol) {
        const [rows] = await db.execute("SELECT * FROM Stocks WHERE symbol = ?", [symbol]);
        if (rows.length > 0) {
            const {symbol, name, logo_url, last_update} = rows[0];
            return new Stocks(symbol, name, logo_url, last_update);
        }
        return null;
    }

    static async addStock(symbol, name, logo_url, last_update) {
        const query = "INSERT INTO Stocks (symbol, name, logo_url, last_update) VALUES (?, ?, ?, ?)";
        await db.execute(query, [symbol, name, logo_url, last_update]);
        return new Stocks(symbol, name, logo_url, last_update);
    }
    
    static async removeStock(symbol) {
        const query = "DELETE FROM Stocks WHERE symbol = ?";
        await db.execute(query, [symbol]);
    }

    static async getAllStocks() {
        const [rows] = await db.execute('SELECT * FROM Stocks');
        return rows;
    }

}

module.exports = Stocks;