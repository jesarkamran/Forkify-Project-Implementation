import icons from 'url:../../img/icons.svg';

export default class View {
  _parentElement;
  _errorMessage = 'No recipes found for your query.Please try again!';
  _successMessage;

  _data;

  _clear() {
    this._parentElement.innerHTML = '';
  }

  render(data) {
    this._data = data;
    this._clear();
    const markup = this._generateMarkup(this._data);
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  updateDOM(data) {
    this._data = data;
    console.log('  ');
    console.log(data);
    console.log('  ');
    const markup = this._generateMarkup(this._data);

    const newDOM = document.createRange().createContextualFragment(markup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const currEL = Array.from(this._parentElement.querySelectorAll('*'));
    newElements.forEach((newEl, i) => {
      let currElement = currEL[i];
      // console.log(currElement, newEl.isEqualNode(currElement));
      if (
        !newEl.isEqualNode(currElement) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        currElement.textContent = newEl.textContent;
      }

      if (!newEl.isEqualNode(currElement))
        Array.from(newEl.attributes).forEach(attri =>
          currElement.setAttribute(attri.name, attri.value)
        );
    });
    console.log('  ');
    console.log(this._data.servings);
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div> -->
  `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderError(message = this._errorMessage) {
    const markup = `
        <div class="error">
          <div>
            <svg>
              <use href="${icons}#icon-alert-triangle"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>;
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSuccess(message = this._successMessage) {
    const markup = `
        <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>;
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
