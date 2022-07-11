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
router.get('/stoktake',jwt.verify, stockTakeMobile.StockTake);
router.post('/stoktake', jwt.verify, stockTakeMobile.addStockOpname);

module.exports = router;