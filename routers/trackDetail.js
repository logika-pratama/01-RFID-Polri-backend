const express = require('express');
const router = express.Router();
const jwt = require('../helper/jwt');
const trackDetail = require('../controller/trackdetail');

router.get('/', jwt.verify, trackDetail.track);
router.get('/gatelist', jwt.verify, trackDetail.trackGate);



module.exports = router;