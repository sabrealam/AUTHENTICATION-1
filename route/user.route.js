const userRouter = require("express").Router();
const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config()


userRouter.get(`/` , async (req, res) => {
    const user = await User.find();
    res.send(user);
});


userRouter.post("/register", async (req, res) => {
    let { name, email, password } = req.body;
    try {
        let user = await User.findOne({email})
        if(user) return res.status(`400`).send({message : `User already exists Please login` , user : user , });
        bcrypt.hash(password, 10, async (err, hash) => {
            if(err) throw new Error;
            user = await User.create({name, email, password : hash});
            
            res.json({message : `User created successfully`, user : user});
        });
    } catch (error) {
        res.status(500).send({def : `From Catch --> Register` , error : error});
    }
 
});

userRouter.post("/login", async (req, res) => {
    let {name ,  email, password } = req.body;

    try {
        let user = await User.findOne({email});
        if(!user) return res.status(400).send({message : `User does not exists`});
         
        let match = await bcrypt.compare(password, user.password);
        if(!match) return res.status(400).send({message : `Invalid credentials`});
        // user.id = user._id.toString();
        // let token = jwt.sign({ id : user._id.toString() } , process.env.SECRET_KEY);
    let token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: { id : user._id.toString()  }
          }, process.env.SECRET_KEY);

        res.json({message : `Login successful`, token : token, user : user});
    } catch (error) {
        res.status(500).send({def : `From Catch --> Login` , error : error});
    }
})

module.exports = userRouter