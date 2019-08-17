export const renderComponent = (wrapper, component, position = `beforeend`) => {
  wrapper.insertAdjacentHTML(position, component);
};

export const getRandomSpliceElement = (elem) => {
  return elem.splice([Math.floor(Math.random() * elem.length)], 1).join(` `);
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
