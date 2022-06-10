'use strict';

const koneksi = require('../koneksi');

exports.getHomeScreen = async (req, res) => {
  try{
    // TODO 
    // Cek Role 
    // Setting permision  -> 1
    // Other menu permision -> 2
    // Gate Scan have must Have Device ID 
    // Permission 3 Gate
    koneksi.query('SELECT * FROM menu WHERE category = "home"', 
    function(error, rows, fields){
      if(error){
        return res.status(500).json({
          status: 'error',
          message: 'Internal Server Error',
          error: error.sqlMessage
        });
      }
    
      let data = rows.map(item => ({
        id: item.id,
        title: item.title,
        integration_module_screen: item.integration_module_screen !== null ? item.integration_module_screen : [],
        rfid_screen: item.rfid_screen,
        table_headers: item.table_header !== null ?  JSON.parse(item.table_header)  : [],
        search_field: item.enable_search_field,
        setting_url_form: item.enable_setting_url_form,
        confirm_button: item.enable_confirm_buttom,
        config_menu_rfid_screen: JSON.parse(item.config_url_screen),
        url_screen: item.url_screen !== null ? item.url_screen : '',
        }));
    
      return res.send({
        status: 'success',
        data: data
        
      });
    })
  }catch(err){
    res.status(400).json({
      status: 'error',
      message: err.message
    });
  }
}

exports.getIntegrationScreen = async (req, res) => {
  try{
    koneksi.query('SELECT * FROM menu WHERE category = "integration"',
    function(error, rows, fields){
      if(error){
        return res.status(500).json({
          status: 'error',
          message: 'Internal Server Error',
          error: error.sqlMessage
        });
      }
    
      let data = rows.map(item => ({
        id: item.id,
        title: item.title,
        table: item.table,
        rfid_screen: item.rfid_screen,
        table_headers: item.table_header !== null ?  JSON.parse(item.table_header)  : [],
        search_field: item.enable_search_field,
        setting_url_form: item.enable_setting_url_form,
        confirm_button: item.enable_confirm_buttom,
        config_menu_rfid_screen: JSON.parse(item.config_url_screen),
        url_screen: item.url_screen !== null ? item.url_screen : "",
        }));
    
      return res.send({
        status: 'success',
        data: data
        
      });
    })
  }catch(err){
    res.status(400).json({
      status: 'error',
      message: err.message
    });
  }
}


exports.getUri = async (req, res) =>{
  try{
    let query = `SELECT menu_id, title, url_screen  FROM menu WHERE url_screen IS NOT NULL`;
    console.log(req.query);
    if(req.query.uri_code){
      let name = req.query.uri_code;
      name = name.toLowerCase();
      name = JSON.stringify(name)
      console.log(name)
      
      query += ` WHERE uri_code = ${name}`
  
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
    let {uri_code, uri, name }  = req.body;
    let dataName = uri_code.toLowerCase();
    const cek_name = await cekName(dataName);
    if(cek_name){
      return res.status(400).json({
        status: 'error',
        message: 'Name already exist'
      })
    }
  
    koneksi.query('INSERT INTO uri_tab (uri_code, uri, name) VALUES (?,?)', [dataName, uri, name],
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
    let uri_code = req.params.menu_id;
    let uri = req.body.uri;
    koneksi.query('UPDATE menu SET url_screen=? WHERE menu_id = ?', [uri, uri_code],
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