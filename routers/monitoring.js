const express = require('express');
const router = express.Router();
const jwt = require('../helper/jwt');
const monitoring = require('../controller/trxmonitoring');
const logTagNumber = require('../controller/logTagNumber');

router.post('/autoputaway', jwt.verify, jwt.cekrole(["1", "2", "3"]), monitoring.autoPutway);
router.post('/', jwt.verify, jwt.cekrole(["1", "2", "3"]), monitoring.addTM);
router.put('/', jwt.verify, jwt.cekrole(["1"]), monitoring.editTM);
router.delete('/', jwt.verify, jwt.cekrole(["1", "2"]), monitoring.hapusTM);
router.get('/', jwt.verify, jwt.cekrole(["1", "2", "3"]), monitoring.TMById);
router.get('/putaway', jwt.verify, jwt.cekrole(["1", "2", "3"]), monitoring.TMByIdNull);
router.post('/selectedputaway/:item_id', jwt.verify, jwt.cekrole(["1", "2", "3"]), monitoring.Putway);
router.post('/bulkputaway', jwt.verify, jwt.cekrole(["1", "2", "3"]), monitoring.bulkPutway);

// Handheld API Integration 
router.get('/search', jwt.verify, logTagNumber.searchMonitoring);

// Handheld API LOCALE
//router.get('/search/:tag', jwt.verify, jwt.cekrole(["1", "2", "3"]), monitoring.search);

// ITAT
router.get('/log', jwt.verify, jwt.cekrole(["1", "2", "3"]), logTagNumber.getSecondFlag);



module.exports = router;