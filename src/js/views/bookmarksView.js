import PreviewView from './previewView.js';

class BookmarksView extends PreviewView {
  constructor() {
    super();
    this._parentElement = document.querySelector('.bookmarks__list');
    this._errorMessage =
      'No bookmarks yet. Find a nice recipe and bookmark it :)';
  }

  generateMarkup(data) {
    if (this.isEmpty(data)) return this.renderError(this._errorMessage);
    return data.map(this._generateSingleMarkup).join('');
  }

  addHandlerRender(handlerWindow) {
    window.addEventListener('load', handlerWindow);
  }
}

export default new BookmarksView();
