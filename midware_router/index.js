const express=require('express');
const fs=require('fs');
const app=express();
// const cors=require('cors');
const {studentRouter}=require('./routes/student.routes');
const {teacherRouter}=require('./routes/teacher.routes');
const {routeLogger}=require('./middlware/logger.middlewares')
const port='8080';


app.use(express.json()); // middleware
// app.use(cors());
app.use(routeLogger);

app.use('/student',studentRouter);
app.use('/teacher',teacherRouter);

app.get('/', (req,res) =>{
    res.setHeader('Content-type','text/html');
    res.send('<h1>Welcome to college website</h1>')
})

app.get('/data', (req,res) =>{
    const data=fs.readFileSync('./data.json', 'utf-8');
    res.send(data)
})

app.listen(port, () =>{
    console.log(`Server is running at http://localhost:${port}`)
})