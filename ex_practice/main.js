const fs = require('fs');
const cowsay = require('cowsay');
const dns = require('node:dns')

exports.writeToFile = (website) => {
    dns.lookup(website, (err, address, family) => {
        if (err) {
            console.log(err)
        } else {
            fs.appendFileSync('./data.txt', `URL: ${website} | Address :${address} | IPv${family}\n`)
        }
    })
}

exports.readFromFile = (filename) =>{
    fs.readFile(filename, 'utf-8',(err,data) =>{
        if(err){
            console.log(err)
        }else{
            console.log(data)
        }
    })
}


exports.cowSay = (filename)=>{
    fs.readFile(filename, 'utf-8', (err,data) =>{
        if(err){
            console.log(err);
        }else{
            console.log(cowsay.say({text:data}))
        }
    })
}


exports.deleteFile = (filename) =>{
    fs.unlink(filename,(err) =>{
        if(err){
            console.log(err)
        }else{
            console.log(`${filename} deleted.`)
        }
    } )
}