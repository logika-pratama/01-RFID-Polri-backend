const express = require('express');
const router = express.Router();
const jwt = require('../helper/jwt');
const cashier = require('../controller/trxcashier');


router.get('/', jwt.verify, jwt.cekrole(["1", "2", "3"]), cashier.TCById);
router.post('/confirm', jwt.verify, jwt.cekrole(["1", "2", "3"]), cashier.konfirm);
router.get('/all',jwt.verify, cashier.allTC);
router.delete('/:id', jwt.verify, cashier.hapusTC);

module.exports = router;