const Test = require('../models/test');
const Ques = require('../models/ques');

exports.getHome = (req, res, next) => {
    res.render('teacher/home', {
        path: '/',
        pageTitle: 'Home',
        category: req.user.category
    });
};

exports.getCreateTest = (req, res, next) => {
    res.render('teacher/createTest', {
        path: 'createTest',
        pageTitle: 'Create Test',
        category: req.user.category
    });
};

exports.postCreateTest = (req, res, next) => {
    const test_name = req.body.test_name;
    const test_id = req.body.test_id;
    const test = new Test({
        test_name: test_name,
        test_id: test_id,
        userId: req.user._id
    });
    test.save()
        .then(result => {
            console.log('Test Name and Id Created.');
            res.redirect('/teacher/yourTests');
        })
        .catch(err=> {
            console.log(err);
        });
};

exports.getAddQues = (req, res, next) => {
    const test_id = req.params.test_id;
    res.render('teacher/edit-ques', {
        path: 'add-ques',
        pageTitle: 'Add Ques',
        editing: false,
        category: req.user.category,
        test_id: test_id
    });
};

exports.postAddQues = (req, res, next) => {
    const test_id = req.body.test_id;
    const quesDesc = req.body.quesDesc;
    const optionA = req.body.optionA;
    const optionB = req.body.optionB;
    const ques = new Ques({
        test_id: test_id,
        quesDesc: quesDesc,
        optionA: optionA,
        optionB: optionB,
        userId: req.user._id
    });
    ques.save()
        .then(result => {
            console.log('Question Added!');
            res.redirect('/teacher/review/'+test_id);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getYourTests = (req, res, next) => {
    const userId = req.user._id;
    Test.find({userId: userId})
        .then(tests => {
            res.render('teacher/yourTests',{
                pageTitle: 'Your Tests',
                path: 'yourTests',
                tests: tests,
                category: req.user.category
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getReview = (req, res, next) => {
    const test_id = req.params.test_id;
    Test.find({test_id: test_id})
        .then(test => {
            test = test[0];
            Ques.find({test_id: test_id})
                .then(ques => {
                    res.render('teacher/review', {
                        pageTitle: test.test_name,
                        path: 'review',
                        ques: ques,
                        category: req.user.category,
                        test_id: test_id
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        })
};

exports.getEditQues = (req, res, next) => {
    const editMode = req.query.edit;
    const quesId = req.params.quesId;
    if(!editMode) {
        return res.redirect('/teacher');
    }
    Ques.findById(quesId)
        .then(ques => {
            if(!ques) {
                return res.redirect('/teacher');
            }
            res.render('teacher/edit-ques', {
                path: '/teacher/edit-ques',
                pageTitle: 'Edit Ques',
                editing: editMode,
                ques: ques,
                category: req.user.category
            });
        })
};

exports.postEditQues = (req, res, next) => {
    const quesId = req.body.quesId;
    const updatedQuesDesc = req.body.quesDesc;
    const updatedOptionA = req.body.optionA;
    const updatedOptionB = req.body.optionB;
    Ques.findById(quesId)
        .then(ques => {
            const test_id = ques.test_id;
            if (ques.userId.toString() !== req.user._id.toString()) {
                return res.redirect('/teacher');
            }
            ques.quesDesc = updatedQuesDesc;
            ques.optionA = updatedOptionA;
            ques.optionB = updatedOptionB;
            return ques.save()
            .then(result => {
                console.log('Question Updated');
                res.redirect('/teacher/review/'+test_id);
            })
            .catch(err => {console.log(err);});
        })
        .catch(err => {console.log(err);});
};

exports.postDeleteQues = (req, res, next) => {
    const quesId = req.body.quesId;
    const test_id = req.body.test_id;
    Ques.deleteOne({_id: quesId, userId: req.user._id})
        .then(() => {
            console.log('Question Deleted Successfully!');
            res.redirect('/teacher/review/'+test_id);
        })
        .catch(err => {console.log(err);});
};
