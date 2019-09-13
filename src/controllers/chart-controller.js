import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import moment from 'moment';
import Statistics from '../components/statistics';
import {render, unrender} from '../utils';
import {FILM_GENRES, STATS_DAYS_AGO, PeriodStats} from '../constants';
import {getRang} from '../components/data';

class ChartController {
  constructor(container) {
    this._container = container;
    this._statistic = new Statistics({rang: {}, watchedMovies: {}, totalDuration: {}, topGenre: {}});
    this._chart = {};

    this._films = [];
    this._originalFilms = [];
    this._filteredFilms = [];
    this._onlyGenres = {};

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
      unrender(this._statistic.getElement());
      this._statistic.removeElement();
    }

    const genresObj = FILM_GENRES.reduce((acc, item) => {
      acc[item] = 0;
      return acc;
    }, {});

    const filmGenres = this._films.filter((elem) => elem.isViewed).map((film) => film.genre);

    this._onlyGenres = filmGenres.reduce((acc, item) => {
      if (acc.hasOwnProperty(item)) {
        acc[item]++;
        genresObj[item]++;
      } else {
        acc[item] = 1;
        genresObj[item] = 1;
      }
      return acc;
    }, {});

    const topGenre = Object.entries(genresObj).reduce(function (prev, current) {
      return (prev[1] > current[1]) ? prev : current;
    });


    const watchedMovies = this._films.filter((elem) => {
      return elem.isViewed;
    });

    const result = {hours: 0, minutes: 0};

    const totalDuration = watchedMovies.reduce((_, item) => {
      result.hours += item.runtime.hours;
      result.minutes += item.runtime.minutes;
      return result;
    }, {});

    const addHours = Math.trunc(totalDuration.minutes / 60);
    const realMonutes = totalDuration.minutes % 60;
    totalDuration.hours += addHours;
    totalDuration.minutes = realMonutes;

    this._statistic = new Statistics({rang: getRang(watchedMovies.length), watchedMovies: watchedMovies.length, totalDuration, topGenre: topGenre[0]});


    this._getStatisticActions();
    const ctx = this._statistic.getElement().querySelector(`.statistic__chart`);

    this._chart = new Chart(ctx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: Object.keys(genresObj),
        // labels: Object.keys(this._onlyGenres),
        datasets: [{
          backgroundColor: `#FBE44D`,
          data: Object.values(genresObj)
          // data: Object.values(this._onlyGenres)
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
              padding: 85,
            },
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
        }
      }
    });

    render(this._container, this._statistic.getElement());
  }

  _getStatisticActions() {
    this._filteredFilms = this._originalFilms.slice().filter((film) => {
      return film.viewedTime;
    });
    console.log(this._filteredFilms);
    this._statistic.getElement().querySelectorAll(`.statistic__filters-input`).forEach((elem) => {
      elem.addEventListener(`click`, (evt) => {
        switch (evt.target.value) {
          case PeriodStats.ALL_TIME:
            this._films = this._originalFilms;
            this._showChart();
            break;
          case PeriodStats.TODAY:
            this._films = this._filteredFilms.filter((elemToday) => {
              const dateViewed = moment(elemToday.viewedTime).format(`YYYY-MM-DD`);
              const dateNow = moment().format(`YYYY-MM-DD`);
              return moment(dateViewed).isSame(dateNow, `day`) && elemToday;
            });
            this._showChart();
            break;
          case PeriodStats.WEEK:
            this._films = this._filteredFilms.filter((elemWeek) => {
              const dateViewed = moment(elemWeek.viewedTime).format(`YYYY-MM-DD`);
              const dateNow = moment().format(`YYYY-MM-DD`);
              return moment(dateViewed).isSame(dateNow, `week`) && elemWeek;
            });
            this._showChart();
            break;
          case PeriodStats.MONTH:
            console.log(this._filteredFilms);
            this._films = this._filteredFilms.filter((elemMonth) => {
              const dateViewed = moment(elemMonth.viewedTime).format(`YYYY-MM-DD`);
              const dateNow = moment().format(`YYYY-MM-DD`);
              console.log(moment(dateViewed).isSame(dateNow, `month`), elemMonth);
              return moment(dateViewed).isSame(dateNow, `month`) && elemMonth;
            });
            this._showChart();
            break;
          case PeriodStats.YEAR:
            this._films = this._filteredFilms.filter((elemYear) => {
              const dateViewed = moment(elemYear.viewedTime).format(`YYYY-MM-DD`);
              const dateNow = moment().format(`YYYY-MM-DD`);
              return moment(dateViewed).isSame(dateNow, `year`) && elemYear;
            });
            this._showChart();
            break;
          default:
            throw new Error(`Incorrect value`);
        }
      });
    });
  }

  _unrenderStatistics() {
    unrender(this._statistic.getElement());
    this._statistic.removeElement();
  }
}

export default ChartController;
