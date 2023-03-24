const express = require("express")
const client = require('../cache')
const {Order} = require('../models/models')
const router = express.Router();


router.post('orders', (req,res) =>{
    const symbol = req.body.company_symbol;
    const today = new Date().toISOString().split("T")[0];
    const cacheKey = `Company: ${symbol}: stats: ${today}`;

    client.del(cacheKey)

    let createdOrder = Order.create(req.body)
    res.send({msg: "Order placed", data:createdOrder})
})


router.get('/orders', async(req, res) =>{
    let ordersData = await Order.find()
    res.send({msg: "Orders details", data:orderData})
});


router.delete('/orders/:id', async(req, res) =>{
    let orderData = await Order.findByIdAndDelete(req.params.id)
    res.send({msg: "order deleted", data:orderData})
})


module.exports = router