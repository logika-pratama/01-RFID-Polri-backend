const koneksi = require('../koneksi');

exports.Monitoring = async (req, res) =>{
  try{
    const tag_number = req.body.rfid_code;
    if(req.body !== 'rfid_code'){
      return res.status(400).json({
        status: 'error',
        message: 'wrong parameter'
      })
    }

    updateFlag(tag_number);
    koneksi.query(`SELECT tag_number, flag log_tag_number WHERE tag_number IN (?) '${tag_number}'`,
    function(error, rows, fields){
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
        return res.send(allAseetId);
      }
    })
    
  }catch(error){
    return res.status(400).json({
      status: 'error',
      message: error.message
    })
  }
}


const updateFlag = (tag_number) =>{
  return new Promise((resolve, reject) =>{
    koneksi.query(`UPDATE log_tag_number SET flag = 2 WHERE tag_number IN (?) '${tag_number}'`, 
    function(error, rows, fields){
      if(error){
        reject(error);
      }else{
        resolve(rows);
      }
    });
  });
}
