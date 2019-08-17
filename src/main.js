import {renderComponent} from './utils/functions';
import {getSearch} from './components/search';
import {getProfile} from './components/profile';
import {getMenu} from './components/menu';
import {getFilmListWrapper} from './components/film-list-wrapper';
// import {getFilmDetailsPopup} from './components/film-details-popup';
// import {dataFilmDetails} from './utils/constants';

const headerWrapper = document.querySelector(`.header`);
const mainWrapper = document.querySelector(`.main`);
// const footerWrapper = document.querySelector(`.footer`);

renderComponent(headerWrapper, getSearch());
renderComponent(headerWrapper, getProfile());
renderComponent(mainWrapper, getMenu());
renderComponent(mainWrapper, getFilmListWrapper());

// renderComponent(footerWrapper, getFilmDetailsPopup(dataFilmDetails), `afterend`);
