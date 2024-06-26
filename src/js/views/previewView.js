import View from './View.js';
import icons from 'url:../../img/icons.svg';

export default class PreviewView extends View {
  constructor() {
    super();
  }

  _generateMarkup(data) {
    return data.map(this._generateSingleMarkup).join('');
  }
  _generateSingleMarkup(recipe) {
    const id = window.location.hash.slice(1);
    return `
        <li class="preview">
            <a class="preview__link ${
              id === recipe.id ? 'preview__link--active' : ''
            }" href="#${recipe.id}">
                <figure class="preview__fig">
                <img src="${recipe.image}" alt="${recipe.title}" />
                </figure>
                <div class="preview__data">
                <h4 class="preview__title">${recipe.title.slice(0, 24)} ...</h4>
                <p class="preview__publisher">${recipe.publisher}</p>
                <div class="preview__user-generated ${
                  recipe.key ? '' : 'hidden'
                }">
                  <svg>
                    <use href="${icons}#icon-user"></use>
                  </svg>
                </div>
                </div>
            </a>
        </li>
        `;
  }
}

// export default new PreviewView();
