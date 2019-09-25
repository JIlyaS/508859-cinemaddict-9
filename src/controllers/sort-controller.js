import Sort from '../components/sort';
import {render} from '../utils';
import {SortName, Position} from '../constants';

class SortController {
  constructor(container, renderFilmsList) {
    this._container = container;
    this._renderFilmsList = renderFilmsList;
    this._sortBlock = new Sort();
  }

  init() {
    this._sortBlock.getElement().querySelectorAll(`.sort__button`).forEach((elemBtnSort) => {
      elemBtnSort.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        const sortButtons = this._sortBlock.getElement().querySelectorAll(`.sort__button`);
        sortButtons.forEach((sortButton) => {
          sortButton.classList.remove(`sort__button--active`);
        });
        evt.target.classList.add(`sort__button--active`);

        switch (evt.target.dataset.sortType) {
          case SortName.DATE:
            const sortedByDateUpFilms = this._films.slice().sort((prevFilm, currFilm) => currFilm.date - prevFilm.date);
            this._films = [...sortedByDateUpFilms];
            this._renderFilmsList(this._films);
            break;
          case SortName.RATING:
            const sortedByRatingsFilms = this._films.slice().sort((prevFilm, currFilm) => currFilm.rating - prevFilm.rating);
            this._films = [...sortedByRatingsFilms];
            this._renderFilmsList(sortedByRatingsFilms);
            break;
          case SortName.DEFAULT:
            const defaultFilms = this._films.slice().sort((prevFilm, currFilm) => Number(prevFilm.id) - Number(currFilm.id));
            this._films = [...defaultFilms];
            this._renderFilmsList(this._films);
            break;
          default:
            throw new Error(`Incorrect dataset`);
        }
      });
    });

    render(this._container.getElement(), this._sortBlock.getElement(), Position.BEFOREBEGIN);
  }

  setFilms(films) {
    this._films = films;
  }

  showViewSort() {
    this._sortBlock.getElement().classList.remove(`visually-hidden`);
  }

  hide() {
    this._sortBlock.getElement().classList.add(`visually-hidden`);
  }
}

export default SortController;
