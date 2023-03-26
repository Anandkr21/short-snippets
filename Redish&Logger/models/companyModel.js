const mongoose = require("mongoose")

const companySchema = mongoose.Schema({
    name: String,
    symbol: String
})

const CompanyModel = new mongoose.model("companydata", companySchema)

module.exports = { CompanyModel }