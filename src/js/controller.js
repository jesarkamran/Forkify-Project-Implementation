import { async } from 'regenerator-runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
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

    resultsView.updateDOM(model.serachResultsPerPage(model.state.search.page));

    // Loading Recipe
    await model.loadRecipe(id);

    // Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (e) {
    console.log(e);
    recipeView.renderError();
  }
};

const gotPage = function (page) {
  // Rendering Search Results to the View
  resultsView.render(model.serachResultsPerPage(page));

  paginationView.render({
    curr: model.state.search.page,
    max: model.state.search.maxPages,
  });
};

const controlSearchResults = async function () {
  try {
    // Getting Search Query
    const query = searchView.getQuery();

    // Guard Clause
    if (!query) return;

    // Rendering Spinner
    resultsView.renderSpinner();

    // Loading Search Results from Model
    await model.loadSearchResults(query);

    gotPage(model.state.search.page);
  } catch (e) {
    console.log(e);

    // Rendering Error to the View
    resultsView.renderError(e.message);
  }
};

const controlPagination = function (page) {
  model.state.search.page = page;
  // Rendering Search Results to the View
  gotPage(page);
};

const updateModelServings = function (servings) {
  // updating the serving in state object
};
const controlServings = function (servings) {
  model.updateServings(servings);

  // recipeView.render(model.state.recipe);
  recipeView.updateDOM(model.state.recipe);
};

// controllSearchResults();

// controlRecipes('5ed6604591c37cdc054bcc13');
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
