import View from './View.js';
import PreviewView from './previewView.js';

class BookmarksView extends PreviewView {
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
  constructor() {
    super();
    this._parentElement = document.querySelector('.bookmarks__list');
  }
}

export default new BookmarksView();
