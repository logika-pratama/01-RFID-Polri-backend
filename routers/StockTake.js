const express = require('express');
const router = express.Router();
const jwt = require('../helper/jwt');
const stockTake = require('../controller/StockTake');


router.get('/stoktake/:tag', jwt.verify, stockTake.searchV2);
router.get('/konfirmst', jwt.verify, stockTake.konfirmSt);
router.get('/stoktakereport', jwt.verify, stockTake.report);

module.exports = router;