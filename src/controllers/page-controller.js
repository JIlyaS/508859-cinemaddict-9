import FilmsWrapper from '../components/films-wrapper';
import FilmsList from '../components/films-list';
import RatedList from '../components/rated-list';
import CommentedList from '../components/commented-list';
import ShowButton from '../components/show-button';
import EmptyResult from '../components/empty-result';
import Menu from '../components/menu';
import Sort from '../components/sort';
import MovieController from './movie-controller';
import PopupWrapper from '../components/popup-wrapper';
import {render, unrender} from '../utils';
import {MORE_RATED, MORE_COMMENTED, COUNT_FILM_CARDS, ADD_MORE_CARD, COUNT_FILMS, NAME_FILTERS, Position, Sorted} from '../constants';
import {getDataFilmCard, getDataFilter} from '../components/data';

class PageController {
  constructor(container, filmCards) {
    this._container = container;
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
    this._popupWrapper = new PopupWrapper();
    this._footer = document.querySelector(`.footer`);

    this._subscriptions = [];
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
  }

  init() {
    render(this._container, this._menu.getElement());
    this._renderSort();
    render(this._container, this._filmsWrapper.getElement());
    render(this._filmsWrapper.getElement(), this._filmsList.getElement());
    render(this._filmsWrapper.getElement(), this._ratedList.getElement());
    render(this._filmsWrapper.getElement(), this._commentedList.getElement());
    render(this._footer, this._popupWrapper.getElement(), Position.AFTEREND);

    if (COUNT_FILMS > this._filmCards.length) {
      this._renderShowButton();
    }

    if (this._filmCards.length === 0) {
      return this._renderEmptyResult();
    }

    this._filmCards.forEach((film) => this._renderFilmsCard(film, this._filmsList, this._popupWrapper));
    this._dataRatedFilms.forEach((film) => this._renderFilmsCard(film, this._ratedList, this._popupWrapper));
    return this._dataCommentedFilms.forEach((film) => this._renderFilmsCard(film, this._commentedList, this._popupWrapper));
  }

  _onChangeView() {
    this._subscriptions.forEach((subscription) => subscription());
  }

  _renderFilmsCard(film, container, popupContainer) {
    const movieController = new MovieController(container, film, popupContainer, this._onDataChange, this._onChangeView);
    movieController.init();
    this._subscriptions.push(movieController.setDefaultView.bind(movieController));
  }

  _onDataChange(newData, oldData) {
    this._filmCards[this._filmCards.findIndex((it) => it === oldData)] = newData;

    this._renderFilmsList(this._filmCards);
  }

  _renderFilmsList(films) {
    unrender(this._filmsList.getElement());
    unrender(this._ratedList.getElement());
    unrender(this._commentedList.getElement());
    unrender(this._popupWrapper.getElement());

    this._filmsList.removeElement();
    this._ratedList.removeElement();
    this._commentedList.removeElement();
    this._popupWrapper.removeElement();

    render(this._footer, this._popupWrapper.getElement(), Position.AFTEREND);
    render(this._filmsWrapper.getElement(), this._commentedList.getElement(), Position.AFTERBEGIN);
    render(this._filmsWrapper.getElement(), this._ratedList.getElement(), Position.AFTERBEGIN);
    render(this._filmsWrapper.getElement(), this._filmsList.getElement(), Position.AFTERBEGIN);
    this._renderShowButton();

    // films.filter((film) => film.rating > MORE_RATED).slice(0, 2).forEach((taskMock) => this._renderFilmsCard(taskMock, this._ratedList, this._popupWrapper));
    // films.filter((film) => film.countComments >= MORE_COMMENTED).slice(0, 2).forEach((taskMock) => this._renderFilmsCard(taskMock, this._commentedList, this._popupWrapper));
    films.forEach((taskMock) => this._renderFilmsCard(taskMock, this._filmsList, this._popupWrapper));
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
    this._sortBlock.getElement().querySelectorAll(`.sort__button`).forEach((elem) => {
      elem.addEventListener(`click`, (evt) => {
        evt.preventDefault();
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
    });

    render(this._container, this._sortBlock.getElement());
  }

}

export default PageController;
