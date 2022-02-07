'use strict';
var response = require('../res');
var koneksi = require('../koneksi');


//================== locations===========================
//get location by id
exports.locationsById = function(req, res) {
    let id = req.params.id;
    koneksi.query('SELECT * FROM locations WHERE id_account= ?', [id], function(error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok(rows, res);
        }
    });
};


// add 
exports.addlocation = function(req, res) {
    const id_location = req.body.id_location,
        name = req.body.name,
        description = req.body.description,
        id_account = req.body.id_account;
    console.log(id_location.length);
    if (id_location.length < 1) {
        return response.ok({
            message: 'warning !',
            status: 'field id location tidak boleh kosong !'
        }, res)
    }
    koneksi.query('INSERT INTO locations (id_location,name,description,id_account) VALUES(?,?,?,?)', [id_location, name, description, id_account],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
                if (error.errno === 1062) {
                    return response.ok({
                        status: "warning !",
                        message: "ID Location sudah digunakan coba gunakan ID lain"
                    }, res)
                }
            } else {
                return response.ok({
                    status: 'succes',
                    message: 'berhasil menambahkan data ',
                    data: req.body
                }, res);
            }
        });
};


// edit 
exports.editlocation = function(req, res) {
    const id_location = req.params.id,
        name = req.body.name,
        description = req.body.description,
        id_account = req.idaccount;

    koneksi.query('UPDATE locations SET name=?,description=? WHERE id_location=? ', [name, description, id_location],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok({
                    status: 'succes',
                    message: 'berhasil update location  ',
                }, res);
            }
        });
};


// delete 
exports.hapuslocation = function(req, res) {
    var id = req.params.id;
    console.log(id);
    koneksi.query('DELETE FROM locations WHERE id_location = ?', [id],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Hapus Data", res)
            }
        });
}