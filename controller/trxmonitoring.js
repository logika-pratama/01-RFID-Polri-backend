"use strict";
const response = require("../res");
const koneksi = require("../koneksi");

//=========================query function========================
const deleteRecieve = (id) => {
    koneksi.query(
        "DELETE FROM Transaction_Receive WHERE item_id=?", [id],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                console.log("data dengan" + id + "telah di pindah ke monitoring");
            }
        }
    );
};

//==========================================================================

exports.monitor = function(req, res) {
    let id = req.params.id;
    koneksi.query(
        "UPDATE Transaction_Monitoring SET Time_Monitoring= NOW() WHERE item_id=? ", [id],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok(rows, res);
                console.log("monitoring beres!");
            }
        }
    );
};
// get all//get by id
exports.TMById = function(req, res) {
    let id = req.idaccount;
    koneksi.query(
        "SELECT * FROM trx_monitoring WHERE id_Account= ?", [id],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                res.send({
                    status: 'success',
                    message: req.t('success_get_data'),
                    data: rows
                })
            }
        }
    );
    
};

exports.TMByIdNull = function(req, res) {
    let id = req.idaccount;
    console.log(id);
    koneksi.query(
        'SELECT * FROM trx_monitoring WHERE Line_number="" OR Rack_number="" OR Bin_number="" OR Line_number IS NULL AND Rack_number IS NULL AND Bin_number IS NULL AND id_Account= ?', [id],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
               res.send({
                   status: 'success',
                   message: req.t('success_get_data'),
                   data: rows
               })
            }
        }
    );
};

//get all
exports.allTM = function(req, res) {
    koneksi.query(
        "SELECT * FROM Transaction_Monitoring",
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok(rows, res);
            }
        }
    );
};
// add
exports.addTM = function(req, res) {
    //var Id = req.body.Id;
    var Device_ID = req.body.Device_ID;
    var id_Account = req.body.id_Account;
    var id_location = req.body.id_location;
    var item_id = req.body.item_id;
    var UoM = req.body.UoM;
    var Quantity = req.body.Quantity;
    var Line_number = req.body.Line_number; // wajib diisi
    var Rack_number = req.body.Rack_number; /// wajib diisi
    var Bin_number = req.body.Bin_number; // wajib diisi
    // var Time_Enter = req.body.Time_Enter;
    var status = req.body.status;
    var Time_Monitoring = req.body.Time_Monitoring;
    var Time_Out = req.body.Time_Out;
    koneksi.query(
        "INSERT INTO Transaction_Monitoring (Device_ID,id_Account,id_location,item_id,UoM,Quantity,Line_number,Rack_number,Bin_number,Time_Monitoring) VALUES(?,?,?,?,?,?,?,?,?,NOW())", [
            Device_ID,
            id_Account,
            id_location,
            item_id,
            UoM,
            Quantity,
            Line_number,
            Rack_number,
            Bin_number,
        ],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                deleteRecieve(item_id);
                return res.send({
                    status: 'success',
                    message: req.t('monitoring.add_monitoring')
                })
            }
        }
    );
};

// edit
exports.editTM = function(req, res) {
    var Id = req.body.Id;
    var Device_ID = req.body.Device_ID;
    var id_Account = req.body.id_Account;
    var id_location = req.body.id_location;
    var item_id = req.body.item_id;
    var UoM = req.body.UoM;
    var Quantity = req.body.Quantity;
    var Line_number = req.body.Line_number;
    var Rack_number = req.body.Rack_number;
    var Bin_number = req.body.Bin_number;
    var Time_Enter = req.body.Time_Enter;
    var status = req.body.status;
    var Time_Monitoring = req.body.Time_Monitoring;
    var Time_Out = req.body.Time_Out;
    koneksi.query(
        "UPDATE Transaction_Monitoring SET Id=?,Device_ID=?,id_location=?,item_id=?,UoM=?,Quantity=?,Line_number=?,Rack_number=?,Bin_number=?,Time_Enter=?,Time_Monitoring=?,Time_Out=?,status=? WHERE id_Account=?", [
            Id,
            Device_ID,
            id_location,
            item_id,
            UoM,
            Quantity,
            Line_number,
            Rack_number,
            Bin_number,
            Time_Enter,
            Time_Monitoring,
            Time_Out,
            status,
            id_Account,
        ],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                res.send({
                    status: 'success',
                    message: req.t('success_update_data')
                })
            }
        }
    );
};

