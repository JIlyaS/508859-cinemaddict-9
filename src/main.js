import {renderComponent, getRang} from './utils/functions';
import {getSearch} from './components/search';
import {getProfile} from './components/profile';
import {getMenu} from './components/menu';
import {getFilmListWrapper} from './components/film-list-wrapper';
import {getFilmDetailsPopup} from './components/film-details-popup';
import {WATCHED_MOVIES} from './utils/constants';
import {dataFilters, getDataFilmCard} from './components/data';

const headerWrapper = document.querySelector(`.header`);
const mainWrapper = document.querySelector(`.main`);
const footerWrapper = document.querySelector(`.footer`);

renderComponent(headerWrapper, getSearch());
renderComponent(headerWrapper, getProfile(getRang(WATCHED_MOVIES)));
renderComponent(mainWrapper, getMenu(dataFilters));
renderComponent(mainWrapper, getFilmListWrapper());

renderComponent(footerWrapper, getFilmDetailsPopup(getDataFilmCard()), `afterend`);
