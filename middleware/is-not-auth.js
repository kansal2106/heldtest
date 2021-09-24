module.exports = (req, res, next) => {
    if (req.session.isLoggedIn) {
        if(req.user.category==='Teacher')
            return res.redirect('/teacher');
        return res.redirect('/student');
    }
    next();
};