import express from 'express';
import bodyParser from 'body-parser';
import {
  getIndex,
  getUsers,
  addUser,
  addExercise,
  getLogs,
} from '../controllers/index.js';

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', getIndex);
router.get('/api/users', getUsers);
router.post('/api/users', addUser);
router.post('/api/users/:_id/exercises', addExercise);
router.get('/api/users/:_id/logs', getLogs);

export { router as indexRoutes };
