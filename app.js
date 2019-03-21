// importing modules
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path');

var app = express();

const route = require('./server/routes/route');
const setup = require('./server/controllers/setup');

// connect to mongodb
mongoose.connect('mongodb://localhost:27017/basic-shop', { useNewUrlParser: true });

// on connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database mongodb @ 27017');
});

mongoose.connection.on('error', (err) => {
    if (err) {
        console.log('Error in Database connection: ' + err);
    }
});

// port no
const port = 3000;

// adding middleware - cors
app.use(cors());

// body-parser
app.use(bodyparser.json());

app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

app.get('/setup', setup.createAdminUser);

// static files
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/api', route);

app.listen(port, () => {
    console.log('Server started at port: ' + port);
});
