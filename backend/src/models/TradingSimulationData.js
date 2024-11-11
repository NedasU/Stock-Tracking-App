const db = require('../db/db')

class TradingSimulationData {
    constructor(user_id, symbol, amount){
        this.user_id = user_id
        this.symbol = symbol
        this.amount = amount
    }

    static async addTradingStock(user_id, symbol, amount){
        try {
            const results = await db.execute("INSERT INTO TradingSimulationData (user_id, symbol, amount) VALUES (?, ?, ?)", [user_id, symbol, amount])
            return results.insertId;
        } catch (error){
            console.error("An error occured: ", error);
            throw error;
        }
    }

    static async getTradingStock(user_id, symbol){
        try {
            const [results] = await db.execute("SELECT * FROM TradingSimulationData WHERE user_id = ? AND symbol = ?", [user_id, symbol]);
            if (results.length > 0){
                const { user_id, symbol, amount} = results[0];
                return new TradingSimulationData(user_id, symbol, amount);
            }
            return null
        } catch (error) {
            console.error("An error occured: ", error)
            throw error;
        }
    }

    static async addStockAmount(user_id, symbol, amount){
        try {
            const [results] = await db.execute("UPDATE TradingSimulationData SET amount = ? WHERE user_id = ? AND symbol = ?", [amount, user_id, symbol])
            if (results.changedRows > 0){
                return new TradingSimulationData(user_id, symbol, amount);
            }
            return null
        } catch (error) {
            console.error("An error occured ", error);
            throw error;
        }
    }

    static async getAllUserStock(user_id){
        try {
            const [results] = await db.execute("SELECT * FROM TradingSimulationData WHERE user_id = ?", [user_id]);
            const formed_results = results.map(result => {
                return new TradingSimulationData(result.user_id, result.symbol, result.amount);
            });
            return formed_results;
        } catch (error){
            console.error("An error occured ", error);
            throw error;
        }
    }
}