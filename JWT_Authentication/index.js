const express = require('express');
const jwt = require('jsonwebtoken');
const { connection } = require('./configs/db')
const { UserModel } = require('./model/user.model')


const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('HOME PAGE')
})

app.post('/register', async (req, res) => {
    const userDetail = req.body
    try {
        const user = new UserModel(userDetail)
        await user.save()
        res.send({ "msg": "User has been Registerd Successfully." })
    } catch (err) {
        res.send({ "msg": "Something went wrong", "error": err.message })
    }
})

app.post('/login', async (req, res) => {
    const { email, pass } = req.body
    const token = jwt.sign({ course: 'backend' }, 'anand');
    try {
        const user = await UserModel.find({ email, pass })
        if (user.length > 0) {
            res.send({ "msg": "LogIn Successfull !", "token": token })
        } else {
            res.send({ "msg": "Wrong Credentials" })
        }
    } catch (err) {
        res.send({ "msg": "Something went wrong", "error": err.message })
    }
})


app.get('/data', (req, res) => {
    const token = req.headers.authorization;
    // verify a token symmetric
    jwt.verify(token, 'anand', (err, decoded) => {
        if (decoded) {
            res.send({ "msg": "data is here" })
        } else {
            res.send({ "msg": "Something went wrong !", "error": err.message })
        }
    });
})

app.get('/cart', (req, res) => {
    const token = req.headers.authorization;
    // verify a token symmetric
    jwt.verify(token, 'anand', (err, decoded) => {
        if (decoded) {
            res.send({"msg":"your cart data is here"})
        } else {
            res.send({"msg":"Something went wrong !", "error":err.message})
        }
    });
})

app.get('/about', (req, res) => {
    res.send('about page')
})

app.listen(8080, async () => {
    try {
        await connection
        console.log('Connected to DB');
    } catch (error) {
        console.log(error);
    }
    console.log("Server is running at port http://localhost:8080")
})