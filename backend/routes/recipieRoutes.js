const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipesController');

// will insert data into database, make sure to uncomment out the insertmany in the controller!
//router.post('/insert', recipeController.insertRecipes);
// will insert data into database, make sure to uncomment out the insertmany in the controller!


router.post('/search', recipeController.getRecipeByName); 
router.get("/all", recipeController.getRecipesWithPagination);
router.get("/all/:id", recipeController.getRecipesWithPaginationId);
router.get("/names-ids", recipeController.getAllRecipeNamesAndIds);
router.get('/:id', recipeController.getRecipeById);
module.exports = router;

//router.get('/autocompleteId', recipeController.autoCompleteByQueryId);// <---- needs to be before the :id route or will trigger the id during autocomplete instead of this
//router.post('/autocompleteName', recipeController.autoCompleteByName);
