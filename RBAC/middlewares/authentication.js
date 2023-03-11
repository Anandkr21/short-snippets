const jwt = require('jsonwebtoken');
const {User}= require('../model/user.model')
const {blacklist}= require('../config/blackllist')
require('dotenv').config()

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if(blacklist.includes(token)){
      return res.send('Please Login again')
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedToken)
    const { userId } = decodedToken;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Attach the user to the request object
    req.user = user;

    next();
  } catch (error) {
    console.log(error)
    return res.status(401).json({ message: 'Unauthorized', err : error.message });
  }
};

module.exports = { authMiddleware };