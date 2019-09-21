import MovieController from './movie-controller';
import {RenderPosition} from '../constants';

class FilmListController {
  constructor(filmsWrapper, container, popupWrapper, onDataChangeMain, renderPosition = RenderPosition.DEFAULT) {
    this._filmsWrapper = filmsWrapper;
    this._container = container;
    this._popupWrapper = popupWrapper;
    this._onDataChangeMain = onDataChangeMain;
    this._renderPosition = renderPosition;

    this._films = [];
    this._subscriptions = [];

    this._onChangeView = this._onChangeView.bind(this);
    // this._onDataChange = this._onDataChange.bind(this);
  }

  setFilms(films) {
    this._films = films;
    this._subscriptions = [];

    switch (this._renderPosition) {
      case RenderPosition.RATED:
        this._ratedFilms = (this._films.sort((prevFilm, currFilm) => currFilm.rating - prevFilm.rating).slice(0, 2));
        this._ratedFilms.forEach((film) => this._renderFilmsCard(film, this._container, this._popupWrapper));
        break;
      case RenderPosition.COMMENTED:
        this._commentedFilms = (this._films.sort((prevFilm, currFilm) => currFilm.comments.length - prevFilm.comments.length)).slice(0, 2);
        this._commentedFilms.forEach((film) => this._renderFilmsCard(film, this._container, this._popupWrapper));
        break;
      case RenderPosition.DEFAULT:
        this._films.forEach((film) => this._renderFilmsCard(film, this._container, this._popupWrapper));
        break;
      default:
        throw new Error(`Incorrect render position`);
    }
  }

  addFilms(films) {
    films.forEach((film) => this._renderFilmsCard(film, this._container, this._popupWrapper));
    this._films = this._films.concat(films);
  }

  _renderFilmsCard(film, container, popupContainer) {
    const movieController = new MovieController(container, film, popupContainer, this._onDataChangeMain, this._onChangeView);
    movieController.init();
    this._subscriptions.push(movieController.setDefaultView.bind(movieController));
  }

  _onChangeView() {
    this._subscriptions.forEach((subscription) => subscription());
  }
}

export default FilmListController;
