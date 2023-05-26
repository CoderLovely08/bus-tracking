const express = require('express');
const router = express.Router();
require('dotenv').config();

// Serve static files
router.use(express.static("public"));

// DB Connection
const pool = require('../modules/db');

// Module for DB Operations
const userModule = require('../modules/user')
const adminModule = require('../modules/admin')

// Middleware for login authorization
const { checkUserLoginMiddleware } = require('../middleware/loginCheck')



// User Login route
router.route('/login')
    .get(async (req, res) => {

        if (req.session.isUserAuthenticated) {
            res.redirect('/')
        }
        else {
            res.render("logins/userLogin");
        }
    })
    .post(async (req, res) => {
        const { email, pass } = req.body;

        const loginStatus = await userModule.checkValidUserLogin(email, pass);
        if (Array.isArray(loginStatus)) {
            req.session.usertype = 'User'
            req.session.isUserAuthenticated = true;
            req.session.userId = loginStatus[0].user_id;
            res.send({ statusCode: 0 });
        } else {
            res.send({ statusCode: loginStatus });
        }

    })

// User Registration route
router.route('/register')
    .get(async (req, res) => {
        if (req.session.isUserAuthenticated) {
            res.redirect('/')
        } else {
            res.render('logins/userRegister');
        }
    })
    .post(async (req, res) => {
        const { name, gender, dob, phone, email, pass } = req.body;

        const insertStatus = await userModule.addNewUser(name, gender, dob, phone, email, pass);

        res.send({ statusCode: insertStatus });
    })

// User home route
router.route('/')
    .get(checkUserLoginMiddleware, async (req, res) => {

        const userData = await userModule.getUserDataByUserId(req.session.userId);

        res.render('user/home', { userData: userData });
    })

router.route('/viewBuses')
    .get(checkUserLoginMiddleware, async (req, res) => {
        const busData = await adminModule.getLiveBusDetails();

        const userType = req.session.usertype;

        if (userType)
            res.render('components/buses', { busData: busData, userType: userType });
        else res.redirect('/')
    })



module.exports = router