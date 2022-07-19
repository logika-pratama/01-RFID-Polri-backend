const express = require('express');
const router = express.Router();
const jwt = require('../helper/jwt');
const stockTake = require('../controller/StockTake');
const stockTakeMobile = require('../controller/ITAM/handler/stockTake');

// WEB API
router.get('/stoktake/:tag', jwt.verify, stockTake.searchV2);
router.get('/konfirmst', jwt.verify, stockTake.konfirmSt);
router.get('/stoktakereport', jwt.verify, stockTake.report);

// Mobile API
router.get('/stokopname/list', jwt.verify, stockTakeMobile.getListNoSprint);
router.get('/stoktake',jwt.verify, stockTakeMobile.addStockOpname);
router.post('/stoktake', jwt.verify, stockTakeMobile.addStockList);

module.exports = router;