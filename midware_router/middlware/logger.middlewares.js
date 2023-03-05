const routeLogger=(req,res,next) =>{
    const start=new Date().getTime();
    next();
    const end=new Date().getTime();
    fs.appendFileSync('./routeDetails.txt', `Route Visited: ${req.url} 
    | Method: ${req.method} | Response Time: ${end-start}ms. \n`);
}

module.exports={
    routeLogger
}