import ModelMovie from './models/model-movie';
import {objectToArray} from './utils';

class Provider {
  constructor({api, store}) {
    this._api = api;
    this._store = store;
  }

  updateMovie({id, movie}) {
    if (this._isOnline()) {
      return this._api.updateMovie({
        id, movie
      }).then((dataMovie) => {
        this._store.setItem({key: dataMovie.id, item: dataMovie.toRAW()});
        return movie;
      });
    } else {
      const dataMovie = movie;
      this._store.setItem({key: dataMovie.id, item: dataMovie});
      return Promise.resolve(ModelMovie.parseMovies(dataMovie));
    }
  }

  getMovies() {
    if (this._isOnline()) {
      return this._api.getMovies()
      .then((movies) => {
        movies.map((dataMovie) => this._store.setItem({key: dataMovie.id, item: dataMovie.toRAW()}));
        return movies;
      });
    } else {
      const rawMoviesMap = this._store.getAll();
      const rawMovies = objectToArray(rawMoviesMap);
      const movies = ModelMovie.parseMovies(rawMovies);

      return Promise.resolve(movies);
    }
  }

  syncMovies() {
    return this._api.syncMovies({movies: objectToArray(this._store.getAll())});
  }

  _isOnline() {
    return window.navigator.onLine;
  }
}

export default Provider;
