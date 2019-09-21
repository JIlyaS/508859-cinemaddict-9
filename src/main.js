import Search from './components/search';
import Profile from './components/profile';
import PopupWrapper from './components/popup-wrapper';
import API from './api';
import PageController from './controllers/page-controller';
import SearchController from './controllers/search-controller';
import MenuController from './controllers/menu-controller';
import {render} from './utils';
import {MIN_SEARCH_SYMBOLS, AUTHORIZATION, SERVER, ActionType} from './constants';
import {getRang} from './components/data';
import ChartController from './controllers/chart-controller';

const headerWrapper = document.querySelector(`.header`);
const mainWrapper = document.querySelector(`.main`);
const footerFilmCountBlock = document.querySelector(`.footer__statistics p`);

const api = new API({authorization: AUTHORIZATION, server: SERVER});
const search = new Search();
const popupWrapper = new PopupWrapper();

const onSearchCloseButtonClick = () => {
  chartController.hide();
  searchController.hide();
  onDataChange(ActionType.CREATE);
};

const onDataChange = (actionType, updated, callback) => {
  switch (actionType) {
    case ActionType.UPDATE:
      api.updateMovie({
        id: updated.id,
        data: updated.toRAW()
      })
      .then(() => api.getMovies())
      .then((movies) => {
        menuController.show(movies.slice());
        pageController.show(movies.slice());
      });
      break;
    case ActionType.CREATE:
      api.getMovies().then((movies) => {
        menuController.show(movies.slice());
        pageController.show(movies.slice());
        footerFilmCountBlock.textContent = `${movies.length} movies inside`;
      });
      break;
    case ActionType.CREATE_COMMENT:
      api.createComment({
        id: updated.movieId,
        comment: updated.comment
      })
      .then(() => api.getMovies())
      .then((movies) => {
        pageController.show(movies);
        callback();
      });
      break;
    case ActionType.DELETE_COMMENT:
      api.deleteComment({
        commentId: updated.id
      })
      .then(() => api.getMovies())
      .then((movies) => {
        pageController.show(movies);
        callback();
      });
      break;
    default:
      throw new Error(`Incorrect ActionType property`);
  }
};

render(headerWrapper, search.getElement());

api.getMovies().then((movies) => {
  const watchedFilms = movies.filter((elem) => elem.isViewed === true);
  const profile = new Profile(getRang(watchedFilms.length));
  render(headerWrapper, profile.getElement());
});

const pageController = new PageController(mainWrapper, popupWrapper, onDataChange);
const searchController = new SearchController(mainWrapper, popupWrapper, search, onSearchCloseButtonClick);
const chartController = new ChartController(mainWrapper);
const menuController = new MenuController(mainWrapper, pageController, searchController, chartController);

search.getElement().querySelector(`.search__field`).addEventListener(`keyup`, (evt) => {
  if (evt.target.value.length >= MIN_SEARCH_SYMBOLS) {
    menuController.hide();
    chartController.hide();
    pageController.hide();
    api.getMovies().then((movies) => searchController.show(movies.slice()));
  } else if (evt.target.value.length === 0) {
    chartController.hide();
    searchController.hide();
    onDataChange(ActionType.CREATE);
  }
});

onDataChange(ActionType.CREATE);
