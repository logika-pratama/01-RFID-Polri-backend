const path = require('path');
const koneksi = require('../../../koneksi');
const apiAdapter = require('../apiAddapter');
require('dotenv').config({path: path.resolve(__dirname, '../../../.env')})

const {URL_SERVICE_ITAM} = process.env;
//console.log(URL_SERVICE_ITAM);
const api = apiAdapter(URL_SERVICE_ITAM);

exports.gate = async(req, res) =>{
    try{
        koneksi.query(`SELECT * FROM log_tag_number WHERE flag = 0 OR flag = 3`, 
        async function(error, rows, fields){
            if(error){
                console.log(error);
            }else{
                const allAseetId = rows.map(
                    assetID => {
                        return{
                            rfid_code : assetID.tag_number,
                        }
                    }
                );
                
                //console.log(rows.length);
                if(rows.length > 0){
                    const gate = await api.post('/api/gate', allAseetId);
                    const tag_number = gate.data.data.map(tag => tag.rfid_code);
                    const flag = gate.data.data.map(flag => flag.flag);
                    //UpdateFlag(data);
                    changeFlag(tag_number, flag);
                    //console.log(tag_number);
                    // res.status(200).json({
                    //     status: 'success',
                    //     data: data
                    // });    
                }else{
                   //console.log('Dont Post Data');
                }
            }
        });
    }catch(error){
        console.log(error);
        return res.status(400).json({
            status: 'error',
            message: error.message
          }) 
    }
}




const UpdateFlag = (tag) => {
    const sql = `UPDATE log_tag_number SET flag = 1, updated_at = NOW() WHERE tag_number IN (?)`;
    koneksi.query(sql,[tag], 
    function(error, rows, fields){
        if(error){
            console.log(error);
        }else{
            console.log('Update Flag');
        }
    });
}

const changeFlag = (tag_number, flag) =>{
    return new Promise((resolve, reject) =>{
      for(let i = 0; i < tag_number.length ; i++){
        koneksi.query('UPDATE log_tag_number SET flag = ?, updated_at = NOW() WHERE tag_number = ?',  [flag[i], tag_number[i]],
          
        function(error, rows, fields){
          if(error){
            reject(error);
          }else{
            resolve(rows);
          }
        });
      }
    });
  }
  