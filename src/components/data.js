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
import {getRandomArray, getRandomValue, getRandomTime, shuffleElements, getReleaseDate, getDataFilter} from '../utils/functions';

export const getDataComments = () => ({
  emoji: EMOJI[getRandomValue(EMOJI.length - 1)],
  description: COMMENTS[getRandomValue(COMMENTS.length - 1)],
  author: COMMENT_AUTHORS[getRandomValue(COMMENT_AUTHORS.length - 1)],
  dayComment: COMMENT_DAY[getRandomValue(COMMENT_DAY.length - 1)]
});

export const dataFilmComments = new Array(10).fill().map(() => getDataComments());

export const getDataFilmCard = () => ({
  title: getRandomArray(FILM_NAMES),
  titleOriginal: getRandomArray(FULL_FILM_NAMES),
  poster: getRandomArray(POSTER_LINKS),
  shortDescription: DESCRIPTIONS.slice(0, getRandomValue(3, 1)),
  rating: parseFloat(getRandomValue(90, 10) / 10),
  year: getRandomValue(29, 1990),
  genre: FILM_GENRES[getRandomValue(FILM_GENRES.length - 1)],
  runtime: getRandomTime(MAX_HOURS, MIN_MINUTES, MAX_MINUTES),
  details: [
    {term: `Director`, cell: DIRECTORS[getRandomValue(DIRECTORS.length - 1)]},
    {term: `Writers`, cell: shuffleElements(WRITERS).slice(0, getRandomValue(3, 1))},
    {term: `Actors`, cell: shuffleElements(ACTORS).slice(0, getRandomValue(3, 1))},
    {term: `Release Date`, cell: getReleaseDate()},
    {term: `Runtime`, cell: getRandomTime(MAX_HOURS, MIN_MINUTES, MAX_MINUTES)},
    {term: `Country`, cell: shuffleElements(COUNTRIES).slice(0, getRandomValue(0, 1))},
    {term: `Genres`, cell: shuffleElements(FILM_GENRES).slice(0, getRandomValue(2, 1))},
  ],
  ageRestrictions: AGE_RESTRICTIONS[getRandomValue(AGE_RESTRICTIONS.length - 1)],
  fullDescription: DESCRIPTIONS.slice(0, getRandomValue(10, 5)),
  isFavorite: Boolean(getRandomValue()),
  isWatchlist: Boolean(getRandomValue()),
  isViewed: Boolean(getRandomValue()),
  countComments: getRandomValue(500),
  comments: dataFilmComments
});

export const dataFilmCards = new Array(COUNT_FILM_CARDS).fill().map(() => getDataFilmCard());
export const dataRatedFilms = (dataFilmCards.filter((film) => film.rating > 7)).slice(0, 2);
export const dataCommentedFilms = (dataFilmCards.filter((film) => film.countComments >= 200)).slice(0, 2);
export const dataFilters = NAME_FILTERS.map((filter) => getDataFilter(filter, dataFilmCards));
