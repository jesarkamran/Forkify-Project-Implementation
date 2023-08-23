import View from './View.js';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  constructor() {
    super();
    this._parentElement = document.querySelector('.results');
  }

  _generateMarkup(recipes) {
    return recipes.map(this._generateSingleMarkup).join('');
  }
  _generateSingleMarkup(recipe) {
    return `
        <li class="preview">
            <a class="preview__link" href="#${recipe.id}">
                <figure class="preview__fig">
                <img src="${recipe.image}" alt="${recipe.title}" />
                </figure>
                <div class="preview__data">
                <h4 class="preview__title">${recipe.title.slice(0, 24)} ...</h4>
                <p class="preview__publisher">${recipe.publisher}</p>
                </div>
            </a>
        </li>
        `;
  }
}

export default new ResultsView();
