const User = require('../models/user');
exports.getIndex = (req, res, next) => {
  res.render('index', {
    pageTitle: 'Exercise Tracker | freeCodeCamp',
    path: '/',
  });
};

//add new user
exports.addUser = (req, res, next) => {
  const user = new User({ username: req.body.username });
  user
    .save()
    .then((result) => {
      console.log('User created', result);
      res.redirect('/');
    })
    .catch((error) => {
      console.log('Error creating user', error);
    });
};

//get all users
exports.getUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while fetching users' });
    });
};
