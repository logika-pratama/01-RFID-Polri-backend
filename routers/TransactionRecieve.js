const express = require('express');
const router = express.Router();
const recieve = require('../controller/trxrecieve');
const jwt = require('../helper/jwt');


router.post('/confirm', jwt.verify, jwt.cekrole(["1", "2", "3"]), recieve.ctm);
router.get('/', jwt.verify, jwt.cekrole(["1", "2", "3"]), recieve.TRByIdjoin);
router.post('/', recieve.addTR);
router.put('/', recieve.editTR);
router.delete('/', recieve.hapusTR);
router.get('/raw/:id', recieve.TRById);

module.exports = router