const express = require('express');
const { validate } = require('node-cron');
const router = express.Router();
const items = require('../controller/items');
const jwt = require('../helper/jwt');
const itemValidation = require('../middleware/itemValidation')

router.get('/item/all', jwt.verify, jwt.cekrole(["1"]), items.allitem);
router.get('/itemnull', jwt.verify, jwt.cekrole(["1", "2", "3"]), items.datanull);
router.get('/item', jwt.verify, jwt.cekrole(["1", "2", "3"]), items.itemById);
router.post('/item', jwt.verify, jwt.cekrole(["1", "2", "3"]),itemValidation.validateItem, items.additem);
router.put('/item/:item_id', jwt.verify, jwt.cekrole(["1", "2", "3"]),itemValidation.validateItem, items.edititem);
router.delete('/item/:id', jwt.verify, jwt.cekrole(["1", "2", "3"]), items.hapusitem);
router.get('/item/:id', jwt.verify, jwt.cekrole(["1", "2", "3"]), items.itemByitemId);
router.get('/item/search/:tag', jwt.verify, items.search);

module.exports = router;