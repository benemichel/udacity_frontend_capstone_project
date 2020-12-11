const  externalApi = require('./externalApi');

const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const fetch = require("node-fetch");

dotenv.config();

const app = express();

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

app.use(express.static('dist'));
console.log(__dirname);


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// designates what port the app will listen to for incoming requests
const PORT = 8081;
if (process.env.NODE_ENV !== 'test') {
    const server = app.listen(PORT, () => {
        console.log(`running on localhost, port: ${PORT}`);
    });
}

app.get('/', function (req, res) {
    res.sendFile(path.resolve('src/client/views/index.html'))
})

app.post('/trips', async (req, res) => {
    const destination = req.body.destination;
    const departure = req.body.departure;
    const countryCode = req.body.countryCode;
    const arrival = req.body.arrival;

    externalApi.fetchDestinationData(destination, countryCode, departure).then( promRes => {
        res.status(200);
        res.send(promRes);
    }).catch( err => {
        console.log('error in post route /trips', err)
    });
})

module.exports = app;


