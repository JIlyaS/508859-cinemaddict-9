import FilmCard from '../components/film-card';
import DetailsPopup from '../components/details-popup';
import {render, unrender} from '../utils';
import {Position} from '../constants';

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
      isFavorite: this._dataFilm.isFavorite
    };
  }

  init() {
    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        unrender(this._detailsPopup.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    this._filmCard.getElement()
    .querySelector(`.film-card__poster`)
    .addEventListener(`click`, () => {
      render(this._popupContainer, this._detailsPopup.getElement(), Position.AFTEREND);
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    this._filmCard.getElement()
      .querySelector(`.film-card__title`)
      .addEventListener(`click`, () => {
        render(this._popupContainer, this._detailsPopup.getElement(), Position.AFTEREND);
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    this._filmCard.getElement()
      .querySelector(`.film-card__comments`)
      .addEventListener(`click`, () => {
        render(this._popupContainer, this._detailsPopup.getElement(), Position.AFTEREND);
        document.addEventListener(`keydown`, onEscKeyDown);
      });
    this._filmCard.getElement()
      .querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        const newState = Object.assign({}, this.getState(), {isWatchlist: !this._dataFilm.isWatchlist});
        const data = Object.assign({}, this._dataFilm, newState);
        this._onDataChange(data, this._dataFilm);
      });

    this._detailsPopup.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, () => {
        unrender(this._detailsPopup.getElement());
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

    render(this._container.getElement().querySelector(`.films-list__container`), this._filmCard.getElement());
  }
}

export default MovieController;
