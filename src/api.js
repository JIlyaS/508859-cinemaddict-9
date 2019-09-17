import ModelMovie from './model-movie';
import {Method} from './constants';
import {checkStatus, toJSON} from './utils';

class API {
  constructor({server, authorization}) {
    this._server = server;
    this._authorization = authorization;
  }

  getMovies() {
    return this._load({url: `movies`}).then(toJSON).then(ModelMovie.parseMovies);
  }

  getMovieComments({movieId}) {
    return this._load({url: `/comments/${movieId}`}).then(toJSON);
  }

  createComment({commentId}) {

  }

  deleteComment({commentId}) {

  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._server}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        console.error(`fetch error: ${err}`);
        throw err;
      });
  }
}

export default API;
