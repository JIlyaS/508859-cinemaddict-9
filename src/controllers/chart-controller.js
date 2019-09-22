import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import moment from 'moment';
import Statistics from '../components/statistics';
import StatisticInfo from '../components/statistic-info';
import StatisticChart from '../components/statistic-chart';
import {render, unrender} from '../utils';
import {HOUR, PeriodStats, Position} from '../constants';
import {getRang} from '../components/data';

class ChartController {
  constructor(container) {
    this._container = container;
    this._statistic = new Statistics({rang: {}});
    this._statisticInfo = new StatisticInfo({watchedMovies: {}, totalDuration: {}, topGenre: {}});
    this._statisticChart = new StatisticChart();
    this._chart = null;

    this._films = [];
    this._originalFilms = [];
    this._onlyGenres = {};

    this.hide();
  }

  hide() {
    this._statistic.getElement().classList.add(`visually-hidden`);
  }

  show(films) {
    this._films = films.slice().filter((elem) => elem.isViewed);
    this._originalFilms = films.slice().filter((elem) => elem.isViewed);
    this._statistic.getElement().classList.remove(`visually-hidden`);

    this._showStatisticBlock();
  }

  _showStatisticBlock() {
    this._unrenderStatistics();
    this._statistic = new Statistics({rang: getRang(this._originalFilms.length)});
    this._getStatisticActions();
    render(this._container, this._statistic.getElement());

    this._showStatistics();
  }

  _showStatsInfo() {
    this._unrenderStatisticInfo();

    const topGenre = this._films.length !== 0 ? Object.entries(this._onlyGenres).reduce(function (prev, current) {
      return (prev[1] > current[1]) ? prev : current;
    }) : `-`;

    const result = {hours: 0, minutes: 0};

    const totalDuration = this._films.length !== 0 ? this._films.reduce((_, item) => {
      result.hours += Math.trunc(item.runtime / HOUR);
      result.minutes += Math.trunc(item.runtime % HOUR);
      return result;
    }, {}) : result;

    const addHours = Math.trunc(totalDuration.minutes / HOUR);
    const realMonutes = totalDuration.minutes % HOUR;
    totalDuration.hours += addHours;
    totalDuration.minutes = realMonutes;

    this._statisticInfo = new StatisticInfo({watchedMovies: this._films.length, totalDuration, topGenre: topGenre[0]});
    render(this._statistic.getElement().querySelector(`.statistic__filters`), this._statisticInfo.getElement(), Position.AFTEREND);
  }

  _showStatistics() {
    if (this._chart !== null) {
      this._chart.destroy();
    }

    if (this._films.length === 0) {
      this._unrenderStatistics();
      return this._showStatsInfo();
    }

    this._onlyGenres = this._getObjectGenres(this._films);
    this._showStatsInfo();
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
            maxBarThickness: 30,
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
    const filmGenres = films.map((film) => Object.values(film.genres));
    return filmGenres.flat().reduce((acc, item) => {
      if (acc.hasOwnProperty(item)) {
        acc[item]++;
      } else {
        acc[item] = 1;
      }
      return acc;
    }, {});
  }

  _getStatisticActions() {
    this._statistic.getElement().querySelectorAll(`.statistic__filters-input`).forEach((elem) => {
      elem.addEventListener(`click`, (evt) => {
        switch (evt.target.value) {
          case PeriodStats.ALL_TIME:
            this._films = this._originalFilms;
            this._showStatistics();
            break;
          case PeriodStats.TODAY:
            this._getFilteredStatsFilms(this._originalFilms, `day`);
            break;
          case PeriodStats.WEEK:
            this._getFilteredStatsFilms(this._originalFilms, `week`);
            break;
          case PeriodStats.MONTH:
            this._getFilteredStatsFilms(this._originalFilms, `month`);
            break;
          case PeriodStats.YEAR:
            this._getFilteredStatsFilms(this._originalFilms, `year`);
            break;
          default:
            throw new Error(`Incorrect value`);
        }
      });
    });
  }

  _getFilteredStatsFilms(filteredFilms, period) {
    const startDate = moment().startOf(period).format(`YYYY-MM-DD`);
    this._films = filteredFilms.filter((elem) => {
      const dateViewed = moment(elem.viewedDate).format(`YYYY-MM-DD`);
      return moment(dateViewed).isSame(startDate, period) && elem;
    });
    this._showStatistics();
  }

  _unrenderStatistics() {
    unrender(this._statisticChart.getElement());
    unrender(this._statistic.getElement());
    this._statisticChart.removeElement();
    this._statistic.removeElement();
  }

  _unrenderStatisticInfo() {
    unrender(this._statisticInfo.getElement());
    this._statisticInfo.removeElement();
  }
}

export default ChartController;
