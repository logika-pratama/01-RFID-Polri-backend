const axios = require('axios');

module.exports = (baseUrl) =>{
    apikey = "$pbkdf2-sha512$6000$R2ittdYao5RyDuE8B0BIyQ$fv3KP1KoRQFmT7VLKiXOhIhWZopdrogl7K1/bYw9WdtohgaW9PJ2p2I/HTJNAwXRyxBN6mP1qWDDIzy6w.k9uQ"
    return axios.create({
        baseURL: baseUrl,
        timeout: 5000,
        headers: {
            "apikey" : apikey
        }
    });
}