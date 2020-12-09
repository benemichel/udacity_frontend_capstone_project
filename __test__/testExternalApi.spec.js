import { fetchGeonamesApi, fetchWeatherbitApi, fetchWeatherbitApiCurrent, fetchWeatherbitApiForecast, fetchPixabayApi } from "../src/server/externalApi"
require('dotenv').config()

describe("Testing Geonames API fetching", () => {
    test("Test Geonames with valid query parameters", async () => {
        const placename = 'Bremen'
        const expected = {
                long: 8.79062727272727,
                country: 'DE',
                lat: 53.0889090909091,
                placename: 'Bremen'
            };

        await expect(fetchGeonamesApi(placename)).resolves.toEqual(expected);
    })

    // test("Testing validateUrl() with invalid Url", () => {
    //     const urlFail = 'https//foo/some/bar'
    //     expect(validateUrl(urlFail)).toEqual(false);
    // })
    //
    // test("Testing validateUrl() with empty Url", () => {
    //     const urlEmpty = 'https://foo/some/bar'
    //     expect(validateUrl(urlEmpty)).toEqual(false);
    // })
    //
    // test("Testing validateUrl() without domain Url", () => {
    //     const urlWoDomain = 'https://foo/some/bar'
    //     expect(validateUrl(urlWoDomain)).toEqual(false);
    // })

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

