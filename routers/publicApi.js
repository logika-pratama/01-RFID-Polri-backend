const express = require('express');
const router = express.Router();
const apikey = require('../helper/apikeys');
const user = require('../controller/users');
const items = require('../controller/items');
const exim = require('../controller/exim');
const stocktake = require('../controller/StockTake')

router.post('/genkey/:id',user.genApiKey);

// Master Items
router.post('/item', apikey.validateKey, items.registerItem);
router.put('/item/:item_id', apikey.validateKey, items.edititem);
// Stock Take 
router.get('./stocktakereport', apikey.validateKey, stocktake.report);


module.exports = router;

