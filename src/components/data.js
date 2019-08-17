import {FILM_NAMES, DESCRIPTIONS, POSTER_LINKS, FILM_GENRES, AGE_RESTRICTIONS, MAX_HOURS, MIN_MINUTES, MAX_MINUTES, COUNT_FILM_CARDS} from '../utils/constants';
import {getRandomSpliceElement, getRandomValue, getRandomFloorValue, getRandomTime} from '../utils/functions';

export const getDataCard = () => ({
  title: getRandomSpliceElement(FILM_NAMES),
  titleOriginal: getRandomSpliceElement(FILM_NAMES),
  poster: getRandomSpliceElement(POSTER_LINKS),
  description: DESCRIPTIONS.slice(0, getRandomFloorValue(1, 3)),
  rating: parseFloat(getRandomValue(10, 90) / 10),
  year: getRandomValue(1990, 29),
  genre: FILM_GENRES[getRandomFloorValue(0, FILM_GENRES.length)],
  ageRestrictions: AGE_RESTRICTIONS[getRandomFloorValue(0, AGE_RESTRICTIONS.length)],
  time: getRandomTime(MAX_HOURS, MIN_MINUTES, MAX_MINUTES),
  countComments: getRandomValue(0, 500),
});

console.log(getDataCard());

export const dataFilmCards = new Array(COUNT_FILM_CARDS).fill().map(() => getDataCard());
