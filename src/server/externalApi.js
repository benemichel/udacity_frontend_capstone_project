const fetch = require("node-fetch");

const fetchGeonamesApi = async (placename) => {

    const fullUrl = 'http://api.geonames.org/postalCodeLookupJSON?placename=' + placename
        + '&username=' + process.env.GEONAMES_USERNAME;

    console.log(`api call to ${fullUrl}`)
    try {
        const res = await fetch(fullUrl);
        const json = await res.json();
        const firstPostalCode = json.postalcodes.slice(0)[0];
        console.log(firstPostalCode);

        return {
            lat: firstPostalCode.lat,
            long: firstPostalCode.lng,
            country: firstPostalCode.countryCode,
            placename: firstPostalCode.adminName1,

        }
    } catch(err) {
        console.log('geonames api fetch error', err);
        return err;
    }
}

const fetchWeatherbitApi = async (lat, long, date) => {


}

const fetchWeatherbitApiCurrent = async (lat, long) => {
    const fullUrl = 'https://api.weatherbit.io/v2.0/current?lat=' + lat
        + '&lon=' + long + '&key=' + process.env.WEATHERBIT_API_KEY;

    console.log(`api call to ${fullUrl}`)
    try {
        const res = await fetch(fullUrl);
        const json = await res.json();
        console.log(json);
        const data = json.data[0];


        return {
            placename: data.city_name,
            sunset: data.sunset,
            sunrise: data.sunrise,
            wxDescription: data.weather.description,
            wxIcon: data.weather.icon,
            temp: data.temp,
        }
    } catch(err) {
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
        console.log(json);
        const data = json.data;

        const days = [];
        data.forEach((day) => {
            days.push({
                date: day.datetime,
                max_temp: day.max_temp,
                min_temp: day.min_temp,
                wx_descriptiuon: day.weather.description,
                wx_icon: day.weather.icon,
            })
        })

        return {
            placename: json.city_name,
            days: days,
        }
    } catch(err) {
        console.log('weatherbit forecast api fetch error', err);
        return err;
    }
}

const fetchPixabayApi = async (placename) => {
    const fullUrl =  'https://pixabay.com/api/?key=' + process.env.PIXABAY_API_KEY
        + '&q=' + encodeURIComponent(placename);

    console.log(`api call to ${fullUrl}`)
    try {
        const res = await fetch(fullUrl);
        const json = await res.json();
        console.log(json);
        if (json.total > 1) {
            return json.hits[0].webformatURL;
        }
        else {
            return 'no image found';
        }
    } catch(err) {
        console.log('pixabay forecast api fetch error', err);
        return err;
    }
}


export {fetchGeonamesApi, fetchWeatherbitApi, fetchWeatherbitApiCurrent, fetchWeatherbitApiForecast, fetchPixabayApi}