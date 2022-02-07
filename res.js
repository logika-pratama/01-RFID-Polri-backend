"use strict";
exports.ok = function(values, res) {
    try {
        var data = values;
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Content-Range", "post 0-19/20");
        res.setHeader("X-Total-Count", data.length);
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("X-Content-Type-Options", "nosniff");
    } catch {
        
    }
    res.json(data);
    console.log(data.length);
    res.end();
};


exports.error = function(values, res) {
    try {
        var data = values;
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Content-Range", "post 0-19/20");
        res.setHeader("X-Total-Count", data.length);
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("X-Content-Type-Options", "nosniff");
    } catch {}
    res.status(500).send(data);
    console.log(data.length);
    res.end();
};

exports.warning = function(values, res) {
    try {
        var data = values;
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Content-Range", "post 0-19/20");
        res.setHeader("X-Total-Count", data.length);
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("X-Content-Type-Options", "nosniff");
    } catch {}
    res.status(400).send(data);
    console.log(data.length);
    res.end();
};
//response untuk nested
exports.oknested = function(values, res) {
    //lakukan akumulasi

    const hasil = values.reduce((akumulasikan, item) => {
        //tentukan key group
        //console.log(item.SKU);
        var items = { DN: item.DN, SKU: item.SKU, QTY: item.Qty };
        var info = { DN: item.DN, SKU: item.SKU, QTY: item.Qty };

        if (akumulasikan[item.No_order]) {
            const group = akumulasikan[item.No_order];
            if (Array.isArray(group.SKU)) {
                group.SKU.push(items);
            } else {
                group.SKU = [group.SKU, items];
            }
        } else {
            akumulasikan[item.No_order] = info;
        }
        return akumulasikan;
    }, {});

    var data = {
        status: 200,
        values: hasil,
    };
    // console.log(data);
    res.json(data);
    res.end();
};