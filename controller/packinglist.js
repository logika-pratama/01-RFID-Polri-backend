"use strict";
var response = require("../res");
var koneksi = require("../koneksi");
var uniqid = require("uniqid");

const hystoryUpdate = (sku, idaccount, devid) => {
    return new Promise(function(resolve, reject) {
        koneksi.query(
            "UPDATE history SET time_cashier=NOW(),status='Packed' WHERE item_id IN(SELECT item_id from Transaction_Cashier WHERE item_id IN(SELECT item_id from items WHERE SKU=?) AND id_Account=? AND Device_ID=?)", [sku, idaccount, devid],
            function(error, rows, fields) {
                if (error) {
                    reject(error);
                } else {
                    resolve("ada history baru!!!");
                }
            }
        );
    });
};


const confirmed = (sku, idreader, id_Account) => {
    koneksi.query(
        "UPDATE Transaction_Cashier SET status='confirmed' WHERE item_id IN(SELECT item_id FROM items WHERE SKU=? AND id_Account=?) AND Device_ID=?", [sku, id_Account, idreader],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                console.log("done 2");
                //console.log(sku + "-" + dbru[i]);
            }
        }
    );
};
const confirmOerder = (noOrder, idAccount) => {
    koneksi.query(
        "UPDATE Transaction_Order SET Status_QC='yes' WHERE No_Order=? AND id_Account=?", [noOrder, idAccount],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                console.log("done 2");

            }
        }
    );
};

exports.createpacking = function(req, res) {
    let id = req.idaccount;
    let No_Order = req.body.No_Order;
    let No_Packing = req.body.No_Packing;
    let QTY_Items = req.body.QTY_Items;
    var TotalBox = req.body.TotalBox;
    let id_location = req.body.location;
    let sku = req.body.sku;
    let id_reader = req.Device_ID;

    for (var i = 0; i <= TotalBox - 1; i++) {
        console.log("box ke: " + i);
        koneksi.query(
            "INSERT INTO packing (No_Order,No_Packing,DO_Date,No_Box,TotalBox,Qty_Items,print_Status,id_Account,id_location) VALUES(?,?,NOW(),?,?,?,'1',?,?)", [No_Order, No_Packing[i], i + 1, TotalBox, QTY_Items[i], id, id_location],
            function(error, rows, fields) {
                if (error) {
                    console.log(error);
                } else {
                    console.log("box ke" + i);
                }
            }
        );
    }

    for (var j = 0; j <= sku.length - 1; j++) {
        try {
            confirmed(sku[j], id_reader, id);
            hystoryUpdate(sku[j], id, id_reader);
            console.log("konfirm & cek" + sku[j]);
        } catch (e) {
            console.log("nah!!!!")
        }
    }
    confirmOerder(No_Order, id);
    response.ok({
        status: 'success',
        message: "Packet sudah diKonfirmasi"
    }, res);
};