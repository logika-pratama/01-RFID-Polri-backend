const express = require('express');
const router = express.Router();
const apikey = require('../helper/apikeys');
const user = require('../controller/users');
const items = require('../controller/items');
const stocktake = require('../controller/StockTake');
const putaway = require('../controller/ITAM/handler/Putway');
const gateout = require('../controller/ITAM/handler/GateOutCek');
const logTagNumber = require('../controller/logTagNumber');


// Master Items
router.post('/putaway', apikey.validateKey, logTagNumber.Putaway);

router.get('/items/search', apikey.validateKey, items.search);
router.post('/item', apikey.validateKey, items.registerItem);
// router.put('/item/:item_id', apikey.validateKey, items.edititem);
router.get('/item', apikey.validateKey, items.itemById);

// post data 
//router.post('/putaway', apikey.validateKey, putaway.putaway);
//router.post('/putaway', apikey.validateKey, putaway.putway);

// Stock Take 
router.get('./stocktakereport', apikey.validateKey, stocktake.report);
router.post('/genkey/:id',user.genApiKey);
router.post('/gate', gateout.gate);

module.exports = router;

