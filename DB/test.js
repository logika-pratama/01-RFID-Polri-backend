const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env')})
const {TIMEOUT} = process.env

console.log(process.env.TIMEOUT);