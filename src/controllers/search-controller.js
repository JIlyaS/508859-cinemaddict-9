import SearchInfo from '../components/search-info';
// import SearchResult from '../components/search-result';
import FilmsWrapper from '../components/films-wrapper';
import FilmListController from './film-list-controller';
import {render, unrender} from '../utils';
import {Position} from '../constants';
import FilmsList from '../components/films-list';


class SearchController {
  constructor(container, search, onSearchCloseButtonClick) {
    this._container = container;
    this._search = search;
    this._onSearchCloseButtonClick = onSearchCloseButtonClick;

    this._films = [];

    this._filmsSearchWrapper = new FilmsWrapper();
    this._filmsSearchList = new FilmsList();
    this._searchInfo = new SearchInfo({});

    this._filmListController = new FilmListController(this._filmsSearchWrapper, this._filmsSearchList, this._filmsSearchList, this._filmsSearchList, this._onDataChange.bind(this));

    // this._searchResult = new SearchResult();
    // this._searchResultInfo = new SearchResultInfo({});
    // this._searchResultGroup = new SearchResultGroup({});
    // this._taskListController = new TaskListController(
    //   this._searchResultGroup.getElement().querySelector(`.result__cards`),
    //   this._onDataChange.bind(this)
    // );

    this._init();
  }

  _init() {
    this.hide();
    render(this._container, this._searchInfo.getElement());
    render(this._container, this._filmsSearchWrapper.getElement());
    render(this._filmsSearchWrapper.getElement(), this._filmsSearchList.getElement());
    // render(this._searchResult.getElement(), this._searchResultGroup.getElement());
    // render(this._searchResultGroup.getElement(), this._searchResultInfo.getElement(), RenderPosition.AFTERBEGIN);

    this._search.getElement().querySelector(`.search__reset`)
      .addEventListener(`click`, () => {
        this._search.getElement().querySelector(`.search__field`).value = ``;
        this._onSearchCloseButtonClick();
      });

    this._search.getElement().querySelector(`.search__field`)
      .addEventListener(`keyup`, (evt) => {
        const {value} = evt.target;
        if (value.length > 2) {
          const films = this._films.filter((film) => {
            return film.title.includes(value);
          });

          this._showSearchResult(value, films);
        }
      });
  }

  hide() {
    this._searchInfo.getElement().classList.add(`visually-hidden`);
    this._filmsSearchWrapper.getElement().classList.add(`visually-hidden`);
  }

  show(tasks) {
    this._tasks = tasks;

    if (this._filmsSearchWrapper.getElement().classList.contains(`visually-hidden`)) {
      this._searchInfo.getElement().classList.remove(`visually-hidden`);
      this._filmsSearchWrapper.getElement().classList.remove(`visually-hidden`);
      this._showSearchResult(``, this._tasks);
    }
  }

  _showSearchResult(text, films) {
    if (this._searchInfo) {
      unrender(this._searchInfo.getElement());
      this._searchInfo.removeElement();
    }

    this._searchInfo = new SearchInfo({count: films.length});

    render(this._container, this._searchInfo.getElement(), Position.AFTERBEGIN);
    this._filmListController.setFilms(films);
  }

  _onDataChange(tasks) {
    this._tasks = tasks;
  }
}

export default SearchController;
