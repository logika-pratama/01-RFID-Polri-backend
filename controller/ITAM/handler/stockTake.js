const path = require('path');
const koneksi = require('../../../koneksi');
const apiAdapter = require('../apiAddapter');
require('dotenv').config({path: path.resolve(__dirname, '../../../.env')});


const {URL_SERVICE_ITAM} = process.env;
const api = apiAdapter(URL_SERVICE_ITAM)


exports.StockTake = async(req, res) =>{
    try{
       const sql = `SELECT  tag_number FROM log_stock_opname`;
       const result = await koneksi.query(sql, function(error, rows, fields){
           if(error){
               console.log(error);
              }else{
                return res.status(200).json({
                    status: 'success',
                    message: 'berhasil mendapatkan Tag number',
                    data: rows
                });
              }
         });
    }catch (error){
       res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
}

// StockOpne Add to log_stock_opname
exports.addStockList = async (req, res) => {
    try {
        const {tag_number, sprint} = req.query;

        const flag = 0;
        created_at = new Date();
        updated_at = new Date();

        let values = [tag_number, flag, sprint, created_at, updated_at];
        const sql = `INSERT INTO log_stock_opname (tag_number, flag, no_sprint, created_at, updated_at) VALUES (?) ON DUPLICATE KEY UPDATE flag= 0`;
        const insert = await koneksi.query(sql, [values], function(error, rows, fields){
            if(error){
                console.log(error);
            }
        })
        const result = await koneksi.query('SELECT tag_number, flag FROM log_stock_opname WHERE flag = 1 AND no_sprint = ?', [sprint],
        function (error, rows, fields){
            if(error){
                console.log(error);
            }else{
                return res.status(200).json({
                    status: 'success',
                    message: 'success get data',
                    data: rows
                });
            }
        });
    }catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
}


exports.addStockOpname = async (req, res) => {
    try{
        let sql = 'SELECT no_sprint, GROUP_CONCAT(tag_number) as rfid_code FROM log_stock_opname WHERE flag = 0 GROUP BY no_sprint;';
        let result = await koneksi.query(sql, function(error, rows, fields){
            if(error){
                console.log(error);
            }else{
             
                let data = rows.map(item => ({
                    no_sprint: item.no_sprint,
                    // asset_ids: item.rfid_code.map(item => ({
                    //     asset_id: item})) 
                    asset_ids: item.rfid_code.split(',').map(item => ({
                        asset_id: item}))
                }))
                // TODO 
                // post Data to ITAM using For and Sceduller 
                return res.status(200).json({
                    status: 'success',
                    message: 'berhasil mendapatkan Tag number',
                    data: data
                });
            }
        });

    }catch(error){
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
}

exports.getListNoSprint = async (req, res) => {
    try{
        let getSprint = await api.get('/api/stock_opname/list');
        let data = getSprint.data.data;
        // TODO 
        // Insert to Database 
        return res.status(200).json({
            status: 'success',
            message: 'berhasil mendapatkan list no sprint',
            data: data
        })
    }catch(error){
        res.status(400).json({
            status: 'error',
            message: 'ini error'
        });
    }

}