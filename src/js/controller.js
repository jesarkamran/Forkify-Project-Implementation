import { async } from 'regenerator-runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
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
    // Updating bookmarks for active bookmarks in list
    bookmarksView.updateDOM(model.state.bookmarks);
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

const controlBookmarks = function () {
  // Adding the recipe to the bookmarks
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  // Removing Bookmarks
  else model.deleteBookmark(model.state.recipe.id);

  // Updating the Dom to show changes on user interface
  recipeView.updateDOM(model.state.recipe);

  // Rendering Bookmarks to bookmarktab
  bookmarksView.render(model.state.bookmarks);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmarks(controlBookmarks);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
