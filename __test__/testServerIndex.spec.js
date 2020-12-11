const request = require('supertest')
const app = require('../src/server')

describe('post route /trips', () => {
    it('fetch trip data', async () => {

        const postData = {
            destination: 'Hamburg',
            countryCode: 'DE',
            departure: '01/01/2021',
            arrival: '03/01/2020'
        };
        const res = await request(app)
            .post('/trips')
            .send(postData)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('coords')
    })
})