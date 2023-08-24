import View from './View.js';

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
                </div>
            </a>
        </li>
        `;

    return `
        <li class="preview">
            <a class="preview__link ${
              id === recipe.id ? 'preview__link--active' : ''
            }" href="#${recipe.id}">
                <figure class="preview__fig">
                <img src="${recipe.image}" alt="${recipe.title}" />
                </figure>
                <div class="preview__data">
                <h4 class="preview__name">
                    ${recipe.title.slice(0, 44)} ...
                </h4>
                <p class="preview__publisher">${recipe.publisher}</p>
                </div>
            </a>
        </li>
        `;
  }
}

// export default new PreviewView();
