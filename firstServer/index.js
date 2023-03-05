const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if (req.url === "/data") {
        fs.readFile("./text.txt", { encoding: "utf-8" }, (err, data) => {
            if (err) {
                res.write("No data\n")
                res.end(err)
            } else {
                res.end(data)
            }
        })
    }
})

server.listen(4500, () => {
    console.log("Listening on the port 4500")
})

// const server=http.createServer((req,res)=>{
//     if(req.url==="/"){
//     res.setHeader("Content-type", "text/html") //Header to specify that the reposnse is in HTML form
//     res.end("<h1>Hello Guys!!</h1>")
//     }
//     })
//     server.listen(4500,()=>{
//     console.log("Listening on the port 4500")
// })
    

// const server = http.createServer((req,res) =>{
//     if(req.url === '/'){
//         res.end('You are all set, you can go further.')
//     }else if(req.url === '/home'){
//         fs.readFile('./dummy.json','utf-8', (err,data) =>{
//             if(err){
//                 console.log(err);
//             }else{
//                 res.end(data)
//             }
//         })

//     }else if(req.url === '/contact'){
//         fs.readFile('./photo.json','utf-8', (err,data) =>{
//             if(err){
//                 console.log(err);
//             }else{
//                 res.end(data)
//             }
//         })

//     }else if(req.url === '/blog'){
//         res.end('This is our wonderful blog.')
//     }else{
//         res.end(http.STATUS_CODES['404']);
//     }
// })

// server.listen(3000, ()=>{
//     console.log('Server is running at port 3000');
// })