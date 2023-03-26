const { Router } = require("express")
const { OrderModel } = require("../models/ordermodel")
const order = Router()

order.get("/all", async (req, res) => {
    try {
        let data = await OrderModel.find()
        res.send(data)
    } catch (error) {
        res.send(error)
    }
})

order.post("/create", async (req, res) => {
    try {
        let payload = req.body;
        let data = OrderModel(payload)
        await data.save()
        res.send("Order Added")
    } catch (error) {
        res.send(error)
    }
})

order.delete("/delete/:id", async (req, res) => {
    try {
        let ID = req.params.id
        await OrderModel.findByIdAndDelete({ _id: ID })
        res.send(`Order data Deleted with the respected ${ID}`)
    } catch (error) {
        res.send(error)
    }
})

order.patch("/update/:id", async (req, res) => {
    try {
        let ID = req.params.id
        let payload = req.body
        await OrderModel.findByIdAndUpdate({ _id: ID }, payload)
        res.send(`Order data Updated with the respected ${ID}`)
    } catch (error) {
        res.send(error)
    }
})

module.exports = { order }