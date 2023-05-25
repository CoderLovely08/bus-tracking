const express = require('express');
const router = express.Router();
require('dotenv').config();

// Serve static files
router.use(express.static("public"));

// DB Connection
const pool = require('../modules/db');

// Module for DB Operations
const userModule = require('../modules/user')

// Middleware for login authorization
const { checkUserLoginMiddleware } = require('../middleware/loginCheck')



// Admin Login route
router.route('/login')
    .get(async (req, res) => {
        console.log("hi");
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
        
        res.send({ statusCode: loginStatus });
    })

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

module.exports = router