import AbstractComponent from './abstract-component';
import {MENU_STATISTIC} from '../constants';

class Statistics extends AbstractComponent {

  constructor({rang}) {
    super();
    this._rang = rang;
  }

  getTemplate() {
    return `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${this._rang}</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>
      ${MENU_STATISTIC.map((elem) => `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${elem.id}" value="${elem.id}" ${elem.checked ? `checked` : ``} >
      <label for="statistic-${elem.id}" class="statistic__filters-label">${elem.title}</label>`).join(` `)}
    </form>

    <div class="statistic__chart-wrap"></div>

  </section>`;
  }
}

export default Statistics;
