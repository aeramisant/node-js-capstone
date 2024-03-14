const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const mongoose = require('mongoose');
const uri = require('./utils/mongoose.js');
const notFound404 = require('./routes/404');
const indexRoutes = require('./routes/index');
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
module.exports = app;
