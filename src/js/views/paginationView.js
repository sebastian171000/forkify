import icons from 'url:../../img/icons.svg';
import View from './View';
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  handlerButtonClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const button = e.target.closest('button');
      if (!button) return;
      handler(button.getAttribute('data-side'));
    });
  }
  showPagination(leftButtonValue, rightButtonValue) {
    this._clear();
    if (leftButtonValue)
      this._parentElement.insertAdjacentHTML(
        'afterbegin',
        this.buttonMarkUp(leftButtonValue, 'left')
      );
    if (rightButtonValue)
      this._parentElement.insertAdjacentHTML(
        'afterbegin',
        this.buttonMarkUp(rightButtonValue, 'right')
      );
  }
  buttonMarkUp(num, side) {
    return `<button class="btn--inline pagination__btn--${
      side === 'left' ? 'prev' : 'next'
    }" data-side="${side}">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-${side}"></use>
    </svg>
    <span>Page ${num}</span>
  </button>`;
  }
}
export default new PaginationView();
