module.exports = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login');
    }
    if(req.user.category !== 'Student') {
        return res.redirect('/teacher');
    }
    next();
}