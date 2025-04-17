const axios = require('axios');
const graphhopperApiKey = process.env.GRAPHHOPPER_API_KEY
const captainModel = require('../models/captain.model');

/** ------------------------------
 * GraphHopper: Address to Coordinates
 --------------------------------*/
module.exports.getAddressCoordinate = async (address) => {
    const url = `https://graphhopper.com/api/1/geocode?q=${encodeURIComponent(address)}&locale=en&key=${graphhopperApiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.hits && response.data.hits.length > 0) {
            const point = response.data.hits[0].point;
            return {
                lat: point.lat,
                lng: point.lng
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        throw error;
    }
};


/** ----------------------------------
 * GraphHopper: Distance & Time Logic
 -------------------------------------*/
async function geocode(address) {
    const url = `https://graphhopper.com/api/1/geocode?q=${encodeURIComponent(address)}&locale=en&key=${graphhopperApiKey}`;
    const res = await axios.get(url);
    if (res.data.hits && res.data.hits.length > 0) {
        return res.data.hits[0].point; // { lat, lng }
    }
    throw new Error(`Could not find coordinates for "${address}"`);
}

module.exports.getDistanceTime = async (originAddress, destinationAddress) => {
    if (!originAddress || !destinationAddress) {
        throw new Error('Origin and destination are required');
    }

    const origin = await geocode(originAddress);
    const destination = await geocode(destinationAddress);

    const url = `https://graphhopper.com/api/1/route?point=${origin.lat},${origin.lng}&point=${destination.lat},${destination.lng}&profile=car&locale=en&calc_points=true&key=${graphhopperApiKey}`;

    try {
        const response = await axios.get(url);

        if (response.data.paths && response.data.paths.length > 0) {
            const path = response.data.paths[0];
            return {
                distance: { value: path.distance }, // in meters
                duration: { value: path.time }      // in milliseconds
            };
        }

        throw new Error('No route data found');
    } catch (err) {
        throw err;
    }
};


/** --------------------------------------
 * Google: Autocomplete Suggestions Logic
 -----------------------------------------*/
 module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('query is required');
    }

    const graphhopperApiKey = process.env.GRAPHHOPPER_API_KEY || 'f118dd66-aa39-4153-8285-07f23c3e3fec';

    const url = `https://graphhopper.com/api/1/geocode?q=${encodeURIComponent(input)}&locale=en&limit=5&key=${graphhopperApiKey}`;

    try {
        const response = await axios.get(url);
        const hits = response.data.hits;

        if (Array.isArray(hits)) {
            return hits.map(hit => hit.name + (hit.city ? `, ${hit.city}` : '') + (hit.country ? `, ${hit.country}` : ''));
        } else {
            throw new Error('Invalid response from GraphHopper');
        }
    } catch (err) {
        throw err;
    }



};
module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {

    // radius in km


    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [ [ ltd, lng ], radius / 6371 ]
            }
        }
    });

    return captains;
};