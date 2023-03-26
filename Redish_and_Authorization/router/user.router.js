const express = require("express")
const { UserModel } = require("../model/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const { authMiddleware } = require("../middleware/authentication")
const { redisclient } = require("../config/redis")
const { authorise } = require("../middleware/authorise")
const { application } = require("express")
const userRouter = express.Router()
require("dotenv").config()

userRouter.use(express.json())
userRouter.use(cookieParser())


userRouter.post("/register", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Check if user already exists
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const hashed_password = bcrypt.hashSync(password, 8)
    const user = new UserModel({ email, password: hashed_password, role });
    await user.save();

    res.json({ message: 'User created successfully' });
  } catch (error) {
    res.send("Something went Wrong not register");
  }
});


/* login code here */
userRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email })

    if (!user) {
      return res.status(401).json({ message: "Invalid Username or password" })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid Password" })
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECREt, {
      expiresIn: "1h"
    })
    const refresh_token = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "7d"
    })
    let obj = {
      token,
      refresh_token
    }
    await redisclient.SET(user.email, JSON.stringify(obj))
    res.cookie("email", `${user.email}`)
    res.send("login Successfully and cookie establish")
  }
  catch (error) {
    res.send("Something went wrong ")
    console.log(error);
  }
})


userRouter.get("/getnewtoken", (req, res) => {
  const refresh_token = redisClient.get(`refresh_token_${decoded.userId}`)
  console.log(refresh_token)
  if (!refresh_token) {
    res.send("login again")
    return;
  }

  jwt.verify(refresh_token, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
    if (err) {
      console.log(err)
      res.send("Please Login first ")

    }
    else {
      const token = jwt.sign({ userId: decoded.userId }, process.env.JWT_SECREt, {
        expiresIn: "1h"
      });
      res.send({ msg: "Login Successfull", token })
    }
  })
})

userRouter.get("/notes", authMiddleware, (req, res) => {
  res.send("notes.......")
})

//Super_admin
userRouter.get("/reports", authMiddleware, authorise(["Super-Admin"]), (req, res) => {
  console.log(req.user.role)
  res.send("reports.....")
})
//Admin
userRouter.get("/sellproject", authMiddleware, authorise(["Super-Admin", "Admin"]), (req, res) => {
  res.send("selling project....")
})
//users
userRouter.get("/stats", authMiddleware, authorise(["Super-Admin", "Admin", "user"]), (req, res) => {
  res.send("selling stats....")
})


userRouter.get("/logout", async (req, res) => {
  const payload = req.cookies.email
  const tokens = JSON.parse(await redisclient.GET(payload))
  console.log(tokens)
  await redisclient.HSET("blocked", payload, tokens.token)
  res.send("Logout Successfull and blocked token added in Redis")
});

module.exports = {
  userRouter
}