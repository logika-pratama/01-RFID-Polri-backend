'use strict';
const response = require('../res');
const koneksi = require('../koneksi');
const uniqid = require('uniqid')

// get data location information
exports.track = function(req, res) {
    let id = req.idaccount;
    let gate = req.body.gate;
    let itemName = req.body.itemName;
    let from = req.body.from;
    let to = req.body.to;
    var query;
    var data = [];
    // query all data
    if (gate === "ALL" && itemName === "ALL") {
        query = 'SELECT * FROM `tarck_detail_v` WHERE timestamp >=? AND timestamp <=? AND id_Account= ?';
        data = [from + " 00:00:00", to + " 59:00:00", id]; // time frame data
        console.log("ALL ALL")
    }
    // get data from spesific gate
    if (gate != "ALL" && itemName === "ALL") {
        query = 'SELECT * FROM `tarck_detail_v` WHERE reader_name=? AND timestamp >=? AND timestamp <=? AND id_Account= ?';
        data = [gate, from + " 00:00:00", to + " 59:00:00", id];
        console.log("NO ALL")
    }
    // get data from spesific gate and spesific item
    if (gate != " ALL" && itemName != "ALL") {
        query = 'SELECT * FROM `tarck_detail_v` WHERE name=? AND reader_name=? AND timestamp >=? AND timestamp <=? AND id_Account= ?';
        data = [itemName, gate, from + " 00:00:00", to + " 59:00:00", id];
        console.log("NO NO")
    }
    //get data from spesific item from all gate
    if (gate === "ALL" && itemName != "ALL") {
        query = 'SELECT * FROM `tarck_detail_v` WHERE name=? AND timestamp >=? AND timestamp <=? AND id_Account= ?';
        data = [itemName, from + " 00:00:00", to + " 59:00:00", id];
        console.log("ALL NO")
    }

    //query the data
    koneksi.query(query, data, function(error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            return res.send({
                status: 'success',
                message: req.t('success_get_data'),
                data: rows
            })
        }

    });
};

// get available gate information
exports.trackGate = function(req, res) {
    let id_Account = req.idaccount;
    koneksi.query('SELECT reader_name FROM `tarck_detail_v` WHERE id_Account=? GROUP BY reader_name', [id_Account], function(error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            return res.send({
                status: 'success',
                message: req.t('success_get_data'),
                data: rows
            })
        }

    });
}