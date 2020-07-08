const recipes = require("./recipes.json");
const originIngredients = require("./ingredients.json");

const filterRecipe = (
  ingredients,
  recipesList = recipes,
  oldList = [],
  ingLength = -1
) => {
  if (ingLength === -1) ingLength = ingredients.length;
  if (ingredients.length === 0) {
    const bestRecipe = findBestRecipe(recipesList);
    return {
      allIngredients: true,
      excessIngredients:
        bestRecipe.ingredients.length === ingLength ? false : true,
      recipe: bestRecipe,
    };
  }
  const firstIngSynonyms = findIngredientSynonims(ingredients[0]);
  const reducedRecipes = recipesList.filter((recipe) => {
    return recipe.ingredients.find((ing) =>
      firstIngSynonyms.find((syn) => ing.toLowerCase().includes(syn))
    );
  });
  ingredients.shift();
  if (reducedRecipes.length === 0) {
    const bestRecipe = findBestRecipe(recipesList);
    return {
      perfect: false,
      recipe: bestRecipe,
      excessIngredients:
        bestRecipe.ingredients.length === ingLength - ingredients.length
          ? false
          : true,
    };
  }
  return filterRecipe(ingredients, reducedRecipes, recipesList, ingLength);
};

const findIngredientSynonims = (name) => {
  let ing;
  originIngredients.map((category) => {
    category.options.map((item) => {
      if (name === item.name) {
        ing = item;
      }
    });
  });
  return ing.synonyms;
};

const findBestRecipe = (recipeList) => {
  recipeList.sort((a, b) => a.ingredients.length - b.ingredients.length);
  const maxIngredients = recipeList[0].ingredients.length;
  const newRecipeList = recipeList.filter(
    (rec) => rec.ingredients.length <= maxIngredients
  );
  newRecipeList.sort(
    (a, b) =>
      Number(b.likes.replace(".", "")) - Number(a.likes.replace(".", ""))
  );
  return newRecipeList[0];
};
export default filterRecipe;
