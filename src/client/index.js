import './js/addHandlers'
import './js/apiCalls'
import './js/validateInput'

/* CSS/SASS */
import './styles/style.scss'
import './styles/header.scss'
import './styles/card.scss'
import './styles/footer.scss'
import './styles/modal.scss'

/* media files */
import placeholderDestImage from './media/placeholder.jpg';
import plusIcon from './media/plus-thick.png';
document.getElementsByClassName('trip__image').item(0).src = placeholderDestImage;
document.getElementsByClassName('add_trip__icon').item(0).src = plusIcon;


