import {START_COUNT_CARDS, COUNT_FILMS} from './constants';
import {getFilmCard} from '../components/film-card';
import {getDataFilmCard} from '../components/data';
import {renderComponent} from './functions';

let countFilmCards = START_COUNT_CARDS;

export const getMoreFilms = (evt, wrapper, count = 5) => {
  evt.preventDefault();
  countFilmCards += count;
  wrapper.innerHTML = ``;
  if (COUNT_FILMS < countFilmCards) {
    const restCount = COUNT_FILMS - countFilmCards - count;
    countFilmCards = restCount + countFilmCards + count;
    evt.target.style.display = `none`;
  }

  new Array(countFilmCards).fill().forEach(() => {
    renderComponent(wrapper, getFilmCard(getDataFilmCard()));
  });
};
