const path = require('path');

const express = require('express');

const studentController = require('../controllers/student');
const isAuth = require('../middleware/is-auth-student');

const router = express.Router();

router.get('/',isAuth, studentController.getHome);

router.get('/fillTestDetails',isAuth, studentController.getFillTestDetails);

router.post('/fillTestDetails',isAuth, studentController.postFillTestDetails);

router.get('/testPaper/:testId',isAuth, studentController.getTestPaper);

router.post('/testPaper',isAuth, studentController.postTestPaper);

module.exports = router;
