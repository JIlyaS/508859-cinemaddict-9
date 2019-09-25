import moment from 'moment';
import {
  SHORT_DESCRIPTION_LENGTH,
  COUNT_GENRES,
  MINUS_INDEX,
  NUNBER_SYSTEM,
  HOUR,
  LESS_MINUTES,
  MIN_COUNT_NOVICE,
  MAX_COUNT_NOVICE,
  MIN_COUNT_FAN,
  MAX_COUNT_FAN,
  MIN_COUNT_BUFF,
  Position,
  FilterTitles,
  Rang,
  StatusSuccess,
  MomentSettings} from './constants';

moment.updateLocale(MomentSettings.LANGUAGE, {
  week: {
    dow: MomentSettings.START_DAY_WEEK
  }
});

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const render = (container, element, place = Position.BEFOREEND) => {
  switch (place) {
    case Position.BEFOREBEGIN:
      container.before(element);
      break;
    case Position.AFTERBEGIN:
      container.prepend(element);
      break;
    case Position.BEFOREEND:
      container.append(element);
      break;
    case Position.AFTEREND:
      container.after(element);
      break;
    default:
      throw new Error(`Add the corresponding position value of the DOM element.`);
  }
};

export const unrender = (element) => {
  if (element) {
    element.remove();
  }
};

export const checkStatus = (response) => {
  if (response.status >= StatusSuccess.MIN && response.status < StatusSuccess.MAX) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export const toJSON = (response) => {
  return response.json();
};

export const getShortDescription = (description) => {
  return description.length >= SHORT_DESCRIPTION_LENGTH ? description.slice(0, SHORT_DESCRIPTION_LENGTH - MINUS_INDEX) + `...` : description;
};

export const getTransformRuntime = (runtime) => {
  const hours = parseInt(runtime / HOUR, NUNBER_SYSTEM);
  let minutes = runtime % HOUR;
  if (minutes === 0) {
    minutes = `00`;
  } else if (minutes < LESS_MINUTES) {
    minutes = `0${minutes}`;
  }
  return hours !== 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
};

export const getCorrectData = (data) => {
  return data ? data : ``;
};

export const getGenreTitle = (genres) => {
  return genres.value.length > COUNT_GENRES ? `Genres` : `Genre`;
};

export const getRang = (countFilms) => {
  if (countFilms >= MIN_COUNT_NOVICE && countFilms <= MAX_COUNT_NOVICE) {
    return Rang.NOVICE;
  } else if (countFilms >= MIN_COUNT_FAN && countFilms <= MAX_COUNT_FAN) {
    return Rang.FAN;
  } else if (countFilms >= MIN_COUNT_BUFF) {
    return Rang.BUFF;
  }

  return ``;
};

export const getDataFilter = (filterName, dataFilms) => {
  let filteredData;
  const {title, href} = filterName;
  switch (title) {
    case FilterTitles.ALL:
      filteredData = dataFilms;
      break;
    case FilterTitles.WATCHLIST:
      filteredData = dataFilms.filter((task) => task.isWatchlist === true);
      break;
    case FilterTitles.HISTORY:
      filteredData = dataFilms.filter((task) => task.isViewed === true);
      break;
    case FilterTitles.FAVORITES:
      filteredData = dataFilms.filter((task) => task.isFavorite === true);
      break;
    default:
      filteredData = 0;
      break;
  }

  return {
    title,
    href,
    count: filteredData.length
  };
};
