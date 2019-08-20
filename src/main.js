import {renderComponent, getRang} from './utils/functions';
import {getMoreFilms} from './utils/actions';
import {getSearch} from './components/search';
import {getProfile} from './components/profile';
import {getMenu} from './components/menu';
import {getFilmListWrapper} from './components/film-list-wrapper';
import {getFilmDetailsPopup} from './components/film-details-popup';
import {WATCHED_MOVIES, COUNT_FILMS} from './utils/constants';
import {dataFilters, getDataFilmCard} from './components/data';

const headerWrapper = document.querySelector(`.header`);
const mainWrapper = document.querySelector(`.main`);
const footerWrapper = document.querySelector(`.footer`);

renderComponent(headerWrapper, getSearch());
renderComponent(headerWrapper, getProfile(getRang(WATCHED_MOVIES)));
renderComponent(mainWrapper, getMenu(dataFilters));
renderComponent(mainWrapper, getFilmListWrapper());

renderComponent(footerWrapper, getFilmDetailsPopup(getDataFilmCard()), `afterend`);

const filmCardBlock = document.querySelectorAll(`.film-card`);
const filmDetailsBlock = document.querySelector(`.film-details`);
const filmDetailsCloseBtn = document.querySelector(`.film-details__close-btn`);
const footerFilmCountBlock = document.querySelector(`.footer__statistics p`);
const showMoreBtn = document.querySelector(`.films-list__show-more`);
const filmListBlock = document.querySelector(`.films-list__container`);
footerFilmCountBlock.textContent = `${COUNT_FILMS} movies inside`;

filmCardBlock.forEach((card) => {
  card.addEventListener(`click`, () => {
    filmDetailsBlock.classList.remove(`visually-hidden`);
  });
});

filmDetailsCloseBtn.addEventListener(`click`, () => {
  filmDetailsBlock.classList.add(`visually-hidden`);
});

showMoreBtn.addEventListener(`click`, (evt) => getMoreFilms(evt, filmListBlock));


