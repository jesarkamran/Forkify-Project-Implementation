import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helper';
import recipeView from './views/recipeView.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
    maxPages: 0,
  },
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    state.search.page = 1;
    const data = await getJSON(`${API_URL}?search=${query}`);

    console.log(data);
    if (!data.results) throw new Error(`No results found for ${query}`);
    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });

    state.search.maxPages = Math.round(
      state.search.results.length / state.search.resultsPerPage
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const serachResultsPerPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ingredient => {
    ingredient.quantity *= newServings / state.recipe.servings;
  });

  state.recipe.servings = newServings;
};
