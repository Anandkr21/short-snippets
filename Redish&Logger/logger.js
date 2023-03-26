const express = require("express")
const winston = require('winston');
const app = express()

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log', level: 'details' }),
  ],
});


app.get("/error", (req, res) => {
  logger.log("error", "Logged a error")
  res.send("Logged a error")
})