const express=require('express')
const {connection}=require('./db')
const {userRouter} = require('./routes/user.routes')

const app=express()

app.use(express.json())

app.get('/', (req,res) =>{
    res.send('Welcome')
    console.log('HOME PAGE')
})

app.use('/users', userRouter)

app.listen(8888, async() =>{
    try {
        await connection
        console.log('Connected to DB')
    } catch (err) {
        console.log(err.message)
    }
    console.log('running at port 8888');
})