import Search from './components/search';
import Profile from './components/profile';
import PopupWrapper from './components/popup-wrapper';
import API from './api';
import PageController from './controllers/page-controller';
import SearchController from './controllers/search-controller';
import MenuController from './controllers/menu-controller';
import {render, getCountFilmsToRender} from './utils';
import {COUNT_FILMS, MIN_SEARCH_SYMBOLS, AUTHORIZATION, SERVER} from './constants';
import {getRang, getDataFilmCard} from './components/data';
import ChartController from './controllers/chart-controller';

const headerWrapper = document.querySelector(`.header`);
const mainWrapper = document.querySelector(`.main`);
const footerFilmCountBlock = document.querySelector(`.footer__statistics p`);

const dataFilmCards = new Array(getCountFilmsToRender(COUNT_FILMS)).fill().map(() => getDataFilmCard());
const watchedFilms = dataFilmCards.filter((elem) => elem.isViewed === true);

const api = new API({authorization: AUTHORIZATION, server: SERVER});
api.getMovies().then((movies) => console.log(movies));

const search = new Search();
const profile = new Profile(getRang(watchedFilms.length));
const popupWrapper = new PopupWrapper();

const onSearchCloseButtonClick = () => {
  menuController.show(dataFilmCards);
  chartController.hide();
  searchController.hide();
  pageController.show(dataFilmCards);
};

render(headerWrapper, search.getElement());
render(headerWrapper, profile.getElement());

footerFilmCountBlock.textContent = `${COUNT_FILMS} movies inside`;

const pageController = new PageController(mainWrapper, popupWrapper);
const searchController = new SearchController(mainWrapper, popupWrapper, search, onSearchCloseButtonClick);
const chartController = new ChartController(mainWrapper);
const menuController = new MenuController(mainWrapper, pageController, searchController, chartController);
menuController.show(dataFilmCards);
// pageController.show(dataFilmCards);
api.getMovies().then((movies) => pageController.show(movies));

search.getElement().querySelector(`.search__field`).addEventListener(`keyup`, (evt) => {
  if (evt.target.value.length >= MIN_SEARCH_SYMBOLS) {
    menuController.hide();
    chartController.hide();
    pageController.hide();
    searchController.show(dataFilmCards);
  } else if (evt.target.value.length === 0) {
    menuController.show(dataFilmCards);
    chartController.hide();
    searchController.hide();
    pageController.show(dataFilmCards);
  }
});
