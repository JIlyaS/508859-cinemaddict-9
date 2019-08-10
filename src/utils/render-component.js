export const renderComponent = (wrapper, component) => {
  const container = document.createElement(`template`);
  container.innerHTML = component;
  wrapper.appendChild(container.content.cloneNode(true));
};
