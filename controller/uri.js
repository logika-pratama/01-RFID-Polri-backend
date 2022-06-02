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

exports.addUri = async (req, res) => {
  try{
    let {name, uri }  = req.body;
    let dataName = name.toLowerCase();
    
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