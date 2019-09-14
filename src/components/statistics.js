import AbstractComponent from './abstract-component';
import {MENU_STATISTIC} from '../constants';

class Statistics extends AbstractComponent {

  constructor({rang, watchedMovies, totalDuration, topGenre}) {
    super();
    this._rang = rang;
    this._watchedMovies = watchedMovies;
    this._totalDuration = totalDuration;
    this._topGenre = topGenre;
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

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${this._watchedMovies} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${this._totalDuration.hours} <span class="statistic__item-description">h</span> ${this._totalDuration.minutes} <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${this._topGenre}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap"></div>

  </section>`;
  }
}

export default Statistics;
