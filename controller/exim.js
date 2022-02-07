/*
this exim(export-import) are contain all export and import process
*/
"use strict";
var response = require("../res");
var koneksi = require("../koneksi");
var json2xls = require("json2xls");
var fs = require("fs");
var XLSX = require("xlsx");
var uniqid = require("uniqid");
let aa;
let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
var tanggal = year + "-" + month + "-" + date + "-" + hours + ":" + minutes; // buat data tanggal 
const readXlsxFile = require("read-excel-file/node");

//query for update print_status
function updateprint(tag) {
    koneksi.query(
        'UPDATE items SET Print_Tag="yes" WHERE tag_number=?', [tag],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                // response.ok("Berhasil mengubah data", res);
            }
        }
    );
}

//query for update GR status
function updategr(account) {
    koneksi.query(
        // update Numer dan Tanggal 
        // Format GR-NoUniq-Tanggal ex: GR0101012022
        'UPDATE history SET Status_GR="yes" WHERE SKU IS NOT NULL AND id_Account=? AND Status_GR = "no"', [account],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                // response.ok("Berhasil mengubah data", res);
            }
        }
    );
}

//query for update GI status
function updategi(account) {
    koneksi.query(
        'UPDATE Transaction_Order SET Status_GI="yes" WHERE Status_QC="yes" AND id_Account=?', [account],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                // response.ok("Berhasil mengubah data", res);
            }
        }
    );
}


function geidlocation(id) {
    return new Promise(function(resolve, reject) {
        koneksi.query(
            "SELECT id_location FROM readers WHERE reader_id=?", [id],
            function(error, rows, fields) {
                if (error) {
                    reject(error.sqlMessage);
                } else {
                    // response.ok("Berhasil mengubah data", res);
                    resolve(rows[0].id_location);
                }
            }
        );
    });
}


//get GR data
exports.getGr = function(req, res) {
    let id = req.idaccount;

    koneksi.query(
        'SELECT Ref_Number,SKU,SUM(Quantity) AS QTY FROM history WHERE Status_GR="no" AND  id_Account= ?  GROUP BY SKU,Ref_Number', [id],
        function(error, rows, fields) {
            if (error) {

                console.log(error);
            } else {
                console.log(rows.length);
                // // console.log(rows);
                // var exceloutput = tanggal + "-GR-Document.xlsx"
                //     var xls = json2xls(rows);
                //     fs.writeFileSync(exceloutput, xls, 'binary');
                //     res.download(exceloutput,(err) => {
                //         if(err){
                //             fs.unlinkSync(exceloutput)
                //             response.ok("Unable to download the excel file")
                //         }
                //         fs.unlinkSync(exceloutput)
                //     })

                //process all data 
                if (rows.length >= 1) {
                    console.log(rows.length);
                    response.ok({ fileName: tanggal + "-GR Document", rows }, res); // response with file name
                    var i = 0;
                    for (i; i <= rows.length - 1; i++) {
                        updategr(rows[i].Ref_Number); // update status GR to YES after download 
                    }
                }
                if (rows.length < 1) {

                    response.ok("seluruh data telah di GI", res);
                }
            }
        }
    );
};

// get gi data
exports.getGi = function(req, res) {
    let id = req.idaccount;

    koneksi.query(
        'SELECT No_Order,SKU,SUM(Qty) AS QTY from Transaction_Order WHERE id_Account=? AND Status_QC="yes" GROUP BY SKU,No_Order', [id],
        function(error, rows, fields) {
            if (error) {

                console.log(error);
            } else {
                console.log(rows.length);
                // process all data
                if (rows.length >= 1) {
                    console.log(rows.length);
                    response.ok({ fileName: tanggal + "-GI Document", rows }, res);
                    var i = 0;
                    for (i; i <= rows.length - 1; i++) {
                        updategi(rows[i].No_Order);
                    }
                }
                if (rows.length < 1) {
                    // response.ok("seluruh data telah di GR!",res);
                    response.ok({ status: "seluruh data telah di GI" }, res);
                }
            }
        }
    );
};

//download GR data
exports.downloadGr = function(req, res) {
    let id = req.idaccount;

    koneksi.query(
        'SELECT Ref_Number,SKU,SUM(Quantity) AS QTY FROM history WHERE Status_GR="no" AND  id_Account= ?  GROUP BY SKU,Ref_Number', [id],
        function(error, rows, fields) {
            if (error) {

                console.log(error);
            } else {
                // console.log(rows);
                var exceloutput = tanggal + "-GR-Document.xlsx";
                var i = 0;
                for (i; i <= rows.length - 1; i++) {
                    updategr(rows[i].Ref_Number);
                }
                var xls = json2xls(rows);
                fs.writeFileSync(exceloutput, xls, "binary");
                res.download(exceloutput, (err) => {
                    if (err) {
                        fs.unlinkSync(exceloutput);
                        response.ok("Unable to download the excel file", res);
                    }
                    fs.unlinkSync(exceloutput);
                });
            }
        }
    );
};

