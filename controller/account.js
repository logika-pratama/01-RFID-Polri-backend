'use strict';
var response = require('../res');
var koneksi = require('../koneksi');
// get all
exports.allAccount = function(req, res) {

    koneksi.query('SELECT * FROM account', function(error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            return res.send({
                status: 'success',
                message: req.t("account.success_get_account"),
                data: rows
            })
        }
    });

};


//edit account
exports.editAccount = function(req, res) {
    try{
        let id_account = req.body.id_account,
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
            return res.send({
                status: 'success',
                message: req.t('account.success_update_account')
            })
        }
    });
    }catch(error){

    }
};

//get account by id
exports.accountById = function(req, res) {
    let id = req.params.id;
    koneksi.query('SELECT * FROM account WHERE id_account= ?', [id], function(error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            return res.send({
                status: 'success',
                message: req.t('account.success_get_account'),
                data: rows
            })
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

        koneksi.query('INSERT INTO account (id_account,name,description,email,address,telpon,status,register_date,expired_date,clean_data, modul_name) VALUES(?,?,?,?,?,?,?,?,?,?,?)', [id_account, name, description, email, address, telpon, status, registerDate, expiredDate, cleanData, modul_name],
            function(error, rows, fields) {
                if (error) {
                    console.log(error.errno);
                    if (error.errno === 1062) {
                        return response.ok({ "messeage": "Akun Sudah ada, Coba Gunakan ID" }, res)
                    }
                } else {
                    return res.send({
                        status: 'success',
                        message: req.t('account.success_add_account')
                    })
                }
            });
};


// delete account
exports.hapusaccount = function(req, res) {
    var id_account = req.body.id_account;
    koneksi.query('DELETE FROM account WHERE id_account=?', [id_account],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                res.send({
                    status: 'success',
                    message: req.t('account.succes_delete_account')
                })
            }
        });
}