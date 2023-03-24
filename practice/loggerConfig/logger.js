const {createLogger, format, transports}= require("winston");
const {combine, timestamp, label, printf}= format;
const myFormat = printf(({level, message, label, timestamp}) =>{
    return `${timestamp} [${label}] ${level}: ${message}`

})

const logger = createLogger({
    format: combine(
        label({ label: 'logger'}),
        timestamp(),
        myFormat
    ),
    transports: [new transports.File({
        filename:'app.log',
        level:'info'
    })]
});

function logRequest(req, res, next){
    const IP = req.socket.remoteAddress
    const Method = req.method 
    const url = req.url;
    console.log(Method, url, IP)
    logger.log({
        level: 'info',
        message: `A ${Method} request made on ${url} from IP ${IP}`
    })
    next()
}

module.exports = {logRequest, logger}