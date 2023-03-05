const routeLogger=(req,res,next) =>{
    const start=new Date().getTime();
    next();
    const end= new Date().getTime();
    fs.appendFileSync('./routeDetails.txt', `Route visited: ${req.url} |  Method: ${req.method} |  Response ${end-start}ms \n`)
}

module.exports={
    routeLogger
}