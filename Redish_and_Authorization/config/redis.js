const redis=require('redis');

const redisclient = redis.createClient({
  url:"redis://default:SVuofnSXwQ8GjvrbeHPh6APZxsnLh1Yr@redis-15695.c256.us-east-1-2.ec2.cloud.redislabs.com:15695"
});

try{
  redisclient.connect()
}
catch(err){
  console.log(err.message)
}

module.exports={
    redisclient
}