import icons from 'url:../../img/icons.svg';
// import { fracty } from '/fracty';
import View from './View.js';
import fracty from 'fracty';

class RcipeView extends View {
  constructor() {
    super();
    this._parentElement = document.querySelector('.recipe');
    this._errorMessage =
      'Start by searching for a recipe or an ingredient. Have fun!';
  }

  addHandlerRender(hanlder) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, hanlder));
  }

  addHandlerUpdateServings(hanlder) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--tiny');
      if (!btn) return;
      const updateTo = +btn.dataset.updateTo;

      if (updateTo > 0) hanlder(updateTo);
    });
  }

  addHandlerBookmarks(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;
      handler();
    });
  }

  _generateMarkup(recipe) {
    if (window.location.href === '') throw new Error(this._errorMessage);
    return `
      <figure class="recipe__fig">
          <img src="${recipe.image}" alt="${
      recipe.title
    }" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${recipe.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              recipe.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              recipe.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--update-servings" data-update-to="${
                recipe.servings - 1
              }">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--update-servings" data-update-to="${
                recipe.servings + 1
              }">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated ${recipe.key ? '' : 'hidden'}">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round btn--bookmark">
            <svg class="">
              <use href="${icons}#icon-bookmark${
      recipe.bookmarked ? '-fill' : ''
    }"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
            ${recipe.ingredients.map(this._generateIngredientMarkup).join('\n')}
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              recipe.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${recipe.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
    `;
  }
  _generateIngredientMarkup(ingredient) {
    ingredient.quantity = Number(ingredient.quantity?.toFixed(4));
    return `
        <li class="recipe__ingredient">
            <svg class="recipe__icon">
            <use href="${icons}#icon-check"></use>
            </svg>
            <div class="recipe__quantity">${
              ingredient.quantity ? fracty(ingredient.quantity).toString() : ''
            }</div>
            <div class="recipe__description">
            <span class="recipe__unit">${ingredient.unit}</span>
            ${ingredient.description}
            </div>
        </li>`;
  }
}

export default new RcipeView();
