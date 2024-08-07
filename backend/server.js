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

// connect to mongoose db in the cloud
const MONGO_URI =
  'mongodb+srv://larchevequepeter:OvtaaSnLuPqm8St3@cluster0.k8tpyij.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose
  .connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'recipease',
  })
  .then(() => {
    console.log('Connected to Mongo DB.');
    //call your function that fetches from 3rd party api declared in recipesController.js(?)
  })
  .catch((err) => console.log(err));

/**
 * handle parsing request body
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * require routers
 */
// const recipeaseRouter = express.Router();
// app.use('/recipease', recipeaseRouter);
/**
 * handle requests for static files
 */
app.use(cors());
app.use(express.static(path.resolve(__dirname, '../dist/index.html')));
/**
 * define route handlers
 */
// Get all recipes and insert into DB
// http: //localhost:3000/
app.post('/register', userController.register);

// obtain all recipes and insert into collection: recipes inside Database: recipease
app.get('/', recipesController.getAllRecipes, (req, res) => {
  recipesDB.insertMany(res.locals.data);
  return res.status(200).json(res.locals.data);
});

// send all the recipes from the collection
app.use('/api/recipes', (req, res) => {
  console.log('sending recipes...');
  console.log(recipesDB);
  recipesDB
    .find({})
    .exec()
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err));
});
// app.get('/', recipeController.getRecipe, (req, res) => {
//     console.log('we are in server');
//     return res.status(200).json(res.locals);
// })

// get individual recipes
// app.get('/recipes', recipeController.getRecipe, (req, res) => {
//     return res.status(200).json(res.locals);
// })

/**
 * configure express global error handler
 */
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
