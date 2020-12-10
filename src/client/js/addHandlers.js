import {postTripData} from './apiCalls'

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
    const departure = document.getElementById('departure').value;
    const arrival = document.getElementById('arrival').value;

    //call post route
    postTripData(destination, departure, arrival).then( res => {
        console.log(`postTripData returned ${res}`);

        //update DOM
        document.getElementsByClassName('no_trip_avail').item(0).style.display = 'none';
        document.getElementsByClassName('trip__info').item(0).style.display = 'flex';
        document.getElementsByClassName('trip__image').item(0).src = res.imageUrl;
        document.getElementsByClassName('destination_name').item(0).innerHTML =
            `My trip to ${res.wx.placename}, ${res.coords.countryCode}` ;
        document.getElementsByClassName('trip_dep').item(0).innerHTML =
            `Departing: ${departure}` ;
        document.getElementsByClassName('trip_arr').item(0).innerHTML =
            `Arriving: ${arrival}` ;

        modal.style.display = 'none';
    }).catch(err => {
        console.log('error', err);
    });


}

document.getElementsByClassName('modal__close').item(0).addEventListener('click', closeModal);
document.getElementsByClassName('add_trip__button').item(0).addEventListener('click', showModal);
document.getElementsByClassName('modal__add_button').item(0).addEventListener('click', addTrip);

