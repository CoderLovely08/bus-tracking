const express = require('express')
const bodyParser = require("body-parser");
const session = require('express-session');


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static("public"));
