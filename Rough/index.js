// some short snippet for signup
const fs = require('fs');

const signupUser=async(req,res) =>{
    try {
        const {email, password, name, role} = req.body;
        const isUserPresent = await User.findOne({email});

        if(isUserPresent){
            return res.send("User is already present, login please.");
        }

        const hash = await bcrypt.hashSync(password, 8);
        const newUser = new User({ name, email, password, hash, role});

        await newUser.save();
        res.send('Signup Successfully.')

    } catch (err) {
        res.send(err.message)
    }
}

module.exports = {signupUser}




// some short snippet for Login
const LoginUser = async (req,res) =>{
    try {
        const { email, password } = req.body;
        const isUserPresent = await User.findOne({email});

        if(!isUserPresent){
            return res.send("User not present, register please.")
        }
        const isPasswordCorrect = await bcrypt.compareSync(
            password,
            isUserPresent.password
        );

        if(!isPasswordCorrect){
            return res.send("Invalid credentials");
        }

        const token = await jwt.sign(
            { email, userId: isUserPresent._id, role: isUserPresent.role},
            "authsecret",
            { expiresIn: " 10m "}
        );
        const refreshToken = await jwt.sign(
            {email, userId: isUserPresent._id },
            "refreshtokensecret",
            { expiresIn: "1h" }
        );
        
        res.send({ msg: "Login successfully.", token, refreshToken});
    } catch (error) {
        res.send(error.message);
    }
};

module.exports = { LoginUser }






// Authentication goes here 

const jwt = require("jsonwebtoken");
const { isPromise } = require('util/types');

const authentication = async(req, res, next) =>{
    try {
        const token = req?.headers?.authorization.split(' ')[1];
        if(!token){
            res.status(401).send({msg: "Please login again."});
            // throw new Error("Please login again."); 
        }
        const isTokenValid = await jwt.verify(token, "authsecret");
        if(!isTokenValid){
            return res
            .status(403)
            .send({msg: "Authentication failed, please login agian."});
        }

        req.body.userId = isTokenValid.userId;
        req.body.email = isTokenValid.email;
        req.body.role = isTokenValid.role;
        next();
    } catch (error) {
        res.send({msg: "Please login.", err: error.message });
    }
};

module.exports = { authentication }



