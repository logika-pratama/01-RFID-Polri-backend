'use strict';
var response = require('../res');
var koneksi = require('../koneksi');
var uniqid = require("uniqid");


//get Readers by id
exports.readersById = function(req, res) {
    let id = req.idaccount;
    koneksi.query('SELECT * FROM readers WHERE id_account= ?', [id], function(error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok(rows, res);
        }

    });
};

exports.getReadersName = function(req, res) {
    let id = req.idaccount;
    koneksi.query('SELECT name, reader_id FROM readers WHERE id_account= ?', [id], function(error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok(rows, res);
        }

    });
}

//get all readers
exports.allreader = function(req, res) {

    koneksi.query('SELECT * FROM readers ', function(error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok(rows, res);
        }

    });
};


// add 
exports.addreaders = function(req, res) {
    const
        name = req.body.name,
        description = req.body.description,
        id_account = req.idaccount,
        id_location = req.body.id_location,
        trxtype = req.body.trxtype;
    var rid = id_account.substring(0, 3) + uniqid.process().substring(7, 10)
    if (name.length > 30) {
        return response.warning({
            status: 'warning',
            message: 'nama terlalu panjang'
        }, res);
    }
    koneksi.query('INSERT INTO readers (name,description,reader_id,id_account,id_location,Inventory_trx_type) VALUES(?,?,?,?,?,?)', [name, description, rid, id_account, id_location, trxtype],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
                return response.warning({
                    status: 'error',
                    message: error.sqlMessage
                }, res)
            } else {
                return response.ok({
                    status: 'success',
                    message: 'Berhasil menambahkan Reader !',
                    reader_id: rid
                }, res)
            }
        });
};


// edit 
exports.editreaders = function(req, res) {
    const
        name = req.body.name,
        description = req.body.description,
        reader_id = req.params.id,
        id_account = req.idaccount,
        id_location = req.body.id_location,
        trxtype = req.body.trxtype;
    if (name.length > 30) {
        return response.warning({
            status: 'warning',
            message: 'nama terlalu panjang'
        }, res);
    }
    if(reader_id.length > 10){
        return response.warning({
            status: 'warning',
            message: 'readers terlalu panjang'
        }, res);
    }
    koneksi.query('UPDATE readers SET name=?,description=?,id_account=?,id_location=?,inventory_trx_type=? WHERE reader_id=?', [name, description, id_account, id_location, trxtype, reader_id],
        function(error, rows, fields) {
            if (error) {
                if (error.errno === 1452) {
                    return response.ok({
                        status: "error",
                        message: "Lokasi reader tidak sesuai/ lokasi tidak terdaftar"
                    }, res);
                }
            } else {
                return response.ok("Berhasil mengubah readers!", res);
            }
        });
};

// delete 
exports.hapusreaders = function(req, res) {
    var id = req.params.id;
    koneksi.query('DELETE FROM readers WHERE reader_id= ?', [id],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                return response.ok("Berhasil Hapus Data " + id, res)
            }
        });
}

const dgram = require('dgram');
const socket = dgram.createSocket('udp4');

exports.sendTag = function(req, res){
    let tag = req.body.tag;
    let deviceID = req.Device_ID;
    console.log(req.Device_ID);
    if(req.Device_ID == undefined || req.Device_ID == ''){
        return response.warning({
            status: 'warning',
            message: 'account tidak memiliki Device ID',
        }, res)
    }
    let data = tag + "," + deviceID
    console.log(data);
    socket.send(data, 8000, '151.106.112.34', function(error){
        if(error){
            socket.close();
            return response.warning({
                status: 'warnig',
                message: 'Server not Found',
                data : data
            }, res);
        }else{
            return response.ok({
                status: 'ok',
                message: 'OK',
                data : data
            }, res);
        }
    });
}