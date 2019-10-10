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
import {MIN_SEARCH_SYMBOLS, COUNT_FILM_CARDS, AUTHORIZATION, SERVER, MOVIES_STORE_KEY, ActionType} from './constants';
import {getRang} from './utils';
import Provider from './provider';
import Store from './store';

let countFilmCard = COUNT_FILM_CARDS;
let filterName = null;
let menuName = null;

const headerWrapper = document.querySelector(`.header`);
const mainWrapper = document.querySelector(`.main`);
const footerFilmCountBlock = document.querySelector(`.footer__statistics p`);

const api = new API({authorization: AUTHORIZATION, server: SERVER});
const store = new Store({keyStorage: MOVIES_STORE_KEY, store: window.localStorage});
const provider = new Provider({api, store});
const search = new Search();
const popupWrapper = new PopupWrapper();
const loading = new Loading();

const changeCountFilmCard = (addCount) => {
  if (addCount === null) {
    countFilmCard = COUNT_FILM_CARDS;
    return countFilmCard;
  }
  countFilmCard += addCount;
  return countFilmCard;
};

const changeCurrentMenu = (filterNameItem, nameMenuItem) => {
  filterName = filterNameItem;
  menuName = nameMenuItem;

  return {filterName, menuName};
};

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

const fetchUpdatedMovie = (updated, cb) => {
  provider.updateMovie({
    id: updated.id,
    movie: updated.toRAW()
  })
  .then(() => provider.getMovies())
  .then((movies) => {
    pageController.show(movies);
    menuController.show(movies);
    searchController.show(movies);
    cb();
  });
};

const fetchAllMovies = () => {
  render(mainWrapper, loading.getElement());
  provider.getMovies().then((movies) => {
    unrender(loading.getElement());
    loading.removeElement();
    pageController.show(movies);
    menuController.show(movies);
    searchController.show(movies);
    footerFilmCountBlock.textContent = `${movies.length} movies inside`;
  });
};

const fetchCreatedComment = (updated, cb, cbError) => {
  api.createComment({
    id: updated.movieId,
    comment: updated.comment
  })
  .catch(() => {
    cbError();
  })
  .then(() => provider.getMovies())
  .then((movies) => {
    pageController.show(movies);
    menuController.show(movies);
    cb();
  });
};

const fetchUndeletedComments = (updated, cb, cbError) => {
  api.deleteComment({
    commentId: updated.id
  })
  .catch(() => {
    cbError();
  })
  .then(() => provider.getMovies())
  .then((movies) => {
    pageController.show(movies);
    menuController.show(movies);
    cb();
  });
};

const fetchUpdatedRating = (updated, cb, cbError) => {
  provider.updateMovie({
    id: updated.id,
    movie: updated.toRAW()
  })
  .then(() => provider.getMovies())
  .then((movies) => {
    pageController.show(movies);
    menuController.show(movies);
    searchController.show(movies);
    cb();
  }).catch(() => {
    cbError();
  });
};

const onDataChange = (actionType, updated, cb, cbError) => {
  switch (actionType) {
    case ActionType.UPDATE:
      fetchUpdatedMovie(updated, cb);
      break;
    case ActionType.CREATE:
      fetchAllMovies();
      break;
    case ActionType.CREATE_COMMENT:
      fetchCreatedComment(updated, cb, cbError);
      break;
    case ActionType.DELETE_COMMENT:
      fetchUndeletedComments(updated, cb, cbError);
      break;
    case ActionType.UPDATE_RATING:
      fetchUpdatedRating(updated, cb, cbError);
      break;
    default:
      throw new Error(`Incorrect ActionType property`);
  }
};

render(headerWrapper, search.getElement());

provider.getMovies().then((movies) => {
  const watchedFilms = movies.filter((elem) => elem.isViewed);
  const profile = new Profile(getRang(watchedFilms.length));
  render(headerWrapper, profile.getElement());
});

search.getElement().querySelector(`.search__field`).addEventListener(`keyup`, (evt) => {
  if (evt.target.value.length >= MIN_SEARCH_SYMBOLS) {
    menuController.hide();
    chartController.hide();
    pageController.hide();
    changeSearchInfo(true);
    provider.getMovies().then((movies) => searchController.show(movies));
  } else if (evt.target.value.length === 0) {
    chartController.hide();
    searchController.hide();
    changeSearchInfo(false);
    onDataChange(ActionType.CREATE);
  }
});

window.addEventListener(`offline`, () => {
  document.title = `${document.title}[OFFLINE]`;
});

window.addEventListener(`online`, () => {
  document.title = document.title.split(`[OFFLINE]`)[0];
  provider.syncMovies();
});

const pageController = new PageController(mainWrapper, popupWrapper, onDataChange, changeCountFilmCard);
const searchController = new SearchController(mainWrapper, popupWrapper, search, onDataChange, onSearchCloseButtonClick);
const chartController = new ChartController(mainWrapper);
const menuController = new MenuController(mainWrapper, pageController, searchController, chartController, changeCountFilmCard, changeCurrentMenu);

pageController.setCountFilmCard(countFilmCard);
onDataChange(ActionType.CREATE);
