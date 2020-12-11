import {postTripData} from './apiCalls'
const moment = require('moment');
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

    //TODO:: delete
    document.getElementById('destination').value = 'Paris';

    modal.style.display = 'block';
}

const addTrip = (event) => {
    console.log("add trip called");
    const modal = document.getElementsByClassName('modal').item(0);

    const destination = document.getElementById('destination').value;
    //const departure = document.getElementById('departure').value;
    //const arrival = document.getElementById('arrival').value;

    //call post route
    // postTripData(destination, departure, arrival).then( res => {
        const departure = '10/01/2021'
        const arrival = '15/01/2021'
        currentTrip = {"wx":{"placename":"Paris","days":[{"date":"11/12/2020","description":"Overcast clouds","icon":"c04n","temp":-1.7}]},
        "imageUrl":"https://pixabay.com/get/57e0d74b4e52b10ff3d8992cc62e367e1339daf85257714e73297dd6944e_640.jpg",
        "coords":{"lat":44.264111,"long":-70.498513,"countryCode":"US","placename":"Maine"}}

        console.log('currentTrip', currentTrip);

        currentTrip.destination = destination;
        currentTrip.departure = departure;
        currentTrip.arrival = arrival;
        console.log(`postTripData returned ${currentTrip}`);



        //update UI
        updateTripCard();
        modal.style.display = 'none';
    // }).catch(err => {
    //     console.log('error', err);
    // });


}

const updateTripCard = () => {
    let wx = {};

    if (currentTrip.wx.days.length === 1) {
        wx = currentTrip.wx.days[0];
        document.getElementsByClassName('trip_wx__temp').item(0).innerHTML =
            `Temp ${wx.temp}°C`;
    }
    else {
        wx = res.wx.days.slice(-1)[0];
        document.getElementsByClassName('trip_wx__temp').item(0).innerHTML =
            `High ${wx.max_temp}°C, Low ${wx.min_temp}°C`;
    }

    const icon = `/src/client/media/weatherbit_icons/${wx.icon}.png`;
    const tillTrip = moment(currentTrip.departure, 'DD/MM/YYYY').diff(moment(), 'days').toString();
    document.getElementsByClassName('trip_wx__icon').item(0).src = icon;
    document.getElementsByClassName('trip_wx__description').item(0).innerHTML = wx.description;
    document.getElementsByClassName('trip_wx__date').item(0).innerHTML = wx.date;
    document.getElementsByClassName('trip__till').item(0).innerHTML =
        `${currentTrip.wx.placename}, ${currentTrip.coords.countryCode} is ${tillTrip} days away`;
    document.getElementsByClassName('no_trip_avail').item(0).style.display = 'none';
    document.getElementsByClassName('trip__info').item(0).style.display = 'flex';
    document.getElementsByClassName('trip__image').item(0).src = currentTrip.imageUrl;
    document.getElementsByClassName('destination_name').item(0).innerHTML =
        `My trip to ${currentTrip.wx.placename}, ${currentTrip.coords.countryCode}` ;
    document.getElementsByClassName('trip_dep').item(0).innerHTML =
        `Departing: ${currentTrip.departure}` ;
    document.getElementsByClassName('trip_arr').item(0).innerHTML =
        `Arriving: ${currentTrip.arrival}` ;
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
    }
}

const saveTrip = () => {
    console.log(`postTripData returned ${currentTrip}`);
    storage.setItem('trip', JSON.stringify(currentTrip) );
    console.log(JSON.parse(storage.getItem('trip')));

    document.getElementsByClassName('remove_trip').item(0).disabled = false;
}

const removeTrip = () => {
    storage.removeItem('trip');
    document.getElementsByClassName('remove_trip').item(0).disabled = true;
}


document.getElementsByClassName('modal__close').item(0).addEventListener('click', closeModal);
document.getElementsByClassName('add_trip__button').item(0).addEventListener('click', showModal);
document.getElementsByClassName('modal__add_button').item(0).addEventListener('click', addTrip);
document.getElementsByClassName('save_trip').item(0).addEventListener('click', saveTrip);
document.getElementsByClassName('remove_trip').item(0).addEventListener('click', removeTrip);
document.addEventListener('DOMContentLoaded', loadTripFromLocalStorage);

//TODO :: remove
//document.addEventListener('DOMContentLoaded', addTrip);

