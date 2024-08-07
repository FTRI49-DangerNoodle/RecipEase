const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipesController');

router.post('/insert', recipeController.insertRecipes);
router.post('/search', recipeController.getRecipeByName);
router.get('/autocompleteId', recipeController.autoCompleteByQueryId);
router.post('/autocompleteName', recipeController.autoCompleteByName);
router.get('/:id', recipeController.getRecipeById);

module.exports = router;
