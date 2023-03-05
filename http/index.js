const http=require('http');
const fs=require('fs');

const server=http.createServer((req, res)=>{
    if(req.url==='/'){
        res.end('This is the home page.')
    }else if(req.url==='/data'){
        fs.readFile('./data.json', 'utf-8',(err,data) =>{
            if(err){
                res.end(err)
            }else{
                res.end(data)
            }
        })
    }else if(req.url==='/todos'){
        fs.readFile('./todo_data.json','utf-8',(err,data) =>{
            if(err){
                res.end(err)
            }else{
                res.end(data)
            }
        })
    }else if(req.url==='/adddata' && req.method==='POST'){
        res.body
        res.end('data added')
    }
    else{
        res.end(http.STATUS_CODES['404'])
    }
})


server.listen(4500, ()=>{
    console.log('server is running at 4500')
})