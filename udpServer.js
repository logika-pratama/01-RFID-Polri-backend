"use strict";
require('dotenv').config();
var koneksi = require("./koneksi");
var uniqid = require("uniqid");
const dgram = require("dgram");
const socket = dgram.createSocket("udp4");
const {UDP_SERVER, UDP_PORT} = process.env;


socket.on("listening", () => console.log("server jalan"));
socket.on("message", (msg, rinfo) => {
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);

    if (`${msg}`.search("1102ee") > -1) {
        console.log("Dari elektron!!");
        elctron(`${msg}`);
    } else {
        console.log("dari vench!!");
        vech(`${msg}`);
    }
});

socket.bind(UDP_PORT, UDP_SERVER); //Start UDP SErver at 151.106.112.34 on port 8081


function vech(uid) {
    var newData = uid.replace(/[']/g, ''); // mengilangkan '
    newData = newData.replace(/ /g, ""); // menghilangkan spasi
    let arrData = newData.split(",");

    var Panjang = arrData.length - 1;
    console.log("Jumlah Tag= ", Panjang);
    let Reader = arrData[Panjang];
    console.log("IDReader =", Reader);
    var newArr = arrData.slice(0, -1)

    for (var i = 0; i < newArr.length; i++) {

        console.log(`RFID tag ke -${i+1} ${newArr[i]}`)
            //result.push(`${arrData[i]}`);
        var data = newArr[i];
        cek(Reader, data);

    }
}


function elctron(uid, res) {
    console.log(uid); // print tehe recieved data
    var target = [];
    let baru = [];
    let tagid = [];
    var i = 0;
    // parsing and push data to target.
    for (
        const array = Array.from(uid); array.length; target.push(array.splice(0, 36).join(""))
    );

    var xx = 0;
    console.log(target);
    baru = [...new Set(target)];
    target = baru;
    target = Array.from(new Set(target))
    var panjang = target.length;
    console.log(target);
    for (i = 0; i < panjang - 1; i++) {
        var jadi = target[i].toString();
        jadi = jadi.slice(8, 32); // take the tag information from digit 8 to 32

        if (jadi.search("1102ee00") > -1) { // detect the wrong data format after parsing.
            //skip data salah
        } else {
            var id = target[target.length - 1];
            id = id.substring(id.length - 6); // reader id
            tagid.push(jadi);

            console.log("id= " + id);
            console.log("jumlah item= " + (target.length - 1)); // count how many tags are sended
            xx++;
            console.log("data ke", i, panjang - 1);
            console.log("tag id : " + jadi);
            console.log(tagid);
            cek(id, jadi); // process & routing the tags data based on the reader trxtype
        }
    }
    target = []; //empty the target
}


//-------------------------------------------reader engine-----------------------------------------//
/*
this are query funtion to process data to and from database
*/



const TrackDetail = (Device_ID, id_Account, id_location, tag_number, item_id) => {
    return new Promise(function(resolve, reject) {
        koneksi.query(
            "INSERT INTO track_detail (Device_ID,id_Account,id_location,tag_number,item_id) VALUES(?,?,?,?,?)", [Device_ID, id_Account, id_location, tag_number, item_id],
            function(error, rows, fields) {
                if (error) {
                    reject(error);
                } else {
                    resolve("ada track!!!!");

                }
            }
        );
    });
};


function getDeviceId(idnya) {
    return new Promise(function(resolve, reject) {
        koneksi.query(
            "SELECT * FROM readers WHERE reader_id= ? ", [idnya],
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

function cekLastLocation(tid, idaccount) {
    return new Promise(function(resolve, reject) {
        koneksi.query(
            "SELECT reader_name FROM `tarck_detail_v` WHERE tag_number=? AND id_Account=? ORDER BY timestamp DESC LIMIT 1 ", [tid, idaccount],
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

function getitem(tag, idaccount) {
    return new Promise(function(resolve, reject) {
        koneksi.query(
            "SELECT * FROM items WHERE tag_number= ? AND id_account = ?", [tag, idaccount],
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

function cekMonitoring(itemcode) {
    return new Promise(function(resolve, reject) {
        koneksi.query(
            "SELECT * FROM Transaction_Monitoring WHERE item_id= ? ", [itemcode],
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

function cekCashier(itemcode) {
    return new Promise(function(resolve, reject) {
        koneksi.query(
            'SELECT * FROM Transaction_Cashier WHERE item_id= ? AND status="Confirmed" ', [itemcode],
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

function cekAllTagNumber(){
    return new Promise(function(resolve, reject) {
        koneksi.query(
            'SELECT * FROM log_tag_number',
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

function cekLogTagNumber() {
    return new Promise(function(resolve, reject) {
        koneksi.query(
            "SELECT * FROM log_tag_number WHERE  flag = 2",
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

function addToLogTagNumber(tag, item_id){
    const created_at = new Date();
    const updated_at = created_at;
    return new Promise(function(resolve, reject) {
        koneksi.query(
            "INSERT INTO log_tag_number (tag_number, item_id, flag, created_at, updated_at) VALUES(?,?,?,?,?)", [tag, item_id, 0, created_at, updated_at],
            function(error, rows, fields) {
                if (error) {
                    reject(error.sqlMessage);
                } else {
                    resolve("berhasil");
                }
            }
        );
    });
}


function updateToLogTagNumber(tag){
    const updated_at = new Date();
    return new Promise(function(resolve, reject) {
        koneksi.query(
            `UPDATE log_tag_number SET flag = 3, updated_at = ${updated_at} WHERE tag_number= ${tag}`,
            function(error, rows, fields) {
                if (error) {
                    reject(error.sqlMessage);
                } else {
                    resolve("berhasil");
                }
            }
        );
    });
}
//=====================       end of functions get data

//=====================      functions insert data start here
function updateTimestamp(id) {
    return new Promise(function(resolve, reject) {
        koneksi.query(
            "UPDATE Transaction_Monitoring SET Time_Monitoring= NOW() WHERE item_id=? ", [id],
            function(error, rows, fields) {
                if (error) {
                    reject(error.sqlMessage);
                } else {
                    resolve("insert beres!");
                }
            }
        );
    });
}

function trxreceive(did, idacc, idloc, iditm) {
    return new Promise(function(resolve, reject) {
        koneksi.query(
            "INSERT IGNORE INTO Transaction_Receive(Device_ID,id_Account,id_location,item_id,Time_Enter) VALUES(?,?,?,?,NOW()) ", [did, idacc, idloc, iditm],
            function(error, rows, fields) {
                if (error) {
                    reject(error);
                } else {
                    resolve("insert beres!");
                }
            }
        );
    });
}

function trxdeliverye(did, idacc, idloc, iditm) {
    return new Promise(function(resolve, reject) {
        koneksi.query(
            "INSERT IGNORE INTO Transaction_Delivery(Device_ID,id_Account,id_location,item_id,Time_Enter) VALUES(?,?,?,?,NOW()) ", [did, idacc, idloc, iditm],
            function(error, rows, fields) {
                if (error) {
                    reject(error.sqlMessage);
                } else {
                    resolve("insert beres!");
                }
            }
        );
    });
}

function trxCashier(did, idacc, iid, idl) {
    return new Promise(function(resolve, reject) {
        koneksi.query(
            'INSERT IGNORE INTO  Transaction_Cashier(Device_ID,id_Account,id_location,item_id,Time_Enter,Time_Scan_Cashier,status) VALUES(?,?,?,?,NOW(),NOW(),"unconfirm")', [did, idacc, idl, iid], //, itemsSKU
            function(error, rows, fields) {
                if (error) {
                    reject(error.sqlMessage);
                } else {
                    resolve("insert beres!");
                }
            }
        );
    });
}

function itemInvRR(iid, tagid, iacc) {
    return new Promise(function(resolve, reject) {
        koneksi.query(
            'INSERT IGNORE INTO items (item_id,tag_number,id_Account,Quantity,Print_Tag) VALUES(?,?,?,1,"yes") ', [iid, tagid, iacc],
            function(error, rows, fields) {
                if (error) {
                    reject(error.sqlMessage);
                } else {
                    resolve("insert beres!");
                }
            }
        );
    });
}


/*
INVENTORY TYPE LIST
___________________________________________________________________________________________
Inventory_trx_type	    |    Keterangan                                                   |
__________________________________________________________________________________________|
Inv_Received	          | Reader untuk kegitan received                                   
Inv_Delivery	          | Reader untuk Kegiatan delivery                    
Inv_Delivery_Cashier	  | Reader untuk Kegiatan delivery dan check di cashier
Inv_Monitoring	Reader  | untuk kegiatan monitoring
Inv_Received_Delivery	  | Reader untuk kegiatan Received dan Delivery dalam 1 pintu
Inv_Received_Register	  | Reader untuk kegitan received dan langsung register ke item
Inv_Cashier	Reader      | untuk kegitan process di cashier
Inv_TrackDetail 	      | Reader untuk tahu posisi asset
Inv_AssetTracking         | Reader untuk tahu posisi asset berdasarkan Flag
________________________|_________________________________________________________________

this function (cek()) is to check which reader and where the data come from,
*/
async function cek(id, tid) { // parameters id=readerid, tid= tags id /UUID/EPC code
    var dvid, getitems, cekmonitor;
    dvid = await getDeviceId(id); // get the reader information
    var inv_type = dvid[0].Inventory_trx_type; //get the Inventory_trx_type
    var idreader = dvid[0].reader_id; // get the reader id
    var Rname = dvid[0].name; //get the reader name
    var idAccount = dvid[0].id_account;
    var idlocation = dvid[0].id_location; // get the reader location


    // check the reader and process the data based on Reader Inventory_trx_type
    try {
        console.log(inv_type);

        //Special for this 6 Inventory_trx_type, it needs additional items information
        if (inv_type == "Inv_AssetTracking" || inv_type == "Inv_Monitoring" || inv_type == "Inventory_trx_type" || inv_type == "Inv_Received_Delivery" || inv_type == "Inv_Received" || inv_type == "Inv_Delivery" || inv_type == "Inv_Cashier" || inv_type == "Inv_Delivery_Cashier") {
            console.log("ambil data: " + inv_type);
            //here is the additional items information
            getitems = await getitem(tid, idAccount); // get the items information based on tag
            var idaccouunt = getitems[0].id_Account; // get the account id
            var iditem = getitems[0].item_id; // get the items id 
        }
        //================================================================

        if(inv_type == "Inv_AssetTracking" ){
            try{
                console.log("Inv_AssetTracking");
                var iditem = getitems[0].item_id;
                console.log(iditem);
                if(cekLogTagNumber.length > 0){
                    // Update Tag Number
                    console.log('Upadate Flag to 3');
                    updateToLogTagNumber(tid);

                }if(cekAllTagNumber.length > 0){
                    // Insert tag Number
                    console.log('Insert Flag to 0');
                    addToLogTagNumber(tid,iditem);
                }else{
                    console.log('Not Inserted !');
                }

            }catch(error){
                console.log(error);
            }
        }
        if (inv_type == "Inv_TrackDetail") {
            // get items information
            getitems = await getitem(tid, idAccount);
            var idaccouunt = getitems[0].id_Account;
            var iditem = getitems[0].item_id;
            try {
                var getlastplace = await cekLastLocation(tid, idaccouunt); // get thelast location of items
                var lastplace = getlastplace[0].reader_name;
            } catch (e) {
                console.log("data belum ada insert dulu");
            }


            if (Rname === lastplace) { // if the items tedected multiple time in the same place do nothing
                console.log("masih di ruangan yang sama");

            } else {
                console.log("item pindah ke lokasi baru: " + Rname); // if the items detected in the new place insert the updated place to a new record
                TrackDetail(idreader, idaccouunt, idlocation, tid, iditem);
            }




        }

        //=================================Inv_Monitoring
        // this inv is used to update the timestamp data in monitoring table.
        if (inv_type == "Inv_Monitoring") {
            try {
                console.log("Inv_Monitoring - monitring itme_id: " + iditem);
                updateTimestamp(iditem); // updatae data timestap
            } catch (error) {
                // console.log(error)
            }
        }



        //=================================Inv_Received_Deliver
        // thid inventori is  Inv_Received_Delivery
        if (inv_type == "Inv_Received_Delivery") {
            console.log("proses-Inv_Received_Delivery")
            try {
                cekmonitor = await cekMonitoring(iditem);

                // console.log(cekmonitor);
                if (cekmonitor.length > 0) { //check the data in table monitoring , if it availabe  move it to delivery tbale
                    console.log(
                        "Inv_Received_Deliver - id_item: " +
                        iditem +
                        " sudah ada=>insert data ke Transaction_Delivery"
                    );
                    trxdeliverye(idreader, idaccouunt, idlocation, iditem); // move the data to delivery table
                } else if (cekmonitor.length < 1) { // if it not available in monitring table, asume it  as a new data  and nsert the data to recieve table
                    console.log(
                        "Inv_Received_Deliver - id_item: " +
                        iditem +
                        " belum ada=>insert data ke Transaction_Receive"
                    );
                    trxreceive(idreader, idaccouunt, idlocation, iditem); // inser data to ecieve table

                }
            } catch (error) {
                //console.log(error)
            }
        }

        //=================================Inv_Recieve

        if (inv_type == "Inv_Received") {
            try {
                cekmonitor = await cekMonitoring(iditem);
                if (cekmonitor.length > 0){
                    console.log
                    ("Inv_Recieved - id_item: " + iditem + 
                    "sudah ada di monitoring");
                }else if(cekmonitor.length < 1){
                    console.log(
                        "Inv_Received - tag: " + tid + "  insert data ke Transaction_Recieve"
                    );
                    trxreceive(idreader, idaccouunt, idlocation, iditem); // insert data to teble receive 
                }
            } catch (error) {
                //console.log(error)\
            }
        }

        //=================================Inv_Deliver
        if (inv_type == "Inv_Delivery") {
            //console.log("masuk");
            try {
                cekmonitor = await cekMonitoring(iditem)
                if (cekmonitor.length < 1) {
                    console.log(`Inv_Delivery - delivery Tag ${tid}`);
                    console.log(`Tag Belum ada di Inv_Monitoring`);
                } else if (cekmonitor.length > 0) {
                    console.log(
                        "Inv_Delivery- deLIVERY tag: " +
                        tid +
                        " insert data ke Transaction_Delivery"
                    );
                    trxdeliverye(idreader, idaccouunt, idlocation, iditem); // move the data to delivery

                }
            } catch (error) {
                //console.log(error)
            }
        }

        //=================================Inv_Received_Register
        //this INV is use to insert and register new tag to the sistem
        if (inv_type == "Inv_Received_Register") {
            try {
                // generate itemsid
                function getRandomInt() {
                    return Math.floor(Math.random() * Math.floor(3123123));
                }
                //concat the items id with first 3 digit account id
                var ia = dvid[0].id_account; // zain
                var idi = ia.substring(0, 2) + uniqid.process().substring(4, 11); //za765   item id


                var tag = tid;
                console.log(idi);
                itemInvRR(idi, tag, ia); // insert the new items
                console.log("Inv_Received_Register - data item masoooooook");
                // get items informations
                var getitems2 = await getitem(tid, idAccount);
                var ida = getitems2[0].id_Account;
                var iditem = getitems2[0].item_id;
                trxreceive(idreader, ida, idlocation, iditem); // insert the items info.. to recieve

            } catch (error) {
                console.log(error);
            }
        }

        //==============================INV_ CASHIER

        if (inv_type == "Inv_Cashier") {
            try {
                // get the items informations
                var cekmonitor = await cekMonitoring(iditem);
                var idac = cekmonitor[0].id_Account;
                var idl = cekmonitor[0].id_location;
                var idit = cekmonitor[0].item_id;
                trxCashier(id, idac, idit, idl); // insert  the items data to QC 

                console.log("masooooook inv cashier!!!!!!"); // 
            } catch (error) {}
        }
        //==============================INV_ delivery_cashier
        if (inv_type == "Inv_Delivery_Cashier") {
            try {
                var cekcashier = await cekCashier(iditem); // get items information in QC table

                console.log(cekcashier);

                if (cekcashier.length > 0) { // if the data available in QC, move the data to delivery table
                    console.log(
                        "Inv_Received_Deliver - id_item: " +
                        iditem +
                        " TERDAFTAR DI CASHIER=>insert data ke Transaction_Delivery"
                    );

                    trxdeliverye(idreader, idaccouunt, idlocation, iditem); // move data to delivery
                }
                if (cekcashier.length < 1) { // if the data not found in QC, the items are not allowed to pass the delivery gate
                    console.log(
                        "Inv_Received_Deliver - id_item: " +
                        iditem +
                        "tidak terdaftar di cashier/belun terkonfirmasi=>NYALAKAN ALARM!!!!!!!!"
                    );
                }
            } catch (error) {
                //console.log(error)
            }
        }

    } catch (error) {
        //console.log(error);
    }

}
