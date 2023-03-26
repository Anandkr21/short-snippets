const express = require("express")
require("dotenv").config()
const { connection } = require("./configs/db")
const { company } = require("./routes/companyRoute")
const { order } = require("./routes/orderRoute")
const { stat } = require("./routes/stats")
const app = express();
app.use(express.json())

app.get("/", (req, res) => {
    res.send("welcome")
})

app.use("/company", company)
app.use("/order", order)
app.use("/", stat)


app.listen((process.env.port), async () => {
    try {
        await connection
        console.log("DB is connected");
    } catch (error) {

    }
    console.log("server is connected");
})