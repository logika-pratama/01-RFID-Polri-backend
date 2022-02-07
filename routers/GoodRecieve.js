const express = require('express');
const router = express.Router();
const exim = require('../controller/exim');
const jwt = require('../helper/jwt');

router.get('/grdata', jwt.verify, exim.getGr);
router.get('/konfirmgr', jwt.verify, exim.konfirmGr);

module.exports = router;