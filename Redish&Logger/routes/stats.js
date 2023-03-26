const { Router } = require("express");
const { CompanyModel } = require("../models/companyModel");
const { OrderModel } = require("../models/ordermodel")
const redis = require("redis");
const client = redis.createClient();

client.on('error', err => console.log('Redis Client Error', err));
client.connect();
const stat = Router();

stat.get("/company/:symbol/stats", async (req, res) => {
    try {
        let id = req.params.symbol
        let max_price = req.query.max_price
        let min_price = req.query.min_price

        let data = await OrderModel.find({ company_symbol: id })

        res.send(data)
    } catch (error) {
        res.send(error)
    }
})
module.exports = { stat }

