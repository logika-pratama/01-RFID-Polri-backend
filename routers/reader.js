const express = require('express');
const router = express.Router();
const jwt = require('../helper/jwt');
const reader = require('../controller/readers');


router.post('/gatescan', jwt.verify, jwt.cekrole(["3"]), reader.sendTag);
router.get('/allreaders', jwt.verify, jwt.cekrole(["1"]), reader.allreader);
router.get('/readers', jwt.verify, jwt.cekrole(["2","3",]), reader.readersById);
router.post('/reader', jwt.verify, jwt.cekrole(["1", "2"]), reader.addreaders);
router.delete('/reader/:id', jwt.verify, jwt.cekrole(["1", "2"]), reader.hapusreaders);
router.put('/reader/:id', jwt.verify, jwt.cekrole(["1", "2"]), reader.editreaders);
router.get('/readerbyaccount/:id', jwt.verify, jwt.cekrole(["1", "2"]), reader.getReadersName);


module.exports = router;