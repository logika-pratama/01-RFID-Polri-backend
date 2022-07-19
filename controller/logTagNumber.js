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



// Inbound Function
exports.getZeroFlag = async (req, res) =>{
  try{
    const idaccount = req.idaccount;
    const sql = `SELECT items.tag_number, items.Item_code, items.SKU, 
    items.name,log_tag_number.updated_at, 
    items.quantity, items.Uom
    FROM items 
    RIGHT JOIN log_tag_number ON (items.tag_number=log_tag_number.tag_number)
    WHERE log_tag_number.flag = 0 AND items.id_Account = ? `;
    koneksi.query(sql,[idaccount],
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


// Good Recieve Function
exports.getFirstFlag = async (req, res) =>{
  try{
    const idaccount = req.idaccount;
    const sql = `SELECT items.tag_number, items.Item_code, items.SKU, 
    items.name,log_tag_number.updated_at, 
    items.quantity, items.Uom
    FROM items 
    RIGHT JOIN log_tag_number ON (items.tag_number=log_tag_number.tag_number)
    WHERE log_tag_number.flag = 1 AND items.id_Account = ? `;
    koneksi.query(sql,[idaccount],
    function(error, rows, fields){
      if(error){
        console.log(error);
      }else{
        return res.status(200).json({
          status: 'success',
          messsage: 'success get data',
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


// Monitoring Function
exports.getSecondFlag = async (req, res) =>{
  try{
    const idaccount = req.idaccount;
    const sql = `SELECT items.tag_number, items.Item_code, items.SKU, 
    items.name,log_tag_number.updated_at, 
    items.quantity, items.Uom
    FROM items 
    RIGHT JOIN log_tag_number ON (items.tag_number=log_tag_number.tag_number)
    WHERE log_tag_number.flag = 2 AND items.id_Account = ? `;
    koneksi.query(sql,[idaccount],
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


// Outbound Function
exports.getThirdFlag = async (req, res) =>{
  try{
    const idaccount = req.idaccount;
    const sql = `SELECT items.tag_number, items.Item_code, items.SKU, 
    items.name,log_tag_number.updated_at, 
    items.quantity, items.Uom
    FROM items 
    RIGHT JOIN log_tag_number ON (items.tag_number=log_tag_number.tag_number)
    WHERE log_tag_number.flag = 3 AND items.id_Account = ? `;
    koneksi.query(sql,[idaccount],
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

// Good Issue Function
exports.getFourhFlag = async (req, res) =>{
  try{
    const idaccount = req.idaccount;
    const sql = `SELECT items.tag_number, items.Item_code, items.SKU, 
    items.name,log_tag_number.updated_at, 
    items.quantity, items.Uom
    FROM items 
    RIGHT JOIN log_tag_number ON (items.tag_number=log_tag_number.tag_number)
    WHERE log_tag_number.flag = 4 AND items.id_Account = ? `;
    koneksi.query(sql, [idaccount],
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


function cektag(tag) {
  return new Promise(function(resolve, reject) {
      koneksi.query(
          "SELECT tag_number FROM log_tag_number WHERE tag_number IN (?) ", [tag],
          function(error, rows, fields) {
              if (error) {
                  reject(error.sqlMessage);
              } else {
                  var a = JSON.stringify(rows);
                  var b = JSON.parse(a);
                  resolve(b);
              }
          }
      );
  });
}

// Mobile Function
exports.searchMonitoring = async (req, res) =>{
  try{
    const idaccount = req.idaccount;
    const tag_number = req.query.tag_number;

    const cekTag = await cektag(tag_number);
    if(cekTag.length < 1){
        return res.status(400).json({
            status: 'warning',
            message: req.t('data_not_found'),
            data: [{
                tag_number: tag_number,
                Name: '',
            }]
        })
    }


    const sql = `SELECT items.tag_number, items.name
    FROM items 
    RIGHT JOIN log_tag_number ON (items.tag_number=log_tag_number.tag_number)
    WHERE log_tag_number.flag = 2 AND items.id_Account = ? AND items.tag_number = ?`;
    koneksi.query(sql, [idaccount, tag_number],
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