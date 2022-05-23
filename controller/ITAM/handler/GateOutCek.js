const path = require('path');
const koneksi = require('../../../koneksi');
const apiAdapter = require('../apiAddapter');
require('dotenv').config({path: path.resolve(__dirname, '../../../.env')})

const {URL_SERVICE_ITAM} = process.env;
console.log(URL_SERVICE_ITAM);
const api = apiAdapter(URL_SERVICE_ITAM);

// exports.gate = async(req, res) =>{
//     try{
//         koneksi.query(`SELECT * FROM log_tag_number WHERE flag = 0 OR flag = 3`, 
//         async function(error, rows, fields){
//             if(error){
//                 console.log(error);
//             }else{
//                 const allAseetId = rows.map(
//                     assetID => {
//                         return{
//                             rfid_code : assetID.tag_number,
//                         }
//                     }
//                 );
                
//                 const gate = await api.post('/api/v1/tag', {data: 'hhh'});
//                 res.send('OK');
            
//             }
//         });
//     }catch(error){
//         console.log(error);
//     }
// }

exports.gate = async (req, res) =>{
    try{
        const gate = await api.post('/api/gate', req.body);
        res.json(gate.data);
    }catch(error){
        console.log(error)
        return res.status(400).json({
            status: 'error',
            message: error.message
          })    
    }
}