import { postData } from "../src/client/js/formHandler"

describe("Testing the form submit functionality",  () => {
    test("Testing the handleSubmit() function with incomplete data", async () => {
        const incompleteData = {
            'url': null,
            'lang': 'en'
        }
        await expect(postData(incompleteData)).rejects.toThrow('error');
    })

    test("Testing the handleSubmit() function with invalid data", async () => {
        const invalidData = {
            'url': 'https://www.bbc/news/uk-politics-55208218',
            'lang': 'en',
        }
        await expect(postData(invalidData)).rejects.toThrow('error');
    })

    test("Testing the handleSubmit() function with valid data", async () => {
        const validData = {
            'url': 'https://www.bbc.com/news/uk-politics-55208218',
            'lang': 'en',
        }

        const expected = {
            agreement: "DISAGREEMENT",
            irony: "NONIRONIC",
            sentiment: "NEU",
            subjectivity: "SUBJECTIVE"
        };
        await expect(postData(validData)).resolves.toMatchObject(expected);
    })
});
