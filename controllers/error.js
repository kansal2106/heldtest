exports.get404 = (req, res, next) => {
  var category = null;
  if (req.session.isLoggedIn) {
    category = req.user.category;
  }
  res.status(404).render('404', {
    pageTitle: 'Page Not Found',
    path: '/404',
    isAuthenticated: req.session.isLoggedIn,
    category: category
  });
};
