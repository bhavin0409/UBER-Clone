const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const captainController = require('../controllers/captain.controller')

router.post('/register' , [
    body('email').isEmail().withMessage('invalid email'),
    body('fullName.firstName').isLength({min: 3}).withMessage('FirstName must be at least 3 characters log'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters log'),
    body('vehicle.color').isLength({min: 3}).withMessage('Color must be at least 3 characters log'),
    body('vehicle.plate').isLength({min: 3}).withMessage('Plate must be at least 3 characters log'),
    body('vehicle.capacity').isInt({min : 1}).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car' , 'motorcycle' , 'auto']).withMessage('Vehicle Type must be one of the following: car, motorcycle, auto'),
] ,
    captainController.registerCaptain
)

module.exports  = router