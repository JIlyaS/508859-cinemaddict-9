import {
  FILM_NAMES,
  FULL_FILM_NAMES,
  DESCRIPTIONS,
  POSTER_LINKS,
  FILM_GENRES,
  AGE_RESTRICTIONS,
  MAX_HOURS,
  MIN_MINUTES,
  MAX_MINUTES,
  COUNT_FILM_CARDS,
  DIRECTORS,
  WRITERS,
  ACTORS,
  COUNTRIES,
  EMOJI,
  COMMENTS,
  COMMENT_AUTHORS,
  COMMENT_DAY,
  NAME_FILTERS
} from '../utils/constants';
import {getRandomArray, getRandomValue, getRandomFloorValue, getRandomTime, shuffleElements, getReleaseDate, getDataFilter} from '../utils/functions';

export const getDataFilmCard = () => ({
  title: getRandomArray(FILM_NAMES),
  poster: getRandomArray(POSTER_LINKS),
  description: DESCRIPTIONS.slice(0, getRandomFloorValue(1, 3)),
  rating: parseFloat(getRandomValue(10, 90) / 10),
  year: getRandomValue(1990, 29),
  genre: FILM_GENRES[getRandomFloorValue(0, FILM_GENRES.length)],
  runtime: getRandomTime(MAX_HOURS, MIN_MINUTES, MAX_MINUTES),
  countComments: getRandomValue(0, 500),
  isFavorite: Boolean(getRandomValue()),
  isWatchlist: Boolean(getRandomValue()),
  isViewed: Boolean(getRandomValue())
});

export const dataFilmCards = new Array(COUNT_FILM_CARDS).fill().map(() => getDataFilmCard());

export const getDataDetailsCard = () => ({
  title: getRandomArray(FILM_NAMES),
  titleOriginal: getRandomArray(FULL_FILM_NAMES),
  poster: getRandomArray(POSTER_LINKS),
  details: [
    {term: `Director`, cell: DIRECTORS[getRandomFloorValue(0, DIRECTORS.length)]},
    {term: `Writers`, cell: shuffleElements(WRITERS).slice(0, getRandomValue(0, 3))},
    {term: `Actors`, cell: shuffleElements(ACTORS).slice(0, getRandomValue(0, 3))},
    {term: `Release Date`, cell: `${getReleaseDate().getDay()} ${getReleaseDate().getMonth()} ${getReleaseDate().getFullYear()}`},
    {term: `Runtime`, cell: getRandomTime(MAX_HOURS, MIN_MINUTES, MAX_MINUTES)},
    {term: `Country`, cell: shuffleElements(COUNTRIES).slice(0, getRandomValue(0, 2))},
    {term: `Genres`, cell: shuffleElements(FILM_GENRES).slice(0, getRandomValue(0, 3))},
  ],
  ageRestrictions: AGE_RESTRICTIONS[getRandomFloorValue(0, AGE_RESTRICTIONS.length)],
  description: DESCRIPTIONS.slice(0, getRandomFloorValue(1, 3)),
  isFavorite: Boolean(getRandomValue()),
  isWatchlist: Boolean(getRandomValue()),
  isViewed: Boolean(getRandomValue())
});

export const getDataComments = () => ({
  emoji: EMOJI[getRandomFloorValue(0, EMOJI.length)],
  description: COMMENTS[getRandomFloorValue(0, COMMENTS.length)],
  author: COMMENT_AUTHORS[getRandomFloorValue(0, COMMENT_AUTHORS.length)],
  dayComment: COMMENT_DAY[getRandomFloorValue(0, COMMENT_DAY.length)]
});

export const dataFilters = NAME_FILTERS.map((filter) => getDataFilter(filter, dataFilmCards));

console.log(dataFilters);


