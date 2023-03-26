const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    company_symbol: String,
    price: Number,
    time: { type: Date, default: Date }
})

const OrderModel = new mongoose.model("orderdata", orderSchema)

module.exports = { OrderModel }