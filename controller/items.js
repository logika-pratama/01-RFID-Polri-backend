'use strict';
const response = require('../res');
const koneksi = require('../koneksi');
const uniqid = require('uniqid');
const Validator = require('fastest-validator');
const v = new Validator();

//get by id
exports.itemById = function(req, res) {
    let id = req.idaccount;

    koneksi.query('SELECT Item_code, Item_category, SKU, Name, Description, Uom, Quantity, tag_number, Ref_Number, created_at FROM items WHERE id_Account= ?', [id], function(error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            res.send({
                status: "success",
                totalItem: rows.length,
                message: req.t("success_get_data"),
                data: rows
            });
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

function cektag(tag) {
    return new Promise(function(resolve, reject) {
        koneksi.query(
            "SELECT tag_number FROM items WHERE tag_number IN (?) ", [tag],
            function(error, rows, fields) {
                if (error) {
                    reject(error.sqlMessage);
                } else {
                    var a = JSON.stringify(rows);
                    var b = JSON.parse(a);
                    resolve(b);
                }
            }
        );
    });
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
    try{
        let id = req.idaccount;
        koneksi.query('SELECT * FROM items WHERE SKU="" OR SKU IS NULL AND id_Account= ?', [id], function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                res.send({
                    status: "success",
                    message: req.t("success_get_data"),
                    data: rows
                });
            }
    
        });
    }catch(err){
        const {status, data} = err.message;
        return res.status(status).json(data); 
    }

};



exports.itemByitemId = function(req, res) {
    try{
        let id = req.params.id;

        koneksi.query('SELECT * FROM items WHERE item_id = ?', [id], function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                res.send({
                    status: "success",
                    message: req.t("success_get_data"),
                    data: rows 
                });
            }
        });
    }catch(err){
        const {status, data}  = err.message;
        return res.status(status).json(data);
    }

};

//get all 
exports.allitem = function(req, res) {
    console.log(req.id);
    koneksi.query('SELECT * FROM items', function(error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            res.send({
                status: "success",
                message: req.t("success_get_data"),
                data: rows
            });
        }

    });
};
// add 
exports.additem = async function(req, res) {
    try{
        let item_id = uniqid.process();
        let Item_code = req.body.Item_code;
        let Item_category = req.body.Item_category;
        let Item_Type = req.body.Item_Type;
        let SKU = req.body.SKU;
        let Name = req.body.Name;
        let Description = req.body.Description;
        let Uom = req.body.Uom;
        let Quantity = req.body.Quantity;
        let tag_number = req.body.tag_number;
        let id_Account = req.idaccount;
        let Ref_Number = req.body.Ref_Number;

        const tag = await cektag(tag_number);
        //console.log(tag);
        if(tag.length > 0){
            return res.status(400).json({
                status: 'error',
                message: req.t('item.tag_exist')
    
            });
        }
    
        koneksi.query('INSERT INTO items (item_id,Item_code,Item_category,Item_Type,SKU,Name,Description,Uom,Quantity,tag_number,Ref_Number,Print_Tag,id_Account) VALUES(?,?,?,?,?,?,?,?,?,?,?,"yes",?)', [item_id, Item_code, Item_category, Item_Type, SKU, Name, Description, Uom, Quantity, tag_number, Ref_Number, id_Account],
            function(error, rows, fields) {
                if (error) {
                    return res.status(400).json({
                        status: 'error',
                        message: error.sqlMessage
                    })
    
                }
            });
        return res.send({
            status: 'success',
            message: req.t('item.success_create_item'),
            item_id: item_id
        });

    }catch(err){

        const {status, data} = err.message;
        return res.status(status).json(data);
    }

};

