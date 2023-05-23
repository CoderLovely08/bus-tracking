const express = require('express');
const router = express.Router();
require('dotenv').config();
router.use(express.static("public"));


router.route('/login')
    .get((req, res) => {
        res.render("logins/adminLogin");
    }).post((req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        console.log(username, password);
        res.send({ success: true })

    })

router.route('/').
    get((req, res) => {
        res.send('Welcome Admin');
    });

module.exports = router;
