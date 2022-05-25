const express = require('express');
const router = express.Router();
const exim = require('../controller/exim');
const jwt = require('../helper/jwt');
const grdata = require('../controller/logTagNumber');

router.get('/grdata', jwt.verify, exim.getGr);
router.get('/grdata/log', jwt.verify,grdata.getFirstFlag);
router.get('/konfirmgr', jwt.verify, exim.konfirmGr);

module.exports = router;