const express = require('express')
const bodyParser = require("body-parser");
const session = require('express-session');


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static("public"));

// import routes

const adminRouter = require('./routes/admin')
const driverRouter = require('./routes/driver')
const userRouter = require('./routes/user')

app.use('/admin', adminRouter);
// app.use('/driver', driverRouter);
// app.use('/user', userRouter);

const oneDay = 1000 * 60 * 60 * 24;

app.use(session({
    secret: "process.env.APP_SECRET",
    saveUninitialized: false,
    cookie: { maxAge: oneDay },
    resave: false,
}));

app.get('/', (req, res) => {
    res.render("home", { user: "Lovely" });
})



app.listen(3000, (error) => {
    if (error) console.log("Error has occured", error);
    else console.log("Server is running on port 3000");
})