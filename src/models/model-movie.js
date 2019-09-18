import moment from 'moment';
import {getTransformRuntime} from '../utils';

class ModelMovie {
  constructor(data) {
    this.id = Number(data[`id`]);
    this.title = data[`film_info`][`title`];
    this.titleOriginal = data[`film_info`][`alternative_title`] || ``;
    this.poster = data[`film_info`][`poster`];
    this.description = data[`film_info`][`description`];
    this.rating = data[`film_info`][`total_rating`];
    this.date = Number(moment(data[`film_info`][`release`][`date`]).format(`x`));
    this.genres = data[`film_info`][`genre`];
    this.ageRating = data[`film_info`][`age_rating`];
    this.runtime = getTransformRuntime(data[`film_info`][`runtime`]);
    this.details = {
      director: {name: `Director`, value: data[`film_info`][`director`]},
      writers: {name: `Writers`, value: data[`film_info`][`writers`]},
      actors: {name: `Actors`, value: data[`film_info`][`actors`]},
      date: {name: `Release Date`, value: new Date(data[`film_info`][`release`][`date`])},
      runtime: {name: `Runtime`, value: getTransformRuntime(data[`film_info`][`runtime`])},
      country: {name: `Country`, value: data[`film_info`][`release`][`release_country`]},
      genres: {name: `Genre`, value: data[`film_info`][`genre`]}
    };
    this.personalRating = data[`user_details`][`personal_rating`] || null;
    this.isFavorite = Boolean(data[`user_details`][`favorite`]);
    this.isWatchlist = Boolean(data[`user_details`][`watchlist`]);
    this.isViewed = Boolean(data[`user_details`][`already_watched`]);
    this.viewedDate = data[`user_details`][`watching_date`];
    this.comments = data[`comments`];
    this.isFilmDetails = false;
  }

  static parseMovie(data) {
    return new ModelMovie(data);
  }

  static parseMovies(data) {
    return data.map(ModelMovie.parseMovie);
  }
}

export default ModelMovie;
