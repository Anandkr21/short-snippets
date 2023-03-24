const {response} = require('express')
const express = require('express')
const client = require('../cache')
const { logger } = require('../loggerConfig/logger')
const {Company} = require('../models/models')
const router = express.Router()

router.post('/companies', async(req,res) =>{
    let data = Company.create(req.body)

    res.send({msg: "Company Created", data})
})

router.get("/companies", async(req,res) =>{
    let cSymbol = req.params.symbol;
    let companiesData = await Company.find()

    res.send({msg: "Companies data", data:companiesData})
});

router.put("/companies/:id", async(req,res) =>{
    let updateCompany = await Company.findByIdAndUpdate(req.params.id, req.body, {new:true})
    res.send({msg: 'Company Updated', data:updateCompany})
})

router.delete("/companies/:id", async(req, res) =>{
    let deletedCompany = await Company.findByIdAndDelete(req.params.id)
    res.send({msg:"Company deleted", data:updateCompany})
})

module.exports = router