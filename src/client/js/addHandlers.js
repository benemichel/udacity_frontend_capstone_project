import {postTripData} from './apiCalls'



/* modal */
const closeModal = (event) => {
    const modal = document.getElementsByClassName('modal').item(0);
    modal.style.display = 'none';
}
const showModal = (event) => {
    const modal = document.getElementsByClassName('modal').item(0);
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
        modal.style.display = 'none';
    }).catch(err => {
        console.log('error', err);

    });


}
document.getElementsByClassName('modal__close').item(0).addEventListener('click', closeModal);
document.getElementsByClassName('add_trip__button').item(0).addEventListener('click', showModal);
document.getElementsByClassName('modal__add_button').item(0).addEventListener('click', addTrip);

