const express = require("express")
const client = require('../cache');
const { Order } = require('../models/models')
const router = express.Router()

router.get("/company/:symbol/stats", async (req, res) => {
    const symbol = req.params.symbol;
    const today = new Date().toISOString().split("T")[0]
    const cacheKey = `company:${symbol}: stats: ${today}`;

    //check if cached data exists for the company and date
    client.get(cacheKey, async (err, cacheData) => {
        if (err) {
            console.log(err)
            return res.status(500).send('Internam server error')
        }

        if (cacheData) {
            //if cached data exists, return it
            console.log("request get")
            return res.json(JSON.parse(cacheData))
        }


        //if cached data does not exist, calculate the statistics
        //Replace this with uour own code to query the database for orthers
        const orders = await Order.find({ company_symbol: symbol });

        const maxPrice = Math.max(...orders.map(order => order.price));
        const minPrice = Math.min(...orders.map(order => order.price));
        const numOrders = orders.length;

        // Create a JSON object with the statistics
        const data = {
            symbol,
            maxPrice,
            minPrice,
            numOrders
        };

        //cache the statistics for 1 day
        client.set(cacheKey, JSON.stringify(data), 'EX', 86400, (err) => {
            if (err) {
                console.log(err)
                return res.status(500).send('Internal server error')
            }
            return res.send({ data })
        });
    });
});

module.exports = router