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
  MINUS_INDEX,
  RANDOM_COUNT_COMMENTS
} from '../constants';
import {getRandomArray, getRandomValue, getRandomTime, shuffleElements, getReleaseDate, getCommentDate} from '../utils';

export const getDataComments = () => ({
  emoji: EMOJI[getRandomValue(EMOJI.length - MINUS_INDEX)],
  description: COMMENTS[getRandomValue(COMMENTS.length - MINUS_INDEX)],
  author: COMMENT_AUTHORS[getRandomValue(COMMENT_AUTHORS.length - MINUS_INDEX)],
  dataComment: getCommentDate()
});

export const getDataFilmCard = () => {
  const releaseDate = getReleaseDate();
  const runtimeFilm = getRandomTime(MAX_HOURS, MIN_MINUTES, MAX_MINUTES);
  return {
    title: getRandomArray(FILM_NAMES),
    titleOriginal: getRandomArray(FULL_FILM_NAMES),
    poster: getRandomArray(POSTER_LINKS),
    shortDescription: DESCRIPTIONS.slice(0, getRandomValue(3, 1)),
    rating: parseFloat(getRandomValue(90, 10) / 10),
    date: releaseDate,
    runtime: runtimeFilm,
    genre: FILM_GENRES[getRandomValue(FILM_GENRES.length - 1)],
    details: {
      director: {name: `Director`, value: DIRECTORS[getRandomValue(DIRECTORS.length - MINUS_INDEX)]},
      writers: {name: `Writers`, value: shuffleElements(WRITERS).slice(0, getRandomValue(3, 1))},
      actors: {name: `Actors`, value: shuffleElements(ACTORS).slice(0, getRandomValue(3, 1))},
      date: {name: `Release Date`, value: releaseDate},
      runtime: {name: `Runtime`, value: runtimeFilm},
      country: {name: `Country`, value: shuffleElements(COUNTRIES).slice(0, getRandomValue(0, 1))},
      genres: {name: `Genres`, value: shuffleElements(FILM_GENRES).slice(0, getRandomValue(2, 1))},
    },
    ageRestrictions: AGE_RESTRICTIONS[getRandomValue(AGE_RESTRICTIONS.length - MINUS_INDEX)],
    fullDescription: DESCRIPTIONS.slice(0, getRandomValue(10, 5)),
    personalScore: null,
    isFavorite: Boolean(getRandomValue()),
    isWatchlist: Boolean(getRandomValue()),
    isViewed: Boolean(getRandomValue()),
    comments: new Array(getRandomValue(RANDOM_COUNT_COMMENTS)).fill().map(() => getDataComments()),
    isFilmDetails: false
  };
};

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

