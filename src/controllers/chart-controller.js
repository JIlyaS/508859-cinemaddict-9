import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import moment from 'moment';
import Statistics from '../components/statistics';
import StatisticChart from '../components/statistic-chart';
import {render, unrender} from '../utils';
import {FILM_GENRES, PeriodStats} from '../constants';
import {getRang} from '../components/data';

class ChartController {
  constructor(container) {
    this._container = container;
    this._statistic = new Statistics({rang: {}, watchedMovies: {}, totalDuration: {}, topGenre: {}});
    this._statisticChart = new StatisticChart();
    this._chart = {};

    this._films = [];
    this._originalFilms = [];
    this._filteredFilms = [];

    this._genresObj = FILM_GENRES.reduce((acc, item) => {
      acc[item] = 0;
      return acc;
    }, {});

    this._onlyGenres = {};
    this._genresObj = {};

    this.hide();
  }

  hide() {
    this._statistic.getElement().classList.add(`visually-hidden`);
  }

  show(films) {
    this._films = films;
    this._originalFilms = films;
    this._statistic.getElement().classList.remove(`visually-hidden`);

    this._showChart();
  }

  _showChart() {
    if (this._statistic) {
      this._unrenderStatistics();
    }

    this._onlyGenres = this._getObjectGenres(this._originalFilms);

    const topGenre = this._originalFilms.length !== 0 ? Object.entries(this._onlyGenres).reduce(function (prev, current) {
      return (prev[1] > current[1]) ? prev : current;
    }) : `-`;

    const watchedMovies = this._originalFilms.filter((elem) => {
      return elem.isViewed;
    });

    const result = {hours: 0, minutes: 0};

    const totalDuration = this._originalFilms.length !== 0 ? watchedMovies.reduce((_, item) => {
      result.hours += item.runtime.hours;
      result.minutes += item.runtime.minutes;
      return result;
    }, {}) : result;

    const addHours = Math.trunc(totalDuration.minutes / 60);
    const realMonutes = totalDuration.minutes % 60;
    totalDuration.hours += addHours;
    totalDuration.minutes = realMonutes;

    this._statistic = new Statistics({rang: getRang(watchedMovies.length), watchedMovies: watchedMovies.length, totalDuration, topGenre: topGenre[0]});

    this._getStatisticActions();

    render(this._container, this._statistic.getElement());
    this._changeStatistics();
  }

  _changeStatistics() {
    if (this._films.length === 0) {
      unrender(this._statisticChart.getElement());
      return this._statisticChart.removeElement();
    }

    if (this._statisticChart) {
      unrender(this._statisticChart.getElement());
      this._statisticChart.removeElement();
    }

    this._onlyGenres = this._getObjectGenres(this._films);

    render(this._statistic.getElement().querySelector(`.statistic__chart-wrap`), this._statisticChart.getElement());

    const ctx = this._statisticChart.getElement();

    this._chart = new Chart(ctx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: Object.keys(this._onlyGenres),
        datasets: [{
          backgroundColor: `#FBE44D`,
          data: Object.values(this._onlyGenres)
        }]
      },
      options: {
        plugins: {
          datalabels: {
            clamp: true,
            anchor: `start`,
            offset: 40,
            color: `#ffffff`,
            align: `start`,
            font: {
              family: `Open Sans`,
              weight: `bold`,
              size: 14
            }
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              defaultFontFamily: `Open Sans`,
              beginAtZero: true,
              display: true,
              fontColor: `#ffffff`,
              fontSize: 16,
              padding: 85
            },
            maxBarThickness: 35,
            barPercentage: 1.0,
            categoryPercentage: 0.9,
            gridLines: {
              display: false,
              drawBorder: false
            }
          }],
          xAxes: [{
            ticks: {
              display: false,
              min: 0
            },
            gridLines: {
              display: false,
              drawBorder: false
            }
          }]
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        },
        layout: {
          padding: {
            left: 30,
          }
        },
        animation: {
          easing: `easeInOutQuad`
        }
      }
    });

    return 0;
  }

  _getObjectGenres(films) {
    const filmGenres = films.filter((elem) => elem.isViewed).map((film) => film.genre);

    return filmGenres.reduce((acc, item) => {
      if (acc.hasOwnProperty(item)) {
        acc[item]++;
      } else {
        acc[item] = 1;
      }
      return acc;
    }, {});
  }

  _getStatisticActions() {
    this._filteredFilms = this._originalFilms.slice().filter((film) => {
      return film.viewedTime;
    });
    this._statistic.getElement().querySelectorAll(`.statistic__filters-input`).forEach((elem) => {
      elem.addEventListener(`click`, (evt) => {
        switch (evt.target.value) {
          case PeriodStats.ALL_TIME:
            this._films = this._originalFilms;
            this._changeStatistics();
            break;
          case PeriodStats.TODAY:
            this._getFilteredStatsFilms(this._filteredFilms, `day`);
            break;
          case PeriodStats.WEEK:
            this._getFilteredStatsFilms(this._filteredFilms, `week`);
            break;
          case PeriodStats.MONTH:
            this._getFilteredStatsFilms(this._filteredFilms, `month`);
            break;
          case PeriodStats.YEAR:
            this._getFilteredStatsFilms(this._filteredFilms, `year`);
            break;
          default:
            throw new Error(`Incorrect value`);
        }
      });
    });
  }

  _getFilteredStatsFilms(filteredFilms, period) {
    const dateNow = moment().format(`YYYY-MM-DD`);
    this._films = filteredFilms.filter((elem) => {
      const dateViewed = moment(elem.viewedTime).format(`YYYY-MM-DD`);
      return moment(dateViewed).isSame(dateNow, period) && elem;
    });

    this._changeStatistics();
  }

  _unrenderStatistics() {
    unrender(this._statistic.getElement());
    unrender(this._statisticChart.getElement());
    this._statistic.removeElement();
    this._statisticChart.removeElement();
  }
}

export default ChartController;
