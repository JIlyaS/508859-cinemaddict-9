import {MenuName, Position} from '../constants';
import {render} from '../utils';

class CommentController {
  constructor(container, menu, pageController, searchController, chartController) {
    this._container = container;
    this._menu = menu;
    this._pageController = pageController;
    this._searchController = searchController;
    this._chartController = chartController;

    this._films = [];

    this._init();
  }

  show(films) {
    if (films !== this._films) {
      this._setFilms(films);
    }
  }

  _setFilms(films) {
    this._films = films;
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
          this._changeFilter(evt, `isWatchlist`);
          break;
        case MenuName.HISTORY:
          this._changeFilter(evt, `isViewed`);
          break;
        case MenuName.FAVORITES:
          this._changeFilter(evt, `isFavorite`);
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
    const filteredFilmCards = this._films.filter((elem) => elem[filterName] === true);
    this._pageController.show(filteredFilmCards);
  }
}

export default CommentController;
