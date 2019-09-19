import Search from './components/search';
import Profile from './components/profile';
import PopupWrapper from './components/popup-wrapper';
import API from './api';
import PageController from './controllers/page-controller';
import SearchController from './controllers/search-controller';
import MenuController from './controllers/menu-controller';
import {render} from './utils';
import {COUNT_FILMS, MIN_SEARCH_SYMBOLS, AUTHORIZATION, SERVER} from './constants';
import {getRang} from './components/data';
import ChartController from './controllers/chart-controller';

const headerWrapper = document.querySelector(`.header`);
const mainWrapper = document.querySelector(`.main`);
const footerFilmCountBlock = document.querySelector(`.footer__statistics p`);

const api = new API({authorization: AUTHORIZATION, server: SERVER});
const search = new Search();
const popupWrapper = new PopupWrapper();

const onSearchCloseButtonClick = () => {
  api.getMovies().then((movies) => menuController.show(movies));
  chartController.hide();
  searchController.hide();
  api.getMovies().then((movies) => pageController.show(movies));
};

const onDataChange = (actionType, updatedFilm) => {
  console.log(actionType, updatedFilm);
  switch (actionType) {
    case `update`:
      api.updateMovie({
        id: updatedFilm.id,
        data: updatedFilm.toRAW()
      }).then((movies) => pageController.show(movies));
      break;
    case `create`:
      break;
    case `delete`:
      // api.deleteComments({
      //   id: updatedFilm.id
      // })
      //   .then(() => api.getMovies())
      //   .then((movies) => pageController.show(movies));
      break;
  }
};

render(headerWrapper, search.getElement());

api.getMovies().then((movies) => {
  const watchedFilms = movies.filter((elem) => elem.isViewed === true);
  const profile = new Profile(getRang(watchedFilms.length));
  render(headerWrapper, profile.getElement());
});

footerFilmCountBlock.textContent = `${COUNT_FILMS} movies inside`;

const pageController = new PageController(mainWrapper, popupWrapper, onDataChange);
const searchController = new SearchController(mainWrapper, popupWrapper, search, onSearchCloseButtonClick);
const chartController = new ChartController(mainWrapper);
const menuController = new MenuController(mainWrapper, pageController, searchController, chartController);

api.getMovies().then((movies) => menuController.show(movies));
api.getMovies().then((movies) => pageController.show(movies));

search.getElement().querySelector(`.search__field`).addEventListener(`keyup`, (evt) => {
  if (evt.target.value.length >= MIN_SEARCH_SYMBOLS) {
    menuController.hide();
    chartController.hide();
    pageController.hide();
    api.getMovies().then((movies) => searchController.show(movies));
  } else if (evt.target.value.length === 0) {
    api.getMovies().then((movies) => menuController.show(movies));
    chartController.hide();
    searchController.hide();
    api.getMovies().then((movies) => pageController.show(movies));
  }
});
