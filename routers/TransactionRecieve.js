const express = require('express');
const router = express.Router();
const recieve = require('../controller/trxrecieve');
const jwt = require('../helper/jwt');
const gateinHandler = require('../controller/ITAM/handler/ItamHandler');

router.post('/confirm', jwt.verify, jwt.cekrole(["1", "2", "3"]), recieve.ctm);
//router.post('/confirm', gateinHandler.gateIn);
router.get('/', jwt.verify, jwt.cekrole(["1", "2", "3"]), recieve.TRByIdjoin);
router.post('/', recieve.addTR);
router.put('/', recieve.editTR);
router.delete('/', recieve.hapusTR);
router.get('/raw/:id', recieve.TRById);

module.exports = router