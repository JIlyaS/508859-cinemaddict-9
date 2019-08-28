import FilmsWrapper from '../components/films-wrapper';
import FilmsList from '../components/films-list';
import RatedList from '../components/rated-list';
import CommentedList from '../components/commented-list';
import FilmCard from '../components/film-card';
import ShowButton from '../components/show-button';
import DetailsPopup from '../components/details-popup';
import EmptyResult from '../components/empty-result';
import Menu from '../components/menu';
import Sort from '../components/sort';
import {render, unrender} from '../utils';
import {MORE_RATED, MORE_COMMENTED, COUNT_FILM_CARDS, ADD_MORE_CARD, COUNT_FILMS, NAME_FILTERS, Position, Sorted} from '../constants';
import {getDataFilmCard, getDataFilter} from '../components/data';

class PageController {
  constructor(container, popupContainer, filmCards) {
    this._container = container;
    this._popupContainer = popupContainer;
    this._filmCards = filmCards;
    this._dataRatedFilms = (this._filmCards.filter((film) => film.rating > MORE_RATED)).slice(0, 2);
    this._dataCommentedFilms = (this._filmCards.filter((film) => film.countComments >= MORE_COMMENTED)).slice(0, 2);
    this._dataFilters = NAME_FILTERS.map((filter) => getDataFilter(filter, filmCards));
    this._menu = new Menu(this._dataFilters);
    this._sortBlock = new Sort();
    this._filmsWrapper = new FilmsWrapper();
    this._filmsList = new FilmsList();
    this._ratedList = new RatedList();
    this._commentedList = new CommentedList();
  }

  init() {
    render(this._container, this._menu.getElement());
    this._renderSort();
    render(this._container, this._filmsWrapper.getElement());
    render(this._filmsWrapper.getElement(), this._filmsList.getElement());
    render(this._filmsWrapper.getElement(), this._ratedList.getElement());
    render(this._filmsWrapper.getElement(), this._commentedList.getElement());

    if (COUNT_FILMS > this._filmCards.length) {
      this._renderShowButton();
    }

    if (this._filmCards.length === 0) {
      return this._renderEmptyResult();
    }

    this._filmCards.forEach((film) => this._renderFilmsCard(film, this._filmsList));
    this._dataRatedFilms.forEach((film) => this._renderFilmsCard(film, this._ratedList));
    return this._dataCommentedFilms.forEach((film) => this._renderFilmsCard(film, this._commentedList));
  }

  _renderFilmsCard(film, container) {
    const filmCard = new FilmCard(film);
    const detailsPopup = new DetailsPopup(film);

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        unrender(detailsPopup.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    filmCard.getElement()
    .querySelector(`.film-card__poster`)
    .addEventListener(`click`, () => {
      render(this._popupContainer, detailsPopup.getElement(), Position.AFTEREND);
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    filmCard.getElement()
      .querySelector(`.film-card__title`)
      .addEventListener(`click`, () => {
        render(this._popupContainer, detailsPopup.getElement(), Position.AFTEREND);
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    filmCard.getElement()
      .querySelector(`.film-card__comments`)
      .addEventListener(`click`, () => {
        render(this._popupContainer, detailsPopup.getElement(), Position.AFTEREND);
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    detailsPopup.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, () => {
        unrender(detailsPopup.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    detailsPopup.getElement().querySelector(`.film-details__comment-input`)
      .addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    detailsPopup.getElement().querySelector(`.film-details__comment-input`)
      .addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    render(container.getElement().querySelector(`.films-list__container`), filmCard.getElement());
  }

  _renderShowButton() {
    const showButton = new ShowButton();
    let countFilmCards = COUNT_FILM_CARDS;
    let newCountFilm = ADD_MORE_CARD;
    showButton.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      countFilmCards += ADD_MORE_CARD;

      if (COUNT_FILMS < countFilmCards) {
        newCountFilm = COUNT_FILMS - (countFilmCards - ADD_MORE_CARD);
        countFilmCards = newCountFilm + countFilmCards + ADD_MORE_CARD;
        evt.target.classList.add(`visually-hidden`);
      }

      const newFilmCards = new Array(newCountFilm).fill().map(() => getDataFilmCard());
      newFilmCards.forEach((film) => this._renderFilmsCard(film, this._filmsList));
      this._filmCards.push(...newFilmCards);
    });
    render(this._filmsList.getElement(), showButton.getElement());
  }

  _renderEmptyResult() {
    const emptyResult = new EmptyResult();
    this._filmsWrapper.getElement().innerHTML = ``;
    render(this._filmsWrapper.getElement(), emptyResult.getElement());
  }

  _renderSort() {
    this._sortBlock.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortButtons = this._sortBlock.getElement().querySelectorAll(`.sort__button`);
      sortButtons.forEach((sortButton) => {
        sortButton.classList.remove(`sort__button--active`);
      });
      evt.target.classList.add(`sort__button--active`);

      this._filmsList.getElement().querySelector(`.films-list__container`).innerHTML = ``;

      switch (evt.target.dataset.sortType) {
        case Sorted.DATE:
          const sortedByDateUpFilms = this._filmCards.slice().sort((a, b) => a.year - b.year);
          sortedByDateUpFilms.forEach((filmCard) => this._renderFilmsCard(filmCard, this._filmsList));
          break;
        case Sorted.RATING:
          const sortedByRatingsFilms = this._filmCards.slice().sort((a, b) => b.rating - a.rating);
          sortedByRatingsFilms.forEach((filmCard) => this._renderFilmsCard(filmCard, this._filmsList));
          break;
        case Sorted.DEFAULT:
          this._filmCards.forEach((filmCard) => this._renderFilmsCard(filmCard, this._filmsList));
          break;
        default:
          throw new Error(`Incorrect dataset`);
      }

    });
    render(this._container, this._sortBlock.getElement());
  }

}

export default PageController;
