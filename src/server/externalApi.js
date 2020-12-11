const moment = require('moment');
const fetch = require('node-fetch');

const fetchDestinationData = async (placename, countryCode, date) => {
    const coords = await fetchGeonamesApi(placename, countryCode);
    const wx = await fetchWeatherbitApi(coords.lat, coords.long, date);
    const imageUrl = await fetchPixabayApi(placename);

    return {
        wx: wx,
        imageUrl: imageUrl,
        coords: coords,
    }
}

const fetchGeonamesApi = async (placename, countryCode) => {

    const fullUrl = 'http://api.geonames.org/postalCodeLookupJSON?placename=' + placename
        + '&username=' + process.env.GEONAMES_USERNAME;

    console.log(`api call to ${fullUrl}`)
    try {
        const res = await fetch(fullUrl);
        const json = await res.json();

        //find first city with given countryCode
        const firstPostalCode = json.postalcodes.slice(0)[0];
        const countryCodeMatches = json.postalcodes.filter( element => {
            return element.countryCode === countryCode && element.placeName === placename;
        })

        const match = countryCodeMatches.length > 0 ? countryCodeMatches.slice(1)[0] : firstPostalCode;

        return {
            lat: match.lat,
            long: match.lng,
            countryCode: match.countryCode,
            placename: match.placeName,
        }

    } catch (err) {
        console.log('geonames api fetch error', err);
        return err;
    }
}

const fetchWeatherbitApi = async (lat, long, date) => {
    //if trip more than a week in future fetch forecast, otherwise current weather
    const userDate = moment(date, 'DD/MM/YYYY');
    const today = moment();
    const diffDays = userDate.diff(today, 'days');

    if (diffDays > 7) {
        try {
            const wx = await fetchWeatherbitApiForecast(lat, long);
            return wx;
        }
        catch (err) {
            console.log('error', err);
            return err;
        }
    } else {
        try {
            const wx = await fetchWeatherbitApiCurrent(lat, long);
            return wx;
        }
        catch (err) {
            console.log('error', err);
            return err;
        }
    }
}

const fetchWeatherbitApiCurrent = async (lat, long) => {
    const fullUrl = 'https://api.weatherbit.io/v2.0/current?lat=' + lat
        + '&lon=' + long + '&key=' + process.env.WEATHERBIT_API_KEY;

    console.log(`api call to ${fullUrl}`)
    try {
        const res = await fetch(fullUrl);
        const json = await res.json();
        const data = json.data[0];

        return {
            placename: data.city_name,
            days: [
                {
                    date: moment().format('DD/MM/YYYY'),
                    description: data.weather.description,
                    icon: data.weather.icon,
                    temp: data.temp,
                }
            ]
        }
    } catch (err) {
        console.log('weatherbit api current fetch error', err);
        return err;
    }
}

const fetchWeatherbitApiForecast = async (lat, long) => {
    const fullUrl = 'https://api.weatherbit.io/v2.0/forecast/daily?lat=' + lat
        + '&lon=' + long + '&key=' + process.env.WEATHERBIT_API_KEY;

    console.log(`api call to ${fullUrl}`)
    try {
        const res = await fetch(fullUrl);
        const json = await res.json();
        const data = json.data;
        const days = [];

        data.forEach((day) => {
            days.push({
                date: day.datetime,
                max_temp: day.max_temp,
                min_temp: day.min_temp,
                description: day.weather.description,
                icon: day.weather.icon,
            })
        })

        return {
            placename: json.city_name,
            days: days,
        }
    } catch (err) {
        console.log('weatherbit forecast api fetch error', err);
        return err;
    }
}

const fetchPixabayApi = async (placename) => {
    const fullUrl = 'https://pixabay.com/api/?key=' + process.env.PIXABAY_API_KEY
        + '&q=' + encodeURIComponent(placename);

    console.log(`api call to ${fullUrl}`)
    try {
        const res = await fetch(fullUrl);
        const json = await res.json();
        if (json.total > 1) {
            return json.hits[0].webformatURL;
        } else {
            return 'no image found';
        }
    } catch (err) {
        console.log('pixabay forecast api fetch error', err);
        return err;
    }
}

exports.fetchDestinationData = fetchDestinationData;
