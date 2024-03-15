import User from '../models/user.js';
import Exercise from '../models/exercise.js';

export const getIndex = (req, res, next) => {
  res.render('index', {
    pageTitle: 'Exercise Tracker | freeCodeCamp',
    path: '/',
  });
};

//You can POST to /api/users with form data username to create a new user.
export const addUser = (req, res, next) => {
  // Check if username is provided
  if (!req.body.username) {
    return res.status(400).json({ message: 'Username is required' });
  }
  User.findOne({ username: req.body.username })
    .then((existingUser) => {
      // If the user already exists, return a corresponding message
      if (existingUser) {
        res.json({ message: 'User already exists' });
      } else {
        const user = new User({
          username: req.body.username,
          count: 0,
          log: [],
        });
        user
          .save()
          .then((result) => {
            console.log('User created', result);
            res.json({
              _id: user._id,
              username: user.username,
              _v: user.__v,
            });
          })
          .catch((error) => {
            console.log('Error creating user', error);
          });
      }
    })
    .catch((error) => {
      console.log('Error finding user', error);
    });
};

//You can make a GET request to /api/users to get a list of all users.
export const getUsers = (req, res, next) => {
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
export const addExercise = (req, res, next) => {
  const userId = req.body[':_id'];

  // Check if description is provided
  if (!req.body.description) {
    return res.status(400).json({ message: 'Description is required' });
  }

  // Check if duration is provided and is a number
  if (!req.body.duration || isNaN(req.body.duration)) {
    return res
      .status(400)
      .json({ message: 'Duration is required and should be a number' });
  }

  // Check if date is provided and is a valid date
  if (req.body.date && isNaN(Date.parse(req.body.date))) {
    return res.status(400).json({ message: 'Invalid date format' });
  }

  let newExercise = {
    description: req.body.description,
    duration: parseInt(req.body.duration),
    date:
      req.body.date && !isNaN(Date.parse(req.body.date))
        ? new Date(req.body.date).toDateString()
        : new Date().toDateString(),
  };

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
// GET /api/users/:_id/logs?from=2016-01-01&to=2019-01-01&limit=2
export const getLogs = (req, res, next) => {
  const userId = req.params._id;
  const { from, to, limit } = req.query;
  let log;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.json({ error: 'User not found' });
      }

      console.log(req.query);

      if ((!from && !to) || (!from && !to && !limit)) {
        log = user.log;
      } else {
        log = user.log.sort((a, b) => new Date(a.date) - new Date(b.date));
      }
      // Sort the log by date and do not forget about zero hours

      if (from) {
        const fromDate = new Date(from);
        fromDate.setHours(0, 0, 0, 0);
        log = log.filter((exercise) => new Date(exercise.date) >= fromDate);
      }

      if (to) {
        const toDate = new Date(to);
        toDate.setHours(23, 59, 59, 999);
        log = log.filter((exercise) => new Date(exercise.date) <= toDate);
      }

      const count = log.length;

      if (limit) {
        log = log.slice(0, limit);
      }

      res.json({
        _id: user._id,
        username: user.username,
        count: count,
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
