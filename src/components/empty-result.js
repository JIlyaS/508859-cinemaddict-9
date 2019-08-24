import {createElement} from '../utils';

class EmptyResult {
  constructor() {
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getTemplate() {
    return `<div class="no-result">
        There is no movies for your request.
      </div>`;
  }
}

export default EmptyResult;
