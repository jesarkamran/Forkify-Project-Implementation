import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  constructor() {
    super();
    this._parentElement = document.querySelector('.pagination');
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const target = e.target.closest('.btn--inline');
      const gotoPage = Number(target.dataset.goto);
      handler(gotoPage);
    });
  }

  _generateMarkup(data) {
    console.log(data);
    const prev = data.curr - 1;
    const next = data.curr + 1;

    if (data.curr === data.max) {
      return this._prevButton(prev);
    }
    return this._defaultMarkup({ prev: prev, next: next });
  }
  _defaultMarkup(data) {
    return `
        ${this._prevButton(data.prev)}
        <button data-goto="${
          data.next
        }" class="btn--inline pagination__btn--next">
        <span>Page ${data.next}</span>
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
        </svg>
        </button>
        `;
  }
  _prevButton(prev) {
    if (!prev) return '';
    return `
            <button data-goto="${prev}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${prev}</span>
            </button>

        `;
  }
}

export default new PaginationView();
