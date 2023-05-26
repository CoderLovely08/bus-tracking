const express = require('express');
const router = express.Router();
require('dotenv').config();

// Serve static files
router.use(express.static("public"));

// DB Connection
const pool = require('../modules/db');

// Module for DB Operations
const adminModule = require('../modules/admin')

// Middleware for login authorization
const { checkAdminLoginMiddleware } = require('../middleware/loginCheck')



// Admin Login route
router.route('/login')
    .get(async (req, res) => {
        if (req.session.isAdminAuthenticated) {
            res.redirect('/')
        }
        else {
            res.render("logins/adminLogin");
        }
    }).post(async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        const query = {
            text: `SELECT * FROM AdminInfo WHERE admin_user_name = $1 AND admin_password = $2`,
            values: [username, password]
        }

        const { rows } = await pool.query(query);

        if (rows.length == 1) {

            req.session.isAdminAuthenticated = true;
            req.session.adminId = rows[0].admin_id;
            req.session.adminFullName = rows[0].admin_full_name;
            req.session.usertype = 'Admin'

            res.send({ success: true });
        }
        else res.send({ success: false });

    });


// Admin Home Route
router.route('/')
    .get(checkAdminLoginMiddleware, async (req, res) => {
        let adminId = req.session.adminId;
        let adminData = await adminModule.getAdminDataById(adminId);

        res.render('admin/home', { adminData: adminData });
    });


// Users routes
router.route('/users')
    .get(checkAdminLoginMiddleware, async (req, res) => {
        const userData = await adminModule.getAllUserData();

        res.render('admin/users', { userData: userData });
    })
    .delete(checkAdminLoginMiddleware, async (req, res) => {
        const { userId } = req.body;

        const deleteStatus = await adminModule.deleteUserById(userId);
        res.send({ statusCode: deleteStatus });
    })

// Admins routes
router.route('/admins')
    .get(checkAdminLoginMiddleware, async (req, res) => {
        const adminData = await adminModule.getAllAdminData();

        res.render('admin/admins', { adminData: adminData });
    })
    .post(async (req, res) => {
        let username = req.body.username;
        let password = req.body.password;
        let fullname = req.body.fullname;
        let phone = req.body.phone;
        let dob = req.body.dob;

        let adminAddStatus = await adminModule.addNewAdmin(username, password, fullname, phone, dob);

        res.send({ statusCode: adminAddStatus });
    })
    .delete(async (req, res) => {
        const { adminId } = req.body;

        const deleteStatus = await adminModule.deleteAdminById(adminId);

        res.send({ statusCode: deleteStatus })
    })

// Driver routes
router.route('/drivers')
    .get(checkAdminLoginMiddleware, async (req, res) => {
        const driverData = await adminModule.getAllDriverData();
        const busData = await adminModule.getAllUnassignedBusData();

        res.render('admin/drivers', {
            driverData: driverData,
            busData: busData
        });
    })
    .post(async (req, res) => {
        const { driverUserName, driverPassword, driverFullName, driverGender, busId, driverPhone } = req.body;

        const driverAddStatuts = await adminModule.addNewDriver(driverUserName, driverPassword, driverFullName, driverGender, driverPhone, busId);

        res.send({ statusCode: driverAddStatuts });
    })
    .delete(async (req, res) => {
        const { driverId } = req.body;
        
        const deleteStatus = await adminModule.deleteDriverById(driverId);
        
        res.send({statusCode: deleteStatus});
    })

// Bus routes
router.route('/bus')
    .get(checkAdminLoginMiddleware, async (req, res) => {
        const busData = await adminModule.getAllBusData();
        const routesList = await adminModule.getAllRouteData();

        res.render('admin/bus', { busData: busData, routesList: routesList });
    })
    .post(async (req, res) => {

        const { busName, busNumber, busModel, busOrigin, busDestination } = req.body;

        const addBusStatus = await adminModule.addNewBus(busName, busNumber, busModel, busOrigin, busDestination);
        res.send({ statusCode: addBusStatus });
    })
    .delete(async (req, res) => {

        const { busId } = req.body;

        const deleteStatus = await adminModule.deleteBusById(busId);

        res.send({ statusCode: deleteStatus });
    })
    .put(async (req, res) => {
        const { routesArray, arrivalTimeArray, busId } = req.body;

        const updateBusStatus = await adminModule.updateBusStops(routesArray, arrivalTimeArray, busId);

        res.send({ statusCode: updateBusStatus });
    })


router.route('/live-status')
    .get(checkAdminLoginMiddleware, async (req, res) => {

        const busDetails = await adminModule.getLiveBusDetails();

        res.render('components/map', { busDetails: busDetails });
    })


router.route('/get-live-status').get(checkAdminLoginMiddleware, async (req, res) => {
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


router.route('/routes')
    .get(checkAdminLoginMiddleware, async (req, res) => {
        const routeData = await adminModule.getAllRouteData();
        res.render('admin/routes', { routeData: routeData })
    })
    .post(async (req, res) => {
        const { routeName } = req.body;

        const addRouteResult = await adminModule.addNewRoute(routeName);
        // res.send({ statusCode: 0 });
        res.send({ statusCode: addRouteResult });
    })
    .delete(async (req, res) => {
        const { itemId } = req.body;

        const deleteStatus = await adminModule.deleteRouteById(itemId);
        res.send({ statusCode: 0 })

    })



module.exports = router;
