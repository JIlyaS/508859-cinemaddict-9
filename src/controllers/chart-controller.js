import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Statistics from '../components/statistics';
import {render, unrender} from '../utils';
import {FILM_GENRES} from '../constants';
import {getRang} from '../components/data';

class ChartController {
  constructor(container) {
    this._container = container;
    this._statistic = new Statistics({rang: {}, watchedMovies: {}, totalDuration: {}, topGenre: {}});
    this._chart = {};

    this._films = [];

    this._init();
    this.hide();
  }

  _init() {
    // render(this._container, this._searchInfo.getElement());
    // this._renderSerchedFilmsWrapper();

    // this._search.getElement().querySelector(`.search__reset`)
    //   .addEventListener(`click`, () => {
    //     this._search.getElement().querySelector(`.search__field`).value = ``;
    //     this._onSearchCloseButtonClick();
    //   });

    // this._search.getElement().querySelector(`.search__field`)
    //   .addEventListener(`keyup`, (evt) => {
    //     const {value} = evt.target;
    //     if (value.length >= MIN_SEARCH_SYMBOLS) {
    //       const films = this._films.filter((film) => {
    //         return film.title.includes(value);
    //       });
    //       this._showSearchResult(value, films);
    //     }
    //   });
  }

  hide() {
    this._statistic.getElement().classList.add(`visually-hidden`);
  }

  show(films) {
    this._films = films;
    this._statistic.getElement().classList.remove(`visually-hidden`);

    this._showChart();
  }

  _showChart() {
    const genresObj = FILM_GENRES.reduce((acc, item) => {
      acc[item] = 0;
      return acc;
    }, {});

    const filmGenres = this._films.map((film) => film.genre);

    filmGenres.reduce((acc, item) => {
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
    const ctx = this._statistic.getElement().querySelector(`.statistic__chart`);

    this._chart = new Chart(ctx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: Object.keys(genresObj),
        datasets: [{
          backgroundColor: `#FBE44D`,
          data: Object.values(genresObj)
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

  _unrenderStatistics() {
    unrender(this._statistic.getElement());
    this._statistic.removeElement();
  }
}

export default ChartController;