// delete
exports.hapusTM = function(req, res) {
    var id = req.body.id;
    koneksi.query(
        "DELETE FROM Transaction_Monitoring WHERE item_id?", [id],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                res.send({
                    status: 'success',
                    message: req.t('success_delete_data')
                })
            }
        }
    );
};

exports.autoPutway = function(req, res) {
    var id_Account = req.idaccount;
    console.log(id_Account);
    koneksi.query(
        'UPDATE Transaction_Monitoring SET Line_number="Auto",Rack_number="Auto",Bin_number="Auto" WHERE  UoM IS NULL AND Line_number IS NULL AND Rack_number IS NULL AND Bin_number IS NULL AND id_Account=?', [id_Account],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                res.json({
                    status: 'success',
                    message: req.t('monitoring.auto_putway')
                })
            }``
        }
    );
};


exports.Putway = function(req, res) {
    var id_Account = req.idaccount;
    var Line_number = req.body.Line_number;
    var Rack_number = req.body.Rack_number;
    var Bin_number = req.body.Bin_number;
    var item_id = req.params.item_id;
    //console.log(item_id);
    //for (var i = 0; i <= item_id.length-1; i++) {
    koneksi.query(
        "UPDATE Transaction_Monitoring SET Line_number=?,Rack_number=?,Bin_number=? WHERE id_Account=? AND item_id=?", [Line_number, Rack_number, Bin_number, id_Account, item_id],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                console.log("putway item id: " + item_id);
                return res.send({
                    status: 'success',
                    message: req.t('monitoring.auto_putway')
                })
            }
        }
    );
    // }
};
//aaaan
exports.bulkPutway = async function(req, res) {
    //response.ok("Berhasil update SKU Item", res);
    var item_id = req.body.item_id;
    var Line_number = req.body.Line_number;
    var Rack_number = req.body.Rack_number;
    var Bin_number = req.body.Bin_number;
    console.log(item_id);
    // var dbru =item_id.split(",");
    for (var i = 0; i <= item_id.length - 1; i++) {
        koneksi.query(
            "UPDATE Transaction_Monitoring SET Line_number=?,Rack_number=?,Bin_number=? WHERE item_id=?", [Line_number, Rack_number, Bin_number, item_id[i]],
            function(error, rows, fields) {
                if (error) {
                    console.log(error);
                } else {
                    console.log("BULK UPDATE SKU");
                    //console.log(sku + "-" + dbru[i]);
                }
            }
        );
    }
    res.send({
        status: 'success',
        message: req.t('success_update_data')
    })
};

exports.search = function(req, res) {
    var id_Account = req.idaccount;
    var tag = req.params.tag;

    koneksi.query(
        "SELECT * FROM trx_monitoring WHERE id_Account=? AND tag_number=?", [id_Account, tag],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                if (rows.length < 1) {
                   return res.send({
                       status: 'success',
                       message: req.t('tag_number_not_found')
                   })
                }
                // console.log("putway item id: " + item_id);
                return res.send({
                    status: 'success',
                    message: req.t('success_get_tag_number')
                })
            }
        }
    );
    // }
};

const getCount = function(id, result) {
    koneksi.query(`SELECT COUNT(*) AS total_page FROM trx_monitoring WHERE id_Account = ${id}`,
        function(err, res) {
            if (err) {
                console.log("Error ", err);
                result(err, null)
            } else {
                result(null, res)
            }
        });
};

