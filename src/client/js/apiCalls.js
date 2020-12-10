const postTripData = async (destination, departure, arrival) => {

    const data = {
        destination,
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
        console.log('post data returned ', resData);
        return resData;
    } catch (err) {
        console.log('error', err);
    }
}

export {postTripData}