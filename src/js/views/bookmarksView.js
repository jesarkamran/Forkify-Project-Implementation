import View from './View.js';
import PreviewView from './previewView.js';

class BookmarksView extends PreviewView {
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
  constructor() {
    super();
    this._parentElement = document.querySelector('.bookmarks__list');
  }

  generateMarkup(data) {
    if (this.isEmpty(data)) return this.renderError(this._errorMessage);
    console.log(data);
    return data.map(this._generateSingleMarkup).join('');
  }

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
}

export default new BookmarksView();
