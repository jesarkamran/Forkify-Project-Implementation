class SearchView {
  #parentElement = document.querySelector('.search');
  getQuery() {
    const query = this.#parentElement.querySelector('.search__field').value;
    this.#clearInput();
    return query;
  }

  #clearInput() {
    this.#parentElement.querySelector('.search__field').value = '';
  }

  addHandlerSearch(hanlder) {
    this.#parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      hanlder();
    });
  }
}

export default new SearchView();
