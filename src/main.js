import {renderComponent} from './utils/render-component';
import {getSearch} from './components/search';
import {getProfile} from './components/profile';
import {getMenu} from './components/menu';
import {getShowBtn} from './components/show-btn';
import {getFilmCards} from './components/film-cards';
import {getFilmDetailsPopup} from './components/film-details-popup';
import {dataFilmCard, dataRatedFilms, dataCommentedFilms, dataFilmDetails} from './utils/constants';

const headerWrapper = document.querySelector(`.header`);
const menuWrapper = document.querySelector(`.menu`);
const filmListWrapper = document.querySelector(`.films-list`);
const filmsWrapper = document.querySelector(`.films-list__container`);
const filmsRatedWrapper = document.querySelector(`.films-list--rated`);
const filmsCommentedWrapper = document.querySelector(`.films-list--commented`);
const bodyWrapper = document.querySelector(`body`);

renderComponent(headerWrapper, getSearch());
renderComponent(headerWrapper, getProfile());
renderComponent(menuWrapper, getMenu());
renderComponent(filmsWrapper, getFilmCards(dataFilmCard));
renderComponent(filmListWrapper, getShowBtn());
renderComponent(filmsRatedWrapper, getFilmCards(dataRatedFilms));
renderComponent(filmsCommentedWrapper, getFilmCards(dataCommentedFilms));
// renderComponent(bodyWrapper, getFilmDetailsPopup(dataFilmDetails));
