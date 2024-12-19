const axios = require('axios')

module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`

    try {

        const response = await axios.get(url)
        console.log(response)
            
        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                lat: location.lat,
                lng: location.lng
            }
        } else {
            throw new Error('Unable to fetch coordinates')
        }
    } catch (error) {

        console.error('Error fetching coordinates:', error.message);
        throw error;
    }
}

module.exports.getDistanceTime = async (origin, destination) => {
    if(!origin || !destination) {
        throw new Error('Origin and destination are required')
    }
    const apiKey = process.env.GOOGLE_MAPS_API
    // const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(address)}&key=${apiKey}`

    try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
            params: {
              origins: origin,
              destinations: destination,
              key: apiKey,
            },
          })
        if (response.data.status === 'OK') {
            if(response.data.rows[0].elements[0].status === 'ZERO_RESULTS') {
                throw new Error('No Routes Found')
            }
            return response.data.rows[0].elements[0]
        } else {
            throw new Error('Unable to fetch distance and time')
        }
    } catch (err) {
        console.error(err)
        throw err
    }
}

module.exports.getAutoCompleteSuggestions = async (input) => {
    console.log('Input for autocomplete:', input);
    if(!input) {
        throw new Error('Query is required')
    }

    const apiKey = process.env.GOOGLE_MAPS_API
    // const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(address)}&key=${apiKey}`

    try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/place/autocomplete/json', {
            params: {
              input,
              key: apiKey,
            },
          })
        if (response.data.status === 'OK') {
            return response.data.predictions.map((prediction) => ({
                description: prediction.description,
                place_id: prediction.place_id,
              }))
        } else {
            throw new Error('Unable to fetch suggestions')
        }
    } catch (err) {
        console.error(err)
        throw err
    }
}