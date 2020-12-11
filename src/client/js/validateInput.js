const validateFormInputs = () => {
    const destination = document.getElementById('destination').value;
    const departure = document.getElementById('departure').value;
    const arrival = document.getElementById('arrival').value;
    const countryCode = document.getElementById('destCountryCode').value;
    const button = document.getElementsByClassName('modal__add_button').item(0);
    if (!validateDate(departure)) {
        document.getElementById('departure-validation-error').innerHTML =
            'Departure date must be of format DD/MM/YYYY'
    }
    else {
        document.getElementById('departure-validation-error').innerHTML = '';
    }

    if (!validateDate(arrival)) {
        document.getElementById('arrival-validation-error').innerHTML =
            'Arrival date must be of format DD/MM/YYYY'
    }
    else {
        document.getElementById('arrival-validation-error').innerHTML = '';
    }

    if (!validateCountryCode(countryCode)) {
        document.getElementById('country-code-validation-error').innerHTML =
            'Country code must be of format XX'
    }
    else {
        document.getElementById('country-code-validation-error').innerHTML = '';
    }

    if (validateDate(departure) && validateDate(arrival)
        && validateCountryCode(countryCode) && validateDestination(destination)) {
        button.disabled = false;
    }
    else {
        button.disabled = true;
    }
}

const validateDestination = (destination) => {
    return destination !== "";
}

const validateDate = (dateString) => {
    //DD/MM/YYYY
    const regex = new RegExp(/^(([0][1-9])|([1|2]\d)|([3][0|1]))\/((0[1-9])|(1[0-2]))\/(\d{4})$/)
    return !!dateString.match(regex);
}

const validateCountryCode = (countryCode) => {
    //XX
    const regex = new RegExp(/^([a-z, A-Z]{2})$/)
    return !!countryCode.match(regex);
}

export { validateFormInputs}