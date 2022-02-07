const express = require('express');
const router  = express.Router();
const jwt = require('../helper/jwt');
const trxType = require('../controller/trxype');

router.get('/trxtypes', jwt.verify, trxType.getTrx);
router.post('/trxtype', jwt.verify, trxType.addTrx);


module.exports = router;