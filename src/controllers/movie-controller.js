import FilmCard from '../components/film-card';
import DetailsPopup from '../components/details-popup';
import CommentController from './comment-controller';
import {render, unrender} from '../utils';
import {Position} from '../constants';

class MovieController {
  constructor(container, dataFilm, popupContainer, onDataChange, onChangeView) {
    this._container = container;
    this._dataFilm = dataFilm;
    this._popupContainer = popupContainer;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this._filmCard = new FilmCard(this._dataFilm);
    this._detailsPopup = new DetailsPopup(this._dataFilm);
    this._containerComments = this._detailsPopup.getElement().querySelector(`.form-details__bottom-container`);
  }

  getState() {
    return {
      isWatchlist: this._dataFilm.isWatchlist,
      isViewed: this._dataFilm.isViewed,
      isFavorite: this._dataFilm.isFavorite,
      isFilmDetails: this._dataFilm.isFilmDetails
    };
  }

  getFormData() {
    const formData = new FormData(this._detailsPopup.getElement().querySelector(`.film-details__inner`));
    return {
      personalScore: formData.get(`score`),
    };
  }

  setDefaultView() {
    if (this._popupContainer.getElement().contains(this._detailsPopup.getElement())) {
      unrender(this._detailsPopup.getElement());
      this._detailsPopup.removeElement();
    }
  }

  _renderCommentsBlock() {
    const commentController = new CommentController(this._containerComments, this._dataFilm, this._detailsPopup, this.getState, this._onDataChange);
    commentController.init();
  }

  init() {
    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        const newState = Object.assign(this.getState(), {isFilmDetails: !this._dataFilm.isFilmDetails});
        const data = Object.assign(this._dataFilm, newState);
        this._onDataChange(data, this._dataFilm);

        unrender(this._detailsPopup.getElement());
        this._detailsPopup.removeElement();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    this._filmCard.getElement()
    .querySelector(`.film-card__poster`)
    .addEventListener(`click`, () => {
      this._onChangeView();
      const newState = Object.assign(this.getState(), {isFilmDetails: !this._dataFilm.isFilmDetails});
      const data = Object.assign(this._dataFilm, newState);
      this._onDataChange(data, this._dataFilm);
      render(this._popupContainer.getElement(), this._detailsPopup.getElement(), Position.AFTEREND);
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    this._filmCard.getElement()
      .querySelector(`.film-card__title`)
      .addEventListener(`click`, () => {
        this._onChangeView();
        const newState = Object.assign(this.getState(), {isFilmDetails: !this._dataFilm.isFilmDetails});
        const data = Object.assign(this._dataFilm, newState);
        this._onDataChange(data, this._dataFilm);
        render(this._popupContainer.getElement(), this._detailsPopup.getElement(), Position.AFTEREND);
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    this._filmCard.getElement()
      .querySelector(`.film-card__comments`)
      .addEventListener(`click`, () => {
        this._onChangeView();
        const newState = Object.assign(this.getState(), {isFilmDetails: !this._dataFilm.isFilmDetails});
        const data = Object.assign(this._dataFilm, newState);
        this._onDataChange(data, this._dataFilm);
        render(this._popupContainer.getElement(), this._detailsPopup.getElement(), Position.AFTEREND);
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
        const newData = Object.assign(this._dataFilm, {personalScore: null});
        const data = Object.assign(newData, newState);
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
        const newState = Object.assign(this.getState(), {isFilmDetails: !this._dataFilm.isFilmDetails});
        const data = Object.assign(this._dataFilm, newState);
        this._onDataChange(data, this._dataFilm);
        document.removeEventListener(`keydown`, onEscKeyDown);
        unrender(this._detailsPopup.getElement());
        this._detailsPopup.removeElement();
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
        if (isViewed === false) {
          this._detailsPopup.getElement().querySelectorAll(`.film-details__user-rating-input`).forEach((elem) => {
            elem.checked = false;
          });
        }
        const newState = Object.assign(this.getState(), {isViewed});
        const newData = Object.assign(this._dataFilm, {personalScore: null});
        const data = Object.assign(newData, newState);
        this._onDataChange(data, this._dataFilm);
        this._detailsPopup.getElement().querySelector(`.form-details__middle-container`).classList.toggle(`visually-hidden`);
      });

    this._detailsPopup.getElement().querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, () => {
        const newState = Object.assign(this.getState(), {isFavorite: !this._dataFilm.isFavorite});
        const data = Object.assign(this._dataFilm, newState);
        this._onDataChange(data, this._dataFilm);
      });

    this._detailsPopup.getElement().querySelectorAll(`.film-details__user-rating-input`).forEach((elem) => {
      elem.addEventListener(`click`, () => {
        const newData = Object.assign(this._dataFilm, this.getFormData());
        const data = Object.assign(newData, this.getState());
        this._onDataChange(data, this._dataFilm);
      });
    });

    if (this._detailsPopup.getElement().querySelector(`.film-details__watched-reset`) !== null) {
      this._detailsPopup.getElement().querySelector(`.film-details__watched-reset`)
      .addEventListener(`click`, () => {
        this._detailsPopup.getElement().querySelectorAll(`.film-details__user-rating-input`).forEach((elem) => {
          elem.checked = false;
        });
        const newData = Object.assign(this._dataFilm, {personalScore: null});
        const data = Object.assign(newData, this.getState());
        this._onDataChange(data, this._dataFilm);
      });
    }

    this._renderCommentsBlock();
    render(this._container.getElement().querySelector(`.films-list__container`), this._filmCard.getElement());
  }
}

export default MovieController;
