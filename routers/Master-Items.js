const express = require('express');
const router = express.Router();
const items = require('../controller/items');
const jwt = require('../helper/jwt');


router.get('/item/all', jwt.verify, jwt.cekrole(["1"]), items.allitem);
router.get('/item/itemnull', jwt.verify, jwt.cekrole(["1", "2", "3"]), items.datanull);
router.get('/item', jwt.verify, jwt.cekrole(["1", "2", "3"]), items.itemById);
router.post('/item', jwt.verify, jwt.cekrole(["1", "2", "3"]), items.additem);
router.put('/item/:item_id', jwt.verify, jwt.cekrole(["1", "2", "3"]), items.edititem);
router.delete('.item/:id', jwt.verify, jwt.cekrole(["1", "2", "3"]), items.hapusitem);
router.get('/item/:id', jwt.verify, jwt.cekrole(["1", "2", "3"]), items.itemByitemId);
router.get('/item/search/:tag', jwt.verify, items.search);

module.exports = router;