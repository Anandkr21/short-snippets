const express=require('express');
const {connection}=require('./configs/db')
const {UserModel} =require('./model/user.model')

const app=express()

app.use(express.json())

app.get('/', (req,res) =>{
    res.send('HOME PAGE')
})

app.post('/register', async(req,res) =>{
    const userDetail=req.body
    try {
        const user=new UserModel(userDetail)
        await user.save()
        res.send({"msg":"User has been Registerd Successfully."})
    } catch (err) {
        res.send({"msg":"Something went wrong", "error":err.message})
    }
})

app.post('/login', async(req,res) =>{
    const {email,pass}=req.body
    try {
        const user=await UserModel.find({email,pass})
        if(user.length>0){
            res.send({"msg":"LogIn Successfull !"})
        }else{
            res.send({"msg":"Wrong Credentials"})
        }
    } catch (err) {
        res.send({"msg":"Something went wrong", "error":err.message})
    }
})


app.listen(8080, async()=>{
    try {
        await connection
        console.log('Connected to DB');
    } catch (error) {
        console.log(error);
    }
    console.log("Server is running at port http://localhost:8080")
})