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
const { checkUserLoginMiddleware } = require('../middleware/loginCheck')



// Admin Login route
router.route('/login')
    .get(async (req, res) => {
        if (req.session.isUserAuthenticated) {
            res.redirect('/')
        }
        else {
            res.render("logins/userLogin");
        }
    })

module.exports = router