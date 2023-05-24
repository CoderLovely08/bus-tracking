const express = require('express');
const router = express.Router();
// DB Connection
const pool = require('../modules/db');

// Driver module for DB operations
const driverModule = require('../modules/driver');

// Middleware for login authorization
const { checkDriverLoginMiddleware } = require('../middleware/loginCheck')


router.route('/')
    .get(checkDriverLoginMiddleware, async (req, res) => {
        let driverId = req.session.driverId;

        let driverDetails = await driverModule.getDriverBusDetails(driverId);

        console.log(driverDetails);
        res.render('driver/home', { driverData: driverDetails })
    })

// Admin Login route
router.route('/login')
    .get((req, res) => {
        if (req.session.isDriverAuthenticated) {
            res.redirect('/')
        } else {
            res.render("logins/driverLogin");
        }
    })
    .post(async (req, res) => {
        const { username, password } = req.body;

        const query = {
            text: `SELECT * FROM DriverInfo WHERE driver_user_name = $1 AND driver_password = $2`,
            values: [username, password]
        };

        try {
            const { rows } = await pool.query(query);
            if (rows.length === 1) {

                // setting up session variable
                req.session.isDriverAuthenticated = true;
                req.session.driverId = rows[0].driver_id;
                req.session.driverFullName = rows[0].driver_full_name;
                req.session.busId = rows[0].bus_id;

                res.send({ success: true });
            } else {
                res.send({ success: false });
            }
        } catch (error) {
            console.error(error);
            res.send({ success: false });
        }
    });

// Start fetching live location
router.route('/location')
    .put(async (req, res) => {
        let lat = parseFloat(req.body.lat);
        let lng = parseFloat(req.body.lng);
        let isActive = true;
        const busId = req.session.busId; // Replace with the actual bus ID


        // Simulating Bus Location
        console.log("Upating for bus: ", busId);

        let num = Math.random();

        lat += num;
        lng += num;
        // Simulation ends

        try {
            await driverModule.updateLiveLocation(busId, lat, lng, isActive);
            res.status(200).send({ statusCode: 0 });
        } catch (error) {
            console.error(error);
            res.status(500).send({ statusCode: 1 });
        }

    });


// To go offline
router.route('/update-status')
    .put(async (req, res) => {
        // Bus which the driver is driving
        const busId = req.session.busId; // Replace with the actual bus ID

        try {
            await driverModule.updateLiveStatus(busId);
            res.status(200).send({ statusCode: 0 });
        } catch (error) {
            console.error(error);
            res.status(500).send({ statusCode: 1 });
        }

    });

module.exports = router;
