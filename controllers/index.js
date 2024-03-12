exports.getIndex = (req, res, next) => {
  res.render('index', {
    pageTitle: 'Exercise Tracker | freeCodeCamp',
    path: '/',
  });
};
exports.getHomePage = (req, res, next) => {
  res.render('/', {
    pageTitle: 'Exercise Tracker | freeCodeCamp',
    path: '/',
  });
};
