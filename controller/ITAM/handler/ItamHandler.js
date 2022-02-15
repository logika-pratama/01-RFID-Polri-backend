const koneksi = require('../../../koneksi');
const apiAdapter = require('../apiAddapter');

const url = 'https://api.itam.dev.digiprimatera.co.id';

const api = apiAdapter(url);



const toMonitoring = (Device_ID, id_Account, item_id) => {
    koneksi.query('INSERT INTO Transaction_Monitoring (Device_ID,id_Account,item_id,Time_Monitoring) VALUES(?,?,?,NOW())', [Device_ID, id_Account, item_id],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                console.log("Berhasil add intem to monitoring!");

            }
        });
}

function cekMonitoring(item_id, id_Account) {
    return new Promise(function(resolve, reject) {
        koneksi.query(
            "SELECT * FROM Transaction_Monitoring WHERE item_id= ? AND id_Account = ? ", [item_id, id_Account],
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


const deleteMonitoring = (id) => {
    koneksi.query('DELETE FROM Transaction_Monitoring WHERE item_id=?', [id],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                console.log("data dengan" + id + "telah di pindah ke monitoring")
            }
        });

}
const deleteRecieve = (id) => {
    koneksi.query('DELETE FROM Transaction_Receive WHERE item_id=?', [id],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                console.log("data dengan" + id + "telah di pindah ke monitoring")
            }
        });
}
const addNumber = (id) =>{
    let years = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    let date = new Date().getDate();
    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();
//    let idNumber = Math.floor(Math.random()*(999-100+1)+100);
    let gr_number ="" +  years + month + date + hours + minutes;
    let time = new Date()
    console.log(gr_number);
    koneksi.query('UPDATE history SET gi_number=?, gi_date= ? WHERE item_id=?', [gr_number,time,id], 
    function(error, rows, fields){
        if(error){
            console.log(error);
        }else{
            console.log("data dengan " + id + "berhasil di update GR_Number dan Date");
        }
    })
    
}


var deletemonitiring = (id) => {
    var sql = "DELETE FROM Transaction_Monitoring  WHERE item_id=?";
    koneksi.query(sql, id, function(err, rows){
        if(error){
            console.log(error);
        }else{
            console.log(`Data dengan ${id} berhasil di delete`);
        }
    })
}

var deleteitem = (id) => {
    var sql = "DELETE FROM items  WHERE item_id=?";
    koneksi.query(sql, id, function(err, rows){
        if(error){
            console.log(error);
        }else{
            console.log(`Data dengan ${id} berhasil di hapus`);
        }
    })
 
}

var updateHistory = (item_id) => {
    var sql = 'UPDATE history SET status= "Delivered" WHERE item_id=?'
    koneksi.query(sql, id, function(err, rows){
        if(error){
            console.log(eror);
        }else{
            console.log(`Data dengan ${id} berhasil di update`);
        }
    })
}



exports.gateIn = async(req, res) =>{
    try{

        console.log(api);
        const gatein = await api.post('/api/gate_in', req.body);
        apiData = gatein.data;

    }catch(error){
        console.log(error);
    }
}

exports.gateOut = async (req, res) =>{
    try{
        let data = [];
        var items = req.body.items;
        for(items; i<= items.length - 1; i++){
            let time = items[i].time_enter;
            let localtime = moment(time).utc().local().format('YYYY-MM-DD h:mm:ss');
            
        }
        console.log(api);
        const gateout = await api.post('/api/gate_out', req.body);
        return res.json(gateout.data);
    }catch(error){
        console.log(error)
    }
}