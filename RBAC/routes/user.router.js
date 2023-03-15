const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const { User } = require('../model/user.model');
const { authMiddleware } = require('../middlewares/authentication');
const { authorise } = require('../middlewares/authorise');

require('dotenv').config()

const userRouter = express.Router()

userRouter.post('/signup', async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        } else {

            // Create a new user
            const hashed_password = bcrypt.hashSync(password, 5)
            const user = new User({ email, password: hashed_password, role });
            await user.save();

            res.json({ message: 'User created successfully' });
        }
    } catch (error) {
        res.send("something went wrong")
    }
});


userRouter.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Find the user by username
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Compare the password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Create a JWT
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: 60
        });

        // Create a Refresh JWT token
        const refreshtoken = jwt.sign({ userId: user._id }, process.env.REFRESH_JWT_TOKEN, {
            expiresIn: 360
        });

        res.json({ msg: "login successful", token, refreshtoken });
    } catch (error) {
        console.log(error);
    }
});



userRouter.get('/getnewtoken', (req, res) => {
    const refresh_token = req.headers.authorization.split(' ')[1]

    if (!refresh_token) {
        res.send('login again plz')
    }

    jwt.verify(refresh_token, process.env.REFRESH_JWT_TOKEN, (err, decoded) => {
        if (err) {
            res.send("login again first.")
        } else {
            // Create a JWT
            const token = jwt.sign({ userId: decoded.userId }, process.env.JWT_SECRET, {
                expiresIn: 60
            });
            res.send({ msg: "login successfull", token })
        }
    })

    res.send("new normal token")
})


// irrespective of the role , anyone should access
userRouter.get('/notes', authMiddleware, (req, res) => {
    res.send('notes...')
})


//customers
userRouter.get('/reports', authMiddleware, authorise(["customer"]), (req, res) => {
    const role = req.user.role
    if (role === "customer") {
        res.send('reports..')
    } else {
        res.send("not authorized")
    }
})


//sellers
userRouter.get('/sellproject', authMiddleware, authorise(["seller"]), (req, res) => {
    const role = req.user.role
    if (role === "seller") {
        res.send('project..')
    } else {
        res.send("not authorized")
    }
})


//seller or admin
userRouter.get('/xyz', authMiddleware, authorise(["seller", "admin"]), (req, res) => {
    res.send('only seller and admiin can access')
})

//admins
userRouter.get('/stats', authMiddleware, authorise(["admin"]), (req, res) => {
    res.send('statistic..')
})

userRouter.get('/logout', (req, res) => {
    const token = req.headers.authorization?.split(" ")[1]
    const blacklist_data=JSON.parse(fs.readFileSync('./blacklist.json', 'utf-8'))
    blacklist_data.push(token)
    fs.writeFileSync('./blacklist.json', JSON.stringify(blacklist_data))
    res.send("Logout Successfull")
})


module.exports = { userRouter }
