'use strict';
const response = require('../res');
const koneksi = require('../koneksi');



//get user by id
exports.userById = function(req, res) {
    let id = req.params.id;
    koneksi.query('SELECT * FROM users WHERE id_user= ?', [id], function(error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            res.send({
                status: 'success',
                message: req.t('user.succes_get_user'),
                data: rows
            });
        }
    });
};

exports.akun = function(req, res) {
    let idaccount = req.idaccount;
    console.log("idnya----------------------------------------=" + idaccount);
    koneksi.query('SELECT * FROM users WHERE id_account=?', [idaccount], function(error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            res.send({
                status:'success',
                message: req.t('uer.success_get_user'),
                data: rows
            });
        }
    });
};

//get all employee
exports.alluser = function(req, res) {
    koneksi.query('SELECT * FROM users', function(error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            res.send({
                status: 'success',
                message: req.t('user.succes_get_user'),
                data: rows
            });
        }
    });
};

// add 
exports.adduser = function(req, res) {
    var id_user = req.body.id_user; // wajib
    var name = req.body.name;
    var description = req.body.description;
    var telpon = req.body.telpon;
    var email = req.body.email; // wajib
    var username = req.body.username; // wajib
    var password = req.body.password;
    var id_account = req.body.id_account; // wajib
    var role = req.body.role
    var Device_ID = req.body.Device_ID;

    console.log(typeof(req.body.role))
    if (req.body.role == "2" || req.body.role == "1"){
        Device_ID = "";
        console.log("Device ID harus 0 ")
    }
    koneksi.query('INSERT INTO users (id_user,name,description,telpon,email,username,password,id_account,role,Device_ID) VALUES(?,?,?,?,?,?,?,?,?,?)', [id_user, name, description, telpon, email, username, password, id_account, role, Device_ID],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                return res.send({
                    status: 'success',
                    message: req.t("success_create_user")
                });
            }
        });
};



//edit 
exports.edituser = function(req, res) {
    var id_user = req.params.id;
    var name = req.body.name;
    var description = req.body.description;
    var telpon = req.body.telpon;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var role = req.body.role;
    var Device_ID = req.body.Device_ID;


    koneksi.query('UPDATE users SET name=?,description=?,telpon=?,email=?,username=?,password=?,role=?,Device_ID=? WHERE id_user=?', [name, description, telpon, email, username, password, role, Device_ID, id_user],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                return res.send({
                    status: "succes",
                    message: req.t("success_update_user")
                });
            }
        });
};

// delete 
exports.hapususer = function(req, res) {
    var id = req.params.id;
    koneksi.query('DELETE FROM users WHERE id_user=?', [id],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                res.send({
                    status: 'success',
                    message: req.t("success_delete_user")
                })
            }
        });
}

const genKey = () => {
    return [...Array(30)]
        .map((e) => ((Math.random() * 36) | 0).toString(36))
        .join('');
};


exports.genApiKey = function(req, res) {
    let id_account = req.params.id;
    let api_key = genKey()
    console.log(id_account);

    koneksi.query(`UPDATE users SET api_key = ? WHERE id_user = ?`, [api_key, id_account],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                return response.ok({
                    status: "success",
                    message: "Berhasil Generate API KEY",
                    api_key: api_key
                }, res);
            }
        }
    )
}