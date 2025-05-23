const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const userController = require("../controllers/user.controller")
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/register' , [
    body('email').isEmail().withMessage("invalid Email"),
    body('fullName.firstName').isLength({min: 3}).withMessage("First Name must be contain at list 3 Characters"),
    body('password').isLength({min: 6}).withMessage("password must be contain at list 6 Characters")
],
    userController.registerUser
)

router.post('/login' , [
    body('email').isEmail().withMessage('invalid Email'),
    body('password').isLength({min: 6}).withMessage("password must be contain at list 6 Characters")
],
    userController.loginUser
)

router.get('/profile' , authMiddleware.authUser , userController.getProfile)

router.get('/logOut' , authMiddleware.authUser , userController.logoutUser)

module.exports = router;