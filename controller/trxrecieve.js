'use strict';
const response = require('../res');
const koneksi = require('../koneksi');
const axios = require('axios');

async function postInbound(payload) {
   const url = 'https://api.itam.dev.digiprimatera.co.id/api/gate_in';
    
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    axios.defaults.headers.common = {
        "apikey" : "$pbkdf2-sha512$6000$2vs/x5iTEgJASKkVgjAmhA$G2JBx8f9EC9f8xdXCVcpwryTWeFu0stocMDx6MH6lAUSbb3HzFPB9Ly9nMHQGjUH.RYnprT7Hg30WVxipo8hUw"
    }

    let response = await axios({
        method: "post",
        url: url,
        data: payload,
        config
    });
    console.log(response.status);
}

//get by id
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
    let idNumber = Math.floor(Math.random()*(999-100+1)+100);
    let gr_number ="" +  years + month + date
    let time = new Date()
    console.log(gr_number);
    koneksi.query('UPDATE history SET GR_Number=?, GR_Date= ? WHERE item_id=?', [gr_number,time,id], 
    function(error, rows, fields){
        if(error){
            console.log(error);
        }else{
            console.log("data dengan " + id + "berhasil di update GR_Number dan Date");
        }
    })
    
}

exports.TRById = function(req, res) {
    let id = req.idaccount;
    koneksi.query('SELECT * FROM Transaction_Receive WHERE id_Account= ?', [id], function(error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok(rows, res);
        }

    });
};
//
exports.TRByIdjoin = function(req, res) {
    let id = req.idaccount;
    let devid = req.Device_ID;
    console.log(devid);
    koneksi.query('SELECT * FROM trx_receive_join WHERE id_Account= ? AND Device_ID=? AND SKU IS NOT NULL', [id, devid], function(error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok(rows, res);
        }

    });
};


// add 
exports.addTR = function(req, res) {
    var Id = req.body.Id;
    var Device_ID = req.body.Device_ID;
    var id_Account = req.body.id_Account;
    var id_location = req.body.id_location;
    var item_id = req.body.item_id;
    var UoM = req.body.UoM;
    var Quantity = req.body.Quantity;
    var Line_number = req.body.Line_number;
    var Rack_number = req.body.Rack_number;
    var Bin_number = req.body.Bin_number;
    var Time_Enter = req.body.Time_Enter;
    var status = req.body.status;
    koneksi.query('INSERT INTO Transaction_Receive (Id,Device_ID,id_Account,id_location,item_id,UoM,Quantity,Line_number,Rack_number,Bin_number,Time_Enter,status) VALUES(?,?,?,?,?,?,?,?,?,?,NOW(),?)', [Id, Device_ID, id_Account, id_location, item_id, UoM, Quantity, Line_number, Rack_number, Bin_number, status],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Menambahkan employee baru!", res);
            }
        });
};

// edit 
exports.editTR = function(req, res) {
    var Id = req.body.Id;
    var Device_ID = req.body.Device_ID;
    var id_Account = req.body.id_Account;
    var id_location = req.body.id_location;
    var item_id = req.body.item_id;
    var UoM = req.body.UoM;
    var Quantity = req.body.Quantity;
    var Line_number = req.body.Line_number;
    var Rack_number = req.body.Rack_number;
    var Bin_number = req.body.Bin_number;
    var Time_Enter = req.body.Time_Enter;
    var status = req.body.status;

    koneksi.query('UPDATE Transaction_Receive SET Device_ID=?,id_location=?,item_id=?,UoM=?,Quantity=?,Line_number=?,Rack_number=?,Bin_number=?,Time_Enter=?,status=? WHERE id_Account=?', [Device_ID, id_location, item_id, UoM, Quantity, Line_number, Rack_number, Bin_number, Time_Enter, status, id_Account],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil mengubah data", res);
            }
        });
};

// delete 
exports.hapusTR = function(req, res) {
    var id = req.params.id;
    koneksi.query('DELETE FROM Transaction_Receive WHERE item_id=?', [id],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Hapus Data", res)
            }
        });
}

//confirm to monitoring
exports.ctm = async function(req, res) {
    var Device_ID = req.body.Device_ID;
    var id_Account = req.idaccount;
    var items = req.body.items;
    //console.log("item id= " + items);
    //console.log("akun= " + id_Account);
    //console.log("DV= " + Device_ID);
    console.log(`items${items.tag_number}`);

    var isSKUNull = false;
    var isItemsNull = false;
    console.log(items.length)
    if (items.length < 1) {
        return response.warning({
            status: 'warning',
            message: "Silahkan pilih beberapa item untuk dipindahkan ke monitoring!"
        }, res)

    }
    for (let i = 0, len = items.length; i < len; i++) {
        if (items[i].SKU.length < 1) {
            isSKUNull = true;
        }
        if (items[i].item_id.length < 1) {
            isItemsNull = true;
        }

    }

    if (isSKUNull && !isItemsNull) {
        return response.warning({
            status: 'warning',
            message: "Silahkan isi SKU pada item Sebelum confirm!"
        }, res)

    } else if (isItemsNull && !isSKUNull) {
        return response.warning({
            status: 'warning',
            message: "Silahkan pilih item Sebelum confirm!"
        }, res)

    } else if (isItemsNull && isItemsNull) {
        return response.warning({
            status: 'warning',
            message: "Silahkan pilih/isi item dan isi SKU Sebelum confirm!"
        }, res)

    } else {
        let arr = []
        for (var i = 0; i <= items.length - 1; i++) {
            console.log(Device_ID);
            console.log(id_Account);
            console.log(items[i].item_id);
            // if in monitoring(id_account & tag) exist -> delete -> inesert new data
            var cekmonitor = await cekMonitoring(items[i].item_id, id_Account);
            console.log(cekmonitor.length);
            if (cekmonitor.length > 0) {
                console.log(`Delete ${items[i].item_id}`)
                deleteMonitoring(items[i].item_id);
            }
            toMonitoring(Device_ID, id_Account, items[i].item_id);
            addNumber(items[i].item_id)
            deleteRecieve(items[i].item_id);
            var payload = {
                tipe: "gate_in",
                rfid_code: items[i].tag_number,
                tgl_masuk: "2022-02-07 11:11:11"
            }
            arr.push(payload);
            // to post api ITAM
            //let response = postInbound(payload);
        }
        console.log(arr);
        return response.ok({
            status: 'success',
            message: "Berhasil memperbarui item"
        }, res);
    }

};
