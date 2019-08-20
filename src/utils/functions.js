import {MILLISECONDS_DAY, MONTHS} from './constants';

export const renderComponent = (wrapper, component, position = `beforeend`) => {
  wrapper.insertAdjacentHTML(position, component);
};

export const getRandomArray = (elements) => {
  return shuffleElements(elements).pop();
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

export const convertDataDetails = (details) => {
  const newDetails = details.map((detail) => {
    if (detail.term === `Release Date`) {
      detail.cell = `${new Date(detail.cell).getDay()} ${MONTHS[new Date(detail.cell).getMonth()]} ${new Date(detail.cell).getFullYear()}`;
    }

    return detail;
  });
  return newDetails;
};
