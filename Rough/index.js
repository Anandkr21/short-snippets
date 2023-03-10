// some short snippet for signup

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






// Authentication goes here 
const jwt = require("jsonwebtoken");

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

