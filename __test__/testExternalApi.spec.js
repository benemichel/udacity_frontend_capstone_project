const apiExports = require('../src/server/externalApi');
const { fetchGeonamesApi, fetchWeatherbitApiCurrent, fetchWeatherbitApiForecast, fetchPixabayApi } = apiExports.apiCalls;
require('dotenv').config()

describe("Testing Geonames API fetching", () => {
    test("Test Geonames with valid query parameters", async () => {
        const placename = 'Bremen'
        const expected = {
                long: 8.79062727272727,
                countryCode: 'DE',
                lat: 53.0889090909091,
                placename: 'Bremen'
            };
        await expect(fetchGeonamesApi(placename)).resolves.toEqual(expected);
    })
});

describe("Testing Weatherbit API fetching", () => {
    test("Test Weatherbit Current with valid query parameters", async () => {
        const lat = 53.0889090909091;
        const long = 8.79062727272727;

        const expected = {
            placename: 'Bremen',
        };

        const res = await fetchWeatherbitApiCurrent(lat, long);
        console.log(res);
        expect(res.placename).toBe(expected.placename);
    })
    test("Test Weatherbit Forcast with valid query parameters", async () => {
        const lat = 53.0889090909091;
        const long = 8.79062727272727;

        const expected = {
            placename: 'Bremen',
        };

        const res = await fetchWeatherbitApiForecast(lat, long);
        console.log(res);
        expect(res.placename).toBe(expected.placename);
        expect(res.days).toBeInstanceOf(Array);
    })
});

describe("Testing Pixabay API fetching", () => {
    test("Test Pixabay Image api with valid query parameters", async () => {
        const placename = 'Limburg an der Lahn'

        const res = await fetchPixabayApi(placename);
        console.log(res);
        expect(res.length).toBeGreaterThan(0);
    })
});

