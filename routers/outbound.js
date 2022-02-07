const express = require('express');
const router = express.Router();
const jwt = require('../helper/jwt');
const delivery = require('../controller/trxdelivery');

router.get('/all', jwt.verify, jwt.cekrole(["1"]), delivery.allTD);
router.post('/confirm', jwt.verify, jwt.cekrole(["1", "2", "3"]), delivery.konfirm);
router.put('/', jwt.verify, delivery.editTD);
router.delete('/:id', jwt.verify, delivery.hapusTD);
router.get('/', jwt.verify, jwt.cekrole(["1", "2", "3"]), delivery.TDById);



module.exports = router;