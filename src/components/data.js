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
  DIRECTORS,
  WRITERS,
  ACTORS,
  COUNTRIES,
  EMOJI,
  COMMENTS,
  COMMENT_AUTHORS,
  COMMENT_DAY,
  MINUS_INDEX,
  COUNT_COMMENTS,
  RANDOM_COUNT_COMMENTS,
  RANDOM_YEAR_START,
  RANDOM_YEAR_DURATION
} from '../constants';
import {getRandomArray, getRandomValue, getRandomTime, shuffleElements, getReleaseDate} from '../utils';

export const getDataComments = () => ({
  emoji: EMOJI[getRandomValue(EMOJI.length - MINUS_INDEX)],
  description: COMMENTS[getRandomValue(COMMENTS.length - MINUS_INDEX)],
  author: COMMENT_AUTHORS[getRandomValue(COMMENT_AUTHORS.length - MINUS_INDEX)],
  dayComment: COMMENT_DAY[getRandomValue(COMMENT_DAY.length - MINUS_INDEX)]
});

export const dataFilmComments = new Array(COUNT_COMMENTS).fill().map(() => getDataComments());

export const getDataFilmCard = () => ({
  title: getRandomArray(FILM_NAMES),
  titleOriginal: getRandomArray(FULL_FILM_NAMES),
  poster: getRandomArray(POSTER_LINKS),
  shortDescription: DESCRIPTIONS.slice(0, getRandomValue(3, 1)),
  rating: parseFloat(getRandomValue(90, 10) / 10),
  year: getRandomValue(RANDOM_YEAR_DURATION, RANDOM_YEAR_START),
  genre: FILM_GENRES[getRandomValue(FILM_GENRES.length - 1)],
  runtime: getRandomTime(MAX_HOURS, MIN_MINUTES, MAX_MINUTES),
  details: [
    {term: `Director`, cell: DIRECTORS[getRandomValue(DIRECTORS.length - MINUS_INDEX)]},
    {term: `Writers`, cell: shuffleElements(WRITERS).slice(0, getRandomValue(3, 1))},
    {term: `Actors`, cell: shuffleElements(ACTORS).slice(0, getRandomValue(3, 1))},
    {term: `Release Date`, cell: getReleaseDate()},
    {term: `Runtime`, cell: getRandomTime(MAX_HOURS, MIN_MINUTES, MAX_MINUTES)},
    {term: `Country`, cell: shuffleElements(COUNTRIES).slice(0, getRandomValue(0, 1))},
    {term: `Genres`, cell: shuffleElements(FILM_GENRES).slice(0, getRandomValue(2, 1))},
  ],
  ageRestrictions: AGE_RESTRICTIONS[getRandomValue(AGE_RESTRICTIONS.length - MINUS_INDEX)],
  fullDescription: DESCRIPTIONS.slice(0, getRandomValue(10, 5)),
  isFavorite: Boolean(getRandomValue()),
  isWatchlist: Boolean(getRandomValue()),
  isViewed: Boolean(getRandomValue()),
  countComments: getRandomValue(RANDOM_COUNT_COMMENTS),
  comments: dataFilmComments
});

export const getRang = (countFilms) => {
  if (countFilms >= 1 && countFilms <= 10) {
    return `Novice`;
  } else if (countFilms >= 11 && countFilms <= 20) {
    return `Fan`;
  } else if (countFilms >= 21) {
    return `Movie Buff`;
  }

  return ``;
};

export const getDataFilter = (filterName, dataFilms) => {
  let filteredData;
  switch (filterName) {
    case `All movies`:
      filteredData = dataFilms;
      break;
    case `Watchlist`:
      filteredData = dataFilms.filter((task) => task.isWatchlist === true);
      break;
    case `History`:
      filteredData = dataFilms.filter((task) => task.isViewed === true);
      break;
    case `Favorites`:
      filteredData = dataFilms.filter((task) => task.isFavorite === true);
      break;
    default:
      filteredData = 0;
      break;
  }

  return {
    title: filterName,
    count: filteredData.length
  };
};

