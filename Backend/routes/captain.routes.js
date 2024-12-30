const express = require('express')
const router = express.Router()
const {body} = require('express-validator')
const captainController = require('../controllers/captain.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const captainModel = require('../models/captain.model')

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min: 3}).withMessage('First name be at least 3 characters long'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({ min: 3}).withMessage('Color must be at least 3 characters long'),
    body('vehicle.plate').isLength({ min: 3}).withMessage('Plate must be at least 1'),
    body('vehicle.capacity').isInt({ min: 1}).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid vehical type'),
], captainController.registerCaptain)

router.post('/signup', async (req, res) => {
    try {
        const { firstname, lastname, email, password, vehicle } = req.body;

        const hashedPassword = await captainModel.hashPassword(password);

        const newCaptain = new captainModel({
            fullname: { firstname, lastname },
            email,
            password: hashedPassword,
            vehicle,
            location: {
                type: 'Point',
                coordinates: [0, 0]
            }
        });

        await newCaptain.save();

        const token = newCaptain.generateAuthToken();

        res.status(201).send({ token });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min: 6}).withMessage('Password must be at')
], captainController.loginCaptain)

router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile)

router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain)

module.exports = router