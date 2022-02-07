const express = require('express');
const router = express.Router();
const packing = require('../controller/packinglist');
const jwt = require('../helper/jwt');

router.post('/packing',jwt.verify, jwt.cekrole(["1", "2", "3"]), packing.createpacking);

module.exports = router