const express = require('express');
const { connection } = require('./config/db');
const { userRouter } = require('./routes/user.router')

require('dotenv').config()

const app = express()
app.use(express.json())


app.get('/', (req, res) => {
  res.send('welcome')
})

app.use('/user', userRouter)


app.listen(process.env.port, async () => {
  try {
    await connection
    console.log('conndected to DB')
  } catch (err) {
    console.log('error to connecting DB')
    console.log(err)
  }
  console.log(`Server is running at http://localhost:${process.env.port}`)
})