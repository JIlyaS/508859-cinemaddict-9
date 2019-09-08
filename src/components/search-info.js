import AbstractComponent from './abstract-component';

class SearchInfo extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<div class="result">
        <p class="result__text">Result <span class="result__count">1</span></p>
      </div>`;
  }
}

export default SearchInfo;
