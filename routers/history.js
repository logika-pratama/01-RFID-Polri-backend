const express = require('express');
const router = express.Router();
const jwt = require('../helper/jwt');
const history = require('../controller/history');

router.get('/th', jwt.verify, jwt.cekrole(["1", "2", "3"]), history.THById);
router.get('/history', jwt.verify, jwt.cekrole(["1", "2", "3"]), history.getHistory);
router.get('/history/search/:tag', jwt.verify, history.search);
router.get('/status', history.getStatus);

module.exports = router;
