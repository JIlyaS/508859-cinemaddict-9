import AbstractComponent from './abstract-component';

class SearchNoResult extends AbstractComponent {
  getTemplate() {
    return `<div class="no-result">There is no movies for your request.</div>`;
  }
}

export default SearchNoResult;
