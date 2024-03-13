const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const shopController = require('../controllers/index');

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', shopController.getIndex);
router.get('/api/users', shopController.getUsers);
router.post('/api/users', shopController.addUser);
router.post('/api/users/:_id/exercises', shopController.addExercise);
router.get('/api/users/:_id/logs', shopController.getLogs);
module.exports = router;
