import AbstractComponent from './abstract-component';

class Menu extends AbstractComponent {
  constructor(dataFilters) {
    super();
    this._dataFilters = dataFilters;
  }

  getTemplate() {
    return `<div><nav class="main-navigation">
          ${this._dataFilters.map((filter) => `<a href="#all" class="main-navigation__item
          ${filter.title === `All movies` && `main-navigation__item--active`}
          ${filter.title === `Stats` && `main-navigation__item--additional`}">
            ${filter.title}
            ${(filter.title === `All movies`) || (filter.title === `Stats`) ? `` : `<span class="main-navigation__item-count">${filter.count}</span>`}
          </a>`).join(` `)}
        </nav>

        <ul class="sort">
          <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
          <li><a href="#" class="sort__button">Sort by date</a></li>
          <li><a href="#" class="sort__button">Sort by rating</a></li>
        </ul>
      </div>`;
  }
}

export default Menu;
