const express=require('express');
const app=express();
const fs=require('fs');
const port= process.env.PORT || '4500';

app.use(express.json()) // middleware

app.get('/', (req,res) =>{
    res.setHeader('Content-type','text/html')
   res.send('<h1>Hello</h1>')
})

app.get('/data', (req,res) =>{
    const dataStream=fs.createReadStream('./data.json', 'utf-8');
    dataStream.pipe(res)
})

app.post('/add', (req,res) =>{
    console.log(req,body)
    res.send('data is added')
})

app.get('/student', (req,res) =>{
    const data = fs.readFileSync('./data.json', 'utf-8');
    const parse_data = JSON.parse(data);
    res.send(parse_data.students);
})

app.get('/teacher', (req,res) =>{
    const data=fs.readFileSync('./data.json', 'utf-8');
    const data_parse=JSON.parse(data);
    res.send(data_parse.teachers);
})

app.post('/addstudent', (req,res) =>{
    //step 1: Read the file
    const data=fs.readFileSync('./data.json', 'utf-8');
    //step 2: Parse the data first
    const data_parse=JSON.parse(data);
    //step 3: Push the data into body.
    data_parse.students.push(req.body);
    //step 4: write into the file.
    fs.writeFileSync('./data.json', JSON.stringify(data_parse));
    res.send('data is sent.')
})


app.delete('/delete/:type,name', (req,res) =>{
    const data=fs.readFileSync('./data.json', 'utf-8');
    const parse_data=JSON.parse(data);
    let parms=req.params;
    console.log(parms)
    // console.log(parse_data.students);
    const newStudent=parse_data.students.filter((ele) =>{
        
        return ele.name!==parms.name;
    })
   parse_data.students=newStudent;
   fs.writeFileSync("./data.json",JSON.stringify(parse_data),"utf-8", (err) =>{
        if(err)
        {
            console.log(err);
        }
   })

    res.end('data-deleted')
})

app.listen(port, ()=>{
    console.log(`Server is running at http://localhost:${port}`);
})