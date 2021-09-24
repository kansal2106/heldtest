module.exports = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login');
    }
    if(req.user.category !== 'Teacher') {
        return res.redirect('/student');
    }
    next();
}