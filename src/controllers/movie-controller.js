import FilmCard from '../components/film-card';
import DetailsPopup from '../components/details-popup';
import {render, unrender, getRandomValue} from '../utils';
import {COMMENT_AUTHORS, MINUS_INDEX, COMMENT_DAY, Position} from '../constants';

class MovieController {
  constructor(container, dataFilm, onDataChange, onChangeView) {
    this._container = container;
    this._dataFilm = dataFilm;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this._popupContainer = document.querySelector(`.footer`);
    this._filmCard = new FilmCard(this._dataFilm);
    this._detailsPopup = new DetailsPopup(this._dataFilm);
  }

  getState() {
    return {
      isWatchlist: this._dataFilm.isWatchlist,
      isViewed: this._dataFilm.isViewed,
      isFavorite: this._dataFilm.isFavorite,
      isFilmDetails: false
    };
  }

  getFormData() {
    const formData = new FormData(this._detailsPopup.getElement().querySelector(`.film-details__inner`));
    return {
      comment: {
        emoji: formData.get(`comment-emoji`) !== null ? formData.get(`comment-emoji`) : `smile`,
        description: formData.get(`comment`),
        author: COMMENT_AUTHORS[getRandomValue(COMMENT_AUTHORS.length - MINUS_INDEX)],
        dayComment: COMMENT_DAY[getRandomValue(COMMENT_DAY.length - MINUS_INDEX)]
      },
      score: formData.get(`score`),
    };
  }

  setDefaultView() {
    if (this._container.getElement().contains(this._detailsPopup.getElement())) {
      this._container.getElement().replaceChild(this._filmCard.getElement(), this._detailsPopup.getElement());
    }
  }

  init() {
    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this._filmsList.removeElement();
        const newState = Object.assign(this.getState(), {isFilmDetails: !this._dataFilm.isFilmDetails});
        const data = Object.assign(this._dataFilm, newState);
        this._onDataChange(data, this._dataFilm);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const onAddComment = (evt) => {
      if (evt.ctrlKey && evt.keyCode === 13) {
        const formData = this.getFormData();
        this._dataFilm.comments.push(formData.comment);
        const data = Object.assign(this._dataFilm, this.getState());
        this._onDataChange(data, this._dataFilm);

        unrender(this._detailsPopup.getElement());
        this._detailsPopup.removeElement();
        render(this._popupContainer, this._detailsPopup.getElement(), Position.AFTEREND);
      }
    };

    this._filmCard.getElement()
    .querySelector(`.film-card__poster`)
    .addEventListener(`click`, () => {
      this._onChangeView();
      render(this._popupContainer, this._detailsPopup.getElement(), Position.AFTEREND);
      const newState = Object.assign(this.getState(), {isFilmDetails: !this._dataFilm.isFilmDetails});
      const data = Object.assign(this._dataFilm, newState);
      this._onDataChange(data, this._dataFilm);
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    this._filmCard.getElement()
      .querySelector(`.film-card__title`)
      .addEventListener(`click`, () => {
        this._onChangeView();
        render(this._popupContainer, this._detailsPopup.getElement(), Position.AFTEREND);
        const newState = Object.assign(this.getState(), {isFilmDetails: !this._dataFilm.isFilmDetails});
        const data = Object.assign(this._dataFilm, newState);
        this._onDataChange(data, this._dataFilm);
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    this._filmCard.getElement()
      .querySelector(`.film-card__comments`)
      .addEventListener(`click`, () => {
        this._onChangeView();
        render(this._popupContainer, this._detailsPopup.getElement(), Position.AFTEREND);
        const newState = Object.assign(this.getState(), {isFilmDetails: !this._dataFilm.isFilmDetails});
        const data = Object.assign(this._dataFilm, newState);
        this._onDataChange(data, this._dataFilm);
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    this._filmCard.getElement()
      .querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        const newState = Object.assign(this.getState(), {isWatchlist: !this._dataFilm.isWatchlist});
        const data = Object.assign(this._dataFilm, newState);
        this._onDataChange(data, this._dataFilm);
      });

    this._filmCard.getElement()
      .querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        const newState = Object.assign(this.getState(), {isViewed: !this._dataFilm.isViewed});
        const data = Object.assign(this._dataFilm, newState);
        this._onDataChange(data, this._dataFilm);
      });

    this._filmCard.getElement()
      .querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        const newState = Object.assign(this.getState(), {isFavorite: !this._dataFilm.isFavorite});
        const data = Object.assign(this._dataFilm, newState);
        this._onDataChange(data, this._dataFilm);
      });

    this._detailsPopup.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, () => {
        unrender(this._detailsPopup.getElement());
        this._detailsPopup.removeElement();

        const newState = Object.assign(this.getState(), {isFilmDetails: !this._dataFilm.isFilmDetails});
        const data = Object.assign(this._dataFilm, newState);
        this._onDataChange(data, this._dataFilm);
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    this._detailsPopup.getElement().querySelector(`.film-details__comment-input`)
      .addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    this._detailsPopup.getElement().querySelector(`.film-details__comment-input`)
      .addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    this._detailsPopup.getElement().querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, () => {

        const newState = Object.assign(this.getState(), {isWatchlist: !this._dataFilm.isWatchlist});
        const data = Object.assign(this._dataFilm, newState);
        this._onDataChange(data, this._dataFilm);
      });

    this._detailsPopup.getElement().querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, () => {
        const isViewed = !this._dataFilm.isViewed;

        const newState = Object.assign(this.getState(), {isViewed});
        const data = Object.assign(this._dataFilm, newState);
        this._onDataChange(data, this._dataFilm);

        unrender(this._detailsPopup.getElement());
        render(this._popupContainer, this._detailsPopup.getElement(), Position.AFTEREND);
      });

    this._detailsPopup.getElement().querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, () => {
        const newState = Object.assign(this.getState(), {isFavorite: !this._dataFilm.isFavorite});
        const data = Object.assign(this._dataFilm, newState);
        this._onDataChange(data, this._dataFilm);
      });

    this._detailsPopup.getElement().querySelector(`.film-details__comment-input`)
      .addEventListener(`focus`, () => {
        document.addEventListener(`keydown`, onAddComment);
      });

    this._detailsPopup.getElement().querySelector(`.film-details__comment-input`)
      .addEventListener(`blur`, () => {
        document.removeEventListener(`keydown`, onAddComment);
      });

    this._detailsPopup.getElement().querySelectorAll(`.film-details__emoji-item`).forEach((elem) => {
      elem.addEventListener(`click`, (evt) => {
        document.querySelector(`.film-details__add-emoji-label`).innerHTML = `<img src="images/emoji/${evt.target.value}.png" width="55" height="55" alt="emoji">`;
      });
    });

    this._detailsPopup.getElement().querySelectorAll(`.film-details__user-rating-input`).forEach((elem) => {
      elem.addEventListener(`click`, () => {
      });
    });

    if (this._detailsPopup.getElement().querySelector(`.film-details__watched-reset`) !== null) {
      this._detailsPopup.getElement().querySelector(`.film-details__watched-reset`)
      .addEventListener(`click`, () => {
        this._detailsPopup.getElement().querySelectorAll(`.film-details__user-rating-input`).forEach((elem) => {
          elem.checked = false;
        });
        const formData = this.getFormData();
        const newState = Object.assign(this.getState(), formData);
        const data = Object.assign(this._dataFilm, newState);
        this._onDataChange(data, this._dataFilm);
      });
    }

    render(this._container.getElement().querySelector(`.films-list__container`), this._filmCard.getElement());
  }
}

export default MovieController;
