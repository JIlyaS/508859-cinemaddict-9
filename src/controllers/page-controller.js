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

class PageController {
  constructor(container, popupWrapper, onDataChangeMain) {
    this._container = container;
    this._popupWrapper = popupWrapper;
    this._filmsWrapper = new FilmsWrapper();
    this._filmsList = new FilmsList();
    this._sortBlock = new Sort();
    this._showMoreButton = new ShowButton();
    this._films = [];

    this._ratedList = new RatedList();
    this._commentedList = new CommentedList();
    this._emptyResult = null;
    this._footer = document.querySelector(`.footer`);

    this._onClickShowButton = this._onClickShowButton.bind(this);

    this._showedFilms = COUNT_FILM_CARDS;

    this._onDataChangeMain = onDataChangeMain;

    this._filmListController = new FilmListController(this._filmsWrapper, this._filmsList, this._popupWrapper, this._onDataChangeMain);
    this._filmListRatedController = new FilmListController(this._filmsWrapper, this._ratedList, this._popupWrapper, this._onDataChangeMain, RenderPosition.RATED);
    this._filmListCommentedController = new FilmListController(this._filmsWrapper, this._commentedList, this._popupWrapper, this._onDataChangeMain, RenderPosition.COMMENTED);
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
    this._films = films.slice();
    this._showedFilms = COUNT_FILM_CARDS;

    this._renderFilmsList(this._films);
  }

  _renderFilmsList(films) {
    if (films.length === 0) {
      return this._renderEmptyResult();
    }

    if (this._emptyResult !== null) {
      unrender(this._emptyResult.getElement());
      this._emptyResult.removeElement();
    }

    this._unrenderFilmList();

    render(this._filmsWrapper.getElement(), this._commentedList.getElement(), Position.AFTERBEGIN);
    render(this._filmsWrapper.getElement(), this._ratedList.getElement(), Position.AFTERBEGIN);
    render(this._filmsWrapper.getElement(), this._filmsList.getElement(), Position.AFTERBEGIN);

    if (this._showedFilms < films.length) {
      this._renderShowButton();
    }

    this._filmListController.setFilms(films.slice(0, this._showedFilms));
    this._filmListRatedController.setFilms(films.slice());
    return this._filmListCommentedController.setFilms(films.slice());
  }

  _renderShowButton() {
    this._showMoreButton.getElement().addEventListener(`click`, this._onClickShowButton);
    render(this._filmsList.getElement(), this._showMoreButton.getElement());
  }

  _onClickShowButton(evt) {
    evt.preventDefault();
    this._filmListController.addFilms(this._films.slice(this._showedFilms, this._showedFilms + ADD_MORE_CARD));
    this._showedFilms += ADD_MORE_CARD;
    if (this._showedFilms >= this._films.length) {
      unrender(this._showMoreButton.getElement());
      this._showMoreButton.removeElement();
    }
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
            const defaultFilms = this._films.slice().sort((a, b) => Number(a.id) - Number(b.id));
            this._films = [...defaultFilms];
            this._renderFilmsList(this._films);
            break;
          default:
            throw new Error(`Incorrect dataset`);
        }
      });
    });

    render(this._container, this._sortBlock.getElement());
  }

  _renderEmptyResult() {
    this._emptyResult = new EmptyResult();
    this._unrenderFilmList();
    render(this._filmsWrapper.getElement(), this._emptyResult.getElement());
  }

}

export default PageController;
