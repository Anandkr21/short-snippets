const express = require('express')
const connectDatabase = require('./config/db')
const Companies = require('./controllers/companies')
const Orders = require('./controllers/orders')
const Stats = require('./controllers/stats')
const dotenv = require('dotenv')
const { logRequest } = require('./loggerConfig/logger')

dotenv.config({path:"./src/config/config.env"})

const app = express()

app.use(logRequest)

app.use(express.json())

const port = process.env.port || 8000;

app.use('/api/v1', Companies)
app.use('/api/v1',Orders)
app.use('/api/v1',Stats)


app.listen(port, async() =>{
    console.log(`server is running ${port}`)
    try {
        await connectDatabase()
        console.log('connected to DB')
    } catch (error) {
        console.log(error)
    }
})