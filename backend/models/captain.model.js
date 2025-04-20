const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minLength: [3, "First Name must be contain at list 3 Characters"]
        },
        lastName: {
            type: String,
            minLength: [3, "Last Name must be contain at list 3 Characters"]
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: [5, "Email must be contain at list 5 Characters"],
        match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    password: {
        type: String,
        required: true,
        select: false,
        minLength: [6, "password must be contain at list 6 Characters"]
    },
    socketId: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vehicle:{
        color: {
            type: String,
            required: true,
            minLength: [3, "Color must be contain at list 3 Characters"]
        },
        plate: {
            type: String,
            required: true,
            minLength: [3, "Plate must be contain at list 3 Characters"]
        },
        capacity:{
            type: Number,
            required: true,
            min: [1, "capacity must be at list 1"]
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car' , 'motorcycle' , 'auto']
        }
    },
    location:{
        lat:{
            type:Number
        },
        lng:{
            type:Number
        }
    }
});

captainSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign(
        { _id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
    return token;
};

captainSchema.methods.generateAuthToken = async() => {
    const token = jwt.sign(
        { _id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
    return token;
}

captainSchema.methods.caparePassword = async(password) => {
    return await bcryptjs.compare(password , this.password)
}

captainSchema.statics.hashPassword = async(password) => {
    return await bcryptjs.hash(password , 10)
}

const captainModel = mongoose.model('Captain', captainSchema);

module.exports = captainModel;