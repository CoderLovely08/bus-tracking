const express = require('express')
const bodyParser = require("body-parser");
const session = require('express-session');


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static("public"));
const oneDay = 1000 * 60 * 60 * 24;

app.use(session({
    secret: "thisisanappsecretkeyforthebustrackingsystem",
    saveUninitialized: false,
    cookie: { maxAge: oneDay },
    resave: false,
}));

// import routes
const adminRouter = require('./routes/admin')
const driverRouter = require('./routes/driver')
const userRouter = require('./routes/user')
const apiRouter = require('./routes/api')


app.get('/', (req, res) => {
    if (req.session.isAdminAuthenticated) {
        res.redirect('/admin');
    } else if (req.session.isDriverAuthenticated) {
        res.redirect('/driver');
    } else if (req.session.isUserAuthenticated) {
        res.redirect('/user');
    } else {
        res.render("home");
    }
})

app.use('/api', apiRouter);
app.use('/admin', adminRouter);
app.use('/driver', driverRouter);
app.use('/user', userRouter);


app.get('/logout', (req, res) => {
    req.session.destroy(function (error) {
        if (error) {
            console.log("Unable to logout!", error);
        } else {
            res.redirect('/')
        }
    })
})



app.listen(3000, (error) => {
    if (error) console.log("Error has occured", error);
    else console.log("Server is running on port 3000");
})