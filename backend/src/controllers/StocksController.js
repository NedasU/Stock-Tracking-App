const Stocks = require('../models/Stocks');

class StocksController {

    static async findStockBySymbol(req, res) {

        const { symbol } = req.params;
        
        try {
            const stock = await Stocks.findBySymbol(symbol);
            if (stock) {
                return res.status(200).json(stock);
            } else {
                return res.status(404).json({error: `Stock with symbol ${symbol} could not be found.`});
            }
        } catch (error) {
            console.error("An error occured, ", error);
            return res.status(500).json({error: "An error occured trying to find stock."});
        }
    }

    static async findAllStocks(req, res) {

        try {
            const stocks = await Stocks.getAllStocks();
            if (stocks) {
                return res.status(200).json(stocks);
            } else {
                return res.status(404).json({error: 'An error occured trying to get all the stocks.'})
            }
        } catch (error) {
            console.error('An error occured trying to get all the stocks, ', error);
            return res.status(500).json({error: 'An error occured trying to get all stocks.'});
        }
    }

    static async addStockBySymbol(req, res) {

        const { symbol, name, logo_url, last_update } = req.body;

        try {
            const existing_stock_check = await Stocks.findBySymbol(symbol);
            if (existing_stock_check) {
                return res.status(409).json({error: `Stock with the symbol: ${symbol} already exists.`})
            } else {
                const newStock = await Stocks.addStock(symbol, name, logo_url, last_update);
                return res.status(201).json(newStock);
            }
        } catch (error) {
            console.error('An error occured trying to create a stock, ', error);
            return res.status(500).json({error: 'An error occured trying to create new stock!'});
        }
    }

    static async removeStockBySymbol(req, res) {

        const { symbol } = req.params;

        try {
            const stock = await Stocks.findBySymbol(symbol);
            if (stock) {
                await Stocks.removeStock(stock.symbol);
                return res.status(200).json({message: 'Successfully deleted stock!'})
            } else {
                return res.status(404).json({error: `Stock with symbol: ${symbol} does not exist.`})
            }
        } catch (error) {
            console.error("An error has occured, ", error);
            return res.status(500).json({error: 'An error occured trying to delete stock'});
        }
    }

}

module.exports = StocksController;