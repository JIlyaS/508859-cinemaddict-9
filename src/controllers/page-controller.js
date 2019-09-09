import FilmsWrapper from '../components/films-wrapper';
import FilmsList from '../components/films-list';
import RatedList from '../components/rated-list';
import CommentedList from '../components/commented-list';
import PopupWrapper from '../components/popup-wrapper';
import EmptyResult from '../components/empty-result';
import Sort from '../components/sort';
import ShowButton from '../components/show-button';
import FilmListController from './film-list-controller';
import {render, unrender} from '../utils';
import {COUNT_FILM_CARDS, ADD_MORE_CARD, COUNT_FILMS, Position, Sorted} from '../constants';
import {getDataFilmCard} from '../components/data';

class PageController {
  constructor(container) {
    this._container = container;
    this._filmsWrapper = new FilmsWrapper();
    this._filmsList = new FilmsList();
    this._sortBlock = new Sort();
    this._popupWrapper = new PopupWrapper();
    this._filmCards = [];
    this._originalFilmCards = [];

    this._ratedList = new RatedList();
    this._commentedList = new CommentedList();
    this._footer = document.querySelector(`.footer`);

    // Хранением тасков занимается отдельный контроллер.
    // Мы сможем его использовать и на странице Поиска.
    this._filmListController = new FilmListController(this._filmsWrapper, this._filmsList, this._ratedList, this._commentedList, this._popupWrapper, this._onDataChange.bind(this));

    this._init();
  }

  _unrenderFilmList() {
    unrender(this._filmsList.getElement());
    unrender(this._ratedList.getElement());
    unrender(this._commentedList.getElement());

    this._filmsList.removeElement();
    this._ratedList.removeElement();
    this._commentedList.removeElement();
  }

  _init() {
    this._renderSort();
    render(this._container, this._filmsWrapper.getElement());
    render(this._filmsWrapper.getElement(), this._filmsList.getElement());
    render(this._filmsWrapper.getElement(), this._ratedList.getElement());
    render(this._filmsWrapper.getElement(), this._commentedList.getElement());
    render(this._footer, this._popupWrapper.getElement(), Position.AFTEREND);

    if (COUNT_FILMS > this._filmCards.length) {
      this._renderShowButton();
    }

    // if (this._filmCards.length === 0) {
    //   console.log(this._filmCards.length);
    //   return this._renderEmptyResult();
    // }

    // return 0;
  }

  hide() {
    this._sortBlock.getElement().classList.add(`visually-hidden`);
    this._filmsWrapper.getElement().classList.add(`visually-hidden`);
  }

  _onDataChange(films) {
    this._filmCards = films;
    this._originalFilmCards = this._filmCards;
    this._renderFilmsList(this._filmCards);
  }

  show(films) {
    if (films !== this._films) {
      this._setFilms(films);
    }

    this._sortBlock.getElement().classList.remove(`visually-hidden`);
    this._filmsWrapper.getElement().classList.remove(`visually-hidden`);
  }

  _onChangeView() {
    this._subscriptions.forEach((subscription) => subscription());
  }

  _setFilms(films) {
    this._filmCards = films;
    this._originalFilmCards = films;
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

    return this._filmListController.setFilms(films);
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

  _renderEmptyResult() {
    const emptyResult = new EmptyResult();
    this._unrenderFilmList();
    render(this._filmsWrapper.getElement(), emptyResult.getElement());
  }

}

export default PageController;
