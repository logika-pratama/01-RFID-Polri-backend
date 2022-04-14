"use strict";
const response = require("../res");
const koneksi = require("../koneksi");

const delet = (id) => {
    koneksi.query(
        "DELETE FROM transaction_monitoring WHERE item_id=?", [id],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                console.log("data dengan id: " + id + " di hapus");

            }
        }
    );
};

const deletCashier = (id) => {
    koneksi.query(
        "DELETE FROM transaction_monitoring WHERE item_id=?", [id],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                console.log("data dengan id: " + id + " di hapus");
                hystoryUpdate("status='Monitoring',time_monitoring=NOW(),time_cashier=' ' ", id);
            }
        }
    );
};

const hystoryUpdate = (trx, iid) => {
    return new Promise(function(resolve, reject) {
        koneksi.query("UPDATE history SET " + trx + " WHERE item_id=?", [iid],
            function(error, rows, fields) {
                if (error) {
                    reject(error);
                } else {
                    resolve("ada history baru!!!");
                    console.log("updated " + iid)
                }
            }
        );
    });
};


//delete SKU
exports.deleteSKU = function(req, res) {
    let id = req.idaccount;
    let id_reader = req.Device_ID;
    let sku = req.params.sku;
    koneksi.query(
        "DELETE FROM Transaction_Cashier WHERE item_id IN(SELECT item_id FROM items WHERE SKU=? AND id_Account=?) AND Device_ID=?", [sku, id, id_reader],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                console.log("data dengan SKU: " + id + " telah di hapus");
            }
        }
    );
};

exports.deletitem = function(req, res) {
    let id = req.idaccount;
    let id_reader = req.Device_ID;

    koneksi.query(
        "DELETE FROM Transaction_Cashier WHERE item_id=? AND Device_ID=?", [id, id_reader],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                console.log("data dengan SKU: " + id + " telah di hapus");
            }
        }
    );
};

//get by id
exports.TCById = function(req, res) {
    let id = req.idaccount;
    let id_reader = req.Device_ID;
    koneksi.query(
        'SELECT *,COUNT(*) AS Total FROM trx_Cashier_v WHERE status="unconfirm" AND id_Account= ? AND Device_ID=? GROUP BY SKU ', [id, id_reader],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                res.send({
                    status: 'success',
                    message: req.t('success_get_data'),
                    data: rows
                })
            }
        }
    );
};

//get all
exports.allTC = function(req, res) {
    koneksi.query(
        "SELECT *,COUNT(*) AS Total FROM trx_Cashier_v GROUP BY SKU",
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                res.send({
                    status: 'success',
                    message: req.t('success_get_data')
                })
            }
        }
    );
};

// add
exports.addTC = function(req, res) {
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
    //var Time_Scan_Cashier=req.body.Time_Scan_Cashier;

    koneksi.query(
        "INSERT INTO transaction_cashier (Device_ID,id_Account,id_location,item_id,UoM,Quantity,Line_number,Rack_number,Bin_number,Time_Enter,Time_Scan_Cashier) VALUES(?,?,?,?,?,?,?,?,?,NOW(),NOW())", [
            Device_ID,
            id_Account,
            id_location,
            item_id,
            UoM,
            Quantity,
            Line_number,
            Rack_number,
            Bin_number,
        ],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("move to cashier!", res);
                delet(item_id);
            }
        }
    );
};

// edit
exports.editTC = function(req, res) {
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
    koneksi.query(
        "UPDATE transaction_cashier SET Id=?,Device_ID=?,id_location=?,item_id=?,UoM=?,Quantity=?,Line_number=?,Rack_number=?,Bin_number=?,Time_Enter=?,Time_Out=?,status=? WHERE id_Account=?", [
            Id,
            Device_ID,
            id_location,
            item_id,
            UoM,
            Quantity,
            Line_number,
            Rack_number,
            Bin_number,
            Time_Enter,
            Time_Out,
            status,
            id_Account,
        ],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil mengubah data", res);
            }
        }
    );
};

// delete
exports.hapusTC = function(req, res) {
    var id = req.params.id;
    let id_reader = req.Device_ID;
    koneksi.query(
        "DELETE FROM Transaction_Cashier WHERE item_id=? AND Device_ID=? ", [id, id_reader],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
                response.error({
                    status: 'error',
                    message: 'Internal Server Error',
                    error: error.sqlMessage
                }, res)
            } else {
                hystoryUpdate("status='Monitoring',time_monitoring=NOW(),time_cashier=' '", id);
                return res.send({
                    status: 'success',
                    message: req.t('success_delete_data')
                })
            }
        }
    );
};

var Hystory = (item_id) => {
    koneksi.query(
        "UPDATE transaction_history SET time_cashier=NOW() , status=3 WHERE item_id=?", [item_id],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                console.log("ada history baru!!!");
            }
        }
    );
};

function ins(data, acc) {
    var dbru = data.split(",");
    for (var i = 0; i <= dbru.length - 1; i++) {
        koneksi.query(
            "INSERT INTO Transaction_Delivery (id_Account,item_id) VALUES(?,?)", [acc, dbru[i]],
            function(error, rows, fields) {
                if (error) {
                    console.log(error);
                } else {
                    console.log("done 1");
                    //console.log(sku + "-" + dbru[i]);
                }
            }
        );
    }
}

const confirmed = (sku, idreader, id_Account) => {
    koneksi.query(
        "UPDATE Transaction_Cashier SET status='confirmed' WHERE item_id IN(SELECT item_id FROM items WHERE SKU=? AND id_Account=?) AND Device_ID=?", [sku, id_Account, idreader],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                console.log("done 2");
                //console.log(sku + "-" + dbru[i]);
            }
        }
    );
};


exports.konfirm = function(req, res) {
    let sku = req.body.SKU;
    let id_reader = req.Device_ID;
    let id_account = req.idaccount
    console.log(req.body.SKU)
    console.log("SKUnya: " + sku + " id readernya= " + id_reader);
    for (var i = 0; i <= sku.length - 1; i++) {

        confirmed(sku[i], id_reader, id_account);
    }
    return res.send({
        status: 'success',
        message: req.t('success_update_data')
    })
};