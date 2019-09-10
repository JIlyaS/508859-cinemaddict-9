import FilmsWrapper from '../components/films-wrapper';
import FilmsList from '../components/films-list';
import RatedList from '../components/rated-list';
import CommentedList from '../components/commented-list';
import EmptyResult from '../components/empty-result';
import Sort from '../components/sort';
import ShowButton from '../components/show-button';
import FilmListController from './film-list-controller';
import {render, unrender} from '../utils';
import {COUNT_FILM_CARDS, ADD_MORE_CARD, Position, Sorted, RenderPosition} from '../constants';
// import {getDataFilmCard} from '../components/data';

class PageController {
  constructor(container, popupWrapper) {
    this._container = container;
    this._filmsWrapper = new FilmsWrapper();
    this._filmsList = new FilmsList();
    this._sortBlock = new Sort();
    this._popupWrapper = popupWrapper;
    this._showMoreButton = new ShowButton();
    this._films = [];
    this._originalFilmCards = [];

    this._ratedList = new RatedList();
    this._commentedList = new CommentedList();
    this._footer = document.querySelector(`.footer`);

    this._showedFilms = COUNT_FILM_CARDS;

    this._filmListController = new FilmListController(this._filmsWrapper, this._filmsList, this._popupWrapper, this._onDataChange.bind(this));
    this._filmListRatedController = new FilmListController(this._filmsWrapper, this._ratedList, this._popupWrapper, this._onDataChange.bind(this), RenderPosition.RATED);
    this._filmListCommentedController = new FilmListController(this._filmsWrapper, this._commentedList, this._popupWrapper, this._onDataChange.bind(this), RenderPosition.COMMENTED);
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
  }

  hide() {
    this._sortBlock.getElement().classList.add(`visually-hidden`);
    this._filmsWrapper.getElement().classList.add(`visually-hidden`);
  }

  _onDataChange(films) {
    this._films = films;
    this._originalFilmCards = this._films;
    this._renderFilmsList(this._films);
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
    this._films = films;
    this._originalFilmCards = films;
    this._showedFilms = COUNT_FILM_CARDS;

    this._renderFilmsList(this._films);
  }

  _renderFilmsList(films) {
    if (films.length === 0) {
      return this._renderEmptyResult();
    }

    this._unrenderFilmList();

    render(this._filmsWrapper.getElement(), this._commentedList.getElement(), Position.AFTERBEGIN);
    render(this._filmsWrapper.getElement(), this._ratedList.getElement(), Position.AFTERBEGIN);
    render(this._filmsWrapper.getElement(), this._filmsList.getElement(), Position.AFTERBEGIN);

    if (this._showedFilms <= films.length) {
      this._renderShowButton();
    }

    this._filmListController.setFilms(films.slice(0, this._showedFilms));
    this._filmListRatedController.setFilms(films);
    return this._filmListCommentedController.setFilms(films);
  }

  _renderShowButton() {
    // this._filmListController.addFilms(this._films.slice(this._showedFilms, this._showedFilms + ADD_MORE_CARD));

    // this._showedFilms += ADD_MORE_CARD;

    // if (this._showedFilms >= this._films.length) {
    //   unrender(this._showMoreButton.getElement());
    //   this._showMoreButton.removeElement();
    // }

    // let countFilmCards = COUNT_FILM_CARDS;
    // let newCountFilm = ADD_MORE_CARD;
    this._showMoreButton.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this._filmListController.addFilms(this._films.slice(this._showedFilms, this._showedFilms + ADD_MORE_CARD));
      this._showedFilms += ADD_MORE_CARD;

      if (this._showedFilms >= this._films.length) {
        unrender(this._showMoreButton.getElement());
        this._showMoreButton.removeElement();
      }
      // countFilmCards += ADD_MORE_CARD;

      // if (COUNT_FILMS < countFilmCards) {
      //   newCountFilm = COUNT_FILMS - (countFilmCards - ADD_MORE_CARD);
      //   countFilmCards = newCountFilm + countFilmCards + ADD_MORE_CARD;
      //   unrender(this._showMoreButton.getElement());
      //   this._showMoreButton.removeElement();
      // }

      // const newFilmCards = new Array(newCountFilm).fill().map(() => getDataFilmCard());
      // newFilmCards.forEach((film) => this._renderFilmsCard(film, this._filmsList, this._popupWrapper));
      // this._films.push(...newFilmCards);
    });
    render(this._filmsList.getElement(), this._showMoreButton.getElement());
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
            const sortedByDateUpFilms = this._films.slice().sort((a, b) => a.date - b.date);
            this._films = [...sortedByDateUpFilms];
            this._renderFilmsList(this._films);
            break;
          case Sorted.RATING:
            const sortedByRatingsFilms = this._films.slice().sort((a, b) => b.rating - a.rating);
            this._films = [...sortedByRatingsFilms];
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
