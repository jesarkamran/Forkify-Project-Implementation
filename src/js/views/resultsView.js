import View from './View.js';
import PreviewView from './previewView.js';

class ResultsView extends PreviewView {
  constructor() {
    super();
    this._parentElement = document.querySelector('.results');
    this._errorMessage = 'No Results Were Found for your query :)';
  }
}

export default new ResultsView();
