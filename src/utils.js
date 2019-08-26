import {MILLISECONDS_DAY, MONTHS, COUNT_FILMS, COUNT_FILM_CARDS, Position} from './constants';

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

export const getRandomValue = (max = 1, min = 0) => {
  return Math.round(Math.random() * max + min);
};

export const getRandomTime = (maxHours, minMinutes, maxMinutes) => {
  const randomHours = getRandomValue(maxHours);
  const randomMinutes = getRandomValue(maxMinutes, minMinutes);
  return randomHours !== `0` ? `${randomHours}h ${randomMinutes}m` : `${randomMinutes}m`;
};

export const shuffleElements = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const getReleaseDate = () => {
  return Date.now() + Math.floor(Math.random() * getRandomValue(0, -29) * MILLISECONDS_DAY);
};

export const convertDataDetails = (details) => {
  const newDetails = details.map((detail) => {
    if (detail.term === `Release Date`) {
      detail.cell = `${new Date(detail.cell).getDay()} ${MONTHS[new Date(detail.cell).getMonth()]} ${new Date(detail.cell).getFullYear()}`;
    }

    return detail;
  });
  return newDetails;
};

export const getCountFilmsToRender = (count) => {
  if (COUNT_FILMS < count) {
    return COUNT_FILM_CARDS - (count - COUNT_FILMS);
  }

  return count;
};

