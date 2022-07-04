var koneksi = require('../koneksi');


exports.isAlarm =async (req, res) =>{
  try{ 
    const tag_number = req.body.map(tag => tag.rfid_code);
    const sql = `SELECT tag_number FROM log_tag_number WHERE tag_number IN (?) AND (flag = 2 OR flag = 3)`;
    koneksi.query(sql,[tag_number],
    function(error, rows, fields){
      if(error){
        console.log(error);
      }else{
        if(rows.length > 0){
          return res.send({
            status: 'success',
            alarm: true,
            data: rows
          })
        }
        return res.send({
          status: 'success',
          alarm: false, 
          data: tag_number
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