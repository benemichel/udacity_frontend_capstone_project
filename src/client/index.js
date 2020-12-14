import { closeModal, showModal, addTrip, saveTrip, removeTrip, loadTripFromLocalStorage } from './js/addHandlers'
import './js/apiCalls'
import './js/validateInput'
import './js/images'

/* CSS/SASS */
import './styles/style.scss'
import './styles/header.scss'
import './styles/card.scss'
import './styles/footer.scss'
import './styles/modal.scss'
import {validateFormInputs} from "./js/validateInput";

/* add Handlers */
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


