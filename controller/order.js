"use strict";
var response = require("../res");
var koneksi = require("../koneksi");
var uniqid = require("uniqid");

exports.getorderlist = function(req, res) {
    let id = req.idaccount;
    koneksi.query(
        "SELECT No_order, Order_Date, Customer,Address FROM Transaction_Order WHERE id_Account=? AND Status_QC='no' GROUP BY No_Order", [id],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok({
                    status: 'success',
                    message: 'berhasil mendapatkan data',
                    data: rows
                }, res);
            }
        }
    );
};

exports.deleteOreder = function(req, res) {
    let id = req.idaccount;
    let No_Order = req.params.No_Order
    koneksi.query(`DELETE FROM Transaction_Order WHERE  id_Account=? AND No_Order = ?`, [id, No_Order],
        function(error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok({
                    status: 'success',
                    message: 'berhasil menghapus data'
                }, res)
            }
        }

    )

}

exports.getitemlist = function(req, res) {
    let id = req.idaccount;
    let No_Order = req.params.No_Order;
    koneksi.query(
        "SELECT DN,SKU,Qty,Customer,Address FROM Transaction_Order WHERE status_QC='no' AND id_Account=? AND No_Order=?", [id, No_Order],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                if (rows.length > 0) {
                    response.ok({
                        status: 'success',
                        message: 'berhasil mendapatkan data',
                        data: rows
                    }, res);
                } else {
                    response.ok({
                        status: 'success',
                        message: 'data tidak ada',
                        data: []
                    }, res);
                }
            }
        }
    );
};