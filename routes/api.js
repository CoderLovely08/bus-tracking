const express = require('express');
const router = express.Router();
require('dotenv').config();

// Serve static files
router.use(express.static("public"));

// Module for DB Operations
const adminModule = require('../modules/admin')

// Route for rendering map view
router.route('/live-status')
    .get(async (req, res) => {

        const busDetails = await adminModule.getLiveBusDetails();

        const userType = req.session.usertype;

        if (userType)
            res.render('components/map', { busDetails: busDetails, userType: userType });
        else res.redirect('/')
    })


// API for getting live status
router.route('/get-live-status').get(async (req, res) => {
    try {
        const liveBusData = await adminModule.getLiveData();
        const busDetails = await adminModule.getLiveBusDetails();

        // Create an array to store bus location data
        var busLocations = [];

        // Loop through the live bus data and extract relevant information
        liveBusData.forEach(function (busData) {
            var busLocation = {
                busId: busData.bus_id,
                lat: busData.latitude,
                lng: busData.longitude,
                isActive: busData.isactive
            };

            // Add the bus location to the array
            busLocations.push(busLocation);
        });

        // Combine bus locations and bus details into a single object or array
        var responseData = {
            busLocations: busLocations,
            busDetails: busDetails
        };

        // Send the combined data as a JSON response
        res.json(responseData);
    } catch (error) {
        console.error('Error retrieving live bus status:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;