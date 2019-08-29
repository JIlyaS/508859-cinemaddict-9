import Search from './components/search';
import Profile from './components/profile';
import PageController from './controllers/PageController';
import {render, getCountFilmsToRender} from './utils';
import {WATCHED_MOVIES, COUNT_FILM_CARDS, COUNT_FILMS} from './constants';
import {getRang, getDataFilmCard} from './components/data';

const headerWrapper = document.querySelector(`.header`);
const mainWrapper = document.querySelector(`.main`);
const footerWrapper = document.querySelector(`.footer`);
const footerFilmCountBlock = document.querySelector(`.footer__statistics p`);

export const dataFilmCards = new Array(getCountFilmsToRender(COUNT_FILM_CARDS)).fill().map(() => getDataFilmCard());

const renderSearch = () => {
  const search = new Search();
  render(headerWrapper, search.getElement());
};

const renderProfile = (rang) => {
  const profile = new Profile(rang);
  render(headerWrapper, profile.getElement());
};

renderSearch();
renderProfile(getRang(WATCHED_MOVIES));

footerFilmCountBlock.textContent = `${COUNT_FILMS} movies inside`;

const pageController = new PageController(mainWrapper, footerWrapper, dataFilmCards);
pageController.init();
