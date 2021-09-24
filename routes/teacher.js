const path = require('path');

const express = require('express');

const teacherContrller = require('../controllers/teacher');
const isAuth = require('../middleware/is-auth-teacher');

const router = express.Router();

router.get('/', isAuth, teacherContrller.getHome);

router.get('/createTest', isAuth, teacherContrller.getCreateTest);

router.post('/createTest', isAuth, teacherContrller.postCreateTest);

router.get('/add-ques/:test_id', isAuth, teacherContrller.getAddQues);

router.post('/add-ques', isAuth, teacherContrller.postAddQues);

router.get('/yourTests', isAuth, teacherContrller.getYourTests);

router.get('/review/:test_id', isAuth, teacherContrller.getReview);

router.get('/edit-ques/:quesId', isAuth, teacherContrller.getEditQues);

router.post('/edit-ques', isAuth, teacherContrller.postEditQues);

router.post('/delete-ques', isAuth, teacherContrller.postDeleteQues);

module.exports = router;
