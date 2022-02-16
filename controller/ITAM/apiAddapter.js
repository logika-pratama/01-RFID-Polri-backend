const path = require('path');
const axios = require('axios');
require('dotenv').config({path: path.resolve(__dirname, '../../.env')})

const {API_KEY} = process.env


module.exports = (baseUrl) =>{
    apikey = API_KEY;
    return axios.create({
        baseURL: baseUrl,
        timeout: 5000,
        headers: {
            "apikey" : apikey
        }
    });
}