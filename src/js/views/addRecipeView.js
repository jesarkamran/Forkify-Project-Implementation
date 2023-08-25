import View from './View.js';

class AddRecipeView extends View {
  _overlay;
  _window;
  _btnOpen;
  _btnClose;
  constructor() {
    super();
    this._errorMessage = 'InValid Data Entered!';
    this._parentElement = document.querySelector('.upload');
    this._overlay = document.querySelector('.overlay');
    this._window = document.querySelector('.add-recipe-window');
    this._btnOpen = document.querySelector('.nav__btn--add-recipe');
    this._btnClose = document.querySelector('.btn--close-modal');
    this.addHandlerShowWindow();
    this.addHandlerHideWindow();
  }
  handler() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }
  addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.handler.bind(this));
  }

  addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.handler.bind(this));
    this._overlay.addEventListener('click', this.handler.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const data = [...new FormData(this)];
      const dataObj = Object.fromEntries(data);
      handler(dataObj);
    });
  }

  generateMarkup(data) {}
}

export default new AddRecipeView();
