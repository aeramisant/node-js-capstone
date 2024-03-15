import express from 'express';

import { error404 } from '../controllers/error.js';
const router = express.Router();

router.use(error404);

export { router as notFound404 };
