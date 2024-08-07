const transformDataForDB = (data) => {
    const transformedMeals = [];

    for (let i = 0; i < data.meals.length; i++) {
        const meal = data.meals[i];
        const ingredients = [];

        for (let j = 1; j <= 20; j++) {
            const ingredient = meal[`strIngredient${j}`];
            const measure = meal[`strMeasure${j}`];

            if (ingredient && ingredient.trim() !== "") {
                ingredients.push(measure + ' ' + ingredient);
            }
        }

        const instructions = [];
        const rawInstructions = meal.strInstructions.split('.');
        for (let instruction of rawInstructions) {
            const trimmedInstruction = instruction.trim();
            if (trimmedInstruction) {
                instructions.push(trimmedInstruction);
            }
        }

        const transformedMeal = {
            name: meal.strMeal,
            catagory: meal.strCategory,
            cuisine: meal.strArea,
            picutre: meal.strMealThumb,
            ingredients: ingredients,
            instructions: instructions,
            tags: meal.strTags ? meal.strTags.split(',') : [],
            youtubeLink: meal.strYoutube
        };

        transformedMeals.push(transformedMeal);
    }

    return transformedMeals;
};

module.exports = transformDataForDB;
