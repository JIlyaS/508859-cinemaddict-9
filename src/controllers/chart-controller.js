import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Statistics from '../components/statistics';
import {render, unrender} from '../utils';
import {MIN_SEARCH_SYMBOLS, Position} from '../constants';
import FilmsList from '../components/films-list';

class ChartController {
  constructor(container) {
    this._container = container;
    this._statistic = new Statistics();
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

    console.log(this._films);

    this._chart = new Chart(this._ctx, {
      type: `horizontalBar`,
      data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [{
              label: 'My First dataset',
              backgroundColor: `#FBE44D`,
              borderColor: 'rgb(255, 99, 132)',
              data: [0, 10, 5, 2, 20, 30, 45]
          }]
      },

      // Configuration options go here
      options: {}
  });

    // const myChart = new Chart(this._ctx, {
    //   type: `bar`,
    //   data: {
    //     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    //     datasets: [{
    //       label: '# of Votes',
    //       data: [12, 19, 3, 5, 2, 3],
    //       backgroundColor: [
    //         'rgba(255, 99, 132, 0.2)',
    //         'rgba(54, 162, 235, 0.2)',
    //         'rgba(255, 206, 86, 0.2)',
    //         'rgba(75, 192, 192, 0.2)',
    //         'rgba(153, 102, 255, 0.2)',
    //         'rgba(255, 159, 64, 0.2)'
    //       ],
    //       borderColor: [
    //         'rgba(255, 99, 132, 1)',
    //         'rgba(54, 162, 235, 1)',
    //         'rgba(255, 206, 86, 1)',
    //         'rgba(75, 192, 192, 1)',
    //         'rgba(153, 102, 255, 1)',
    //         'rgba(255, 159, 64, 1)'
    //       ],
    //       borderWidth: 1
    //     }]
    //   },
    //   options: {
    //     scales: {
    //       yAxes: [{
    //         ticks: {
    //           beginAtZero: true
    //         }
    //       }]
    //     }
    //   }
    // });

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
