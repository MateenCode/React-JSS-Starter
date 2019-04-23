import { BASE_URL } from 'configs';

export default class Fetch {
    static async fetch(options) {
        const { headers, method, body, path, data } = options;

        let requestOptions = {
            headers: {
                'Accept': 'application/json',
                ...headers,
            },
            method,
        };

        if (body) {
            requestOptions.body = JSON.stringify(body);
        } else if(data) {
            requestOptions.body = data;
        }

        // Fire the Request and Return the response promise Object
        const requestPromise = await fetch(new Request(`${BASE_URL}${path}`, requestOptions)).then((res)=> res).then((data)=> data.json());

        return requestPromise;
    }

    /* GET (retrieve) */
    static get = options => Fetch.fetch({ ...options, method: 'GET' });

    /* POST (create) */
    static post = options => Fetch.fetch({ ...options, method: 'POST' });

    /* PUT (update) */
    static put = options => Fetch.fetch({ ...options, method: 'PUT' });;

    /* DELETE (remove) */
    static delete = options => Fetch.fetch({ ...options, method: 'DELETE' });
}
