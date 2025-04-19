const backlistModel = require('../models/blacklist.model')
const userModel = require('../models/user.model')
const userService = require('../services/user.service')
const { validationResult } = require('express-validator')
const BlacklistModel = require('../models/blacklist.model')

module.exports.registerUser = async(req , res , next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }

    console.log(req.body);
    

    const { fullName , email , password} = req.body;

    const hashedPassword = await userModel.hashPassword(password);
    
    const user = await userService.createUser({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email,
        password: hashedPassword
    })
    
    const token = await user.generateAuthToken() 

    res.status(201).json({ token , user });
}

module.exports.loginUser = async(req , res , next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }

    const { email , password} = req.body;

    const user = await userModel.findOne({email}).select('+password')

    console.log(user);
    

    if(!user){
        res.status(401).json({massage: "invalid email or password"})
    }

    const isMatch = await user.comparePassword(password)

    if(!isMatch){
        res.status(401).json({massage: "invalid email or password"})
    }

    const token = await user.generateAuthToken()

    res.cookie( 'token' , token , {
        httpOnly: true,
        secure: process.env.NODE_ENV == 'production',
        maxAge: 3600000
    });

    res.status(200).json({ token , user })
}

module.exports.getProfile = async (req , res , next) => {
    console.log(req.user);
    
    res.status(201).json(req.user)
}

module.exports.logoutUser = async(req , res , next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]
    
    await BlacklistModel.create({token})
    res.clearCookie('token');

    res.status(200).json({massage: "Logged Out"})
}