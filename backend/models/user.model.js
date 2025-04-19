const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minLength: [3 , "First Name must be contain at list 3 Characters"]
        },
        lastName: {
            type: String,
            minLength: [3 , "Last Name must be contain at list 3 Characters"]
        }
    },
        email: {
            type: String,
            required: true,
            unique: true,
            minLength: [5 , "Email must be contain at list 5 Characters"]
        },
        password: {
            type: String,
            required: true,
            select: false,
            minLength: [6 , "password must be contain at list 6 Characters"]
        },
        socketId: {
            type:String,  
        }
    
})

userSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign(
        { _id: this._id }, 
        process.env.JWT_SECRET, 
        { expiresIn: '24h' }
    ); 
    return token;
};

userSchema.methods.comparePassword = async function (password) {
    return await bcryptjs.compare(password , this.password);
}

userSchema.statics.hashPassword = async function (password) {
    return await bcryptjs.hash(password , 10)
}

const userModel = mongoose.model('user' , userSchema)

module.exports = userModel;