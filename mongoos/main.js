const mongoose=require('mongoose');

const main= async() =>{
    try{
        const connection= await mongoose.connect('mongodb://127.0.0.1:27017/');
        console.log('Connected to Mongo');

        // await StudentModel.insertMany([{name:'anna', age: 33, city:"cpr"}])

        const student = new StudentModel({
            name:'Pulkit',
            age:23,
            city:'delhi'
        })
        await student.save()
        console.log("inserted the data");

        // console.log('following is the DB');
        // const students= await StudentModel.find();
        // console.log(students);
        connection.disconnect();
        console.log("Disconnected");
    }catch(err){
        console.log(err);
    }
}

main();


//Creating structure of the data that I want to store in DB.

const studentSchema=mongoose.Schema({
    name:{type:String, required:true},
    age: {type:Number, required:true},
    city:{type:String, required:true},
},{
    versionKey:false
})

const StudentModel=mongoose.model('Student', studentSchema);