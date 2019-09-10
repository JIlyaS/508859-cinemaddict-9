import MovieController from './movie-controller';
import {MORE_RATED, MORE_COMMENTED, RenderPosition} from '../constants';

class FilmListController {
  constructor(filmsWrapper, container, popupWrapper, onDataChange, renderPosition = RenderPosition.DEFAULT) {
    this._filmsWrapper = filmsWrapper;
    this._container = container;
    this._popupWrapper = popupWrapper;
    this._onDataChangeMain = onDataChange;

    this._subscriptions = [];
    this._films = [];

    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
  }

  setFilms(films) {
    this._films = films;
    this._subscriptions = [];

    // switch (renderPosition) {
    //   case
    // }
    this._films.forEach((film) => this._renderFilmsCard(film, this._container, this._popupWrapper));
  }

  setRatedFilms(films) {
    this._films = films;
    this._ratedFilms = (this._films.filter((film) => film.rating > MORE_RATED)).slice(0, 2);

    this._ratedFilms.forEach((film) => this._renderFilmsCard(film, this._container, this._popupWrapper));
  }

  setCommentedFilms(films) {
    this._films = films;
    this._commentedFilms = (this._films.filter((film) => film.comments.length >= MORE_COMMENTED)).slice(0, 2);

    this._commentedFilms.forEach((film) => this._renderFilmsCard(film, this._container, this._popupWrapper));
  }

  _renderFilmsCard(film, container, popupContainer) {
    const movieController = new MovieController(container, film, popupContainer, this._onDataChange, this._onChangeView);
    movieController.init();
    this._subscriptions.push(movieController.setDefaultView.bind(movieController));
  }

  _onChangeView() {
    this._subscriptions.forEach((subscription) => subscription());
  }

  _onDataChange(newData, oldData, updateComment = null) {
    if (newData === null) {
      const index = this._films.findIndex((film) => film === oldData);
      const commentIndex = this._films[index].comments.findIndex((comment) => comment === updateComment);
      this._films[index].comments.splice(commentIndex, 1);
    } else if (oldData === null) {
      const index = this._films.findIndex((film) => film === newData);
      this._films[index].comments.push(updateComment);
    } else {
      const index = this._films.findIndex((film) => film === oldData);
      this._films[index] = newData;
    }

    this.setFilms(this._films);
    this._onDataChangeMain(this._films);
  }

  // _renderFilmsList(films) {
  //   if (films.length === 0) {
  //     return this._renderEmptyResult();
  //   }

  //   this._unrenderFilmList();

  //   render(this._filmsWrapper.getElement(), this._commentedList.getElement(), Position.AFTERBEGIN);
  //   render(this._filmsWrapper.getElement(), this._ratedList.getElement(), Position.AFTERBEGIN);
  //   render(this._filmsWrapper.getElement(), this._filmsList.getElement(), Position.AFTERBEGIN);

  //   if (COUNT_FILMS > films.length) {
  //     this._renderShowButton();
  //   }

  //   films.filter((film) => film.rating > MORE_RATED).slice(0, 2).forEach((taskMock) => this._renderFilmsCard(taskMock, this._ratedList, this._popupWrapper));
  //   films.filter((film) => film.comments.length >= MORE_COMMENTED).slice(0, 2).forEach((taskMock) => this._renderFilmsCard(taskMock, this._commentedList, this._popupWrapper));
  //   return films.forEach((taskMock) => this._renderFilmsCard(taskMock, this._filmsList, this._popupWrapper));
  // }
}

export default FilmListController;
