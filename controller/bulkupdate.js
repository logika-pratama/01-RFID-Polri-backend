var response = require("../res");
var koneksi = require("../koneksi");

const deleteRecieve = (id) => {
    koneksi.query('DELETE FROM Transaction_Receive WHERE item_id=?', [id],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                console.log("data dengan" + id + "telah di pindah ke monitoring")
            }
        });

}


const to = (a, b, c, d, e, f, g, h, i, j) => {
    koneksi.query('INSERT INTO Transaction_Monitoring (Device_ID,id_Account,id_location,item_id,UoM, Quantity, Line_number, Rack_number, Bin_number, Time_Monitoring) VALUES(?,?,?,?,?,?,?,?,?,NOW())', [a, b, c, d, e, f, g, h, i],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                console.log("move data to monitoring");

            }
        });

}


exports.bulkupdateitem = async function(req, res) {
    //response.ok("Berhasil update SKU Item", res);
    var sku = req.body.SKU;
    var item_id = req.body.item_id;

    var name = req.body.name;
    var Ref_Number = req.body.Ref_Number;

    // Validation
    if (item_id.length < 1) {
        return response.warning({
            status: 'warning',
            message: 'Silahkan pilih beberapa items untuk di update !'
        }, res);
    }
    if (sku.length < 1 || sku.trim() == "") {
        return response.warning({
            status: 'warning',
            message: 'Silahkan isi SKU field !'
        }, res);
    }
    for (var i = 0; i <= item_id.length - 1; i++) {
        koneksi.query('UPDATE items SET SKU=?,name=?,Ref_Number=? WHERE item_id=?', [sku, name, Ref_Number, item_id[i]],
            function(error, rows, fields) {
                if (error) {
                    console.log(rows);
                } else {
                    console.log("BULK UPDATE SKU");
                }
            });

    }
    return response.ok({
        status: 'success',
        message: "Berhasil update  Item"
    }, res);

};



exports.bulkconfirm = async function(req, res) {
    var item_id = req.body.item_id;
    var id_Account = req.idaccount;
    var id_location = req.body.id_location;
    var Device_ID = req.body.Device_ID;
    var Uom = req.body.Uom;
    var Quantity = req.body.Quantity;
    var Line_number = req.body.Line_number;
    var Rack_number = req.body.Rack_number;
    var Bin_number = req.body.Bin_number;
    console.log(item_id)

    for (var i = 0; i <= item_id.length - 1; i++) {

        toMonitoring(Device_ID, id_Account, id_location, item_id[i], Uom, Quantity, Line_number, Rack_number, Bin_number);
        deleteRecieve(item_id[i]);

    }
    response.ok("Berhasil update  Item", res);

};