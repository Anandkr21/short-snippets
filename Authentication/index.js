const express=require('express');
const {connection}=require('./config/db')
const {userModel}=require('./model/user.model')

const app=express()

app.use(express.json())

app.get('/', (req,res) =>{
    res.send('HOME PAGE')
})

app.post('/register', async(req,res) =>{
    const userDetail=req.body
    try{
        const user = new userModel(userDetail)
        await user.save()
        res.send({'msg':'User Registered'})
    }catch(err){
        res.send({'msg':'Something went wrong', 'eroor':err.message})
    }
   
})

app.post('/login', async(req,res) =>{
    const {email,pass}=req.body
    try{
        const user=await userModel.find({email,pass})
        if(user.length>0){
            res.send({'msg':'Login Successful'})
        }else{
            res.send({'msg':'Wrong credentials.'})
        }
    }catch(err){ 
            res.send({"msg":"Something went wrong!"})
    }
})


app.listen(8080, async()=>{
    try{
        await connection
        console.log("Connectedto DB");
    }catch(err){
        console.log(err);
    }
    console.log('Server is running at 8080');
})