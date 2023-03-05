const express=require('express');
const teacherRouter=express.Router();
const fs=require('fs');
const { parse } = require('path');

//----------------GET data-------------------//

teacherRouter.get('/getteacher', (req,res) =>{
    const data=fs.readFileSync('./data.json', 'utf-8')
    const parse_data=JSON.parse(data)
    res.send(parse_data.teacher);
    
})

//----------------POST data-------------------//

teacherRouter.post('/addteacher', (req,res) =>{
    const data=fs.readFileSync('./data.json', 'utf-8');
    const parse_data=JSON.parse(data);
    parse_data.teacher.push(req.body);
    fs.writeFileSync('./data.json', JSON.stringify(parse_data));
    res.send('data added');
})

//----------------DELETE data-------------------//


teacherRouter.delete('/:id', (req,res) =>{
    const id=req.params.id;
    const data=fs.readFileSync('./data.json', 'utf-8');
    const parse_data=JSON.parse(data);
    const filterdata=parse_data.teacher.filter((el) =>{
        return el.id !== id;
    })
    parse_data.teacher=filterdata;
    fs.writeFileSync('./data.json', JSON.stringify(parse_data));
    res.send('data has been deleted.')
})

//----------------PATCH data-------------------//


teacherRouter.patch('/:id', (req,res) =>{
    const id=req.params.id;
    const data=fs.readFileSync('./data.json', 'utf-8');
    parse_data=JSON.parse(data);
    const Updateddata=req.body;
    parse_data.teacher.map((el) =>{
        if(el.id==id){
           if(Updateddata.city!==undefined){
            el.city=Updateddata.city;
           }
           if(Updateddata.course!==undefined){
            el.course=Updateddata.course;
           }
           if(Updateddata.name!==undefined){
            el.name=Updateddata.name;
           }
        }
    })

    fs.writeFileSync('./data.json', JSON.stringify(parse_data));
    res.send('Updated')
})

module.exports={
    teacherRouter
}