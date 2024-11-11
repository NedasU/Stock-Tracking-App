const db = require('../db/db')

class TradingSimulationTransactions{
    constructor(id, user_id, symbol, type, price, amount, timestamp){
        this.id = id;
        this.user_id = user_id;
        this.symbol = symbol;
        this.type = type;
        this.price = price;
        this.amount = amount;
        this.timestamp = timestamp;
    }

    static async AddTransaction(user_id, symbol, type, price, amount, timestamp){
        try {
            await db.execute("INSERT INTO TradingSimulaionTransactions (user_id, symbol, type, price, amount, timestamp) VALUES (?, ?, ?, ?, ?, ?", [user_id, symbol, type, price, amount, timestamp]);

        } catch (error) {
            console.error("error occured, ", error);
            throw error;
        }
    }

    static async GetTransactionByUserId(user_id) {
        try {
            const [results] = await db.execute("SELECT * FROM TradingSimulationTransactions WHERE user_id = ?", [user_id]);
            const formed_results = results.map(result => {
                return new TradingSimulationTransactions(result.id, result.user_id, result.symbol, result.type, result.price, result.amount, result.timestamp);
            })
            return formed_results;
        } catch (error) {
            console.error("An error occured, ", error);
            throw error;
        }
    }
}