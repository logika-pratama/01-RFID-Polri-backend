const express = require('express');
const router = express.Router();
const jwt = require('../helper/jwt');
const exim = require('../controller/exim');

router.get('/:SKU/:jumlah', jwt.verify, jwt.cekrole(["1", "2", "3"]), exim.printTag);

module.exports = router;

