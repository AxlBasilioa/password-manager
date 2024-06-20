const express = require('express');
const router = express.Router();
const passwordController = require('../controllers/passwordController');

router.post('/add-password', passwordController.addPassword);
router.get('/get-password/:service', passwordController.getPassword);
router.get('/list-passwords', passwordController.listPasswords);
router.post('/verify-password', passwordController.verifyPasswordEndpoint);

module.exports = router;
