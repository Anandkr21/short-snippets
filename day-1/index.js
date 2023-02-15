//to create package.json shorcut =>   npm init -y 
//to create package-lock.json  =>  npm i is-even


const newappend = require('fs')

newappend.appendFile('text.txt', ' This is my first line \n', (err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log('appended');
    }
})

newappend.appendFile('text.txt', 'this is my second line.',(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('appended');
    }
})