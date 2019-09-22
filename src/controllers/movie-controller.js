import FilmCard from '../components/film-card';
import DetailsPopup from '../components/details-popup';
import CommentController from './comment-controller';
import {render} from '../utils';
import {AUTHORIZATION, SERVER, ActionType} from '../constants';
import API from '../api';

class MovieController {
  constructor(container, dataFilm, popupContainer, onDataChangeMain, onChangeView) {
    this._container = container;
    this._dataFilm = dataFilm;
    this._popupContainer = popupContainer;
    this._onDataChangeMain = onDataChangeMain;
    this._onChangeView = onChangeView;
    this._filmCard = new FilmCard(this._dataFilm);
    this._detailsPopup = new DetailsPopup(this._dataFilm);
    this._api = new API({authorization: AUTHORIZATION, server: SERVER});
    this._commentController = new CommentController(this._detailsPopup, this._dataFilm, this.getState, this._onDataChangeMain, this._queryAddComment.bind(this), this._queryDeleteComment.bind(this));
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
      personalRating: formData.get(`score`),
    };
  }

  setDefaultView() {
    if (this._popupContainer.getElement().childNodes.length) {
      this._hideDetailsPopup();
    }
  }

  _hideDetailsPopup() {
    this._popupContainer.getElement().innerHTML = ``;
  }

  _renderCommentsBlock() {
    this._api.getMovieComments({movieId: this._dataFilm.id}).then((comments) => {
      this._commentController.show(comments);
    });
  }

  _queryAddComment() {
    this._api.getMovieComments({movieId: this._dataFilm.id}).then((comments) => {
      this._commentController.enabledCommentTextarea();
      this._commentController.hide();
      this._commentController.show(comments);
    }).catch(() => {
      this._commentController.viewErrorComponent();
      this._commentController.shakeErrorComponent();
      this._commentController.enabledCommentTextarea();
    });
  }

  _queryDeleteComment() {
    this._api.getMovieComments({movieId: this._dataFilm.id}).then((comments) => {
      this._commentController.hide();
      this._commentController.show(comments);
    });
  }

  init() {
    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        const newState = Object.assign(this.getState(), {isFilmDetails: !this._dataFilm.isFilmDetails});
        this._hideDetailsPopup();
        this._onDataChangeMain(ActionType.UPDATE, Object.assign(this._dataFilm, newState));

        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    this._filmCard.getElement()
    .querySelector(`.film-card__poster`)
    .addEventListener(`click`, () => {
      this._onChangeView();
      const newState = Object.assign(this.getState(), {isFilmDetails: !this._dataFilm.isFilmDetails});
      this._renderCommentsBlock();
      render(this._popupContainer.getElement(), this._detailsPopup.getElement());
      this._onDataChangeMain(ActionType.UPDATE, Object.assign(this._dataFilm, newState));

      document.addEventListener(`keydown`, onEscKeyDown);
    });

    this._filmCard.getElement()
      .querySelector(`.film-card__title`)
      .addEventListener(`click`, () => {
        this._onChangeView();
        const newState = Object.assign(this.getState(), {isFilmDetails: !this._dataFilm.isFilmDetails});

        this._renderCommentsBlock();
        render(this._popupContainer.getElement(), this._detailsPopup.getElement());
        this._onDataChangeMain(ActionType.UPDATE, Object.assign(this._dataFilm, newState));

        document.addEventListener(`keydown`, onEscKeyDown);
      });

    this._filmCard.getElement()
      .querySelector(`.film-card__comments`)
      .addEventListener(`click`, () => {
        this._onChangeView();
        const newState = Object.assign(this.getState(), {isFilmDetails: !this._dataFilm.isFilmDetails});

        this._renderCommentsBlock();
        render(this._popupContainer.getElement(), this._detailsPopup.getElement());
        this._onDataChangeMain(ActionType.UPDATE, Object.assign(this._dataFilm, newState));

        document.addEventListener(`keydown`, onEscKeyDown);
      });

    this._filmCard.getElement()
      .querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        const newState = Object.assign(this.getState(), {isWatchlist: !this._dataFilm.isWatchlist});
        this._onDataChangeMain(ActionType.UPDATE, Object.assign(this._dataFilm, newState));
      });

    this._filmCard.getElement()
      .querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        const isViewed = !this._dataFilm.isViewed;
        if (isViewed === false) {
          this._detailsPopup.getElement().querySelectorAll(`.film-details__user-rating-input`).forEach((elem) => {
            elem.checked = false;
          });
        }
        const newState = Object.assign(this.getState(), {isViewed});
        const newData = Object.assign(this._dataFilm, {personalRating: null});
        this._onDataChangeMain(ActionType.UPDATE, Object.assign(newData, newState));
      });

    this._filmCard.getElement()
      .querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        const newState = Object.assign(this.getState(), {isFavorite: !this._dataFilm.isFavorite});
        this._onDataChangeMain(ActionType.UPDATE, Object.assign(this._dataFilm, newState));
      });

    this._detailsPopup.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, () => {
        const newState = Object.assign(this.getState(), {isFilmDetails: !this._dataFilm.isFilmDetails});
        this._hideDetailsPopup();
        this._onDataChangeMain(ActionType.UPDATE, Object.assign(this._dataFilm, newState));
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    this._detailsPopup.getElement().querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, () => {
        const newState = Object.assign(this.getState(), {isWatchlist: !this._dataFilm.isWatchlist});
        this._onDataChangeMain(ActionType.UPDATE, Object.assign(this._dataFilm, newState));
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
        const newData = Object.assign(this._dataFilm, {personalRating: null});
        this._detailsPopup.getElement().querySelector(`.form-details__middle-container`).classList.toggle(`visually-hidden`);
        this._onDataChangeMain(ActionType.UPDATE, Object.assign(newData, newState));
      });

    this._detailsPopup.getElement().querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, () => {
        const newState = Object.assign(this.getState(), {isFavorite: !this._dataFilm.isFavorite});
        this._onDataChangeMain(ActionType.UPDATE, Object.assign(this._dataFilm, newState));
      });

    this._detailsPopup.getElement().querySelectorAll(`.film-details__user-rating-input`).forEach((elem) => {
      elem.addEventListener(`click`, () => {
        const newData = Object.assign(this._dataFilm, this.getFormData());
        this._onDataChangeMain(ActionType.UPDATE, Object.assign(newData, this.getState()));
      });
    });

    if (this._detailsPopup.getElement().querySelector(`.film-details__watched-reset`) !== null) {
      this._detailsPopup.getElement().querySelector(`.film-details__watched-reset`)
      .addEventListener(`click`, () => {
        this._detailsPopup.getElement().querySelectorAll(`.film-details__user-rating-input`).forEach((elem) => {
          elem.checked = false;
        });
        const newData = Object.assign(this._dataFilm, {personalRating: null});
        this._onDataChangeMain(ActionType.UPDATE, Object.assign(newData, this.getState()));
      });
    }

    render(this._container.getElement().querySelector(`.films-list__container`), this._filmCard.getElement());
  }
}

export default MovieController;
