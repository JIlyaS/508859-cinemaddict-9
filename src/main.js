import Search from './components/search';
import Profile from './components/profile';
import Menu from './components/menu';
import PageController from './controllers/PageController';
import {render, getCountFilmsToRender} from './utils';
import {WATCHED_MOVIES, COUNT_FILM_CARDS, NAME_FILTERS, COUNT_FILMS, Position} from './constants';
import {getRang, getDataFilmCard, getDataFilter} from './components/data';

const headerWrapper = document.querySelector(`.header`);
const mainWrapper = document.querySelector(`.main`);
const footerWrapper = document.querySelector(`.footer`);
const footerFilmCountBlock = document.querySelector(`.footer__statistics p`);

export const dataFilmCards = new Array(getCountFilmsToRender(COUNT_FILM_CARDS)).fill().map(() => getDataFilmCard());
export const dataFilters = NAME_FILTERS.map((filter) => getDataFilter(filter, dataFilmCards));

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
  render(mainWrapper, menu.getElement(), Position.AFTERBEGIN);
};

renderSearch();
renderProfile(getRang(WATCHED_MOVIES));
renderMenu(dataFilters);

footerFilmCountBlock.textContent = `${COUNT_FILMS} movies inside`;

const pageController = new PageController(mainWrapper, footerWrapper, dataFilmCards);
pageController.init();
