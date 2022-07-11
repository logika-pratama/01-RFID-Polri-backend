const path = require('path');
const koneksi = require('../../../koneksi');
require('dotenv').config({path: path.resolve(__dirname, '../../../.env')});



exports.StockTake = async(req, res) =>{
    try{
       const sql = `SELECT  tag_number FROM log_stock_opname`;
       const result = await koneksi.query(sql, function(error, rows, fields){
           if(error){
               console.log(error);
              }else{
                return res.status(400).json({
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

exports.addStockOpname = async (req, res) => {
    try{
        const no_sprint = req.body.no_sprint;
        // TODO Post Data to Get Value aset ID and Flag
        
        // Value to Insert to Database
        const value = req.body.aset_ids.map(item => ({
            tag_number: item.aset_id,
            flag: 0,
            no_sprint: no_sprint,
            created_at: new Date(),
            updated_at: new Date()

        })
        );

        let values = value.map((item) => Object.values(item));  
        console.log(`values ${values}`);  
        const sql = `INSERT INTO log_stock_opname (tag_number, flag, no_sprint, created_at, updated_at) VALUES ? ON DUPLICATE KEY UPDATE flag= 0`;
        const result = await koneksi.query(sql, [values], function(error, rows, fields){
            if(error){
                //console.log(error);
                throw error;
            }
            return res.status(400).json({
                status: 'success',
                message: 'succes add stock opname',
                data: rows
            });
        });
    }catch(error){
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
}