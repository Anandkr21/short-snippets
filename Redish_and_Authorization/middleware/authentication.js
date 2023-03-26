const jwt = require("jsonwebtoken");
require("dotenv").config();
const { UserModel } = require("../model/user.model");
const { blacklist } = require("../model/blacklist.model");
const { blacklist1 } = require("../config/blacklist")
const { redisclient } = require("../config/redis")


const authMiddleware = async (req, res, next) => {

  try {
    // const token = req.headers.authorization.split(" ")[1];
    let cookieemail = req.cookies.email
    let tokens = JSON.parse(await redisclient.GET(cookieemail))
    let blockedtoken = await redisclient.HGET("blocked", cookieemail)
    if (blockedtoken == tokens.token) {
      return res.send("Please Login Again")
    }

    const decodedToken = jwt.verify(tokens.token, process.env.JWT_SECRET);
    const { userId } = decodedToken;

    // Check if the user exists
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    // Attach the user to the request object
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized', err: error.message });
  }
};


module.exports = {
  authMiddleware,
};
