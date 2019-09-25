import Menu from '../components/menu';
import {NAME_FILTERS, MenuName, Position, MenuFilter} from '../constants';
import {render, unrender} from '../utils';
import {getDataFilter} from '../utils';

class CommentController {
  constructor(container, pageController, searchController, chartController) {
    this._container = container;
    this._pageController = pageController;
    this._searchController = searchController;
    this._chartController = chartController;

    this._isSearch = false;
    this._menu = null;
    this._dataFilters = {};
    this._films = [];
  }

  show(films) {
    if (!this._isSearch) {
      if (films !== this._films) {
        this._setFilms(films);
      }
    }
  }

  setSearch(isSearch) {
    this._isSearch = isSearch;
  }

  hide() {
    unrender(this._menu.getElement());
    this._menu.removeElement();
  }

  _setFilms(films) {
    this._films = films.slice();

    this._renderMenu(this._films);
  }

  _renderMenu(films) {
    this._dataFilters = NAME_FILTERS.map((filter) => getDataFilter(filter, films));

    if (this._menu !== null) {
      this.hide();
    }

    this._menu = new Menu(this._dataFilters);

    this._init();
  }

  _init() {
    this._menu.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      if (!evt.target.classList.contains(`main-navigation__item`)) {
        return;
      }

      switch (evt.target.hash.slice(1)) {
        case MenuName.ALL:
          this._getActiveMenuElement(evt);
          this._chartController.hide();
          this._searchController.hide();
          this._pageController.show(this._films);
          break;
        case MenuName.WATCHLIST:
          this._chartController.hide();
          this._searchController.hide();
          this._changeFilter(evt, MenuFilter.IS_WATCHLIST);
          break;
        case MenuName.HISTORY:
          this._chartController.hide();
          this._searchController.hide();
          this._changeFilter(evt, MenuFilter.IS_VIEWED);
          break;
        case MenuName.FAVORITES:
          this._chartController.hide();
          this._searchController.hide();
          this._changeFilter(evt, MenuFilter.IS_FAVORITE);
          break;
        case MenuName.STATS:
          this._getActiveMenuElement(evt);
          this._pageController.hide();
          this._searchController.hide();
          this._chartController.show(this._films);
          break;
        default:
          break;
      }
    });

    render(this._container, this._menu.getElement(), Position.AFTERBEGIN);
  }

  _getActiveMenuElement(evt) {
    this._menu.getElement().querySelectorAll(`.main-navigation__item`)
      .forEach((elem) => {
        elem.classList.remove(`main-navigation__item--active`);
      });
    evt.target.classList.add(`main-navigation__item--active`);
  }

  _changeFilter(evt, filterName) {
    this._getActiveMenuElement(evt);
    const filteredFilmCards = this._films.slice().filter((elem) => elem[filterName] === true);
    this._pageController.show(filteredFilmCards, true);
  }
}

export default CommentController;
