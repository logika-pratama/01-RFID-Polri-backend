'use strict';
var response = require('../res');
var koneksi = require('../koneksi');
var mysql = require('mysql');
const helper = require('../helper/jwt.js')


exports.login = function(req, res) {
    var post = {
        password: req.body.password,
        email: req.body.email
    };
    var query = "SELECT users.*, account.modul_name from users JOIN account on account.id_account=users.id_account WHERE ??=? AND ??=?";
    var table = ["users.email", post.email, "users.password", post.password]
    query = mysql.format(query, table);
    koneksi.query(query, function(err, rows) {
        if (err) {
            return res.status(401).json({
                status: 'error',
                statusCode: "401",
                message: err.message
            });
        } else {
            if (rows.length == 1) {
                var data = rows[0];
                var encode = { name: data.name, id_user: data.id_user, idaccount: data.id_account, role: data.role, Device_ID: data.Device_ID, modul_name: data.modul_name } // encode information to jwt
                var token = helper.tesjwt(encode)
                console.log(token);
                response.ok({ jwtTokken: token }, res)
            } else {
                // response.ok({message:"email/password Salah!"},res)
                //console.log(rows)
                return res.status(401).json({
                    status: 'error',
                    statusCode: "401",
                    message: req.t("login.fail_login")
                });
            }
        }
    })
}
