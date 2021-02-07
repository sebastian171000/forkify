import icons from 'url:../../img/icons.svg';
import View from './View';
class addRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded 😁';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }
  _toggleWindow(el = window) {
    el.addEventListener('click', () => {
      this._overlay.classList.toggle('hidden');
      this._window.classList.toggle('hidden');
    });
  }
  _addHandlerShowWindow() {
    this._toggleWindow(this._btnOpen);
  }
  _addHandlerHideWindow() {
    this._toggleWindow(this._btnClose);
  }
  addHanlderUpload(handler) {
    this._parentElement.addEventListener('submit', e => {
      e.preventDefault();
      const dataArr = [...new FormData(this._parentElement)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
  _generateMarkUp() {}
}
export default new addRecipeView();
