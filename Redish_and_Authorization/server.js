const express = require("express")
const { connection } = require("./config/db")
const { userRouter } = require("./router/user.router")

const { createClient } = require('redis');
const client = createClient();

const app = express()
require("dotenv").config()
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Welcome to home page")
})

app.use("/user", userRouter)



const PORT = process.env.port
app.listen(PORT, async (req, res) => {
    try {
        await connection
        await client.connect();
        console.log("Connected to DB")
    }
    catch (err) {
        console.log({ "msg": "Not connected DB", "error": err.message })
    }
    console.log(`Server running in ${PORT}`)
})