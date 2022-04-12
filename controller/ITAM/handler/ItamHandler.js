const path = require('path');
const koneksi = require('../../../koneksi');
const apiAdapter = require('../apiAddapter');
const response = require('../../../res');
const moment = require('moment');
require('dotenv').config({path: path.resolve(__dirname, '../../../.env')});

const {URL_SERVICE_ITAM} = process.env;


const api = apiAdapter(URL_SERVICE_ITAM);


exports.gateIn = async(req, res) =>{
    try{
        const device_id = req.body.Device_ID;
        const id_account = req.idaccount;
        const items = req.body.items;
        
        if(items.length < 1){
            return response.warning({
                status: 'warning',
                message: 'Silahkan pilih beberapa item untuk dipindahkan ke monitoring'
            }, res);
        }

        let data = [];
        let item = [];

        for(let i = 0; i<= items.length - 1; i++){
            //console.log(items[i].item_id);
            //console.log(items[i].time_enter);
            let time = items[i].time_enter;
            let localtime = moment(time).utc().local().format('YYYY-MM-DD h:mm:ss');
            let payload = {
                tipe: "gate_in",
                rfid_code: items[i].tag_number,
                tgl_masuk: localtime,
            }
            data.push(payload);
            item.push(items[i].item_id);
        }
        
        const gatein = await api.post('/api/gate_in', data);

        console.log(status);
	 console.log(data);
        
        
        if (status.status == 1){
            let cekmonitor = await cekMonitoring(item);
            if(cekmonitor.length > 0){
                console.log('Delete Monitoring');
                deleteMonitoring(item);
            }            
            toMonitoring(item,device_id,id_account);
            deleteRecieve(item)
            addGRNumber(item);
            
            return response.ok({
                status: 'success',
                message: 'Sukes terima ' + items.length + ' items'
            }, res);    
        
        }else{
           return res.json(status);
        }
       



    }catch(error){
        if(error.code === 'ECONNREFUSED'){
            return res.status(500).json({status: 'error', message: 'service unavailable'});
        }
        const {status, data} = error.message;
        return res.status(status).json(data);
    }
}

exports.gateOut = async (req, res) =>{
    try{
        const device_id = req.body.Device_ID;
        const id_account = req.idaccount;
        const items = req.body.items;

        if(items.length < 1){
            return response.warning({
                status: 'warning',
                message: 'Silahkan pilih beberapa item untuk dipindahkan !'
            }, res);
        }
        let data = [];
        let item = [];

        let i = 0;
        for(i; i<= items.length - 1; i++){
            let time = items[i].time_enter;
            let localtime = moment(time).utc().local().format('YYYY-MM-DD h:mm:ss');
            let payload = {
                tipe: "gate_out",
                rfid_code: items[i].tag_number,
                tgl_masuk: localtime
            }
            data.push(payload);
            item.push(items[i].item_id)
            // after delivery confirm, delete data from all table    
        }
        const gateout = await api.post('/api/gate_out', data);
        const status = gateout.data
        //console.log(status)

        if(status.status == 1){
            deleteDelivery(item);
            updateHistory(item);
            deleteMonitoring(item);
            // deleteitem(item); // Khusus POLRI Delete ITEM tidak digunakan 
            addGINumber(item);
            return response.ok({
                status: 'success',
                message: 'Sukes terima ' + items.length + ' items'
            }, res);    
        }else{
            return res.json(status);
        }

    }catch(error){
        if(error.code === 'ECONNREFUSED'){
            return res.status(500).json({status: 'error', message: 'service unavailable'});
        }
        const {status, data} = error.message;
        return res.status(status).json(data);
    }
}


const toMonitoring = (item, device_id, id_account) => {

    let records = [];
    for(let i =0; i <= item.length -1; i++){
        let value = []
        value.push( device_id, id_account,item[i]);
        records.push(value);
        
    }
    console.log(records);

    let sql = "INSERT INTO Transaction_Monitoring (Device_ID,id_Account,item_id) VALUES ?"
    koneksi.query(sql, [records],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                console.log("Berhasil add intem to monitoring!");

            }
        });
}

function cekMonitoring(item_id) {
    return new Promise(function(resolve, reject) {
        let values = item_id.toString()
        console.log(values);
        koneksi.query(
            `SELECT * FROM Transaction_Monitoring WHERE item_id IN (?) `, [item_id ],
            function(error, rows, fields) {
                if (error) {
                    reject(error.sqlMessage);
                } else {
                    var a = JSON.stringify(rows);
                    var b = JSON.parse(a);
                    //console.log(b);
                    resolve(b);
                }
            }
        );
    });
}


const deleteMonitoring = (id) => {
    koneksi.query('DELETE FROM Transaction_Monitoring WHERE item_id IN (?)', [id],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                console.log("data dengan" + id + "telah di pindah ke monitoring")
            }
        });

}
const deleteRecieve = (id) => {
    koneksi.query('DELETE FROM Transaction_Receive WHERE item_id IN (?)', [id],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                console.log("data dengan" + id + " telah di pindah ke monitoring")
            }
        });
}

const deleteDelivery = (id) => {
    koneksi.query('DELETE FROM Transaction_Delivery WHERE item_id IN (?)', [id],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                console.log("data dengan" + id + " berhasil di hapus dari delivery ")
            }
        });
}

function convertTZ(date, tzString) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
}


const addGRNumber = (id) =>{
    let time = new Date()
    convertTZ(time);
    let years = time.getFullYear();
    let month = time.getMonth() + 1;
    let date = time.getDate();
    let hours = time.getHours();
    let minutes = time.getMinutes();
//    let idNumber = Math.floor(Math.random()*(999-100+1)+100);
    let gr_number ="" +  years + month + date + hours + minutes;
    console.log(gr_number);


    koneksi.query('UPDATE history SET GR_Number=?, GR_Date= ? WHERE item_id IN  (?) ', [gr_number,time,id], 
    function(error, rows, fields){
        if(error){
            console.log(error);
        }else{
            console.log("data dengan " + id + " berhasil di update GR_Number dan Date : " + time);
        }
    })
    
}

const addGINumber = (id) =>{
    let time = new Date()
    convertTZ(time);
    let years = time.getFullYear();
    let month = time.getMonth() + 1;
    let date = time.getDate();
    let hours = time.getHours();
    let minutes = time.getMinutes();
//    let idNumber = Math.floor(Math.random()*(999-100+1)+100);
    let gi_number ="" +  years + month + date + hours + minutes;
    //console.log(gi_number);

    koneksi.query('UPDATE history SET gi_number=?, gi_date= ?, status= "Delivered" WHERE item_id IN  (?) ', [gi_number,time, id], 
    function(error, rows, fields){
        if(error){
            console.log(error);
        }else{
            console.log("data dengan " + id + " berhasil di update gi_number dan Date : " + time);
        }
    })
    
}


var deleteitem = (id) => {
    var sql = "DELETE FROM items  WHERE item_id IN (?)";
    koneksi.query(sql, [id], function(error, rows){
        if(error){
            console.log(error);
        }else{
            console.log(`Data dengan ${id} berhasil di hapus dari master item`);
        }
    })
 
}

var updateHistory = (item_id) => {
    var sql = 'UPDATE history SET status= "Delivered" WHERE item_id IN (?)'
    koneksi.query(sql, [item_id], function(error, rows){
        if(error){
            console.log(error);
        }else{
            console.log(`Data dengan ${item_id} berhasil di update`);
        }
    })
}
