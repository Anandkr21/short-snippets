const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
    name: {type: String, required: true},
    Symbol: {type: String, required: true, unique: true},
});

const orderSchema = new mongoose.Schema({
    company_symbol: {type: String, required: true},
    price: {type: Number, required: true},
    time: {type: Date, required: false, default:Date.now()}
});

const Company = mongoose.model("company", companySchema);
const Order = mongoose.model("order", orderSchema);

module.exports = {
    Company,
    Order,
}