const { Server } = require('socket.io')
const userModel = require('./models/user.model')
const captainModel = require('./models/captain.model')

let io;

const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: [
                'http://localhost:5173', // Local development
                'https://4xm8lhrw-5173.inc1.devtunnels.ms' // Forwarded Dev Tunnel URL
            ],
            methods: ['GET', 'POST'],
            allowedHeaders: ['Authorization', 'Content-Type'],
            credentials: true
        }
    });

    io.on('connection', (socket) => {
        console.log(`New client connected: ${socket.id}`);

        socket.on('join', async (data) => {
            try {
                const { userId, userType } = data
                console.log(`User ${userId} joined as ${userType}`)
                if (userType === 'user') {
                    await userModel.findByIdAndUpdate(userId, { socketId: socket.id })
                } else if (userType === 'captain') {
                    await captainModel.findByIdAndUpdate(userId, { socketId: socket.id })
                }
            } catch (error) {
                console.error('Error updating socketId:', error);
            }
        })

        socket.on('update-location-captain', async (data) => {
            const { userId, location } = data

            if (!location || !location.ltd || !location.lng) {
                return console.error('Invalid location data:', location);
            }

            await captainModel.findByIdAndUpdate(userId, { 
                location: {
                    type: 'Point',
                    coordinates: [location.lng, location.ltd]
                }
            });
        });

        socket.on('disconnect', (reason) => {
            console.log(`Client disconnected: ${socket.id}, reason: ${reason}`);
        });
    });

    io.on('connect_error', (err) => {
        console.error('Connection error:', err.message);
    });
};

const sendMessageToSocketId = (socketId, messageObject) => {
    console.log(`Sending message to ${socketId}:`, messageObject.data);
    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.error('Socket.io is not initialized');
    }
};
module.exports = {
    initializeSocket,
    sendMessageToSocketId
};
