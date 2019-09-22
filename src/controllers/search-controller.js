import SearchInfo from '../components/search-info';
import SearchNoResult from '../components/search-no-result';
import FilmsWrapper from '../components/films-wrapper';
import FilmListController from './film-list-controller';
import {render, unrender} from '../utils';
import {MIN_SEARCH_SYMBOLS, Position} from '../constants';
import FilmsList from '../components/films-list';

class SearchController {
  constructor(container, popupWrapper, search, onDataChangeMain, onSearchCloseButtonClick) {
    this._container = container;
    this._popupWrapper = popupWrapper;
    this._search = search;
    this._onDataChangeMain = onDataChangeMain;
    this._onSearchCloseButtonClick = onSearchCloseButtonClick;

    this._films = [];

    this._filmsSearchWrapper = new FilmsWrapper();
    this._filmsSearchList = new FilmsList();
    this._searchInfo = new SearchInfo({});
    this._searcNoResult = new SearchNoResult();

    this._filmListController = new FilmListController(this._filmsSearchWrapper, this._filmsSearchList, this._popupWrapper, this._onDataChangeMain);

    this._init();
    this.hide();
  }

  _init() {
    render(this._container, this._searchInfo.getElement());
    this._renderFindedFilmsWrapper();

    this._search.getElement().querySelector(`.search__reset`)
      .addEventListener(`click`, () => {
        this._search.getElement().querySelector(`.search__field`).value = ``;
        this._onSearchCloseButtonClick();
      });

    this._search.getElement().querySelector(`.search__field`)
      .addEventListener(`keyup`, (evt) => {
        const {value} = evt.target;
        if (value.length >= MIN_SEARCH_SYMBOLS) {
          const films = this._films.filter((film) => {
            return film.title.includes(value);
          });
          this._showSearchResult(value, films);
        }
      });
  }

  hide() {
    this._unrenderFindedFilmsWrapper();
  }

  show(films) {
    this._films = films.slice();
    const value = this._search.getElement().querySelector(`.search__field`).value;
    this._renderFindedFilmsWrapper();
    const filteredFilms = this._films.filter((film) => {
      return film.title.toLowerCase().includes(value.toLowerCase());
    });
    this._showSearchResult(value, filteredFilms);
  }

  _showSearchResult(_, films) {
    if (this._searchInfo) {
      unrender(this._searchInfo.getElement());
      this._searchInfo.removeElement();
    }

    this._searchInfo = new SearchInfo({count: films.length});

    render(this._container, this._searchInfo.getElement(), Position.AFTERBEGIN);

    if (films.length === 0) {
      return this._renderEmptyResult();
    }

    this._unrenderFindedFilmsWrapper();
    render(this._container, this._searchInfo.getElement());
    this._renderFindedFilmsWrapper();
    return this._filmListController.setFilms(films);
  }

  _unrenderFindedFilmsWrapper() {
    unrender(this._filmsSearchList.getElement());
    unrender(this._filmsSearchWrapper.getElement());
    unrender(this._searchInfo.getElement());
    this._searchInfo.removeElement();
    this._filmsSearchList.removeElement();
    this._filmsSearchWrapper.removeElement();
  }

  _renderFindedFilmsWrapper() {
    render(this._container, this._filmsSearchWrapper.getElement());
    render(this._filmsSearchWrapper.getElement(), this._filmsSearchList.getElement());
  }

  _renderFilmsList(films) {
    this._unrenderFindedFilmsWrapper();
    render(this._container, this._searchInfo.getElement());
    this._renderFindedFilmsWrapper();

    return this._filmListController.setFilms(films);
  }

  _renderEmptyResult() {
    this._unrenderFindedFilmsWrapper();
    this._renderFindedFilmsWrapper();
    render(this._filmsSearchList.getElement(), this._searcNoResult.getElement());
  }
}

export default SearchController;
