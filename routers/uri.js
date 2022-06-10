const express = require('express');
const router = express.Router();
const jwt = require('../helper/jwt');
const uri = require('../controller/uri');

router.get('/', jwt.verify, uri.getUri);

router.post('/', jwt.verify, uri.addUri);
router.put('/:menu_id', jwt.verify, uri.editUri);

module.exports = router;