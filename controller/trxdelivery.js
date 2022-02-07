'use strict';
const response = require('../res');
const koneksi = require('../koneksi');

var deletemonitiring = (id) => {
    koneksi.query('DELETE FROM Transaction_Monitoring  WHERE item_id=?', [id],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                console.log("data dengan id: " + id + " telah di pindah ke delivery")
            }
        });
}
var deleteitem = (id) => {
    koneksi.query('DELETE FROM items  WHERE item_id=?', [id],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                console.log("data dengan id: " + id + " terhapus")
            }
        });
}
var deletcashier = (id) => {
    koneksi.query('DELETE FROM Transaction_Cashier  WHERE item_id=?', [id],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                console.log("data dengan id: " + id + " telah di pindah ke delivery")
            }
        });
}

var updateHistory = (item_id) => {
    koneksi.query('UPDATE history SET status="Delivered" WHERE item_id=?', [item_id],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                console.log("ada history baru!!!")
            }
        });
}

//get by id
exports.TDById = function(req, res) {
    let id = req.idaccount;
    let devid = req.Device_ID;
    koneksi.query('SELECT trx_Delivery_v.tag_number, trx_Delivery_v.item_id, trx_Delivery_v.item_code, trx_Delivery_v.Device_ID, trx_Delivery_v.SKU, trx_Delivery_v.Name,trx_Delivery_v.Time_Enter, Quantity, trx_Delivery_v.UoM FROM trx_Delivery_v JOIN items ON(trx_Delivery_v.item_id = items.item_id) WHERE trx_Delivery_v.id_Account = ? AND trx_Delivery_v.Device_ID = ?', [id, devid], function(error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok({
                status: 'success',
                message: 'berhasil mendapatkan data',
                data: rows
            }, res);
            console.log("TD");
        }
    });
};


//get all 
exports.allTD = function(req, res) {
    koneksi.query('SELECT * FROM Transaction_Delivery', function(error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok(rows, res);
            console.log("TD");
        }
    });
};

// add 
exports.addTD = function(req, res) {
    console.log("req= " + req);
    console.log("res= " + res);
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
    var Time_Out = req.body.Time_Out;
    koneksi.query('INSERT INTO Transaction_Delivery (Device_ID,id_Account,id_location,item_id,UoM,Quantity,Line_number,Rack_number,Bin_number,Time_Enter) VALUES(?,?,?,?,?,?,?,?,?,NOW())', [Device_ID, id_Account, id_location, item_id, UoM, Quantity, Line_number, Rack_number, Bin_number],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("item dg kode: " + item_id + " di pindahkan ke delivery", res);
                // deletemonitiring(item_id);
                // deletcashier(item_id);
                console.log(req.body.item_id);
            }
        });
};

// edit 
exports.editTD = function(req, res) {
    var Id = req.body.Id;
    var Device_ID = req.body.Device_ID;
    var id_Account = req.body.id_Account;
    var id_location = req.body.id_location;
    var item_id = req.body.item_id;
    var UoM = req.body.UoM;
    var Quantity = req.body.Quantity;
    var Line_number = req.Line_number;
    var Rack_number = req.body.Rack_number;
    var Bin_number = req.body.Bin_number;
    var Time_Enter = req.body.Time_Enter;
    var status = req.body.status;
    var Time_Out = req.body.Time_Out;
    koneksi.query('UPDATE Transaction_Delivery SET Device_ID=?,id_location=?,item_id=?,UoM=?,Quantity=?,Line_number=?,Rack_number=?,Bin_number=?,Time_Enter=?,Time_Out=?,status=? WHERE id_Account=?', [Device_ID, id_location, item_id, UoM, Quantity, Line_number, Rack_number, Bin_number, Time_Enter, Time_Out, status, id_Account],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil mengubah data", res);
            }
        });
};

// delete 
exports.hapusTD = function(req, res) {
    var id = req.params.id;
    koneksi.query('DELETE FROM Transaction_Delivery WHERE item_id=?', [id],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Hapus Data", res)
                    // deletcashier(id);
                    // deletemonitiring(id);
            }
        });
}


exports.konfirm = function(req, res) {

    var item_id = req.body.item_id;
    console.log(item_id.length);
    var i = 0;
    if (item_id.length < 1) {
        return response.warning({
            status: 'warning',
            message: "Harap pilih items untuk dipindahkan"
        }, res)
    }
    for (i; i <= item_id.length - 1; i++) {
        koneksi.query('DELETE FROM Transaction_Delivery WHERE item_id=?', [item_id[i]],
            function(error, rows, fields) {
                if (error) {
                    console.log(error);
                } else {
                    //response.ok("Berhasil Hapus Data", res)
                    // deletcashier(id);
                    // deletemonitiring(id);
                }
            });
        // after delivery confirm, delete data from all table
        deletcashier(item_id[i]);
        deletemonitiring(item_id[i]);
        deleteitem(item_id[i]);
        updateHistory(item_id[i]);
    }
    return response.ok({
        status: 'succes',
        message: "terima " + i + " items"
    }, res);


};