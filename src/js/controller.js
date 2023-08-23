import { async } from 'regenerator-runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) module.hot.accept();

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
    recipeView.renderError();
  }
};

const controllSearchResults = async function () {
  try {
    // Getting Search Query
    const query = searchView.getQuery();

    // Guard Clause
    if (!query) return;

    // Rendering Spinner
    resultsView.renderSpinner();

    // Loading Search Results from Model
    await model.loadSearchResults(query);

    // Rendering Search Results to the View
    resultsView.render(model.serachResultsPerPage());
  } catch (e) {
    console.log(e);

    // Rendering Error to the View
    resultsView.renderError(e.message);
  }
};

// controllSearchResults();

// controlRecipes('5ed6604591c37cdc054bcc13');
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controllSearchResults);
};
init();
