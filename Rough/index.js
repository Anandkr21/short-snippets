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