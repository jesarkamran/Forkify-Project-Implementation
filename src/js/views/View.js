import icons from 'url:../../img/icons.svg';

export default class View {
  _parentElement;
  _errorMessage;
  _successMessage;

  _data;

  _clear() {
    this._parentElement.innerHTML = '';
  }

  render(data) {
    if (this.isEmpty(data)) return this.renderError(this._errorMessage);
    this._data = data;
    this._clear();
    const markup = this._generateMarkup(this._data);
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  updateDOM(data) {
    this._data = data;
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

  isEmpty(data) {
    if (typeof data === 'object' && !data) return true;
    if (data.length === 0) return true;

    return false;
  }

  getErrorMessage() {
    return this._errorMessage;
  }
}
