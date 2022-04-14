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
            return res.send({
                status:' success',
                message: req.t('success_get_data'),
                data: rows
            })
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
                return res.send({
                    status: 'success',
                    message: req.t('location.success_add_location')
                });
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
                return res.send({
                    status: 'success',
                    message: req.t('location.success_update_location')
                })
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
                res.send({
                    status: 'success',
                    message: req.t('success_delete_data')
                })
            }
        });
}