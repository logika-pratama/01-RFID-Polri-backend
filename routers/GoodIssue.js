const express = require('express');
const router = express.Router();
const exim = require('../controller/exim');
const jwt = require('../helper/jwt');

router.get('/gi', jwt.verify, exim.getGi);
router.get('/konfirmgi', jwt.verify, exim.konfirmGi);
router.get('/print/:SKU/:jumlah').get(jwt.verify, exim.printTag);


module.exports = router;