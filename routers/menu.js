const express = require('express');
const router = express.Router();
const jwt = require('../helper/jwt');
const uri = require('../controller/uri');

router.get('/home', jwt.verify, uri.getHomeScreen);
router.get('/integration',jwt.verify, uri.getIntegrationScreen);


module.exports = router;