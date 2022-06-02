const express = require('express');
const router = express.Router();
const jwt = require('../helper/jwt');
const uri = require('../controller/uri');

router.get('/', jwt.verify, uri.getUri);
router.post('/', jwt.verify, uri.addUri);

module.exports = router;