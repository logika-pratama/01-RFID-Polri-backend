const express = require('express');
const router = express.Router();
const jwt = require('../helper/jwt');
const bulkpdateit = require('../controller/bulkupdate');

router.post('/', jwt.verify, jwt.cekrole(["1", "2", "3"]), bulkpdateit.bulkupdateitem)

module.exports = router; 