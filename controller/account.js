'use strict';
var response = require('../res');
var koneksi = require('../koneksi');
// get all
exports.allAccount = function(req, res) {

    koneksi.query('SELECT * FROM account', function(error, rows, fields) {
        if (error) {
            console.log(error);
        } else {

            response.ok(rows, res);
            console.log("dari controller akun");
        }
    });

};


//edit account
exports.editAccount = function(req, res) {
    var id_account = req.body.id_account,
        description = req.body.description,
        email = req.body.email,
        addresss = req.body.addresss,
        telpon = req.body.telpon,
        status = req.body.status,
        expiredDate = req.body.expiredDate,
        cleanData = req.body.cleanData;

    koneksi.query('UPDATE SET description= ?,email= ?,address= ?,telpon= ?,status= ?,expired_date= ?,clean_data= ? WHERE id_account=?', [description, email, addresss, telpon, status, expiredDate, cleanData, id_account], function(error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok("Success update data", res);
        }

    });
};

//get account by id
exports.accountById = function(req, res) {
    let id = req.params.id;
    koneksi.query('SELECT * FROM account WHERE id_account= ?', [id], function(error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok(rows, res);
        }

    });
};

// add account
exports.addaccount = function(req, res) {
    const id_account = req.body.id_account,
        name = req.body.name,
        description = req.body.description,
        email = req.body.email,
        address = req.body.address,
        telpon = req.body.telpon,
        status = req.body.status,
        registerDate = req.body.registerDate,
        expiredDate = req.body.expiredDate,
        cleanData = req.body.cleanData,
        modul_name = req.body.modul_name;
    console.log(name.length);
    if (id_account.length < 1) {
        return res.send({
            status: 'warning',
            message: 'Harap isi semua data !'
        });
    } else {
        koneksi.query('INSERT INTO account (id_account,name,description,email,address,telpon,status,register_date,expired_date,clean_data, modul_name) VALUES(?,?,?,?,?,?,?,?,?,?,?)', [id_account, name, description, email, address, telpon, status, registerDate, expiredDate, cleanData, modul_name],
            function(error, rows, fields) {
                if (error) {
                    console.log(error.errno);
                    if (error.errno === 1062) {
                        return response.ok({ "messeage": "Akun Sudah ada, Coba Gunakan ID" }, res)
                    }
                } else {
                    return response.ok("Berhasil Menambahkan Data account!", res);
                }
            });
    }
};


// delete account
exports.hapusaccount = function(req, res) {
    var id_account = req.body.id_account;
    koneksi.query('DELETE FROM account WHERE id_account=?', [id_account],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Hapus Data", res)
            }
        });
}