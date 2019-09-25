import Search from './components/search';
import Profile from './components/profile';
import PopupWrapper from './components/popup-wrapper';
import Loading from './components/loading';
import API from './api';
import PageController from './controllers/page-controller';
import SearchController from './controllers/search-controller';
import MenuController from './controllers/menu-controller';
import ChartController from './controllers/chart-controller';
import {render, unrender} from './utils';
import {MIN_SEARCH_SYMBOLS, AUTHORIZATION, SERVER, ActionType} from './constants';
import {getRang} from './utils';

const headerWrapper = document.querySelector(`.header`);
const mainWrapper = document.querySelector(`.main`);
const footerFilmCountBlock = document.querySelector(`.footer__statistics p`);

const api = new API({authorization: AUTHORIZATION, server: SERVER});
const search = new Search();
const popupWrapper = new PopupWrapper();
const loading = new Loading();

const changeSearchInfo = (isSearch) => {
  menuController.setSearch(isSearch);
  pageController.setSearch(isSearch);
  searchController.setSearch(isSearch);
};

const onSearchCloseButtonClick = () => {
  chartController.hide();
  searchController.hide();
  changeSearchInfo(false);
  onDataChange(ActionType.CREATE);
};

const onDataChange = (actionType, updated, cb, cbError) => {
  switch (actionType) {
    case ActionType.UPDATE:
      api.updateMovie({
        id: updated.id,
        movie: updated.toRAW()
      })
      .then(() => api.getMovies())
      .then((movies) => {
        menuController.show(movies);
        pageController.show(movies);
        searchController.show(movies);
      });
      break;
    case ActionType.CREATE:
      render(mainWrapper, loading.getElement());
      api.getMovies().then((movies) => {
        unrender(loading.getElement());
        loading.removeElement();
        menuController.show(movies);
        pageController.show(movies);
        searchController.show(movies);
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
        cb();
      });
      break;
    case ActionType.DELETE_COMMENT:
      api.deleteComment({
        commentId: updated.id
      })
      .then(() => api.getMovies())
      .then((movies) => {
        pageController.show(movies);
        cb();
      });
      break;
    case ActionType.UPDATE_RATING:
      api.updateMovie({
        id: updated.id,
        movie: updated.toRAW()
      })
      .then(() => api.getMovies())
      .then((movies) => {
        menuController.show(movies);
        pageController.show(movies);
        searchController.show(movies);
        cb();
      }).catch(() => {
        cbError();
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

search.getElement().querySelector(`.search__field`).addEventListener(`keyup`, (evt) => {
  if (evt.target.value.length >= MIN_SEARCH_SYMBOLS) {
    menuController.hide();
    chartController.hide();
    pageController.hide();
    changeSearchInfo(true);
    api.getMovies().then((movies) => searchController.show(movies));
  } else if (evt.target.value.length === 0) {
    chartController.hide();
    searchController.hide();
    changeSearchInfo(false);
    onDataChange(ActionType.CREATE);
  }
});

const pageController = new PageController(mainWrapper, popupWrapper, onDataChange);
const searchController = new SearchController(mainWrapper, popupWrapper, search, onDataChange, onSearchCloseButtonClick);
const chartController = new ChartController(mainWrapper);
const menuController = new MenuController(mainWrapper, pageController, searchController, chartController);

onDataChange(ActionType.CREATE);