// response with all data that has Print_Tag= "no"
exports.printTag = function(req, res) {
    let id = req.idaccount;
    let SKU = req.params.SKU;
    let jumlah = req.params.jumlah;
    let data = [];
    koneksi.query(
        'SELECT Ref_Number,Item_code,Item_Type,name,SKU,tag_number FROM items WHERE id_Account= ? AND Print_Tag="no" AND SKU=? LIMIT ' +
        jumlah, [id, SKU],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                console.log(rows.length);
                // if(rows.length >=1){
                // console.log("tagnya "+rows.length);
                // var exceloutput = tanggal + "-SKU-"+SKU+".xlsx"
                //     var xls = json2xls(rows);
                //     fs.writeFileSync(exceloutput, xls, 'binary');
                //     res.download(exceloutput,(err) => {
                //         if(err){
                //             fs.unlinkSync(exceloutput)
                //             response.ok("Unable to download the excel file")
                //         }
                //         fs.unlinkSync(exceloutput)
                //     })

                //     var i=0;
                //     for(i; i<= rows.length-1 ;i++){
                //             updateprint(rows[i].tag_number);
                //     }
                // } else{
                //     response.ok("Data tidak di temukan/ tagsudah di print!!",res)
                // }

                if (rows.length >= 1) {
                    response.ok({ fileName: tanggal + "-" + SKU, rows }, res);
                    var i = 0;
                    for (i; i <= rows.length - 1; i++) {
                        updateprint(rows[i].tag_number); // after send data update print_tag status of all dsended data to "yes"
                    }
                } else {
                    //response.ok("seluruh data telah di print!",res)
                    response.ok({ status: "seluruh data telah di print!" }, res);
                }
            }
        }
    );
};

// import data from excel file
exports.importData = function(req, res) {
    var idaccount = req.idaccount;
    var options = req.body.tags;
    console.log(options);
    var xlDatcsv2 = [];

    function parseCSV(str) {
        var rows = str.split("\n");

        return rows.reduce(function(table, row) {
            var cols = row.split(",");

            table.push(
                cols.map(function(c) {
                    return c.trim();
                })
            );

            return table;
        }, []);
    }

    try {
        var workbook = XLSX.readFile(
            __basedir + "/01-PORLI-rfid-backend/helper/" + req.file.filename // save excel file here temporarily
        );
        var sheet_name_list = workbook.SheetNames;
        var xlDatcsv = XLSX.utils.sheet_to_csv(workbook.Sheets[sheet_name_list[0]]);
        xlDatcsv = parseCSV(xlDatcsv); // parsing data csv

        // function to process  imported data with include tags data in it
        function withTag(idaccount) {
            console.log("panjang: " + xlDatcsv.length);
            var i = 0;
            for (i = 0; i <= xlDatcsv.length - 1; i++) {
                xlDatcsv2.push(
                    xlDatcsv[i].concat(uniqid.process(), idaccount, "yes", "1") // data formating  add item id,id account,print status  and quantity
                );
            }
        }

        // function to process  imported data without tags data in it
        function withoutTag(idaccount) {
            console.log("panjang: " + xlDatcsv.length);
            var i = 0;
            for (i = 0; i <= xlDatcsv.length - 1; i++) {
                xlDatcsv2.push(
                    xlDatcsv[i].concat( //data formating
                        uniqid.process(), //generate item id
                        uniqid.process(), // generate tag_id
                        idaccount, // id_account
                        "no", // print- tag status
                        "1" // quantity
                    )
                );
            }
            //xlDatcsv2.pop();
        }
        xlDatcsv.shift(); // skip excel header
        xlDatcsv.pop(); // earase excel header from data
        if (options === "no") { // chech option selected
            console.log("include tags");
            withTag(idaccount); // process data
        } else {
            console.log("tanpa tags");
            withoutTag(idaccount); // process data
        }
        console.log(xlDatcsv2); // final result of formated data

        //insert data to database
        koneksi.query(
            "INSERT IGNORE INTO items (SKU,Item_code,Item_Type,Ref_number,tag_number,item_id,id_Account,Print_Tag,Quantity) VALUES ?", [xlDatcsv2],
            function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    if (error.errno === 1136) {
                        return res.status(400).json({
                            status: 'error',
                            message: 'Format Salah Harap menggunakan Format yang tersedia !'
                        })
                    }
                    return res.status(400).json({
                        status: 'error',
                        message: error.sqlMessage
                    });
                } else {
                    return response.ok({ message: "behasil menambahkan item baru" }, res);
                    console.log("import data excel berhasil");
                    fs.unlinkSync(__basedir + "/01-PORLI-rfid-backend/helper/" + req.file.filename); // delete uploaded excel file to free memory
                }
            }
        );
    } catch {
        console.log("ada errror!");
        response.error({
            status: 'error',
            message: 'Tidak dapat mengupload file ' + req.file.fileName
        }, res);
    }
};



