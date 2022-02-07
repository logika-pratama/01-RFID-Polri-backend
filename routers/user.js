const exprerss =require('express');
const router = exprerss.Router();
const jwt = require('../helper/jwt');
const user = require('../controller/users');

router.get('/user/:id', jwt.verify, jwt.cekrole(["1", "2", "3"]), user.userById);
router.get('/user', jwt.verify, user.alluser);
router.get('/userbyaccount', jwt.verify, jwt.cekrole(["1", "2", "3"]), user.akun);
router.post('/user', jwt.verify, jwt.cekrole(["1", "2", "3"]), user.adduser);
router.put('/user/:id', jwt.verify, jwt.cekrole("1", "2"), user.edituser);
router.delete('/user/:id',jwt.verify, jwt.cekrole(["1", "2"]), user.hapususer);


module.exports = router;
