const userModel = require('../models/user.model')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const blacklistModel = require('../models/blacklist.model')

module.exports.authUser = async(req , res , next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]

    if(!token){
        return res.status(401).json({ message: "Unauthorized"})
    }

    const isblackisted = await userModel.findOne({ token: token });
    
    if (isblackisted) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token , process.env.JWT_SECRET)
        const user = await userModel.findById(decoded._id)

        req.user = user;

        return next();

    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" })
    }
}