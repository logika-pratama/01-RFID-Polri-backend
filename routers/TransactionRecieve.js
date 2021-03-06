const express = require('express');
const router = express.Router();
const recieve = require('../controller/trxrecieve');
const jwt = require('../helper/jwt');
const gateinHandler = require('../controller/ITAM/handler/ItamHandler');
const inbound = require('../controller/logTagNumber');

//router.post('/confirm', jwt.verify, jwt.cekrole(["1", "2", "3"]), recieve.ctm);
router.post('/confirm', jwt.verify, jwt.cekrole(["1", "2", "3"]), gateinHandler.gateIn);
router.get('/', jwt.verify, jwt.cekrole(["1", "2", "3"]), recieve.TRByIdjoin);
router.get('/log', jwt.verify, jwt.cekrole(["1", "2", "3"]), inbound.getZeroFlag);
router.post('/', recieve.addTR);
router.put('/', recieve.editTR);
router.delete('/', recieve.hapusTR);
router.get('/raw/:id', recieve.TRById);

module.exports = router