const Recipe = require("../models/recipesData.js");
const axios = require("axios");
const transformDataForDB = require("../DB_insert_algorithm/transformDataForDB.js");

exports.insertRecipes = async (req, res) => {
  try {
    const letters = "abcdefghijklmnopqrstuvwxyz".split("");
    const allMeals = [];

    for (let letter of letters) {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
      );
      if (response.data.meals) {
        allMeals.push(...response.data.meals);
      }
    }

    const transformedData = transformDataForDB({ meals: allMeals });

    //await Recipe.insertMany(transformedData);
    res.status(200).json({ message: "Recipes inserted successfully" });
  } catch (error) {
    return next({
      message: "error in insertRecipes: " + err,
      log: err,
    });
  }
};

exports.getRecipeByName = async (req, res) => {
  const { name } = req.body;
console.log("hit")
  try {
    const recipe = await Recipe.findOne({ name: new RegExp(name, "i") });
    if (recipe) {
      res.status(200).json(recipe);
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  } catch (error) {
    return next({
      message: "error in getRecipeByName: " + err,
      log: err,
    });
  }
};

exports.getRecipeById = async (req, res) => {
    const { id } = req.params;

    try {
        const recipe = await Recipe.findById(id);
        if (recipe) {
            res.status(200).json(recipe);
        } else {
            res.status(404).json({ message: 'Recipe not found' });
        }
    }  catch (error) {
        return next({
          message: "error in getRecipeById: " + err,
          log: err,
        });
      }
};
