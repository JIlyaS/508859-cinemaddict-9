import {MILLISECONDS_YEAR, COUNT_FILMS, COUNT_FILM_CARDS, MILLISECONDS_DAY, DAY_AGO, YEAR_AGO, RANDOM_COUNT_COMMENTS, Position} from './constants';

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
  return randomHours !== 0 ? `${randomHours}h ${randomMinutes}m` : `${randomMinutes}m`;
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

export const getCountFilmsToRender = (count) => {
  if (COUNT_FILMS < count) {
    return COUNT_FILM_CARDS - (count - COUNT_FILMS);
  }

  return count;
};