exports.getMonitoring = function(req, res) {
    let sort_by = `Time_Monitoring`;
    let search_by = 'tag_number';
    let query = `ORDER BY ${sort_by} DESC  LIMIT 10;`;
    let id = req.idaccount; // Get ID ACCOUNT from request

    // paginatiom 
    let limit = 10;
    let page = req.query.page;
    let offset = (page - 1) * limit;
    if (req.query.rows_per_page == '') {
        limit = 10;
        page = 1;
        offset = 0;
    } else {
        limit = req.query.rows_per_page
    }


    // search 
    let search = req.query.search;
    search = JSON.stringify(search);

    // Shorting
    let is_asc = req.query.is_asc;
    is_asc = JSON.stringify(is_asc);

    let allowed_search = {
        tag_number: 'Tag_Number',
        item_code: 'Item Code',
        SKU: 'SKU',
        Name: 'Name'
    };

    let allowed_sort = {
        tag_number: 'Tag_Number',
        item_code: 'Item Code',
        SKU: 'SKU',
        Name: 'Name',
        Description: 'Description',
        Quantity: 'Qty',
        Uom: 'Uom',
        Line_number: 'Line No',
        Rack_number: 'Rack No',
        Bin_number: 'Bin No',
        Time_Monitoring: 'Time Monitoring'
    }


    if (req.query.rows_per_page && req.query.rows_per_page != '' && req.query.page && req.query.page != '') {
        query = `ORDER BY ${sort_by} DESC LIMIT ${limit} OFFSET ${offset}`
    }

    // sort by 
    if (req.query.sort_by && req.query.sort_by != '') {
        sort_by = req.query.sort_by;
    }
    if (req.query.is_asc && req.query.is_asc != '') {
        if (req.query.is_asc == 'true') {
            query = `ORDER BY ${sort_by} ASC LIMIT ${limit} OFFSET ${offset}`
        } else {
            query = `ORDER BY ${sort_by} DESC LIMIT ${limit} OFFSET ${offset}`
        }
    }

    // Search 
    if (req.query.search_by && req.query.search_by != '') {
        search_by = req.query.search_by
    }
    if (req.query.search && req.query.search != '') {
        query = `AND ${search_by} LIKE '%'${search} '%'`;
        if (req.query.sort_by && req.query.sort_by != '') {
            sort_by = req.query.sort_by;
            if (req.query.is_asc == 'true') {
                query = `AND ${search_by} LIKE '%'${search} '%' ORDER BY ${sort_by} ASC LIMIT ${limit} OFFSET ${offset}`
            } else {
                query = `AND ${search_by} LIKE '%'${search} '%' ORDER BY ${sort_by} DESC LIMIT ${limit} OFFSET ${offset}`
            }
        }
    }



    //Shorting 
    console.log(query);

    koneksi.query(`SELECT * FROM trx_monitoring WHERE id_Account = ${id} ${query}`,
        function(error, rows, fields) {
            if (error) {
                console.log(error);
                if (error.errno === 1054) {
                    return response.error({
                        status: 'error',
                        message: 'Internal Server Error',
                        error: error.sqlMessage
                    }, res)
                }
            } else {
                if (rows.length < 1) {
                    return response.ok({
                        status: 'success',
                        message: 'Data tidak ditemukan',
                        data: rows
                    }, res);
                }
                let total = getCount(id, function(err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        let total_page = result[0].total_page;
                        let page_count = Math.ceil(total_page / limit);
                        return response.ok({
                            status: 'success',
                            message: 'Berhasil mendapatkan Data',
                            rows_per_page: limit,
                            page_count: page_count,
                            first_page: 1,
                            current_page: page,
                            last_page: page_count,
                            data: rows,
                        }, res);
                    }
                });
            }
        }
    );
};