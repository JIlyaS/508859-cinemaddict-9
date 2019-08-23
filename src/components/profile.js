import {createElement} from '../utils';

class Profile {
  constructor(rang) {
    this._rang = rang;
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
    return `<section class="header__profile profile">
        <p class="profile__rating">${this._rang}</p>
        <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      </section>`;
  }
}

export default Profile;
