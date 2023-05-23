const express = require('express');
const router = express.Router();
require('dotenv').config();
router.use(express.static("public"));
const pool = require('../modules/db');

const adminModule = require('../modules/admin')

// Admin Login route
router.route('/login')
    .get((req, res) => {
        res.render("logins/adminLogin");
    }).post(async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        const query = {
            text: `SELECT * FROM AdminInfo WHERE admin_user_name = $1 AND admin_password = $2`,
            values: [username, password]
        }

        const { rows } = await pool.query(query);
        if (rows.length == 1)
            res.send({ success: true })
        else res.send({ success: false });

    });


// Admin registration route
router.route('/register')
    .get(async (req, res) => {
        res.render('admin/adminRegister');
    })
    .post(async (req, res) => {
        let username = req.body.username;
        let password = req.body.password;
        let fullname = req.body.fullname;
        let phone = req.body.phone;
        let dob = req.body.dob;

        console.log(username, password, fullname, phone, dob);

        let adminAddStatus = await adminModule.addNewAdmin(username, password, fullname, phone, dob);

        res.send({ statusCode: adminAddStatus });
    })


// Admin Home Route
router.route('/').
    get((req, res) => {
        res.render('admin/home');
    });


// Users routes
router.route('/users')
    .get(async (req, res) => {
        const userData = await adminModule.getAllUserData();

        res.render('admin/users', { userData: userData });
    })

// Admins routes
router.route('/admins')
    .get(async (req, res) => {
        const adminData = await adminModule.getAllAdminData();

        res.render('admin/admins', { adminData: adminData });
    })

// Driver routes
router.route('/drivers')
    .get(async (req, res) => {
        const driverData = await adminModule.getAllDriverData();
        const busData = await adminModule.getAllBusData();

        res.render('admin/drivers', {
            driverData: driverData,
            busData: busData
        });
    })
    .post(async (req, res) => {
        const { driverUserName, driverPassword, driverFullName, driverGender, busId, driverPhone } = req.body;

        console.log(driverUserName, driverPassword, driverFullName, driverGender, busId, driverPhone);

        const driverAddStatuts = await adminModule.addNewDriver(driverUserName, driverPassword, driverFullName, driverGender, driverPhone, busId);

        res.send({ statusCode: driverAddStatuts });
    })

// Bus routes
router.route('/bus')
    .get(async (req, res) => {
        const busData = await adminModule.getAllBusData();

        res.render('admin/bus', { busData: busData });
    })
    .post(async (req, res) => {

        const { busName, busNumber, busModel, busOrigin, busDestination } = req.body;

        console.log(busName, busNumber, busModel, busOrigin, busDestination);

        const addBusStatus = await adminModule.addNewBus(busName, busNumber, busModel, busOrigin, busDestination);
        res.send({ statusCode: addBusStatus });
    })


router.route('/live-status')
    .get(async (req, res) => {
        res.render('components/map')
    })


router.route('/get-live-status')
    .get(async (req, res) => {

        const liveBusData = await adminModule.getLiveData();

        var busLocations = [
            { busId: liveBusData[0].bus_id, lat: liveBusData[0].latitude, lng: liveBusData[0].longitude },
            // Add more bus location data as needed
          ];
        
          // Send the bus location data as a JSON response
          res.json(busLocations);
    })


module.exports = router;
