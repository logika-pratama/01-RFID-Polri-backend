const exprerss = require('express');
const router = exprerss.Router();
const jwt = require('../helper/jwt');
const account = require('../controller/account');
const accountValidation = require('../middleware/accountValidation')

router.get('/', jwt.verify, jwt.cekrole(["1"]), account.allAccount);
router.get('/:id', jwt.verify, jwt.cekrole(["1", "2", "3"]), account.accountById);
router.post('/', jwt.verify, jwt.cekrole(["1", "2", "3"]), accountValidation.validateAccount, account.addaccount);
router.delete('/:id', jwt.verify, jwt.cekrole(["1"]), account.hapusaccount);
router.put('/', jwt.verify, jwt.cekrole(["1", "2"]),accountValidation.validateAccount, account.editAccount);


module.exports = router;