const express = require('express');
const router = express.Router();
const jwt = require('../helper/jwt');
const uri = require('../controller/uri');

router.get('/', jwt.verify, uri.getUri);
router.get('/screen/home', jwt.verify, uri.getHomeScreen);
router.get('/screen/integration',jwt.verify, uri.getIntegrationScreen);


router.post('/', jwt.verify, uri.addUri);
router.put('/:name', jwt.verify, uri.editUri);

module.exports = router;