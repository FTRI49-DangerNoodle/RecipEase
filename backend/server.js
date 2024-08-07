const express = require('express');
const path = require('path'); //we aren't currently using this
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

//require in controllers and models;
const recipesController = require('./controllers/recipesController');
const userController = require('./controllers/userController');
const userDB = require('./models/userData');
const recipesDB = require('./models/recipesData');
const recipeRoutes = require('./routes/recipieRoutes.js');
const userRoutes = require('./routes/userRoutes.js');

// connect to mongoose db in the cloud
const MONGO_URI =
  process.env.MONGO_URI || 'mongodb+srv://david:ecommercescratchproject@cluster0.k7fwyhh.mongodb.net/RecipEase';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to Mongo DB.');
  } catch (err) {
    console.error(err);
  }
};

connectDB();

/**
 * handle parsing request body
 */
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(express.static(path.resolve(__dirname, '../dist/index.html')));

/**
 * define route handlers
 */
// Get all recipes and insert into DB
app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);

app.use((req, res) => res.sendStatus(404));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: '',
    status: 500,
    message: { err: '' },
  };

  // If Mongoose not found error, set to 404 and change message
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    defaultErr.status = 404;
    defaultErr.message = { err: 'Resource not found' };
  }

  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});
/**
 * start server
 */
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

module.exports = app;
