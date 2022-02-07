"use strict";
const jwt = require("./helper/jwt.js");
const up = require("./helper/upload");
const apikey = require('./helper/apikeys');
module.exports = function(app) {

    const account = require("./controller/account");
    const location = require("./controller/locations");
    const readers = require("./controller/readers");
    const user = require("./controller/users");
    const employee = require("./controller/employee");
    const items = require("./controller/items");
    const recieve = require("./controller/trxrecieve");
    const monitoring = require("./controller/trxmonitoring");
    const history = require("./controller/history");
    const delivery = require("./controller/trxdelivery");
    const cashier = require("./controller/trxcashier");
    const bulkpdateit = require("./controller/bulkupdate");
    const login = require("./controller/login");
    const exim = require("./controller/exim");
    const order = require("./controller/order");
    const packingList = require("./controller/packinglist");
    const trackDetail = require("./controller/trackdetail");
    const stoktake = require("./controller/StockTake");
    const trackType = require('./controller/trxype');

    //===================packing list====================
    app
        .route("/api/v1/pl/packing")
        .post(jwt.verify, jwt.cekrole(["1", "2", "3"]), packingList.createpacking);
    //=================account=========================
    app
        .route("/api/v1/account")
        .get(jwt.verify, jwt.cekrole(["1"]), account.allAccount);
    app
        .route("/api/v1/account/:id")
        .get(jwt.verify, jwt.cekrole(["1", "2", "3"]), account.accountById);
    app
        .route("/api/v1/account")
        .post(jwt.verify, jwt.cekrole(["1"]), account.addaccount);
    app
        .route("/api/v1/account/:id")
        .delete(jwt.verify, jwt.cekrole(["1"]), account.hapusaccount);
    app
        .route("/api/v1/account")
        .put(jwt.verify, jwt.cekrole(["1", "2"]), account.editAccount);

    //==================locaations=====================
    app
        .route("/api/v1/locations/:id")
        .get(jwt.verify, jwt.cekrole(["1", "2", "3"]), location.locationsById);
    app
        .route("/api/v1/locations")
        .post(jwt.verify, jwt.cekrole(["1", "2"]), location.addlocation);
    app
        .route("/api/v1/locations/:id")
        .delete(jwt.verify, jwt.cekrole(["1", "2"]), location.hapuslocation);
    app
        .route("/api/v1/locations/:id")
        .put(jwt.verify, jwt.cekrole(["1", "2"]), location.editlocation);

    //================readers=========================//
    app.
        route("/api/v1/gatescan")
        .post(jwt.verify, jwt.cekrole(["2", "3"]), readers.sendTag);
    app
        .route("/api/v1/allreaders")
        .get(jwt.verify, jwt.cekrole(["1"]), readers.allreader);
    app
        .route("/api/v1/readers")
        .get(jwt.verify, jwt.cekrole(["2", "3"]), readers.readersById);
    app
        .route("/api/v1/reader")
        .post(jwt.verify, jwt.cekrole(["1", "2"]), readers.addreaders);
    app
        .route("/api/v1/reader/:id")
        .delete(jwt.verify, jwt.cekrole(["1", "2"]), readers.hapusreaders);
    app
        .route("/api/v1/reader/:id")
        .put(jwt.verify, jwt.cekrole(["1", "2"]), readers.editreaders);

    app
        .route("/api/v1/readerbyaccount/:id")
        .get(jwt.verify, jwt.cekrole(["1", "2"]), readers.getReadersName);

    //================USERS============================
    app.route("/api/v1/user").get(user.alluser);
    app
        .route("/api/v1/userbyaccount")
        .get(jwt.verify, jwt.cekrole(["1", "2", "3"]), user.akun);
    app
        .route("/api/v1/user")
        .post(jwt.verify, jwt.cekrole(["1", "2"]), user.adduser);
    app
        .route("/api/v1/user/:id")
        .put(jwt.verify, jwt.cekrole(["1", "2"]), user.edituser);
    app
        .route("/api/v1/user/:id")
        .delete(jwt.verify, jwt.cekrole(["1", "2"]), user.hapususer);
    app
        .route("/api/v1/user/:id")
        .get(jwt.verify, jwt.cekrole(["1", "2", "3"]), user.userById);

    //================employee============================
    app
        .route("/api/v1/employee")
        .get(jwt.verify, jwt.cekrole(["1"]), employee.allemployee);
    app
        .route("/api/v1/employee/add")
        .post(jwt.verify, jwt.cekrole(["1", "2"]), employee.addemployee);
    app
        .route("/api/v1/employee/edit")
        .post(jwt.verify, jwt.cekrole(["1", "2"]), employee.editemployee);
    app
        .route("/api/v1/employee/delete")
        .delete(jwt.verify, jwt.cekrole(["1", "2"]), employee.hapusemployee);
    app
        .route("/api/v1/employee/:id")
        .get(jwt.verify, jwt.cekrole(["1", "2", "3"]), employee.employeeById);

    //================items==============================
    app
        .route("/api/v1/item/all")
        .get(jwt.verify, jwt.cekrole(["1"]), items.allitem);
    app
        .route("/api/v1/itemnull")
        .get(jwt.verify, jwt.cekrole(["1", "2", "3"]), items.datanull);
    app
        .route("/api/v1/items")
        .get(jwt.verify, jwt.cekrole(["1", "2", "3"]), items.getItems);

    app
        .route("/api/v1/item")
        .post(jwt.verify, jwt.cekrole(["1", "2", "3"]), items.additem);
    app
        .route("/api/v1/item/:item_id")
        .put(jwt.verify, jwt.cekrole(["1", "2", "3"]), items.edititem);
    app
        .route("/api/v1/item/:id")
        .delete(jwt.verify, jwt.cekrole(["1", "2", "3"]), items.hapusitem);
    app
        .route("/api/v1/item")
        .get(jwt.verify, jwt.cekrole(["1", "2", "3"]), items.itemById);
    app
        .route("/api/v1/item/:id")
        .get(jwt.verify, jwt.cekrole(["1", "2", "3"]), items.itemByitemId);
    app
        .route("/api/v1/item/search/:tag")
        .get(jwt.verify, items.search);
    app
        .route("/api/v1/cekitem")
        .get(items.cekItem)
        //================Transaction_Receive==================//

    app
        .route("/api/v1/tr/confirm")
        .post(jwt.verify, jwt.cekrole(["1", "2", "3"]), recieve.ctm);
    app
        .route("/api/v1/tr") //inv absen
        .post(recieve.addTR);
    app.route("/api/v1/tr").put(recieve.editTR);
    app.route("/api/v1/tr/:id").delete(recieve.hapusTR);
    app.route("/api/v1/tr/raw/:id").get(recieve.TRById);
    app
        .route("/api/v1/tr")
        .get(jwt.verify, jwt.cekrole(["1", "2", "3"]), recieve.TRByIdjoin);

    // //================Transaction_Monitoring==================//
    app
        .route("/api/v1/tm/autoputaway")
        .post(jwt.verify, jwt.cekrole(["1", "2", "3"]), monitoring.autoPutway);

    app
        .route("/api/v1/tm")
        .post(jwt.verify, jwt.cekrole(["1", "2", "3"]), monitoring.addTM);
    app
        .route("/api/v1/tm")
        .put(jwt.verify, jwt.cekrole(["1"]), monitoring.editTM);
    app
        .route("/api/v1/monitoring/:id")
        .put(jwt.verify, jwt.cekrole(["1", "2", "3"]), monitoring.monitor);
    app
        .route("/api/v1/tm")
        .delete(jwt.verify, jwt.cekrole(["1", "2"]), monitoring.hapusTM);
    app
        .route("/api/v1/tm")
        .get(jwt.verify, jwt.cekrole(["1", "2", "3"]), monitoring.TMById);
    app
        .route("/api/v1/tm/putaway")
        .get(jwt.verify, jwt.cekrole(["1", "2", "3"]), monitoring.TMByIdNull);
    app
        .route("/api/v1/monitoring")
        .get(jwt.verify, jwt.cekrole(["1", "2", "3"]), monitoring.getMonitoring)

    app
        .route("/api/v1/tm/selectedputaway/:item_id")
        .post(jwt.verify, jwt.cekrole(["1", "2", "3"]), monitoring.Putway);
    app
        .route("/api/v1/tm/bulkputaway")
        .post(jwt.verify, jwt.cekrole(["1", "2", "3"]), monitoring.bulkPutway);
    app
        .route("/api/v1/tm/search/:tag")
        .get(jwt.verify, jwt.cekrole(["1", "2", "3"]), monitoring.search);

    // //================Transaction_cashier==================//
    app.route("/api/v1/tc/all").get(cashier.allTC);
    app
        .route("/api/v1/tc")
        .get(jwt.verify, jwt.cekrole(["1", "2", "3"]), cashier.TCById);
    app.route("/api/v1/tc").post(cashier.addTC);
    app
        .route("/api/v1/tc/confirm")
        .post(jwt.verify, jwt.cekrole(["1", "2", "3"]), cashier.konfirm);
    app.route("/api/v1/tc").put(cashier.editTC);
    app.route("/api/v1/tc/:id").delete(jwt.verify, cashier.hapusTC);

    // //================Transaction_dELIVERY==================//
    app
        .route("/api/v1/td/all")
        .get(jwt.verify, jwt.cekrole(["1"]), delivery.allTD);
    app.route("/api/v1/td").post(delivery.addTD);
    app
        .route("/api/v1/td/confirm")
        .post(jwt.verify, jwt.cekrole(["1", "2", "3"]), delivery.konfirm);
    app.route("/api/v1/td").put(delivery.editTD);
    app.route("/api/v1/td/:id").delete(delivery.hapusTD);
    app
        .route("/api/v1/td")
        .get(jwt.verify, jwt.cekrole(["1", "2", "3"]), delivery.TDById);

    // //================Transaction_History==================//

    app.route("/api/v1/th")
        .get(jwt.verify, jwt.cekrole(["1", "2", "3"]), history.THById);

    app.route("/api/v1/history")
        .get(jwt.verify, jwt.cekrole(["1", "2", "3"]), history.getHistory);

    app.route("/api/v1/history/search/:tag")
        .get(jwt.verify, history.search);

    app.route("/api/v1/status")
        .get(history.getStatus);


    //=================BULK UPDATE===============
    app
        .route("/api/v1/bulkupdate")
        .post(jwt.verify, jwt.cekrole(["1", "2", "3"]), bulkpdateit.bulkupdateitem);

    //==============================login==================================
    app.route("/api/v1/login").post(login.login);
    //===========================exim=======================
    // app.route("/api/v1/gr").get(jwt.verify, exim.getGr);
    app
        .route("/api/v1/grdata") //list data ready to GR
        .get(jwt.verify, exim.getGrData);
    app
        .route("/api/v1/konfirmgr") // changer gr status to yes
        .get(jwt.verify, exim.konfirmGr);

    app.route("/api/v1/gi").get(jwt.verify, exim.getGiData); // get GI data
    app.route("/api/v1/konfirmgi").get(jwt.verify, exim.konfirmGi);
    // app.route("/api/v1/gr/file").get(jwt.verify, exim.downloadGr);
    app.route("/api/v1/print/:SKU/:jumlah").get(jwt.verify, exim.printTag);
    //===================================
    app
        .route("/api/v1/upload")
        .post(jwt.verify, up.single("file"), exim.importItems);
    app
        .route("/api/v2/upload")
        .post(jwt.verify, up.single("file"), exim.importData);

    //================Order==========
    app
        .route("/api/v1/importorder")
        .post(jwt.verify, up.single("file"), exim.importOrders);
    app.route("/api/v1/orderlist").get(jwt.verify, order.getorderlist);
    app.route("/api/v1/itemorder/:No_Order").get(jwt.verify, order.getitemlist);
    app
        .route("/api/v1/orderlist/:No_Order")
        .delete(jwt.verify, order.deleteOreder);

    //=============================TRACK DETAIL=================================
    app.route("/api/v1/track").post(jwt.verify, trackDetail.track);
    app.route("/api/v1/track/gatelist").get(jwt.verify, trackDetail.trackGate);
    //=============================== STOCK TAKE==================================
    app.route("/api/v1/stoktake/:tag").get(jwt.verify, stoktake.searchV2);
    app.route("/api/v1/konfirmst").get(jwt.verify, stoktake.konfirmSt);
    app.route("/api/v1/stoktakereport").get(jwt.verify, stoktake.report);

    app.route("/api/v1/trxtypes").get(jwt.verify, trackType.getTrx);
    app.route('/api/v1/trxtype').post(jwt.verify, trackType.addTrx);

    // =========================== Public API =============================== //
    app
        .route("/api/v1/genkey/:id")
        .post(user.genApiKey);

    // Master Items
    app
        .route("/api/v1/public/item")
        .post(apikey.validateKey, items.registerItem);
    app
        .route("/api/v1/public/item/:item_id")
        .put(apikey.validateKey, items.edititem);
    
    // Stock Take
    app.route("/api/v1/public/stocktakereport").get(apikey.validateKey, stoktake.report);

    // Good Issue
    app.route("/api/v1/public/gi").get(apikey.validateKey, exim.getGiData);

    // Good Recieve
    app.route("/api/v1/public/gr").get(apikey.validateKey, exim.getGrData);

    // Order List
    app
        .route("/api/v1/public/importorder")
        .post(apikey.validateKey, up.single("file"), exim.importOrders);

};