import { async } from 'regenerator-runtime';
import { API_KEY, API_URL, RES_PER_PAGE } from './config.js';
// import { getJSON, sendJSON } from './helper';
import { AJAX } from './helper';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
    maxPages: 0,
  },
  bookmarks: [],
};

const createRecipe = function (data) {
  const { recipe } = data.data;

  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}${id}?key=${API_KEY}`);
    state.recipe = createRecipe(data);

    state.recipe.bookmarked = state.bookmarks.some(
      bookmark => bookmark.id === state.recipe.id
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    state.search.page = 1;
    const data = await AJAX(`${API_URL}?search=${query}&key=${API_KEY}`);

    console.log(data);
    if (!data.results) throw new Error(`No results found for ${query}`);
    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
        ...(recipe.key && { key: recipe.key }),
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

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  // Adding recipe to bookmarks array
  state.bookmarks.push(recipe);
  recipe.bookmarked = true;
  if (recipe.id == state.recipe.id) state.recipe.bookmarked = true;
  persistBookmarks();
};

export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex(el => el.id === id);

  // Removing Bookmarks from an array;
  state.bookmarks.splice(index, 1);
  if (state.recipe.id === id) state.recipe.bookmarked = false;
  persistBookmarks();
};

const cleanBookmarks = function () {
  localStorage.clear('bookmarks');
};
// cleanBookmarks();

export const uploadRecipe = async function (uploadData) {
  try {
    console.log(Object.entries(uploadData));
    const ingredients = Object.entries(uploadData)
      .filter(el => el[0].startsWith('ingredient') && el[1] !== '')
      .map(ingredient => {
        const arr = ingredient[1].split(',').map(el => el.trim());
        if (arr.length < 3)
          throw new Error('Please Enter a valid ingredient data');
        const [quantity, unit, description] = arr;
        return {
          quantity: quantity ? +quantity : null,
          unit: unit ? unit : '',
          description: description ? description : '',
        };
      });
    console.log(ingredients);
    const recipe = {
      title: uploadData.title,
      source_url: uploadData.sourceUrl,
      image_url: uploadData.image,
      publisher: uploadData.publisher,
      cooking_time: uploadData.cookingTime,
      servings: uploadData.servings,
      ingredients,
    };
    const respData = await AJAX(`${API_URL}?key=${API_KEY}`, recipe);
    state.recipe = createRecipe(respData);
    addBookmark(state.recipe);

    console.log(state.recipe);
  } catch (e) {
    throw e;
  }
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();
