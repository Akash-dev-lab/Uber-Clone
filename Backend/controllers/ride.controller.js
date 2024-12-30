const rideService = require('../services/ride.service')
const {validationResult} = require('express-validator')
const mapServices = require('../services/maps.service')
const {sendMessageToSocketId} = require('../socket')
const rideModel = require('../models/ride.model')

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req.body)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    
    if (!req.user || !req.user._id) {
        return res.status(401).json({ message: "User not authenticated" });
    }

    const {pickup, destination, vehicleType} = req.body

    try {
        const ride = await rideService.createRide({user: req.user._id, pickup, destination, vehicleType})

        const pickupCoordinates = await mapServices.getAddressCoordinate(pickup)

        // console.log(pickupCoordinates)

        // Validate coordinates
        if (!pickupCoordinates || !pickupCoordinates.ltd || !pickupCoordinates.lng) {
            return res.status(400).json({
                message: "Invalid pickup coordinates"
            });
        }

        const captainsInRadius = await mapServices.getCaptainInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 2) // radius in miles

        console.log(captainsInRadius)

        ride.otp = ""

        const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user')

        captainsInRadius.map(captain => {

            console.log(captain, rideWithUser)

            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser
            })
        })

        return res.status(201).json({
            message: 'Ride created successfully',
            success: true,
            data: {
                ride,
                coordinates: pickupCoordinates,
                captainsFound: captainsInRadius.length
            }
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: err.message, success: false, details: err.stack })
    }
}

module.exports.getFare = async (req, res) => {
    const errors = validationResult(req.body)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const {pickup, destination} = req.query

    try {
        const fare = await rideService.getFare(pickup, destination)
        return res.status(200).json(fare)
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req.body)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const {rideId} = req.body

    try {
        const ride = await rideService.confirmRide(rideId, req.captain._id)

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        })

        return res.status(200).json(ride)
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}