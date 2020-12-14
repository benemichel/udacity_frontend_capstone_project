const postTripData = async (destination, countryCode, departure, arrival) => {

    const data = {
        destination,
        countryCode,
        departure,
        arrival
    };

    const res = await fetch('http://localhost:8081/trips', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }
    );
    try {
        const resData = await res.json();
        return resData;
    } catch (err) {
        console.log('error', err);
    }
}

export { postTripData }