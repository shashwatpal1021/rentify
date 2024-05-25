var express = require('express');
var router = express.Router();
const { createUser, logIn, logOut, getMe } = require('../controller/user.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
router.post('/register', createUser);
router.post('/login', logIn)
router.get('/logout', authenticateToken, logOut)
router.get('/me',authenticateToken,  getMe)

module.exports = router;
