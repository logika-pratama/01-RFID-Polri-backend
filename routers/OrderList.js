const express = require('express');
const router = express.Router();
const jwt = require('../helper/jwt');
const orderlist = require('../controller/order');

router.get('/orderlist', jwt.verify, orderlist.getorderlist);
router.get('/itemorder/:No_Order', jwt.verify, orderlist.getitemlist);
router.delete('/orderlist/:No_Order', jwt.verify, orderlist.deleteOreder);

module.exports = router;