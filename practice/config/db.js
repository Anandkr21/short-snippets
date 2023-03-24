const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const connectDatabase = () => mongoose.connect("write mongoDB url")

module.exports = connectDatabase;
