const mapService = require('../services/maps.service');
const { validationResult } = require('express-validator');
const graphhopperApiKey = "f118dd66-aa39-4153-8285-07f23c3e3fec";

module.exports.getCoordinates = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { address } = req.query;

    try {
        const coordinates = await mapService.getAddressCoordinate(address);
        res.status(200).json(coordinates);
    } catch (error) {
        res.status(404).json({ message: 'Coordinates not found' });
    }
};

module.exports.getDistanceTime = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { origin, destination } = req.query;

        if (!origin || !destination) {
            return res.status(400).json({ message: 'Both origin and destination are required' });
        }

        const result = await mapService.getDistanceTime(origin, destination);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message || 'Internal server error' });
    }
};
module.exports.getAutoCompleteSuggestions = async (req, res, next) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { input } = req.query;

        const suggestions = await mapService.getAutoCompleteSuggestions(input);

        res.status(200).json(suggestions);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}