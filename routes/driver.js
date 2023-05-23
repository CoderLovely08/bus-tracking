const express = require('express');
const router = express.Router();
const pool = require('../modules/db');
const driverModule = require('../modules/driver');


router.route('/')
    .get(async (req, res) => {

        res.render('driver/home')
    })

// Admin Login route
router.route('/login')
    .get((req, res) => {
        res.render("logins/driverLogin");
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
                res.send({ success: true });
            } else {
                res.send({ success: false });
            }
        } catch (error) {
            console.error(error);
            res.send({ success: false });
        }
    });

router.route('/location')
    .put(async (req, res) => {
        let lat = parseFloat(req.body.lat);
        let lng = parseFloat(req.body.lng);
        const busId = 3; // Replace with the actual bus ID

        let num = Math.random();

        lat += num;
        lng += num;


        try {
            await driverModule.updateLiveLocation(busId, lat, lng);
            res.status(200).send({ statusCode: 0 });
        } catch (error) {
            console.error(error);
            res.status(500).send({ statusCode: 1 });
        }

    });

module.exports = router;
