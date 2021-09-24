const express = require('express');
const { check } = require('express-validator');

const authController = require('../controllers/auth');
const isNotAuth = require('../middleware/is-not-auth');

const router = express.Router();

router.get('/login',isNotAuth, authController.getLogin);

router.get('/signup',isNotAuth, authController.getSignup);

router.post('/login',isNotAuth, authController.postLogin);

router.post(
    '/signup', isNotAuth,
    check('email')
        .isEmail()
        .withMessage('Please enter a valid Email.'), 
    authController.postSignup
);

router.post('/logout', authController.postLogout);

router.get('/reset',isNotAuth, authController.getReset);

router.post('/reset',isNotAuth, authController.postReset);

router.get('/reset/:token',isNotAuth, authController.getNewPassword);

router.post('/new-password',isNotAuth, authController.postNewPassword);

module.exports = router;