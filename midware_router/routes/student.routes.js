const express=require('express');
const studentRouter=express.Router();
const fs=require('fs');

//----------------GET data-------------------//

studentRouter.get("/getstudent", (req,res) =>{
    const data=fs.readFileSync('./data.json', 'utf-8')
    const parse_data=JSON.parse(data)
    res.send(parse_data.student);
})

//----------------POST data-------------------//

studentRouter.post('/addstudent', (req,res) =>{
    const data=fs.readFileSync('./data.json', 'utf-8');
    const parse_data=JSON.parse(data)
    parse_data.student.push(req.body);
    fs.writeFileSync('./data.json', JSON.stringify(parse_data));
    res.send('data has been sent.')
})

//----------------DELETE data-------------------//

studentRouter.delete('/:roll', (req,res) =>{
    const roll=req.params.roll;
    let data=fs.readFileSync('./data.json', 'utf-8');
    const parse_data=JSON.parse(data);
    const filterdata= parse_data.student.filter((el) =>{
        return el.roll !== roll;
    })
    parse_data.student=filterdata;
    fs.writeFileSync('./data.json', JSON.stringify(parse_data));
    res.send('data deleted')
})


//----------------PATCH data-------------------// 

studentRouter.patch('/:roll', (req,res) =>{
    const roll=req.params.roll;
    const data=fs.readFileSync('./data.json', 'utf-8');
    const parse_data=JSON.parse(data);
    const Updateddata=req.body;
    parse_data.student.map((el) =>{
        if(el.roll==roll){
            if(Updateddata.name!==undefined){
                el.name=Updateddata.name;
               }
            if(Updateddata.course!==undefined){
                el.course=Updateddata.course;
            }        
           if(Updateddata.city!==undefined){
            el.city=Updateddata.city;
           }
        }
    })

    fs.writeFileSync('./data.json', JSON.stringify(parse_data));
    res.send('Updated')
})


// exporting data
module.exports={
    studentRouter
}