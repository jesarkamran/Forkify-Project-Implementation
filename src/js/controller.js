import { async } from 'regenerator-runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { TIMEOUT_MODAL_SEC, TIMEOUT_SEC } from './config.js';

if (module.hot) module.hot.accept();

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    // Rendering Spinner to show that request is in progress
    recipeView.renderSpinner();

    const id = window.location.hash.slice(1);

    if (!id) throw new Error(recipeView.getErrorMessage());

    resultsView.updateDOM(model.serachResultsPerPage(model.state.search.page));

    // Loading Recipe
    await model.loadRecipe(id);

    // Rendering Recipe
    recipeView.render(model.state.recipe);
    // Updating bookmarks for active bookmarks in list
    bookmarksView.updateDOM(model.state.bookmarks);
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

const controlRenderBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (data) {
  try {
    //adding Spinner
    addRecipeView.renderSpinner();
    // Upload data to API
    await model.uploadRecipe(data);

    // // Rendering
    recipeView.render(model.state.recipe);

    // Success Message
    addRecipeView.renderSuccess('Recipe Uploaded Successfully :)');
  } catch (error) {
    console.log(error);
    addRecipeView.renderError(error.message);
  } finally {
    // Close Form window after some time
    setTimeout(function () {
      addRecipeView.handler();
    }, TIMEOUT_MODAL_SEC_SEC * 1000);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlRenderBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmarks(controlBookmarks);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
