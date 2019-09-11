import Search from './components/search';
import Profile from './components/profile';
import Menu from './components/menu';
import PopupWrapper from './components/popup-wrapper';
import PageController from './controllers/page-controller';
import SearchController from './controllers/search-controller';
import {render, getCountFilmsToRender} from './utils';
import {COUNT_FILMS, NAME_FILTERS, MIN_SEARCH_SYMBOLS, MenuName} from './constants';
import {getRang, getDataFilmCard, getDataFilter} from './components/data';
import ChartController from './controllers/chart-controller';

const headerWrapper = document.querySelector(`.header`);
const mainWrapper = document.querySelector(`.main`);
const footerFilmCountBlock = document.querySelector(`.footer__statistics p`);

const dataFilmCards = new Array(getCountFilmsToRender(COUNT_FILMS)).fill().map(() => getDataFilmCard());
const dataFilters = NAME_FILTERS.map((filter) => getDataFilter(filter, dataFilmCards));
const watchedFilms = dataFilmCards.filter((elem) => elem.isViewed === true);

const search = new Search();
const profile = new Profile(getRang(watchedFilms.length));
const menu = new Menu(dataFilters);
const popupWrapper = new PopupWrapper();

const renderMenu = () => {
  menu.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    if (!evt.target.classList.contains(`main-navigation__item`)) {
      return;
    }

    switch (evt.target.hash.slice(1)) {
      case MenuName.ALL:
        menu.getElement().querySelectorAll(`.main-navigation__item`)
          .forEach((elem) => {
            elem.classList.remove(`main-navigation__item--active`);
          });
        evt.target.classList.add(`main-navigation__item--active`);
        chartController.hide();
        searchController.hide();
        pageController.show(dataFilmCards);
        break;
      case MenuName.STATS:
        menu.getElement().querySelectorAll(`.main-navigation__item`)
          .forEach((elem) => {
            elem.classList.remove(`main-navigation__item--active`);
          });
        evt.target.classList.add(`main-navigation__item--active`);
        pageController.hide();
        searchController.hide();
        chartController.show(dataFilmCards);
        break;
      default:
        break;
    }
  });

  render(mainWrapper, menu.getElement());
};

const onSearchCloseButtonClick = () => {
  menu.getElement().classList.remove(`visually-hidden`);
  chartController.hide();
  searchController.hide();
  pageController.show(dataFilmCards);
};

render(headerWrapper, search.getElement());
render(headerWrapper, profile.getElement());
renderMenu(dataFilters);

footerFilmCountBlock.textContent = `${COUNT_FILMS} movies inside`;

const pageController = new PageController(mainWrapper, popupWrapper);
const searchController = new SearchController(mainWrapper, popupWrapper, search, onSearchCloseButtonClick);
const chartController = new ChartController(mainWrapper);

pageController.show(dataFilmCards);

search.getElement().querySelector(`.search__field`).addEventListener(`keyup`, (evt) => {
  if (evt.target.value.length >= MIN_SEARCH_SYMBOLS) {
    menu.getElement().classList.add(`visually-hidden`);
    chartController.hide();
    pageController.hide();
    searchController.show(dataFilmCards);
  } else if (evt.target.value.length === 0) {
    menu.getElement().classList.remove(`visually-hidden`);
    chartController.hide();
    searchController.hide();
    pageController.show(dataFilmCards);
  }
});
