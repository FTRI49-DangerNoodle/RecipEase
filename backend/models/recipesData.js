// API: https://www.themealdb.com/api.php
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipe = new Schema({
  name: { type: String },
  catagory: { type: String },
  cuisine: { type: String },
  picutre: { type: String },
  ingredients: { type: Array },
  instructions: { type: Array },
  tags: { type: Array },
  youtubeLink: { type: String },
});

module.exports = mongoose.model('Recipe', recipe);

/*
{
  "meals": [
    {
      "idMeal": "52772",
      "strMeal": "Teriyaki Chicken Casserole",
      "strDrinkAlternate": null,
      "strCategory": "Chicken",
      "strArea": "Japanese",
      "strInstructions": "Preheat oven to 350° F. Spray a 9x13-inch baking pan with non-stick spray.\nCombine soy sauce, ½ cup water, brown sugar, ginger, and garlic in a small saucepan and cover. Bring to a boil over medium heat. Remove lid and cook for one minute once boiling.\nMeanwhile, stir together the corn starch and 2 tablespoons of water in a separate dish until smooth. Once sauce is boiling, add mixture to the saucepan and stir to combine. Cook until the sauce starts to thicken then remove from heat.\nPlace the chicken breasts in the prepared pan. Pour one cup of the sauce over top of chicken. Place chicken in oven and bake for 35 minutes or until cooked through. Remove from oven and shred chicken in the dish using two forks.\n*Meanwhile, steam or cook the vegetables according to package directions.\nAdd the cooked vegetables and rice to the casserole dish with the chicken. Add most of the remaining sauce, reserving a bit to drizzle over the top when serving. Gently toss everything together in the casserole dish until combined. Return to oven and cook for 15 minutes. Remove from oven and let stand for 5 minutes before serving. Drizzle each serving with remaining sauce. Enjoy!",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
      "strTags": "Meat,Casserole",
      "strYoutube": "https://www.youtube.com/watch?v=4aZr5hZXP_s",
      "strIngredient1": "soy sauce",
      "strIngredient2": "water",
      "strIngredient3": "brown sugar",
      "strIngredient4": "ground ginger",
      "strIngredient5": "minced garlic",
      "strIngredient6": "cornstarch",
      "strIngredient7": "chicken breasts",
      "strIngredient8": "stir-fry vegetables",
      "strIngredient9": "brown rice",
      "strMeasure1": "3/4 cup",
      "strMeasure2": "1/2 cup",
      "strMeasure3": "1/4 cup",
      "strMeasure4": "1/2 teaspoon",
      "strMeasure5": "1/2 teaspoon",
      "strMeasure6": "4 Tablespoons",
      "strMeasure7": "2",
      "strMeasure8": "1 (12 oz.)",
      "strMeasure9": "3 cups"
    }
  ]
}

*/
