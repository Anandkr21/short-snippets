const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const { UserModel } = require('../model/user.model')
const userRouter = express.Router()

userRouter.post('/register', async (req, res) => {
    const { name, email, pass } = req.body;
    try {
        bcrypt.hash(pass, 5, (err, hash) => {
            // Store hash in your password DB.
            if (err) {
                res.send({ 'msg': 'Something went wrong.', 'error': err.message })
            } else {
                const user = new UserModel({ name, email, pass: hash })
                user.save()
                res.send({ 'msg': 'New user has been register' })
            }
        });
    } catch (err) {
        res.send({ 'msg': 'Something went wrong.', 'error': err.message })
    }
})


userRouter.post('/login', async (req, res) => {
    const { email, pass } = (req.body)
    try {
        const user = await UserModel.find({ email})
        if (user.length > 0) {
            bcrypt.compare(pass, user[0].pass, (err, result) => {
                if (result) {
                    let token = jwt.sign({ course: "backend" }, "anand")
                    res.send({ 'msg': 'LogIn Successfull', "token": token });
                } else {
                    res.send({ "msg": "Something went wrong" })
                }
            });
        } else {
            res.send({ "msg": "Something went wrong" })
        }
    } catch (err) {
        res.send({ 'msg': 'Something went wrong.', 'error': err.message })
    }

})

module.exports = {
    userRouter
}