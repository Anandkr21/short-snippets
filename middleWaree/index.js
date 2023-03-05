const express=require('express');
const app=express();
const fs=require('fs')
const {routeLogger}=require('./middleware/logger.middleware')
const port= process.env.PORT || '5000';

app.use(routeLogger);

app.get('/', (req,res) =>{
    console.log('Home page')
    res.send('Welcome');
})

app.get('/home', (req,res) =>{
    console.log('Home page')
    res.send('Homepage')
})

app.get('/about', (req,res) =>{
    console.log('about page')
    res.send('ABout')
})

app.get('/contact', (req,res) =>{
    console.log(' contact page')
    res.send('Contact')
})

app.get('/data', (req,res) =>{
    let data=fs.readFileSync('./data.json' ,'utf-8');
    res.send(data)
})

app.delete('/delete', (req,res) =>{
    const data=fs.readFileSync('./data.json','utf-8');
    const parse_data=JSON.parse(data);
    parse_data.students.pop(req.body);
    
    fs.writeFileSync('./data.json', JSON.stringify(parse_data));
    console.log(parse_data)
    res.send('data deleted');
})

app.listen(port, () =>{
    console.log(`Server is running http://localhost:${port}`)
})