const Test = require('../models/test');
const Ques = require('../models/ques');
const Submission = require('../models/submission');
const submission = require('../models/submission');

exports.getHome = (req, res, next) => {
    res.render('student/home',{
        path: '/',
        pageTitle: 'Home',
        category: req.user.category
    });
};

exports.getFillTestDetails = (req, res, next) => {
    let message = req.flash('error');
    if(message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('student/fill-test-details', {
        path: 'fillTestDetails',
        pageTitle: 'Fill Details',
        category: req.user.category,
        errorMessage: message
    });
};

exports.postFillTestDetails = (req, res, next) => {
    const test_name = req.body.test_name;
    const test_id = req.body.test_id;
    Test.findOne({test_name: test_name, test_id: test_id})
        .then(test => {
            if(!test) {
                req.flash('error', 'Please Enter valid Test Name and Id.');
                return res.redirect('/student/fillTestDetails');
            }
            Submission.findOne({test_id: test_id, studentId: req.user._id})
                .then(submission => {
                    if(submission) {
                        req.flash('error', 'You have already appeared in this test.');
                        return res.redirect('/student/fillTestDetails');
                    }
                    console.log(test);
                    if(test) {
                        res.redirect('/student/testPaper/'+test._id);
                    }
                    else {
                        res.redirect('/student/FillTestDetails');
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        })
};

exports.getTestPaper = (req, res, next) => {
    const testId = req.params.testId;
    Test.findOne({_id: testId})
        .then(test => {
            Ques.find({test_id:test.test_id})
                .then(ques => {
                    res.render('student/test-paper',{
                        path: 'testPaper',
                        pageTitle: 'Test Paper',
                        ques: ques,
                        category: req.user.category
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postTestPaper = (req, res, next) => {
    const test_id = req.body.test_id;
    var ans = [];
    for(var i=1;i<=2;i++)
    {
        ans[i-1] = req.body["option"+i];
        console.log(ans[i-1]);
    }
    const submission = new Submission({
        test_id: test_id,
        studentId: req.user._id,
        solution: {ques: []}
    });
    submission.save();
    Submission.findOne({test_id:test_id})
        .then(subm => {
            Ques.find({test_id: test_id})
                .then(ques => {
                    for(var i=1; i<=ques.length; i++)
                    {
                        subm.addToSolution(ques[i-1],ans[i-1]);
                    }
                    return res.redirect('/student');
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });
};