'use strict';
const response = require('../res');
const koneksi = require('../koneksi');
const uniqid = require('uniqid');
const Validator = require('fastest-validator');
const v = new Validator();

//get by id
exports.itemById = function(req, res) {
    let id = req.idaccount;

    koneksi.query('SELECT * FROM items WHERE id_Account= ?', [id], function(error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok(rows, res);
        }

    });
};

// Count items 
const itemCount = function(id, result) {
    koneksi.query(`SELECT COUNT(*) AS total_page FROM items WHERE id_Account = ${id}`,
        function(err, res) {
            if (err) {
                console.log("Error", err);
            } else {
                result(null, res);
            }
        })
}

// Pagination Get Items by ID
exports.getItems = async function(req, res) {
    let sort_by = `tag_number`
    let search_by = `tag_number`;
    let id = req.idaccount;

    // pagination 
    let limit = req.query.rows_per_page || 10;
    let page = req.query.page || 1;
    let offset = (page - 1) * limit;

    // Search 
    let search = req.query.search;
    search = JSON.stringify(search)
    let query = `ORDER BY ${sort_by} ASC LIMIT ${limit}`;
    // shorting 
    let is_asc = req.query.is_asc;
    is_asc = JSON.stringify(is_asc);

    let allowed_search = {
        tag_number: 'Tag_Number',
        item_code: 'Item Code',
        SKU: 'SKU',
        Name: 'Name'
    }
    let allowed_sort = {
        tag_number: 'Tag_Number',
        Item_category: 'Category',
        Item_Type: 'Type',
        item_code: 'Item Code',
        SKU: 'SKU',
        Name: 'Name',
        Description: 'Description',
        Quantity: 'Qty',
        Uom: 'Uom',
    }

    // Pagination 
    if (req.query.rows_per_page && req.query.rows_per_page != '' && req.query.page && req.query.page != '') {
        query = `ORDER BY ${sort_by} ASC LIMIT ${limit} OFFSET ${offset}`
    }

    //Shorting 
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

    console.log(query);

    koneksi.query(`SELECT * FROM items WHERE id_Account = ${id} ${query}`,
        function(error, rows, fields) {
            if (error) {
                console.log(error);
                if (error.errno === 1054) {
                    return response.error({
                        status: 'error',
                        messsage: 'Internal Server Error',
                        error: error.sqlMessage,
                    }, res)
                }
            } else {
                if (rows.length < 1) {
                    return response.ok({
                        status: 'success',
                        message: 'Data tidak ditemukan',
                        data: rows
                    })
                }
                let total = itemCount(id, function(err, result) {
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
                        }, res)
                    }
                });
            }
        }
    );
}

// get items with empety information
exports.datanull = function(req, res) {
    let id = req.idaccount;
    koneksi.query('SELECT * FROM items WHERE SKU="" OR SKU IS NULL AND id_Account= ?', [id], function(error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok(rows, res);
        }

    });
};



exports.itemByitemId = function(req, res) {
    let id = req.params.id;

    koneksi.query('SELECT * FROM items WHERE item_id= ?', [id], function(error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok(rows, res);
        }

    });
};

//get all 
exports.allitem = function(req, res) {
    console.log(req.id);
    koneksi.query('SELECT * FROM items', function(error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok(rows, res);
        }

    });
};
// add 
exports.additem = function(req, res) {
    var item_id = uniqid.process();
    var Item_code = req.body.Item_code;
    var Item_category = req.body.Item_category;
    var Item_Type = req.body.Item_Type;
    var SKU = req.body.SKU;
    var Name = req.body.Name;
    var Description = req.body.Description;
    var Uom = req.body.Uom;
    var Quantity = req.body.Quantity;
    var tag_number = req.body.tag_number;
    var id_Account = req.idaccount;
    var Ref_Number = req.body.Ref_Number;

    console.log(req.body)
    if (SKU.length < 1 || SKU.trim() == "") {
        return response.warning({
            status: 'warning',
            message: 'Silahkan isi SKU !'
        }, res);
    } else if (Quantity.length < 1 ) {
        return response.warning({
            status: 'warning',
            message: 'Silahkan isi Qauantity !'
        }, res);
    } else if (Ref_Number.length < 1 || Ref_Number.trim() == "") {
        return response.warning({
            status: 'warning',
            message: 'Silahkan isi Ref Number !'
        }, res);
    } else if (tag_number.length < 1 || tag_number.trim() == "") {
        return response.warning({
            status: 'warning',
            message: 'Silahkan isi Tag Number !'
        }, res);
    }
    // if (Item_code.length > 20){return response.warning({status: 'warning', message: 'Panjang Karakter melebihi batas !'}, res)}
    if (tag_number.length > 100){return response.warning({status: 'warning', message: 'Panjang Karakter melebihi batas !'}, res)}
    if (Ref_Number.length > 20){return response.warning({status: 'warning', message: 'Panjang Karakter melebihi batas !'}, res)}
    
    koneksi.query('INSERT INTO items (item_id,Item_code,Item_category,Item_Type,SKU,Name,Description,Uom,Quantity,tag_number,Ref_Number,Print_Tag,id_Account) VALUES(?,?,?,?,?,?,?,?,?,?,?,"yes",?)', [item_id, Item_code, Item_category, Item_Type, SKU, Name, Description, Uom, Quantity, tag_number, Ref_Number, id_Account],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
                res.status(400).json({
                    status: 'error',
                    message: error.sqlMessage
                })

            } else {
                response.ok({
                    status: 'success',
                    message: "behasil menambahkan item baru",
                    item_id: item_id
                }, res);
            }
        });
};

