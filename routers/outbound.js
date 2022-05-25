const express = require('express');
const router = express.Router();
const jwt = require('../helper/jwt');
const delivery = require('../controller/trxdelivery');
const itamHandler = require('../controller/ITAM/handler/ItamHandler');
const outbound = require('../controller/logTagNumber');

router.get('/all', jwt.verify, jwt.cekrole(["1"]), delivery.allTD);
//router.post('/confirm', jwt.verify, jwt.cekrole(["1", "2", "3"]), delivery.konfirm);
router.post('/confirm', jwt.verify, jwt.cekrole(["1", "2", "3"]), itamHandler.gateOut);
router.put('/', jwt.verify, delivery.editTD);
router.delete('/:id', jwt.verify, delivery.hapusTD);
router.get('/', jwt.verify, jwt.cekrole(["1", "2", "3"]), delivery.TDById);

// ITAT
router.get('/log', jwt.verify, jwt.cekrole(["1", "2", "3"]), outbound.getThirdFlag);


module.exports = router;