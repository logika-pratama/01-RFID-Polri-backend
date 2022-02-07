'use strict';
var response = require('../res');
var koneksi = require('../koneksi');


//get employee by id
exports.employeeById = function(req, res) {
    let id = req.params.id;
    koneksi.query('SELECT * FROM employee WHERE EMP_code= ?', [id], function(error, rows, fields) {
        if (error) {
            response.ok({
                status: 'error',
                message: error
            }, res)
            console.log(error);
        } else {
            if (rows.length < 1) {
                return response.ok({
                    status: 'warning',
                    message: 'data tidak ditemukan berdasarkan IDnya',
                    data: rows
                }, res);
            }
            response.ok({
                status: 'succes',
                message: 'berhasil mendapatkan data',
                data: rows
            }, res);
        }
    });
};
//get all employee
exports.allemployee = function(req, res) {
    koneksi.query('SELECT * FROM employee', function(error, rows, fields) {
        if (error) {
            response.ok({
                status: 'error',
                message: error
            }, res);
            console.log(error);
        } else {
            response.ok({
                status: 'success',
                message: 'berhasil mendapatkan data',
                data: rows
            }, res);
        }

    });
};
// add 
exports.addemployee = function(req, res) {
    var Emp_id = req.body.Emp_id;
    var Emp_code = req.body.Emp_code;
    var Name = req.body.Name;
    var Birthdate = req.body.Birthdate;
    var Gender = req.body.Gender;
    var Age = req.body.Age;
    var tag_number = req.body.tag_number;
    var id_Account = req.body.id_Account;

    koneksi.query('INSERT INTO employee (Emp_id,Emp_code,Name,Birthdate,Gender,Age,tag_number,id_account) VALUES(?,?,?,?,?,?,?,?)', [Emp_id, Emp_code, Name, Birthdate, Gender, Age, tag_number, id_Account],
        function(error, rows, fields) {
            if (error) {
                response.ok({
                    status: 'error',
                    message: error.sqlMessage
                }, res);
                console.log(error);
            } else {
                response.ok({
                    status: "succes",
                    message: "Berhasil Menambahkan employee baru!"
                }, res);
            }
        });
};

// edit 
exports.editemployee = function(req, res) {
    var Emp_id = req.body.Emp_id;
    var Emp_code = req.body.Emp_code;
    var Name = req.body.Name;
    var Birthdate = req.body.Birthdate;
    var Gender = req.body.Gender;
    var Age = req.body.Age;
    var tag_number = req.body.tag_number;
    var id_Account = req.body.id_Account;

    koneksi.query('UPDATE employee SET Emp_id=?,Name=?,Birthdate=?,Gender=?,Age=?,tag_number=?,id_account=? WHERE Emp_code=?', [Emp_id, Emp_code, Name, Birthdate, Gender, Age, tag_number, id_Account],
        function(error, rows, fields) {
            if (error) {
                response.ok({
                    message: 'error',
                    error: error.sqlMessage
                }, res)
                console.log(error);
            } else {
                response.ok({
                    status: 'success',
                    message: "Berhasil mengubah data"
                }, res);
            }
        });
};

// delete 
exports.hapusemployee = function(req, res) {
    var id = req.body.id;
    koneksi.query('DELETE FROM employee WHERE Emp_code=?', [id],
        function(error, rows, fields) {
            if (error) {
                response.ok({
                    status: 'error',
                    message: error.sqlMessage
                }, res);
                console.log(error);
            } else {
                response.ok({
                    status: 'success',
                    message: "Berhasil Hapus Data"
                }, res)
            }
        });
}