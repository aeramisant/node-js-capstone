const User = require('../models/user');
const Exercise = require('../models/exercise');

exports.getIndex = (req, res, next) => {
  res.render('index', {
    pageTitle: 'Exercise Tracker | freeCodeCamp',
    path: '/',
  });
};

//You can POST to /api/users with form data username to create a new user.
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

//You can make a GET request to /api/users to get a list of all users.
exports.getUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      if (users.length === 0) {
        return res.json({ message: 'There are no users in the database!' });
      }

      const usersWithIdAndUsername = users.map((user) => {
        return {
          _id: user._id,
          username: user.username,
          _v: user.__v,
        };
      });

      res.json(usersWithIdAndUsername);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while fetching users' });
    });
};

// You can POST to /api/users/:_id/exercises with form data description, duration, and optionally date. If no date is supplied, the current date will be used.
exports.addExercise = (req, res, next) => {
  const { userId, description, duration, date } = req.body;
  const newExercise = new Exercise({ description, duration, date });
  //if date is empty, set it to today
  if (!newExercise.date) {
    newExercise.date = new Date().toISOString().substring(0, 10);
  }

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.json({ error: 'User not found' });
      }

      user.log.push(newExercise);
      user.count = user.log.length;
      user
        .save()
        .then((result) => {
          console.log('Exercise added', result);
          res.json({
            _id: result._id,
            username: result.username,
            description: newExercise.description,
            duration: newExercise.duration,
            date: new Date(newExercise.date).toDateString(),
          });
        })
        .catch((error) => {
          console.log('Error adding exercise', error);
        });
    })
    .catch((error) => {
      console.log('Error finding user', error);
    });
};
// You can make a GET request to /api/users/:_id/logs to retrieve a full exercise log of any user.
exports.getLogs = (req, res, next) => {
  const userId = req.params._id;
  console.log(req.params);
  const { from, to, limit } = req.query;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.json({ error: 'User not found' });
      }

      let log = user.log;

      if (from) {
        log = log.filter(
          (exercise) => new Date(exercise.date) > new Date(from)
        );
      }

      if (to) {
        log = log.filter((exercise) => new Date(exercise.date) < new Date(to));
      }

      if (limit) {
        log = log.slice(0, limit);
      }

      res.json({
        _id: user._id,
        username: user.username,
        count: user.count,
        log: log.map((exercise) => {
          return {
            description: exercise.description,
            duration: exercise.duration,
            date: new Date(exercise.date).toDateString(),
          };
        }),
      });
    })
    .catch((error) => {
      console.log('Error finding user', error);
    });
};
