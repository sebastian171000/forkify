class SearchView {
  _parentElement = document.querySelector('.search');
  getQuery() {
    return this._parentElement.querySelector('.search__field').value;
  }
  clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }
  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', e => {
      e.preventDefault();
      handler();
      this.clearInput();
    });
  }
}
export default new SearchView();
