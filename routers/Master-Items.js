const express = require('express');
const router = express.Router();
const items = require('../controller/items');
const jwt = require('../helper/jwt');


router.get('/all', jwt.verify, jwt.cekrole(["1"]), items.allitem);
router.get('/null', jwt.verify, jwt.cekrole(["1", "2", "3"]), items.datanull);
router.get('/', jwt.verify, jwt.cekrole(["1", "2", "3"]), items.itemById);
router.post('/', jwt.verify, jwt.cekrole(["1", "2", "3"]), items.additem);
router.put('/:item_id', jwt.verify, jwt.cekrole(["1", "2", "3"]), items.edititem);
router.delete('/:id', jwt.verify, jwt.cekrole(["1", "2", "3"]), items.hapusitem);
router.get('/:id', jwt.verify, jwt.cekrole(["1", "2", "3"]), items.itemByitemId);
router.get('/search/:tag', jwt.verify, items.search);

module.exports = router;