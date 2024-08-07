const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipesController');

// will insert data into database, make sure to uncomment out the insertmany in the controller
router.post('/insert', recipeController.insertRecipes);
router.post('/search', recipeController.getRecipeByName);
router.get('/:id', recipeController.getRecipeById);
module.exports = router;
