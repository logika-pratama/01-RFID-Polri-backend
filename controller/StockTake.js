"use strict";
const response = require("../res");
const koneksi = require("../koneksi");
let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
var tanggal = year + "-" + month + "-" + date + "-" + hours + ":" + minutes; // buat data tanggal 

function inserToStockTake(
    Line,
    Rak,
    BIN,
    Tag_number,
    id_Account,
    id_location,
    Device_ID
) {
    return new Promise(function(resolve, reject) {
        koneksi.query(
            "INSERT INTO Stock_Take (Line,Rak,BIN, Status_ST,Tag_number,id_Account,id_location,Device_ID) VALUES(?,?,?,?,?,?,?,?) ", [Line, Rak, BIN, 'no', Tag_number, id_Account, id_location, Device_ID],
            function(error, rows, fields) {
                if (error) {
                    reject(error.sqlMessage);
                } else {
                    resolve("insert beres!");
                }
            }
        );
    });
}


function updateStatus(account) {
    koneksi.query(
        `UPDATE Stock_Take SET 
    Status_ST = "yes" 
    WHERE id_Account = ? AND Status_ST = ?`, [account, 'no'],
        function(error, rows, field) {
            if (error) {
                console.log(error)
            } else {

            }
        }
    )
}

exports.search = function(req, res) {
    var id_Account = req.idaccount;
    var tag = req.params.tag;

    koneksi.query(
        "SELECT * FROM trx_monitoring WHERE id_Account=? AND tag_number=?", [id_Account, tag],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                if (rows.length < 1) {
                    return response.warning({
                        status: 'warning',
                        message: 'Tag Number tidak ada pada monitoring',
                        data: rows
                    }, res)
                }
                return response.ok({
                    status: 'success',
                    message: 'berhasil mendapatkan Tag number',
                    data: rows
                }, res);
            }
        }
    );
    // }
};

exports.searchV2 = function(req, res) {
    var id_Account = req.idaccount;
    var tag = req.params.tag;
    var device_id = req.Device_ID;

    koneksi.query(
        "SELECT * FROM trx_monitoring WHERE id_Account=? AND tag_number=?", [id_Account, tag],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                try {
                    inserToStockTake(
                        rows[0].Line_number,
                        rows[0].Rack_number,
                        rows[0].Bin_number,
                        rows[0].tag_number,
                        id_Account,
                        rows[0].id_location,
                        device_id
                    );
                    console.log(rows[0].Line_number);
                    return response.ok({
                        status: 'success',
                        message: 'berhasil mendapatkan Tag number',
                        data: rows
                    }, res);
                } catch (err) {
                    return response.ok({
                        status: 'warning',
                        message: 'Tag Number tidak ditemukan',
                        data: rows
                    }, res);
                }
            }
        }
    );
    // }
};

exports.report = function(req, res) {
    var id_Account = req.idaccount;
    koneksi.query(
        `SELECT trx_monitoring.SKU,COUNT(trx_monitoring.SKU) 
        Counting,Target.Stock AS Inventory,(SELECT COUNT(tag_number) 
        from trx_monitoring 
        Where id_Account=?) 
        AS Total_Items,
        (SELECT COUNT(tag_number) 
        from Stock_Take Where id_Account=? AND Status_ST = "no") 
        AS Total FROM  trx_monitoring JOIN Stock_Take on Stock_Take.Tag_number=trx_monitoring.tag_number 
        JOIN (select tag_number,SKU, count(SKU) as Stock from  trx_monitoring WHERE id_Account=? group by SKU) 
        Target ON trx_monitoring.SKU=Target.SKU where Stock_Take.id_Account=? AND Status_ST = "no" GROUP by SKU`, [id_Account, id_Account, id_Account,id_Account],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                if (rows.length < 1) {
                    return response.ok({
                        status: 'success',
                        message: 'Seluruh data telah di report ',
                        data: rows
                    }, res);
                }
                console.log("report req by: " + id_Account);
                return response.ok({
                    status: 'success',
                    message: 'berhasil mendapatkan data',
                    fileName: tanggal + "-Stock Take Document",
                    data: rows
                }, res);
            }
        }
    );
    // }
};

exports.konfirmSt = function(req, res) {
    let id = req.idaccount;

    koneksi.query(
        `SELECT trx_monitoring.SKU,Name,COUNT(trx_monitoring.SKU) 
      Counting,Target.Stock AS Inventory,(SELECT COUNT(tag_number) 
      from trx_monitoring 
      Where id_Account=?) 
      AS Total_Items,
      (SELECT COUNT(tag_number) 
      from Stock_Take Where id_Account=? AND Status_ST = 'no') 
      AS Total FROM  trx_monitoring  JOIN Stock_Take on Stock_Take.Tag_number=trx_monitoring.tag_number  
      JOIN (select tag_number,SKU, count(SKU) as Stock from  trx_monitoring group by SKU) 
      Target ON trx_monitoring.SKU=Target.SKU where Stock_Take.id_Account=? group by SKU`, [id, id, id],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                console.log(rows.length)
                if (rows.length >= 1) {
                    updateStatus(id);
                    return response.ok({
                        status: 'success',
                        message: 'berhasil download data'
                    }, res)
                } else {
                    response.ok({
                        status: 'success',
                        message: 'seluruh data sudah terdownload'
                    }, res)
                }

            }
        }
    );
};