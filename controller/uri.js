'use strict';

const koneksi = require('../koneksi');


exports.getUri = async (req, res) =>{
  try{
    let query = `SELECT * FROM uri_tab`;
    console.log(req.query);
    if(req.query.name){
      let name = req.query.name;
      name = name.toLowerCase();
      name = JSON.stringify(name)
      console.log(name)
      
      query += ` WHERE name = ${name}`
  
    } 

    koneksi.query(query, 
    function(error, rows, fields){
      if(error){
        console.log(error);
      }else{
        return res.send({
          status: 'success',
          data: rows 
        });
      }
    }
    )
  }catch(error){ 
    console.log(error);
    return res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
}

const cekName = (name) =>{
  return new Promise(function(resolve, reject) {
    koneksi.query( `SELECT * FROM uri_tab WHERE name = ? `, [name],
    function(error, rows, fileds){
      if(error){
        reject(error.sqlMessage);
      }else{
        let data = JSON.stringify(rows);
        data = JSON.parse(data);
        resolve(data);
      }
    })
  })
}

exports.addUri = async (req, res) => {
  try{
    let {name, uri }  = req.body;
    let dataName = name.toLowerCase();
    const cek_name = await cekName(dataName);
    if(cek_name){
      return res.status(400).json({
        status: 'error',
        message: 'Name already exist'
      })
    }
  
    koneksi.query('INSERT INTO uri_tab (name, uri) VALUES (?,?)', [dataName, uri],
    function(error, rows, fields){
      if(error){
        return res.status(400).json({
          status: 'error',
          message: error.sqlMessage
        });
      };
      return res.send({
        status: 'succes',
        message: req.t('success_add_data')
      })
    }
    )
  }catch(error){
    console.log(error);
    return res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
}

exports.editUri = async (req, res) => {
  try{ 
    let name = req.params.name;
    let uri = req.body.uri;
    koneksi.query('UPDATE uri_tab SET uri=? WHERE name = ?', [name, uri],
    function(error, rows, fields){
      if(error){
        return res.status(500).json({
          status: 'error',
          message: 'Internal Server Error',
          error: error.sqlMessage
        });
      }
      return res.send({
        status: 'success',
        message: req.t('success_update_data')
      });
    });
  }catch(error){
    return res.status(400).json({
      status: 'success',
      message: error.message
    })
  }
}