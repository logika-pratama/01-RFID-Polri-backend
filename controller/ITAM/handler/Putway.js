const path = require('path');
const koneksi = require('../../../koneksi');
require('dotenv').config({path: path.resolve(__dirname, '../../../.env')});



exports.putway = async(req, res) =>{
    try{
        const tag_number = req.body.tag_number;
        const line_number = req.body.line_number;
        const rack_number = req.body.rack_number;
        const bin_number = req.body.bin_number;
        const id_account = req.idaccount;
        console.log(req)

        if(!req.body.tag_number){
            res.status(400).json({
                status: 'warning',
                message: 'No tag number selected'
            });
        }

        koneksi.query(`UPDATE Transaction_Monitoring JOIN items ON Transaction_Monitoring.item_id = items.item_id SET Line_number=${line_number},Rack_number=${rack_number},Bin_number= ${bin_number} WHERE Transaction_Monitoring.id_Account = ${id_account} AND items.tag_number = ${tag_number}`,
            function(error, rows, fields){
                if(error){
                    console.log(error);
                }else{
                    res.json({
                        status: 'success',
                        message: `tag number ${tag_number} was upadted !`
                    })
                }
            }
        )
        

    }catch (error){
        console.log(error);
    }
}
