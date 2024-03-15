import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import mongoose from 'mongoose';
import { uri } from './utils/mongoose.js';
import { notFound404 } from './routes/404.js';
import { indexRoutes } from './routes/index.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

app.set('view engine', 'ejs');
//we tell express to look for the views in the views folder
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: true }));
//this will serve the static files in the public folder to load styles, etc.
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(indexRoutes);
app.use(notFound404);

mongoose
  .connect(uri)
  .then((result) => {
    console.log('Connected to the database');
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Your app is listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error('Ooops, something went wrong with connection --- ', error);
  });
export default app;
