import * as model from './model.js';
import recipeView from './views/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    // Rendering Spinner to show that request is in progress
    recipeView.renderSpinner();

    const id = window.location.hash.slice(1);

    if (!id) return;

    // Loading Recipe
    await model.loadRecipe(id);

    // Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (e) {
    console.log(e);
  }
};
// controlRecipes('5ed6604591c37cdc054bcc13');
['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);
