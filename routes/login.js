var express = require('express');
var router = express.Router();

const login = require('../controllers/login');
router.post('/register',login.register)

module.exports = router