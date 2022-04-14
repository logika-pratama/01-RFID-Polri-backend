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
                res.send({
                    status: 'success',
                    message: req.t('success_get_data')
                })
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
                res.send({
                    status: 'success',
                    message: req.t('success_delete_data')
                })
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
                    return res.send({
                        status: 'success',
                        message: req.t('success_get_data'),
                        data: rows
                    })
                } else {
                    return res.send({
                        status: 'success',
                        message: req.t('data_not_found'),
                        data: rows
                    })
                }
            }
        }
    );
};