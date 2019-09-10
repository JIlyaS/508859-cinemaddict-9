import SearchInfo from '../components/search-info';
import SearchNoResult from '../components/search-no-result';
import FilmsWrapper from '../components/films-wrapper';
import FilmListController from './film-list-controller';
import {render, unrender} from '../utils';
import {MIN_SEARCH_SYMBOLS, Position} from '../constants';
import FilmsList from '../components/films-list';

class SearchController {
  constructor(container, popupWrapper, search, onSearchCloseButtonClick) {
    this._container = container;
    this._popupWrapper = popupWrapper;
    this._search = search;
    this._onSearchCloseButtonClick = onSearchCloseButtonClick;

    this._films = [];

    this._filmsSearchWrapper = new FilmsWrapper();
    this._filmsSearchList = new FilmsList();
    this._searchInfo = new SearchInfo({});
    this._searcNoResult = new SearchNoResult();

    this._filmListController = new FilmListController(this._filmsSearchWrapper, this._filmsSearchList, this._popupWrapper, this._onDataChange.bind(this));

    this._init();
    this.hide();
  }

  _init() {
    render(this._container, this._searchInfo.getElement());
    this._renderSerchedFilmsWrapper();

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
    this._searchInfo.getElement().classList.add(`visually-hidden`);
    this._filmsSearchWrapper.getElement().classList.add(`visually-hidden`);
  }

  show(films) {
    this._films = films;
    const value = this._search.getElement().querySelector(`.search__field`).value;
    this._searchInfo.getElement().classList.remove(`visually-hidden`);
    this._filmsSearchWrapper.getElement().classList.remove(`visually-hidden`);
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

    this._unrenderSerchedFilmsWrapper();
    render(this._container, this._searchInfo.getElement());
    this._renderSerchedFilmsWrapper();

    return this._filmListController.setFilms(films);
  }

  _onDataChange(films) {
    this._films = films;

    this._renderFilmsList(this._films);
  }

  _unrenderSerchedFilmsWrapper() {
    unrender(this._filmsSearchList.getElement());
    unrender(this._filmsSearchWrapper.getElement());
    this._filmsSearchList.removeElement();
    this._filmsSearchWrapper.removeElement();
  }

  _renderSerchedFilmsWrapper() {
    render(this._container, this._filmsSearchWrapper.getElement());
    render(this._filmsSearchWrapper.getElement(), this._filmsSearchList.getElement());
  }

  _renderFilmsList(films) {
    this._unrenderSerchedFilmsWrapper();
    render(this._container, this._searchInfo.getElement());
    this._renderSerchedFilmsWrapper();

    return this._filmListController.setFilms(films);
  }

  _renderEmptyResult() {
    this._unrenderSerchedFilmsWrapper();
    this._renderSerchedFilmsWrapper();
    render(this._filmsSearchList.getElement(), this._searcNoResult.getElement());
  }
}

export default SearchController;
