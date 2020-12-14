# Instructions
Capstone project app

## Overview
Basic travel planer app. User can add a trip by providing a destination, country code
, departure and arrival dates. Weather data and a representative image will be fetched 
from multiple web APIs. User can store the fetched data to local storage to enable 
data retrieval on refresh or revisit.

APIs used:

- Geonames
- WeatherBit
- Pixabay

## Setup
Run ``npm install``

Client side run ``npm run build-dev`` to start webpack dev server. Runs on localhost:8080.

Server side run ``npm run start`` to start node server. Runs on localhost:8081

## Run production code
Run ``npm run serve-prod``. Builds dist folder via webpack and starts a local HTTP server on port 5000.
## Tests
There is no mocking for APIs. 

Run ``npm run test`` for client and server side tests.

## Validation
Validation with appropriate error messages is provided for all input fields in modal.

## Routes
Single POST route ``/trips``

## Additional features chosen
User can add/remove trip to/from LocalStorage

Icons are included in the weather forecast.