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
            response.ok(rows, res);
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
            response.ok(rows, res);
        }
    });
};

//get all employee
exports.alluser = function(req, res) {
    koneksi.query('SELECT * FROM users', function(error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok(rows, res);
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

    if (id_user.length < 1 || id_user.trim() == "") {
        return response.warning({
            status: 'warning',
            message: 'Silahkan isi id user !'
        }, res);
    } else if (email.length < 1) {
        return response.warning({
            status: 'warning',
            message: 'Silahkan isi  email !'
        }, res);
    } else if (username.length < 1) {
        return response.warning({
            status: 'warning',
            message: 'Silahkan isi  username !'
        }, res);
    } else if (id_account.length < 0) {
        return response.warning({
            status: 'warning',
            message: 'Silahkan isi id account !'
        }, res);
    } else if (id_user.length >= 20) {
        return response.warning({
            status: 'warning',
            message: 'id user terlalu panjang'
        }, res);
    } else if (Device_ID.length >= 7) {
        return response.warning({
            status: 'warning',
            message: 'Device ID terlalu panjang'
        }, res);
    } else if (password.length < 1 || password.trim() == "") {
        return response.warning({
            status: 'warning',
            message: 'Silahkan Isi Password'
        }, res);
    }

    return res.send("OK");

    // koneksi.query('INSERT INTO users (id_user,name,description,telpon,email,username,password,id_account,role,Device_ID) VALUES(?,?,?,?,?,?,?,?,?,?)', [id_user, name, description, telpon, email, username, password, id_account, role, Device_ID],
    //     function(error, rows, fields) {
    //         if (error) {
    //             console.log(error);
    //         } else {
    //             return response.ok({
    //                 status: 'success',
    //                 message: "Berhasil Menambahkan user baru!"
    //             }, res);
    //         }
    //     });
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

    if (email.length < 1) {
        return response.warning({
            status: 'warning',
            message: 'Silahkan isi  email !'
        }, res);
    } else if (username.length < 1) {
        return response.warning({
            status: 'warning',
            message: 'Silahkan isi  username !'
        }, res);
    } else if (Device_ID.length >= 7) {
        return response.warning({
            status: 'warning',
            message: 'Device ID terlalu panjang'
        }, res);
    } else if (password.length < 1 || password.trim() == "") {
        return response.warning({
            status: 'warning',
            message: 'Silahkan Isi Password'
        }, res);
    }

    koneksi.query('UPDATE users SET name=?,description=?,telpon=?,email=?,username=?,password=?,role=?,Device_ID=? WHERE id_user=?', [name, description, telpon, email, username, password, role, Device_ID, id_user],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                return response.ok({
                    status: "succes",
                    message: "Berhasil mengubah data"
                }, res);
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
                response.ok("Berhasil Hapus Data", res)
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