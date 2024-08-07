const Recipe = require("../models/recipesData.js");
const axios = require("axios");
const transformDataForDB = require("../DB_insert_algorithm/transformDataForDB.js");

exports.insertRecipes = async (req, res, next) => {
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
  } catch (err) {
    return next({
      message: "error in insertRecipes: " + err,
      log: err,
    });
  }
};

exports.getRecipeByName = async (req, res, next) => {
  const { name } = req.body;

  try {
    const recipe = await Recipe.findOne({ name: new RegExp(name, "i") });
    if (recipe) {
      res.status(200).json(recipe);
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  } catch (err) {
    return next({
      message: "error in getRecipeByName: " + err,
      log: err,
    });
  }
};

exports.getRecipeById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const recipe = await Recipe.findById(id);
    if (recipe) {
      res.status(200).json(recipe);
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  } catch (err) {
    return next({
      message: "error in getRecipeById: " + err,
      log: err,
    });
  }
};
exports.autoCompleteByQueryId = async (req, res, next) => {
  const { query } = req.query;

  try {
    const recipes = await Recipe.find({ name: new RegExp("^" + query, "i") })
      .select("name")
      .limit(10);
    res.status(200).json(recipes);
  } catch (err) {
    return next({
      message: "error in getAutocompleteSuggestions: " + err,
      log: err,
    });
  }
};

exports.autoCompleteByName = async (req, res, next) => {
  const { name } = req.body;

  try {
    const recipes = await Recipe.find({ name: new RegExp("^" + name, "i") })
      .select("name")
      .limit(10);
    res.status(200).json(recipes);
  } catch (err) {
    return next({
      message: "error in getAutocompleteSuggestions: " + err,
      log: err,
    });
  }
};