exports.registerItem = async (req, res) => {
    var item_id = uniqid.process();
    var Item_code = req.body.Item_code;
    var Item_category = req.body.Item_category;
    var Item_Type = req.body.Item_Type;
    var SKU = req.body.SKU;
    var Name = req.body.Name;
    var Description = req.body.Description;
    var Uom = req.body.Uom;
    var Quantity = req.body.Quantity;
    var tag_number = req.body.tag_number;
    var id_Account = req.idaccount;
    var Ref_Number = req.body.Ref_Number;

    if(typeof(Quantity) === 'string'){
        Quantity = parseInt(Quantity)
    } 
    console.log(typeof(Quantity));


    const schema = {
        Item_code: 'string|optional',
        Item_category: 'string|optional',
        Item_Type: 'string|optional',
        SKU: 'string|empty:false',
        Name: 'string|optional',
        Description: 'string|optional',
        Uom: 'string|optional',
        Quantity: 'number|empty:false|max:10|positive:true',
        tag_number: 'string|empty:false|max:100',
        Ref_Number: 'string|empty:false|max:10'
    }

    const validate = v.validate(req.body, schema);
    if(validate.length){
        return res.status(400).json({
            status: 'error',
            message: validate
        }); 
    }

    koneksi.query('INSERT INTO items (item_id,Item_code,Item_category,Item_Type,SKU,Name,Description,Uom,Quantity,tag_number,Ref_Number,Print_Tag,id_Account) VALUES(?,?,?,?,?,?,?,?,?,?,?,"yes",?)', [item_id, Item_code, Item_category, Item_Type, SKU, Name, Description, Uom, Quantity, tag_number, Ref_Number, id_Account],
    function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.status(500).json({
                status: 'error',
                message: error.sqlMessage
            })

        } else {
            response.ok({
                status: 'success',
                message: "successs add new item",
                item_id: item_id
            }, res);
        }400
    });

}
// edit 
exports.edititem = function(req, res) {
    const item_id = req.params.item_id;
    const Item_code = req.body.Item_code;
    const Item_category = req.body.Item_category;
    const Item_Type = req.body.Item_Type;
    const SKU = req.body.SKU;
    const Name = req.body.Name;
    const Description = req.body.Description;
    const Uom = req.body.Uom;
    const Quantity = req.body.Quantity;
    const tag_number = req.body.tag_number;
    const Ref_Number = req.body.Ref_Number;
    const id_Account = req.idaccount;
    console.log(`item_id : ${item_id}, id_Account: ${id_Account}`);
    console.log(req.body)
    if (SKU.length < 1 || SKU.trim() == "") {
        return response.warning({
            status: 'warning',
            message: 'Silahkan isi SKU !'
        }, res);
    } else if (Quantity.length < 1 ) {
        return response.warning({
            status: 'warning',
            message: 'Silahkan isi Qauantity !'
        }, res);
    } else if (Ref_Number.length < 1 || Ref_Number.trim() == "") {
        return response.warning({
            status: 'warning',
            message: 'Silahkan isi Ref Number !'
        }, res);
    } else if (tag_number.length < 1 || tag_number.trim() == "") {
        return response.warning({
            status: 'warning',
            message: 'Silahkan isi Tag Number !'
        }, res);
    }    
    if (Item_code.length > 20){return response.warning({status: 'warning', message: 'Panjang Karakter melebihi batas !'}, res)}
    if (Quantity.length > 10){return response.warning({status: 'warning', message: 'Panjang Karakter melebihi batas !'}, res)}
    if (tag_number.length > 100){return response.warning({status: 'warning', message: 'Panjang Karakter melebihi batas !'}, res)}
    if (Ref_Number.length > 20){return response.warning({status: 'warning', message: 'Panjang Karakter melebihi batas !'}, res)}    
    koneksi.query('UPDATE items SET Item_code=?,Item_category=?,Item_Type=?,SKU=?,Name=?,Description=?,Uom=?,Quantity=?,tag_number=?,Ref_Number=? WHERE item_id=? AND id_Account=?', [Item_code, Item_category, Item_Type, SKU, Name, Description, Uom, Quantity, tag_number, Ref_Number, item_id, id_Account],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
                if (error.errno === 1062) {
                    return response.error({
                        status: "error",
                        message: "Tag Number sudah digunakan",
                        error: error.sqlMessage
                    }, res);

                }
            } else {
                return response.ok({
                    status: "succes",
                    message: "Berhasil mengubah data"
                }, res);
            }
        });
};

// delete 
exports.hapusitem = function(req, res) {
    var id = req.params.id;
    koneksi.query('DELETE FROM items WHERE item_id=?', [id],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Hapus Data", res)
            }
        });
}

//serach item
exports.search = function(req, res) {
    var id_Account = req.idaccount;
    var tag = req.params.tag;

    koneksi.query(
        "SELECT * FROM items WHERE id_Account=? AND tag_number=?", [id_Account, tag],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                // console.log("putway item id: " + item_id);
                //response.ok(rows, res);
                return response.ok({
                    status: 'success',
                    data: rows
                }, res)
            }
        }
    );
    // }
};

exports.cekItem = function(req, res) {
    let id = req.query.id;
    let tag = req.query.tag;

    koneksi.query(`SELECT tag_number FROM items WHERE id_Account = ? AND tag_number = ?`, [id, tag],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                console.log(rows.length);
                if (rows.length < 1) {
                    return response.ok({
                        status: 'not found',
                        message: 'data tidak ditemukan',
                        data: rows
                    }, res);
                } else {
                    return response.ok({
                        status: 'success',
                        message: 'data berhasil didapatkan',
                        data: rows
                    }, res);
                }
            }
        });
};