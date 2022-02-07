'use strict';
var response = require('../res');
var koneksi = require('../koneksi');
//get by id
exports.THById = function(req, res) {

    let id = req.idaccount;
    koneksi.query('SELECT * FROM history WHERE status IS NOT NULL AND id_Account= ? ORDER BY last_update DESC', [id], function(error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok({
                    status: 'succeess',
                    message: 'berhasil mendapatkan data',
                    data: rows
                },
                res);

        }

    });
};


exports.search = function(req, res) {
    var id_Account = req.idaccount;
    var tag = req.params.tag;

    koneksi.query(
        "SELECT * FROM history WHERE id_Account=? AND tag_number=?", [id_Account, tag],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                if (rows.length < 1) {
                    return response.ok({
                        status: 'success',
                        message: 'Tag Number tidak ditemukan',
                        data: rows
                    }, res);

                }
                return response.ok({
                    status: 'success',
                    message: 'berhasil mendapatkan Tag Number',
                    data: rows
                }, res);
            }
        }
    );
}



const getCount = function(id, result) {
    koneksi.query(`SELECT COUNT(*) AS total_page FROM history WHERE id_Account = ${id}`,
        function(err, res) {
            if (err) {
                console.log("Error", err);
                result(err, null)
            } else {
                result(null, res)
            }
        });
};

exports.getHistory = async function(req, res) {
    let sort_by = `last_update`;
    let search_by = `tag_number`;

    let id = req.idaccount; // Get ID Account
    // Pagination
    let limit = req.query.rows_per_page; // Get limit 
    let page = req.query.page; // Get start Page
    let offset = (page - 1) * limit;
    if (req.query.rows_per_page == '') {
        limit = 10;
        page = 1;
        offset = 0;
    } else {
        limit = req.query.rows_per_page
    }

    // Search 
    let search = req.query.search;
    search = JSON.stringify(search);

    //query
    let query = `ORDER BY ${sort_by} DESC  LIMIT 10`;

    // Allowed from search 
    let allowed_search = {
        tag_number: 'Tag_Number',
        status: 'Status',
        item_code: 'Item Code',
        SKU: 'SKU',
        Name: 'Name'
    }

    let allowed_sort = {
        status: 'Status',
        tag_number: 'Tag_Number',
        item_code: 'Item Code',
        SKU: 'SKU',
        Name: 'Name',
        Quantity: 'Quantity',
        Uom: 'Uom',
        Device_ID: 'Reader Id',
        time_receive: 'Time Receive',
        time_monitoring: 'Time Monitoring',
        time_cashier: 'Time Cashier',
        time_delivery: 'Time Delivery'
    }


    // Pagination 
    if (req.query.rows_per_page && req.query.rows_per_page != '' && req.query.page && req.query.page != '') {
        query = `ORDER BY ${sort_by} DESC LIMIT ${limit} OFFSET ${offset}`
    }

    // Sort by
    if (req.query.sort_by && req.query.sort_by != '') {
        sort_by = req.query.sort_by
    }
    if (req.query.is_asc && req.query.is_asc != '') {
        if (req.query.is_asc == 'true') {
            query = `ORDER BY ${sort_by} ASC LIMIT ${limit} OFFSET ${offset}`
        } else {
            query = `ORDER BY ${sort_by} DESC LIMIT ${limit} OFFSET ${offset}   `
        }
    }
    //Search 
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
    // SHORTING 

    console.log(query);



    koneksi.query(`SELECT * FROM history WHERE status IS NOT NULL AND id_Account = ${id} ${query}`, function(error, rows, fields) {
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
                }, res)
            }
            let total = getCount(id, function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    let total_page = result[0].total_page;
                    let page_count = Math.ceil(total_page / limit);
                    return response.ok({
                        status: 'success',
                        messsage: 'Berhasil mendapatkan Data',
                        per_page: limit,
                        page_count: page_count,
                        first_page: 1,
                        current_page: page,
                        data: rows
                    }, res);
                }
            })
        }
    })
};




exports.getStatus = function(req, res) {
    let id = req.query.id;
    let tag = req.query.tag;

    koneksi.query(`SELECT A.* FROM 
    (SELECT * FROM history WHERE tag_number = ?  
    ORDER BY history.last_update DESC LIMIT 1) A
    WHERE (id_Account = ?)
    AND (status = "Delivered" OR status IS NULL)`, [tag, id], function(error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            console.log(rows.length)
            if (rows.length < 1) {
                return response.ok({
                    status: "high",
                    message: "Turn On Alarm",
                    data: rows
                }, res);
            } else {
                return response.ok({
                    status: 'low',
                    message: "Turn Off Alrm",
                    data: rows
                }, res);
            }
        }
    });
};