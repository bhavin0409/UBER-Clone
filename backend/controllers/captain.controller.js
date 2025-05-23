const { validationResult, cookie } = require('express-validator')
const captainModel = require('../models/captain.model')
const captainService = require('../services/captain.service')
const { verify } = require('jsonwebtoken');
const blacklistModel = require('../models/blacklist.model');


module.exports.registerCaptain = async (req, res, next) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { fullName, email, password, vehicle } = req.body;    

    const isCaptainAlreadyExist = await captainModel.findOne({ email });

    if (isCaptainAlreadyExist) {
        return res.status(401).json({ message: "captain is already exist" });
    }

    const hashedPassword = await captainModel.hashPassword(password);

    

    const captain = await captainService.createCaptain({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
    });

    const token = await captain.generateAuthToken();    

    res.status(201).json({ token , captain });
};

module.exports.loginCaptain = async (req , res , next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email , password} = req.body;

    const captain = await captainModel.findOne({email}).select('+password')

    if(!captain){
        res.status(401).json({message : 'Invalid Email or Password'});
    }
    
    const ismatch = await captain.comparePassword(password);

    if(!ismatch){
        res.status(401).json({message : 'Invalid Email or Password'});
    }

    const token = await captain.generateAuthToken();

    res.cookie('token' , token);

    res.status(201).json({token  , captain})

}

module.exports.getCaptainProfile = async(req , res ,next) => { 
    res.status(201).json({captain : req.captain})
}

module.exports.logoutCaptain = async(req , res , next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]

    await blacklistModel.create({ token });

    res.clearCookie('token');

    res.status(200).json({ message : 'Logout Successfully'});
}
