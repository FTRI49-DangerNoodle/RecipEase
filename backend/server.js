/**
 Date: 8/3/2024
 Coauthors: Peter Larcheveque and Erin Lee
 Description: File to centralize routes for internal server
 */
console.log('we are in server');
const path = require('path'); //we aren't currently using this
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 5000;
const cors = require('cors');

//require in controllers and models;
const recipesController = require('./controllers/recipesController');
const userController = require('./controllers/userController');
const userDB = require('./models/userData');
const recipesDB = require('./models/recipesData');
const recipeRoutes = require('./routes/recipieRoutes.js'); 

// connect to mongoose db in the cloud
const MONGO_URI =
  'mongodb+srv://david:ecommercescratchproject@cluster0.k7fwyhh.mongodb.net/RecipEase';

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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.resolve(__dirname, '../dist/index.html')));

/**
 * define route handlers
 */
// Get all recipes and insert into DB
// http: //localhost:3000/
app.post('/register', userController.register);


app.use('/api/recipes', recipeRoutes);


app.use((req, res) => res.sendStatus(404));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: '',
    status: 500,
    message: { err: '' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});
/**
 * start server
 */
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

module.exports = app;
