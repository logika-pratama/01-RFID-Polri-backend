const path = require('path');
const koneksi = require('../../../koneksi');
const apiAdapter = require('../apiAddapter');
require('dotenv').config({path: path.resolve(__dirname, '../../../.env')});


const {URL_SERVICE_ITAM} = process.env;
//console.log(URL_SERVICE_ITAM);
const api = apiAdapter(URL_SERVICE_ITAM)

exports.search = async(req, res) =>{
  try{
    const id_Account = req.idaccount;
    const tag = req.query.tag_number;
    

    let post = await api.get('/api/asset/detail',  { params: { asset_id: tag } });
    
    let data = post.data;
   // console.log("Data :", data);
    const payload = data.data.map(item => ({
      asset_id : item.asset_id,
      name_asset : item.name_asset,
      location_asset: item.location_asset
    })
    )
    return res.status(400).json({
      status: 'success',
      data: payload
    });
    
    // koneksi.query(
    //   "SELECT Name, tag_number FROM trx_monitoring WHERE id_Account=? AND tag_number=?", [id_Account, tag],
    //   function(error, rows, fields) {
    //       if (error) {
    //           console.log(error);
    //       }else {
    //         if(rows.length < 0){
    //           res.status(200).json({
    //             status: 'warning',
    //             message: 'data tidak ditemukan',
    //             data: [{
    //               tag_number: tag,
    //               Name: '',
    //             }]
    //           });
    //         }
    //         return res.status(200).json({
    //           status: 'success',
    //           data: rows
    //       })
    //     }
    //   }
    // );
  }catch(error){
    return res.status(400).json({
      status: 'error',
      message: error.message
    })
  }
}