'use strict';

const koneksi = require('../koneksi');

exports.getHomeScreen = async (req, res) => {
  try{
    const role = req.role;
    let query = `SELECT * FROM menu WHERE category = "home"`;
    if(role == '2' || role == '3'){
      query += ` AND role = '2'`;
    }
    query += ` ORDER BY menu_order ASC`;
  
    koneksi.query(query, 
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
        integration_module_screen: item.integration_module_screen === 0 ? false : true,
        rfid_screen: item.rfid_screen  === 0 ? false : true,
        menu_order: item.menu_order,
        box : item.box === 0 ? false : true,
        table_headers: item.table_headers !== null ?  JSON.parse(item.table_headers)  : [],
        search_field: item.search_field === 0 ? false : true ,
        setting_url_form: item.setting_url_form  === 0 ? false : true,
        confirm_button: item.confirm_button  === 0 ? false : true,
        config_menu_rfid_screen: JSON.parse(item.config_menu_rfid_screen),
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


    koneksi.query('SELECT * FROM menu WHERE category = "integration" ORDER BY menu_order ASC',
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
        integration_module_screen: item.integration_module_screen === 0 ? false : true,
        table: item.table === 0 ? false : true,
        menu_order: item.menu_order,
        rfid_screen: item.rfid_screen=== 0 ? false : true,
        box : item.box === 0 ? false : true,
        table_headers: item.table_headers !== null ?  JSON.parse(item.table_headers)  : [],
        search_field: item.search_field === 0 ? false : true,
        setting_url_form: item.setting_url_form === 0 ? false : true,
        confirm_button: item.confirm_button === 0 ? false : true,
        config_menu_rfid_screen: JSON.parse(item.config_menu_rfid_screen),
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
    if(req.query.uri_code){
      let name = req.query.uri_code;
      name = name.toLowerCase();
      name = JSON.stringify(name)
      console.log(name)
      
      query += ` WHERE uri_code = ${name}`
  
    } 

    koneksi.query(`SELECT menu_id, title, url_screen FROM menu WHERE url_screen IS NOT NULL`, 
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


/// UPDATE history SET GR_Number=?, GR_Date= ? WHERE item_id IN  (?) ', [gr_number,time,id],

exports.editUri = async (req, res) => {
  try{ 

    const data = req.body.map(
      data => data.menu_id,
    );
    const uri = req.body.map(
      uri => uri.url_screen,
    )
   
    // data.toString();
    // uri.toString()
      
   for (let i = 0; i <= data.length - 1; i++) {
    koneksi.query(`UPDATE menu SET url_screen = ? WHERE menu_id = ?`, [uri[i], data[i]],
    function(error, rows, fields){
      if(error){
        return res.status(400).json({
          status: 'error',
          message: error.sqlMessage
        });
        }
      })
      console.log(uri[i]);
      console.log(data[i]);
    }
    return res.send({
      status: 'success',
      message: req.t('success_update_data')
    })
  }catch(error){
    return res.status(400).json({
      status: 'success',
      message: error.message
    })
  }
}

// const updateUri = (uri, id) =>{
//   return new Promise(function(resolve, reject) {
//     koneksi.query( `UPDATE menu SET url_screen = ? WHERE menu_id = ? `, [uri, id],
//     function(error, rows, fileds){
//       if(error){
//         reject(error.sqlMessage);
//       }else{
//         let data = JSON.stringify(rows);
//         data = JSON.parse(data);
//         resolve(data);
//       }
//     })
//   }
//   )
// }