exports.importItems = async function(req, res){
    var idaccount = req.idaccount;
    let isSKUNull = false, // check SKU Null or Not 
        isItemCodeNull = false, // Check itemCode Null Or Not 
        isItemTypeNull = false,  // Check itemType Null or Not 
        isReffNumberNull = false, // check Reff Number 
        isTagNumberNull = false;  // Check Tag Number 
    let options = req.body.tags;
    let isFormat = false;

    try{
        if(req.file == undefined){
            return response.warning({
                status: 'Warning',
                message: "Harap masukan file dengan format Excel"
            }, res);
        }

        let path = __basedir + "/01-PORLI-rfid-backend/helper/" + req.file.filename;
            readXlsxFile(path).then((rows) => {
                // skip header
                rows.shift();
    
                let data = [];
                
                if(options === "no"){
                    console.log("includes Tag")
                    rows.forEach((row) => {
                        let items = [
                            row[0], // SKU
                            row[1], // Item code 
                            row[2], // Item type 
                            row[3], // Ref Number 
                            row[4], // Tag Number 
                            uniqid.process(), // Generate it code
                            idaccount,
                            'yes',
                            '1',
                        ];
                        
                        if(row.length != 5)isFormat = true;
                        if(items[0] === null || items[0] === ' ')isSKUNull = true;
                        if(items[1] === null || items[1] === ' ')isItemCodeNull = true;
                        if(items[2] === null || items[2] === ' ')isItemTypeNull = true;
                        if(items[3] === null || items[3] === ' ')isReffNumberNull = true;
                        if(items[4] === null || items[4] === ' ')isTagNumberNull = true;  
                        data.push(items);
                    });    
                }else{
                    rows.forEach((row) =>{
                        let items = [
                            row[0], // SKU 
                            row[1], // Item code 
                            row[2], //  Item Type
                            row[3],  // Ref Number 
                            uniqid.process(), // generate Tag_Number
                            uniqid.process(), // generate item_ID
                            idaccount,
                            "no", // print tag status
                            "1", // quantity
                        ];
                        if(row.length != 4)isFormat = true;
                        if(items[0] === null || items[0] === ' ')isSKUNull = true;
                        if(items[1] === null || items[1] === ' ')isItemCodeNull = true;
                        if(items[2] === null || items[2] === ' ')isItemTypeNull = true;
                        if(items[3] === null || items[3] === ' ')isReffNumberNull = true;
                        data.push(items);
                    });
                }
                console.log(data)
                if(isSKUNull)return response.warning({status: 'warning', message:'SKU masih ada yang kosong di Excel'}, res)
                if(isItemCodeNull)return response.warning({status: 'warning', message:'Item Code masih ada yang kosong di Excel'}, res)
                if(isItemTypeNull)return response.warning({status: 'warning', message:'Item type masih ada yang kosong di Excel'}, res)
                if(isReffNumberNull)return response.warning({status: 'warning', message:'Ref Number masih ada yang kosong di Excel'}, res);
                if(isTagNumberNull)return response.warning({status: 'warning', message:'Tag Number masih ada yang kosong di Excel'}, res);
                if(isFormat)return response.warning({status: 'warning', message:'Format tidak sesuai silahkan gunakan Format yang tersedia !'}, res);
                koneksi.query(
                    "INSERT IGNORE INTO items (SKU,Item_code,Item_Type,Ref_number,tag_number,item_id,id_Account,Print_Tag,Quantity) VALUES ?", [data],
                    function(error, rows, fields) {
                        if (error) {
                            console.log(error);
                            res.status(400).json({
                                status: 'error',
                                message: error.sqlMessage
                            });
                        } else {
                            response.ok({
                                status: "success",
                                message: "behasil menambahkan item baru",
                                data: data
                            }, res);
                            console.log("import data excel berhasil");
                            fs.unlinkSync(__basedir + "/01-PORLI-rfid-backend/helper/" + req.file.filename);
                        }
                    }
                );
            })
    }catch(error){
        console.log(error);
        response.error({
            status: 'error',
            message: 'Tidak dapat mengupload file' + req.file.fileName
        }, res);
    }
}

