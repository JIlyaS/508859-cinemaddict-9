import moment from 'moment';
import {MILLISECONDS_YEAR, COUNT_FILMS, COUNT_FILM_CARDS, MILLISECONDS_DAY, DAY_AGO, YEAR_AGO, STATS_DAYS_AGO, SHORT_DESCRIPTION_LENGTH, Position} from './constants';

moment.updateLocale(`en`, {
  week: {
    dow: 1
  }
});

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const render = (container, element, place = Position.BEFOREEND) => {
  switch (place) {
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

export const getRandomArray = (elements) => {
  return shuffleElements(elements)[0];
};

export const getRandomTime = (maxHours, minMinutes, maxMinutes) => {
  const randomHours = getRandomValue(maxHours);
  const randomMinutes = getRandomValue(maxMinutes, minMinutes);
  return {hours: randomHours, minutes: randomMinutes};
};

export const getRandomValue = (max = 1, min = 0) => {
  return Math.round(Math.random() * max + min);
};

export const shuffleElements = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const getCommentDate = () => {
  return Date.now() + Math.floor(Math.random() * getRandomValue(0, -DAY_AGO) * MILLISECONDS_DAY);
};

export const getReleaseDate = () => {
  return Date.now() + Math.floor(Math.random() * getRandomValue(0, -YEAR_AGO) * MILLISECONDS_YEAR);
};

export const getViewedDate = () => {
  return Date.now() + Math.floor(Math.random() * getRandomValue(0, -STATS_DAYS_AGO) * MILLISECONDS_DAY);
};

export const getCountFilmsToRender = (count) => {
  if (COUNT_FILMS < count) {
    return COUNT_FILM_CARDS - (count - COUNT_FILMS);
  }

  return count;
};

export const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export const toJSON = (response) => {
  return response.json();
};

export const getShortDescription = (description) => {
  return description.length >= SHORT_DESCRIPTION_LENGTH ? description.slice(0, SHORT_DESCRIPTION_LENGTH - 1) + `...` : description;
};

export const getTransformRuntime = (runtime) => {
  const hours = parseInt(runtime / 60, 10);
  let minutes = runtime % 60;
  if (minutes === 0) {
    minutes = `00`;
  } else if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return {hours, minutes};
};

export const getViewRuntime = (runtime) => {
  return runtime.hours !== 0 ? `${runtime.hours}h ${runtime.minutes}m` : `${runtime.minutes}m`;
};

export const getCorrectDataArray = (dataArray) => {
  return dataArray.length !== 0 ? dataArray : ``;
};

export const getCorrectData = (data) => {
  return data ? data : ``;
};

export const getGenreTitle = (genres) => {
  return genres.value.length > 1 ? `Genres` : `Genre`;
};
