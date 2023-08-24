import View from './View.js';
import PreviewView from './previewView.js';

class ResultsView extends PreviewView {
  constructor() {
    super();
    this._parentElement = document.querySelector('.results');
  }
}

export default new ResultsView();