exports.importOrders = async function(req, res) {
    var idaccount = req.idaccount;
    let isNull = false
    try {
        if (req.file === undefined) {
            return response.warning({
                status: 'Warning',
                message: "Harap masukan File Dengan Format Excel"
            }, res);
        }
        let path = __basedir + "/01-PORLI-rfid-backend/helper/" + req.file.filename;

        readXlsxFile(path).then((rows) => {
            // skip header
            rows.shift();

            let orders = [];

            rows.forEach((row) => {
                let order = [
                    row[0],
                    row[1],
                    row[2],
                    row[3],
                    row[4],
                    row[5],
                    row[6],
                    idaccount,
                    'no',
                    'no',
                ];
                if (order[0] == null || order[4] == null || order[5] == null || order[6] == null) {
                    isNull = true;
                }
                orders.push(order);
            });
            if (isNull === true) {
                return response.warning({
                    status: 'warning',
                    message: 'masih ada field yang kosong di excel!'
                }, res)
            }
            console.log(orders)
            koneksi.query(
                "INSERT INTO Transaction_Order (No_Order,Order_Date,Customer,Address,DN,SKU,Qty,id_Account,Status_QC,Status_GI) VALUES ?", [orders],
                function(error, rows, fields) {
                    if (error) {
                        console.log(error);
                        res.status(400).json({
                            status: 'error',
                            message: error.sqlMessage
                        });
                    } else {
                        response.ok({
                            status: "success",
                            message: "behasil menambahkan item baru",
                            data: orders
                        }, res);
                        console.log("import data excel berhasil");
                        fs.unlinkSync(__basedir + "/01-PORLI-rfid-backend/helper/" + req.file.filename);
                    }
                }
            );
        });
    } catch (error) {
        console.log(error);
        response.error({
            status: 'error',
            message: 'Tidak dapat mengupload file ' + req.file.fileName
        }, res);
    }
};

// get/download gr data
exports.getGrData = function(req, res) {
    let id = req.idaccount;
    koneksi.query(
        'SELECT Ref_Number,SKU,SUM(Quantity) AS QTY FROM history WHERE Status_GR="no" AND SKU IS NOT NULL AND status IS NOT NULL  AND id_Account= ?', [id],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                if (rows.length >= 1) {
                    response.ok({ fileName: tanggal + "-GR Document", rows }, res);
                }
                if (rows.length < 1) {
                    response.ok({ status: "seluruh data telah di GI" }, res);
                }
            }
        }
    );
};

// konfirm GR with update status_Gr to yes
exports.konfirmGr = function(req, res) {
    let id = req.idaccount;

    koneksi.query(
        'SELECT Ref_Number FROM history WHERE Status_GR="no" AND  id_Account= ?  GROUP BY SKU,Ref_Number', [id],
        function(error, rows, fields) {
            if (error) {
                Console.log(error);
            } else {
                console.log(rows.length);
                if (rows.length >= 1) {

                    updategr(id); // update status gr to yes

                    response.ok("gr sukses!", res);
                }
                if (rows.length < 1) {
                    // response.ok("seluruh data telah di GR!",res);
                    response.ok({ status: "seluruh data telah di GR" }), res;
                }
            }
        }
    );
};


exports.getGiData = function(req, res) {
    let id = req.idaccount;
    koneksi.query(
        'SELECT No_Order,SUM(Qty) AS QTY from Transaction_Order WHERE id_Account=? AND Status_QC="yes" AND Status_GI="no" GROUP BY SKU,No_Order', [id],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                if (rows.length >= 1) {
                    response.ok({ fileName: tanggal + "-GI Document", rows }, res);
                }
                if (rows.length < 1) {
                    response.ok({ status: "seluruh data telah di GI" }, res);
                }
            }
        }
    );
};

exports.konfirmGi = function(req, res) {
    let id = req.idaccount;

    koneksi.query(
        'SELECT No_Order,SKU,SUM(Qty) AS QTY from Transaction_Order WHERE id_Account=? AND Status_QC="yes" AND Status_GI="no" GROUP BY SKU,No_Order', [id],
        function(error, rows, fields) {
            if (error) {
                Console.log(error);
            } else {
                console.log(rows.length);
                if (rows.length >= 1) {

                    updategi(id); // update all items status_GI to yes

                    response.ok("GI sukses!", res);
                }
                if (rows.length < 1) {
                    // response.ok("seluruh data telah di GI!",res);
                    response.ok({ status: "seluruh data telah di GI" }, res);
                }
            }
        }
    );
};