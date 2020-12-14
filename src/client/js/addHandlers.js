import { postTripData } from './apiCalls'
import { validateFormInputs } from "./validateInput";
import dayjs from 'dayjs';

// const moment = require('moment');
const storage = window.localStorage;
let currentTrip = {};

/* modal */
const closeModal = (event) => {
    const modal = document.getElementsByClassName('modal').item(0);
    modal.style.display = 'none';
}
const showModal = (event) => {
    const modal = document.getElementsByClassName('modal').item(0);
    document.getElementById('departure').value = new Date().toLocaleDateString('en-GB');
    document.getElementById('arrival').value = new Date().toLocaleDateString('en-GB');
    modal.style.display = 'block';
}

const addTrip = (event) => {
    const modal = document.getElementsByClassName('modal').item(0);
    const destination = document.getElementById('destination').value;
    const countryCode = document.getElementById('destCountryCode').value;
    const departure = document.getElementById('departure').value;
    const arrival = document.getElementById('arrival').value;

    //call post route
    postTripData(destination, countryCode, departure, arrival).then( res => {

        currentTrip = res;
        currentTrip.destination = destination;
        currentTrip.departure = departure;
        currentTrip.arrival = arrival;

        updateTripCard();
        modal.style.display = 'none';
    }).catch(err => {
        console.log('error', err);
    });


}

const updateTripCard = () => {
    let wx = {};

    if (currentTrip && currentTrip.wx && currentTrip.coords.lat) {
        if (currentTrip.wx.days.length === 1) {
            wx = currentTrip.wx.days[0];
            document.getElementsByClassName('trip_wx__temp').item(0).innerHTML =
                `Temp ${wx.temp}°C`;
        }
        else {
            wx = currentTrip.wx.days.slice(-1)[0];
            document.getElementsByClassName('trip_wx__temp').item(0).innerHTML =
                `High ${wx.max_temp}°C, Low ${wx.min_temp}°C`;
        }

        const icon = `https://www.weatherbit.io/static/img/icons/${wx.icon}.png`;
        const tillTrip = dayjs(currentTrip.departure, 'DD/MM/YYYY').diff(dayjs(), 'day').toString();
        document.getElementsByClassName('no_trip_avail').item(0).style.display = 'none';
        document.getElementsByClassName('trip__info').item(0).style.display = 'flex';
        document.getElementsByClassName('no_trip_found').item(0).style.display = 'none';
        document.getElementsByClassName('trip_wx__icon').item(0).src = icon;
        document.getElementsByClassName('trip_wx__description').item(0).innerHTML = wx.description;
        document.getElementsByClassName('trip_wx__date').item(0).innerHTML = wx.date;
        document.getElementsByClassName('trip__till').item(0).innerHTML =
            `${currentTrip.coords.placename}, ${currentTrip.coords.countryCode} is ${tillTrip} days away`;

        document.getElementsByClassName('trip__image').item(0).src = currentTrip.imageUrl;
        document.getElementsByClassName('destination_name').item(0).innerHTML =
            `My trip to ${currentTrip.coords.placename}, ${currentTrip.coords.countryCode}` ;
        document.getElementsByClassName('trip_dep').item(0).innerHTML =
            `Departing: ${currentTrip.departure}` ;
        document.getElementsByClassName('trip_arr').item(0).innerHTML =
            `Arriving: ${currentTrip.arrival}` ;
    }
    else {
        document.getElementsByClassName('no_trip_found').item(0).style.display = 'flex';
        document.getElementsByClassName('trip__info').item(0).style.display = 'none';
        document.getElementsByClassName('no_trip_avail').item(0).style.display = 'none';
    }

}

const loadTripFromLocalStorage = () => {
    const trip = storage.getItem('trip');

    if (trip){
        currentTrip = JSON.parse(trip);
        updateTripCard();
        document.getElementsByClassName('remove_trip').item(0).disabled = false;
    }
    else {
        document.getElementsByClassName('remove_trip').item(0).disabled = true;
        document.getElementsByClassName('trip__image').item(0).src = "/src/client/media/placeholder.jpg"
        document.getElementsByClassName('no_trip_avail').item(0).style.display = 'flex';
        document.getElementsByClassName('trip__info').item(0).style.display = 'none';
    }
}

const saveTrip = () => {
    storage.setItem('trip', JSON.stringify(currentTrip) );
    document.getElementsByClassName('remove_trip').item(0).disabled = false;
}

const removeTrip = () => {
    storage.removeItem('trip');
    document.getElementsByClassName('remove_trip').item(0).disabled = true;
    loadTripFromLocalStorage();
}


document.getElementsByClassName('modal__close').item(0).addEventListener('click', closeModal);
document.getElementsByClassName('add_trip__button').item(0).addEventListener('click', showModal);
document.getElementsByClassName('modal__add_button').item(0).addEventListener('click', addTrip);
document.getElementsByClassName('save_trip').item(0).addEventListener('click', saveTrip);
document.getElementsByClassName('remove_trip').item(0).addEventListener('click', removeTrip);
document.addEventListener('DOMContentLoaded', loadTripFromLocalStorage);
document.getElementById('departure').addEventListener('input', validateFormInputs);
document.getElementById('arrival').addEventListener('input', validateFormInputs);
document.getElementById('destCountryCode').addEventListener('input', validateFormInputs);
document.getElementById('destination').addEventListener('input', validateFormInputs);

