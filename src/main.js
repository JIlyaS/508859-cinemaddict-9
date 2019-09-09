import Search from './components/search';
import Profile from './components/profile';
import Menu from './components/menu';
import Statistics from './components/statistics';
import PageController from './controllers/page-controller';
import SearchController from './controllers/search-controller';
import {render, getCountFilmsToRender} from './utils';
import {WATCHED_MOVIES, COUNT_FILM_CARDS, COUNT_FILMS, NAME_FILTERS, MenuName} from './constants';
import {getRang, getDataFilmCard, getDataFilter} from './components/data';

const headerWrapper = document.querySelector(`.header`);
const mainWrapper = document.querySelector(`.main`);
const footerFilmCountBlock = document.querySelector(`.footer__statistics p`);

const dataFilmCards = new Array(getCountFilmsToRender(COUNT_FILM_CARDS)).fill().map(() => getDataFilmCard());
const dataFilters = NAME_FILTERS.map((filter) => getDataFilter(filter, dataFilmCards));

const search = new Search();
const menu = new Menu(dataFilters);
const statistics = new Statistics();

const renderProfile = (rang) => {
  const profile = new Profile(rang);
  render(headerWrapper, profile.getElement());
};

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
        statistics.getElement().classList.add(`visually-hidden`);
        // searchController.hide();
        pageController.show();
        break;
      case MenuName.STATS:
        menu.getElement().querySelectorAll(`.main-navigation__item`)
          .forEach((elem) => {
            elem.classList.remove(`main-navigation__item--active`);
          });
        evt.target.classList.add(`main-navigation__item--active`);
        pageController.hide();
        // searchController.hide();
        statistics.getElement().classList.remove(`visually-hidden`);
        break;
      default:
        break;
    }
  });

  render(mainWrapper, menu.getElement());
};

const renderStatistics = () => {
  statistics.getElement().classList.add(`visually-hidden`);
  render(mainWrapper, statistics.getElement());
};

render(headerWrapper, search.getElement());
renderProfile(getRang(WATCHED_MOVIES));
renderMenu(dataFilters);
renderStatistics();

footerFilmCountBlock.textContent = `${COUNT_FILMS} movies inside`;

// Рендерим задачи
const pageController = new PageController(mainWrapper);

const onSearchCloseButtonClick = () => {
  console.log(`123`);
  // statistics.getElement().classList.add(`visually-hidden`);
  // searchController.hide();
  // pageController.show(dataFilmCards);
};
const searchController = new SearchController(mainWrapper, search, onSearchCloseButtonClick);

pageController.show(dataFilmCards);

search.getElement().querySelector(`.search__field`).addEventListener(`click`, () => {
  menu.getElement().classList.add(`visually-hidden`)
  statistics.getElement().classList.add(`visually-hidden`);
  pageController.hide();
  searchController.show(dataFilmCards);
});
