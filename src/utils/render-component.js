export const renderComponent = (wrapper, component, position = `beforeend`) => {
  wrapper.insertAdjacentHTML(position, component);
};
