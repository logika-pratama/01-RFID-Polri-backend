const path = require('path');
const koneksi = require('../../../koneksi');
const apiAdapter = require('../apiAddapter');
require('dotenv').config({path: path.resolve(__dirname, '../../../.env')})

const {URL_SERVICE_ITAM} = process.env;

const api = apiAdapter(URL_SERVICE_ITAM);

exports.validateTag = async (req, res) => {
    try{
        const res = await api.post('/api/check', req.body);
        const status = res.status;
        res.send({
            status: 'succcess',
            message: 'success get data',
            data: res.data  
        })

    }catch(error){
        console.log(error)
    }
}