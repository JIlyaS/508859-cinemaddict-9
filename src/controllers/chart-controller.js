import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Statistics from '../components/statistics';
import {render, unrender} from '../utils';
import {MIN_SEARCH_SYMBOLS, FILM_GENRES, Position} from '../constants';
import FilmsList from '../components/films-list';

class ChartController {
  constructor(container) {
    this._container = container;
    this._statistic = new Statistics({});
    this._ctx = this._statistic.getElement().querySelector(`.statistic__chart`);
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
    // const value = this._search.getElement().querySelector(`.search__field`).value;
    // this._searchInfo.getElement().classList.remove(`visually-hidden`);
    // this._filmsSearchWrapper.getElement().classList.remove(`visually-hidden`);
    // const filteredFilms = this._films.filter((film) => {
    //   return film.title.toLowerCase().includes(value.toLowerCase());
    // });
    this._showChart();
  }

  _showChart() {
    // if (this._statistic) {
    //   this._unrenderStatistics();
    // }

    // render(this._container, this._statistic.getElement());
    const watchedMovies = this._films.filter((elem) => {
      return elem.isViewed;
    });

    const filmGenres = this._films.map((film) => film.genre);

    const countGenresObj = filmGenres.reduce((acc, item) => {
      if (acc.hasOwnProperty(item)) {
        acc[item]++;
      } else {
        acc[item] = 1;
      }
      return acc;
    }, {});

    this._statistic = new Statistics({watchedMovies: watchedMovies.length});

    this._chart = new Chart(this._ctx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: Object.keys(countGenresObj),
        datasets: [{
          backgroundColor: `#FBE44D`,
          data: Object.values(countGenresObj)
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
            gridLines: {
              display: false,
              drawBorder: false
            }
          }],
          xAxes: [{
            ticks: {
              display: false,
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
        }
      }
    });

    // render(this._container, this._searchInfo.getElement(), Position.AFTERBEGIN);

    // render(this._container, this._searchInfo.getElement());
    // this._renderSerchedFilmsWrapper();

    // return this._filmListController.setFilms(films);

    render(this._container, this._statistic.getElement());
  }

  // _onDataChange(films) {
  //   this._films = films;

  //   this._renderFilmsList(this._films);
  // }

  _unrenderStatistics() {
    unrender(this._statistic.getElement());
    this._statistic.removeElement();
  }

  // _renderFilmsList(films) {
  //   this._unrenderSerchedFilmsWrapper();
  //   render(this._container, this._searchInfo.getElement());
  //   this._renderSerchedFilmsWrapper();

  //   return this._filmListController.setFilms(films);
  // }
}

export default ChartController;
