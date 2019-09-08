import Search from './components/search';
import Profile from './components/profile';
import Menu from './components/menu';
import Statistics from './components/statistics';
import PageController from './controllers/page-controller';
import {render, getCountFilmsToRender} from './utils';
import {WATCHED_MOVIES, COUNT_FILM_CARDS, COUNT_FILMS, NAME_FILTERS} from './constants';
import {getRang, getDataFilmCard, getDataFilter} from './components/data';

const headerWrapper = document.querySelector(`.header`);
const mainWrapper = document.querySelector(`.main`);
const footerFilmCountBlock = document.querySelector(`.footer__statistics p`);

const dataFilmCards = new Array(getCountFilmsToRender(COUNT_FILM_CARDS)).fill().map(() => getDataFilmCard());
const dataFilters = NAME_FILTERS.map((filter) => getDataFilter(filter, dataFilmCards));

const statistics = new Statistics();

const renderSearch = () => {
  const search = new Search();
  render(headerWrapper, search.getElement());
};

const renderProfile = (rang) => {
  const profile = new Profile(rang);
  render(headerWrapper, profile.getElement());
};

const renderMenu = (filters) => {
  const menu = new Menu(filters);

  menu.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    if (!evt.target.classList.contains(`main-navigation__item`)) {
      return;
    }

    switch (evt.target.hash.slice(1)) {
      case `all`:
        menu.getElement().querySelectorAll(`.main-navigation__item`)
          .forEach((elem) => {
            elem.classList.remove(`main-navigation__item--active`);
          });
        evt.target.classList.add(`main-navigation__item--active`);
        statistics.getElement().classList.add(`visually-hidden`);
        pageController.show();
        break;
      case `stats`:
        menu.getElement().querySelectorAll(`.main-navigation__item`)
          .forEach((elem) => {
            elem.classList.remove(`main-navigation__item--active`);
          });
        evt.target.classList.add(`main-navigation__item--active`);
        pageController.hide();
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

renderSearch();
renderProfile(getRang(WATCHED_MOVIES));
renderMenu(dataFilters);
renderStatistics();

footerFilmCountBlock.textContent = `${COUNT_FILMS} movies inside`;

const pageController = new PageController(mainWrapper, dataFilmCards);
pageController.init();
