const express = require('express');
const router = express.Router();
const upload = require('../controller/exim');
const jwt = require('../helper/jwt');
const up = require('../helper/upload');

router.post('/upload', jwt.verify, up.single("file"), upload.importItems);
router.post('/importorder', jwt.verify, up.single("file"), upload.importOrders);

module.exports = router;