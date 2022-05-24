const koneksi = require('../koneksi');

exports.Putaway = async (req, res) =>{
  try{
    //console.log("Putaway");
    const tag_number = req.body.map(tag => tag.rfid_code);
    updateFlag(tag_number);
    const sql = `SELECT tag_number, flag FROM log_tag_number WHERE tag_number IN (?)`;
    koneksi.query(sql, [tag_number],
    function(error, rows, fields){
      let flag = 0;
      if(error){
        console.log(error);
      }else{
        if(rows.length < 1){
          return res.status(400).json({
            status: 'error',
            message: 'rfid code not found'
          })
        }
        const allAseetId = rows.map(
          
          assetID => {
            if(assetID.flag == 2){
              flag = 1;
            }else{
              flag = 0;
            }
            return{   
              rfid_code : assetID.tag_number,
              flag : flag
            }
          }
        );
        return res.send(allAseetId);
      }
    })
    
  }catch(error){
    if(error.message == "req.body.map is not a function"){
      return res.status(400).json({
        status: 'error',
        message: 'wrong parameter'
      })
    }
    return res.status(400).json({
      status: 'error',
      message: error.message
    })
  }
}

exports.getTagNumberByRfid = async (req, res) =>{
  try{
    const rfid_code = req.query.rfid_code;
    const sql = `SELECT tag_number, flag FROM log_tag_number WHERE tag_number = ?`;
    koneksi.query(sql, [rfid_code],
    function(error, rows, fields){
      if(error){
        console.log(error);
      }else{
        if(rows.length < 1){
          return res.status(400).json({
            status: 'error',
            message: 'rfid code not found'
          })
        }
        return res.status(200).json(rows[0]);
      }
    })
  }catch(error){
    return res.status(400).json({
      status: 'error',
      message: error.message
    })
  }
}

exports.getAllTagNumber = async (req, res) =>{
  try{
    const sql = `SELECT tag_number, flag FROM log_tag_number`;
    koneksi.query(sql,
    function(error, rows, fields){
      if(error){
        console.log(error);
      }else{
        return res.status(200).json({
          status: 'success',
          total: rows.length,
          data: rows
        });
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
    const sql = `UPDATE log_tag_number SET flag = 2, updated_at = NOW() WHERE tag_number IN (?)`;
    koneksi.query(sql, [tag_number],
    function(error, rows, fields){
      if(error){
        reject(error);
      }else{
        resolve(rows);
      }
    });
  });
}

