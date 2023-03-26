const { Router } = require("express")
const { CompanyModel } = require("../models/companyModel")
const company = Router()

company.get("/all", async (req, res) => {
    try {
        let data = await CompanyModel.find()
        res.send(data)
    } catch (error) {
        res.send(error)
    }
})

company.post("/create", async (req, res) => {
    try {
        let payload = req.body;
        let data = CompanyModel(payload)
        await data.save()
        res.send("Company Added")
    } catch (error) {
        res.send(error)
    }
})

company.delete("/delete/:id", async (req, res) => {
    try {
        let ID = req.params.id
        await CompanyModel.findByIdAndDelete({ _id: ID })
        res.send(`Company data Deleted with the respected ${ID}`)
    } catch (error) {
        res.send(error)
    }
})

company.patch("/update/:id", async (req, res) => {
    try {
        let ID = req.params.id
        let payload = req.body
        await CompanyModel.findByIdAndUpdate({ _id: ID }, payload)
        res.send(`Company data Updated with the respected ${ID}`)
    } catch (error) {
        res.send(error)
    }
})

module.exports = { company }