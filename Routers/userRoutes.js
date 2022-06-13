const express = require("express");
const router = express.Router();

const userCtrl = require('../Controllers/userController');

router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.post('/verify-otp', userCtrl.verifyOtp);
router.post('/set-pin', userCtrl.setPin);
router.post('/password-reset', userCtrl.resetPasswordRequest);

module.exports = router;
