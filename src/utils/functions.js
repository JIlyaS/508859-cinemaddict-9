import {MILLISECONDS_DAY} from './constants';

export const renderComponent = (wrapper, component, position = `beforeend`) => {
  wrapper.insertAdjacentHTML(position, component);
};

export const getRandomArray = (elements) => {
  return shuffleElements(elements).pop();
};

export const getRandomValue = (min = 0, max = 1) => {
  return Math.round(Math.random() * max + min);
};

export const getRandomFloorValue = (min = 0, max = 1) => {
  return Math.floor(Math.random() * max + min);
};

export const getRandomTime = (maxHours, minMinutes, maxMinutes) => {
  const randomHours = getRandomFloorValue(0, maxHours);
  const randomMinutes = getRandomFloorValue(minMinutes, maxMinutes);
  return randomHours !== `0` ? `${randomHours}h ${randomMinutes}m` : `${randomMinutes}m`;
};

const putToCache = (elem, cache) => {
  if (cache.indexOf(elem) !== -1) {
    return;
  }
  const randomValue = Math.floor(Math.random() * (cache.length + 1));
  cache.splice(randomValue, 0, elem);
};

const getComparator = () => {
  const cache = [];
  return (prevElement, nextElement) => {
    putToCache(prevElement, cache);
    putToCache(nextElement, cache);
    return cache.indexOf(nextElement) - cache.indexOf(prevElement);
  };
};

export const shuffleElements = (sortedElements) => {
  const compare = getComparator();
  return sortedElements.sort(compare);
};

export const getReleaseDate = () => {
  return Date.now() + 1 + Math.floor(Math.random() * getRandomValue(0, -29) * MILLISECONDS_DAY);
};

export const getRang = (countFilms) => {
  let rangs;
  if (countFilms === 0) {
    rangs = ``;
  } else if (countFilms >= 1 && countFilms <= 10) {
    rangs = `Novice`;
  } else if (countFilms >= 11 && countFilms <= 20) {
    rangs = `Fan`;
  } else if (countFilms >= 21) {
    rangs = `Movie Buff`;
  } else {
    rangs = ``;
  }

  return rangs;
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
