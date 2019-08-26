import Search from './components/search';
import Profile from './components/profile';
import Menu from './components/menu';
import FilmCard from './components/film-card';
import DetailsPopup from './components/details-popup';
import ShowButton from './components/show-button';
import EmptyResult from './components/empty-result';
import {render, unrender, isNoResult, isMoreResult, getCountFilms} from './utils';
import {WATCHED_MOVIES, COUNT_FILM_CARDS, NAME_FILTERS, COUNT_FILMS, ADD_MORE_CARD, MORE_RATED, MORE_COMMENTED, Position} from './constants';
import {getRang, getDataFilmCard, getDataFilter} from './components/data';

const headerWrapper = document.querySelector(`.header`);
const mainWrapper = document.querySelector(`.main`);
const allFilmsContainer = document.querySelector(`.films`);
const filmsListWrapper = document.querySelector(`.films-list`);
const filmsWrapper = document.querySelector(`.films-list .films-list__container`);
const filmsRated = document.querySelector(`.films-list--extra .films-list__container`);
const filmsCommented = document.querySelector(`.films-list--extra:last-child .films-list__container`);
const footerWrapper = document.querySelector(`.footer`);
const footerFilmCountBlock = document.querySelector(`.footer__statistics p`);

export const dataFilmCards = new Array(getCountFilms(COUNT_FILM_CARDS)).fill().map(() => getDataFilmCard());
export const dataRatedFilms = (dataFilmCards.filter((film) => film.rating > MORE_RATED)).slice(0, 2);
export const dataCommentedFilms = (dataFilmCards.filter((film) => film.countComments >= MORE_COMMENTED)).slice(0, 2);
export const dataFilters = NAME_FILTERS.map((filter) => getDataFilter(filter, dataFilmCards));

const renderSearch = () => {
  const search = new Search();
  render(headerWrapper, search.getElement());
};

const renderProfile = (rang) => {
  const profile = new Profile(rang);
  render(headerWrapper, profile.getElement());
};

const renderMenu = (filters) => {
  const menu = new Menu(filters);
  render(mainWrapper, menu.getElement(), Position.AFTERBEGIN);
};

const renderFilmCard = (film, wrapper) => {
  const filmCard = new FilmCard(film);
  const detailsPopup = new DetailsPopup(film);

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      unrender(detailsPopup.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  filmCard.getElement()
  .querySelector(`.film-card__poster`)
  .addEventListener(`click`, () => {
    render(footerWrapper, detailsPopup.getElement(), Position.AFTEREND);
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  filmCard.getElement()
    .querySelector(`.film-card__title`)
    .addEventListener(`click`, () => {
      render(footerWrapper, detailsPopup.getElement(), Position.AFTEREND);
      document.addEventListener(`keydown`, onEscKeyDown);
    });

  filmCard.getElement()
    .querySelector(`.film-card__comments`)
    .addEventListener(`click`, () => {
      render(footerWrapper, detailsPopup.getElement(), Position.AFTEREND);
      document.addEventListener(`keydown`, onEscKeyDown);
    });

  detailsPopup.getElement().querySelector(`.film-details__close-btn`)
    .addEventListener(`click`, () => {
      unrender(detailsPopup.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

  detailsPopup.getElement().querySelector(`.film-details__comment-input`)
    .addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

  detailsPopup.getElement().querySelector(`.film-details__comment-input`)
    .addEventListener(`blur`, () => {
      document.addEventListener(`keydown`, onEscKeyDown);
    });

  render(wrapper, filmCard.getElement());
};

const renderShowButton = () => {
  const showButton = new ShowButton();
  let countFilmCards = COUNT_FILM_CARDS;
  let newCountFilm = ADD_MORE_CARD;
  showButton.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    countFilmCards += ADD_MORE_CARD;

    if (COUNT_FILMS < countFilmCards) {
      newCountFilm = COUNT_FILMS - (countFilmCards - ADD_MORE_CARD);
      countFilmCards = newCountFilm + countFilmCards + ADD_MORE_CARD;
      evt.target.classList.add(`visually-hidden`);
    }

    const newFilmCards = new Array(newCountFilm).fill().map(() => getDataFilmCard());
    newFilmCards.forEach((dataFilm) => {
      renderFilmCard(dataFilm, filmsWrapper);
    });
  });

  render(filmsListWrapper, showButton.getElement());
};

const renderEmptyResult = () => {
  const emptyResult = new EmptyResult();
  allFilmsContainer.innerHTML = ``;
  render(allFilmsContainer, emptyResult.getElement());
};

renderSearch();
renderProfile(getRang(WATCHED_MOVIES));
renderMenu(dataFilters);

if (isNoResult(dataFilmCards.length)) {
  renderEmptyResult();
}

dataFilmCards.forEach((filmCard) => renderFilmCard(filmCard, filmsWrapper));

if (isMoreResult(dataFilmCards.length)) {
  renderShowButton();
}

dataRatedFilms.forEach((filmCard) => renderFilmCard(filmCard, filmsRated));
dataCommentedFilms.forEach((filmCard) => renderFilmCard(filmCard, filmsCommented));

footerFilmCountBlock.textContent = `${COUNT_FILMS} movies inside`;
