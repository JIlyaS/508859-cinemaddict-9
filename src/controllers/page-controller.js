import FilmsWrapper from '../components/films-wrapper';
import FilmsList from '../components/films-list';
import RatedList from '../components/rated-list';
import CommentedList from '../components/commented-list';
import ShowButton from '../components/show-button';
import EmptyResult from '../components/empty-result';
import Sort from '../components/sort';
import MovieController from './movie-controller';
import PopupWrapper from '../components/popup-wrapper';
import {render, unrender} from '../utils';
import {MORE_RATED, MORE_COMMENTED, COUNT_FILM_CARDS, ADD_MORE_CARD, COUNT_FILMS, Position, Sorted} from '../constants';
import {getDataFilmCard} from '../components/data';

class PageController {
  constructor(container, filmCards) {
    this._container = container;
    this._filmCards = filmCards;
    this._originalFilmCards = this._filmCards;
    this._dataRatedFilms = (this._filmCards.filter((film) => film.rating > MORE_RATED)).slice(0, 2);
    this._dataCommentedFilms = (this._filmCards.filter((film) => film.comments.length >= MORE_COMMENTED)).slice(0, 2);
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

  hide() {
    this._sortBlock.getElement().classList.add(`visually-hidden`);
    this._filmsWrapper.getElement().classList.add(`visually-hidden`);
  }

  show() {
    this._sortBlock.getElement().classList.remove(`visually-hidden`);
    this._filmsWrapper.getElement().classList.remove(`visually-hidden`);
  }

  _onChangeView() {
    this._subscriptions.forEach((subscription) => subscription());
  }

  _renderFilmsCard(film, container, popupContainer) {
    const movieController = new MovieController(container, film, popupContainer, this._onDataChange, this._onChangeView);
    movieController.init();
    this._subscriptions.push(movieController.setDefaultView.bind(movieController));
  }

  _onDataChange(newData, oldData, updateComment = null) {
    if (newData === null) {
      const index = this._filmCards.findIndex((film) => film === oldData);
      const commentIndex = this._filmCards[index].comments.findIndex((comment) => comment === updateComment);
      this._filmCards[index].comments.splice(commentIndex, 1);

      // this._filmCards[index].comments = [...this._filmCards[index].comments.slice(0, commentIndex), ...this._filmCards[index].comments.slice(commentIndex + 1)];

      // const updateComments = [...this._filmCards[index].comments.slice(0, commentIndex), ...this._filmCards[index].comments.slice(commentIndex + 1)];
      // this._filmCards[index] = Object.assign(this._filmCards[index], {comments: updateComments});
    } else if (oldData === null) {
      const index = this._filmCards.findIndex((film) => film === newData);
      this._filmCards[index].comments.push(updateComment);
    } else {
      const index = this._filmCards.findIndex((film) => film === oldData);
      this._filmCards[index] = newData;
    }
    this._renderFilmsList(this._filmCards);
  }

  _renderFilmsList(films) {
    if (films.length === 0) {
      return this._renderEmptyResult();
    }

    this._unrenderFilmList();

    render(this._filmsWrapper.getElement(), this._commentedList.getElement(), Position.AFTERBEGIN);
    render(this._filmsWrapper.getElement(), this._ratedList.getElement(), Position.AFTERBEGIN);
    render(this._filmsWrapper.getElement(), this._filmsList.getElement(), Position.AFTERBEGIN);

    if (COUNT_FILMS > films.length) {
      this._renderShowButton();
    }

    films.filter((film) => film.rating > MORE_RATED).slice(0, 2).forEach((taskMock) => this._renderFilmsCard(taskMock, this._ratedList, this._popupWrapper));
    films.filter((film) => film.comments.length >= MORE_COMMENTED).slice(0, 2).forEach((taskMock) => this._renderFilmsCard(taskMock, this._commentedList, this._popupWrapper));
    return films.forEach((taskMock) => this._renderFilmsCard(taskMock, this._filmsList, this._popupWrapper));
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
        unrender(showButton.getElement());
        showButton.removeElement();
      }

      const newFilmCards = new Array(newCountFilm).fill().map(() => getDataFilmCard());
      newFilmCards.forEach((film) => this._renderFilmsCard(film, this._filmsList, this._popupWrapper));
      this._filmCards.push(...newFilmCards);
    });
    render(this._filmsList.getElement(), showButton.getElement());
  }

  _renderEmptyResult() {
    const emptyResult = new EmptyResult();
    this._unrenderFilmList();
    render(this._filmsWrapper.getElement(), emptyResult.getElement());
  }

  _unrenderFilmList() {
    unrender(this._filmsList.getElement());
    unrender(this._ratedList.getElement());
    unrender(this._commentedList.getElement());

    this._filmsList.removeElement();
    this._ratedList.removeElement();
    this._commentedList.removeElement();
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

        switch (evt.target.dataset.sortType) {
          case Sorted.DATE:
            const sortedByDateUpFilms = this._filmCards.slice().sort((a, b) => a.date - b.date);
            this._filmCards = [...sortedByDateUpFilms];
            this._renderFilmsList(this._filmCards);
            break;
          case Sorted.RATING:
            const sortedByRatingsFilms = this._filmCards.slice().sort((a, b) => b.rating - a.rating);
            this._filmCards = [...sortedByRatingsFilms];
            this._renderFilmsList(sortedByRatingsFilms);
            break;
          case Sorted.DEFAULT:
            this._renderFilmsList(this._originalFilmCards);
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
