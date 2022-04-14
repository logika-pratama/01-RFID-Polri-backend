const express = require('express');
const router = express.Router();
const jwt = require('../helper/jwt');
const location = require('../controller/locations');
const validate = require('../middleware/locationValidation')

router.get('/:id', jwt.verify, jwt.cekrole(["1", "2", "3"]), location.locationsById);
router.post('/', jwt.verify, jwt.cekrole(["1", "2", "3"]),validate.validateLocation, location.addlocation);
router.delete('/:id', jwt.verify, jwt.cekrole(["1", "2"]), location.hapuslocation);
router.put('/:id', jwt.verify, jwt.cekrole(["1", "2"]), validate.validateLocation,location.editlocation);


module.exports = router;