// public API
exports.registerItem = async (req, res) => {
    
    const data = req.body.map(item => ({
            item_id: uniqid.process(),
            Item_code: item.Item_code,
            Item_category: item.Item_category,
            Item_Type: item.Item_Type,
            SKU: item.SKU,
            Name: item.Name,
            Description: item.Description,
            Uom: item.Uom,
            Quantity: item.Quantity,
            tag_number: item.tag_number,
            Ref_Number: item.Ref_Number,
            Print_Tag: 'yes',
            id_Account: req.idaccount || '0009',
            created_at: new Date(),
    })
    );
    let rfid_code = req.body.map(item => item.tag_number);
    const tag = await cektag(rfid_code);
    console.log(rfid_code)
    if(tag.length > 0){
        return res.status(400).json({
            status: 'error',
            message: req.t('tag number already exist')
        });
    }
            

    if(typeof(Quantity) === 'string'){
        Quantity = parseInt(Quantity)
    } 
    console.log('req.body:' );
    // console.log(req.body);
    // console.log('Response : ', res.message);

    // const schema = {
    //     Item_code: 'string|optional',
    //     Item_category: 'string|optional',
    //     Item_Type: 'string|optional',
    //     SKU: 'string|optional',
    //     Name: 'string|optional',
    //     Description: 'string|optional',
    //     Uom: 'string|optional',
    //     tag_number: 'string|empty:false|max:100',
    //     Ref_Number: 'string|optional'
    // }

    // const validate = v.validate(req.body, schema);
    // if(validate.length){
    //     return res.status(400).json({
    //         status: 'error',
    //         message: validate
    //     }); 
    // }
    let values = data.map((item) => Object.values(item))
    let sql = "INSERT INTO items (item_id,Item_code,Item_category,Item_Type,SKU,Name,Description,Uom,Quantity,tag_number,Ref_Number,Print_Tag,id_Account,created_at) VALUES ?"
    koneksi.query(sql, [values],
    function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.status(500).json({
                status: 'error',
                message: error.sqlMessage
            })

        } else {
           return response.ok({
                status: 'success',
                message: "successs add new item"
            }, res);
        }
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

    koneksi.query('UPDATE items SET Item_code=?,Item_category=?,Item_Type=?,SKU=?,Name=?,Description=?,Uom=?,Quantity=?,tag_number=?,Ref_Number=? WHERE item_id=? AND id_Account=?', [Item_code, Item_category, Item_Type, SKU, Name, Description, Uom, Quantity, tag_number, Ref_Number, item_id, id_Account],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
                if (error.errno == 1062) {
                    return res.status(500).json({
                        status: "error",
                        message: req.t("tag_required"),
                        error: error.sqlMessage
                    });

                }
            } else {
                return res.send({
                    status: "success",
                    message: req.t("success_update_data")
                });
            }
        });
};

// delete 
exports.hapusitem = function(req, res) {
    try{ 
        const id = req.params.id;
        koneksi.query('DELETE FROM items WHERE item_id=?', [id],
            function(error, rows, fields) {
                if (error) {
                    console.log(error);
                } else {
                    res.send({
                        status: "success",
                        message: req.t("item.success_delete_item")
                        })
                }
            });
    }catch(err){
        const {status, data} = err.message;
        return res.status(status).json(data);
    }

}

exports.bulkDeleteItem = async (req, res) => {
    try{
        const tag_number = req.body.rfid_code;
        koneksi.query('DELETE FROM items WHERE tag_number IN (?)', [tag_number],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
                return res.status(500).json({
                    status: 'error',
                    message: error.sqlMessage
                })
            } else {
                return res.send({
                    status: 'success',
                    message: req.t('item.success_delete_item')
                })
            }
        });
    }catch(error){
        return res.status(400).json({
            status: 'error',
            message: error.message
        }); 
    }
}



//serach item
exports.search = async function(req, res) {
    var id_Account = req.idaccount;
    var tag = req.query.tag_number;
    const cekTag = await cektag(tag);
    if(cekTag.length < 1){
        return res.status(400).json({
            status: 'warning',
            message: req.t('data_not_found'),
            data: [{
                tag_number: tag,
                Name: '',
            }]
        })
    }

    koneksi.query(
        "SELECT Name, tag_number FROM items WHERE id_Account=? AND tag_number=?", [id_Account, tag],
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
                    return res.status(400).json({
                        status: 'error',
                        message: req.t("tag_number_not_found"),
                        data: rows
                    });
                } else {
                    return res.send({
                        status: 'success',
                        message: req.t("success_get_tag_number"),
                        data: rows
                    });
                }
            }
        });
};