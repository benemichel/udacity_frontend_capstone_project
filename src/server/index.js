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
    const arrival = req.body.arrival;

    externalApi.fetchDestinationData(destination, departure).then( promRes => {
        res.status(200);
        res.send(promRes);
    }).catch( err => {
        console.log('error in post route /trips', err)
    });
})
//console.log(`Your API key is ${process.env.API_KEY}`);


// app.post('/sentiment', (req, res) => {
//
//     console.log("to POST /sentiment");
//     const url = req.body.url;
//     const lang = req.body.lang;
//     console.log(req.body);
//
//     console.log("url send to api:" + url);
//     getSentiment(url, lang).then(apiRes => {
//         res.send(apiRes);
//     }).catch(err => {
//         console.log("GET /sentiment error", err);
//         res.send(400);
//     });
// });
//
//
// const getSentiment = async (url, lang) => {
//
//     const fullUrl = 'https://api.meaningcloud.com/sentiment-2.1?key='
//         + process.env.API_KEY +
//         '&lang=' +
//         lang +
//         '&of=json&url='
//         + url;
//
//     console.log('full url: ' + fullUrl);
//     const res = await fetch(fullUrl);
//     const json = await res.json();
//
//     console.log(`api json response ${json}`);
//
//     const responseData = {
//         'agreement': json.agreement,
//         'irony': json.irony,
//         'subjectivity': json.subjectivity,
//         'sentiment': json.score_tag,
//     }
//
//     if (!responseData.agreement) {
//         console.log('invalid API response');
//         throw new Error(json);
//     }
//
//     console.log(`api response ${JSON.stringify(responseData)}`);
//     return responseData;
// }
