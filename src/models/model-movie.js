import moment from 'moment';

class ModelMovie {
  constructor(data) {
    this.id = data[`id`];
    this.title = data[`film_info`][`title`];
    this.titleOriginal = data[`film_info`][`alternative_title`] || ``;
    this.poster = data[`film_info`][`poster`];
    this.description = data[`film_info`][`description`];
    this.rating = data[`film_info`][`total_rating`];
    this.date = Number(moment(data[`film_info`][`release`][`date`]).format(`x`));
    this.genres = data[`film_info`][`genre`];
    this.ageRating = data[`film_info`][`age_rating`];
    this.runtime = data[`film_info`][`runtime`];
    this.comments = data[`comments`];
    this.details = {
      director: {name: `Director`, value: data[`film_info`][`director`]},
      writers: {name: `Writers`, value: data[`film_info`][`writers`]},
      actors: {name: `Actors`, value: data[`film_info`][`actors`]},
      date: {name: `Release Date`, value: new Date(data[`film_info`][`release`][`date`])},
      runtime: {name: `Runtime`, value: data[`film_info`][`runtime`]},
      country: {name: `Country`, value: data[`film_info`][`release`][`release_country`]},
      genres: {name: `Genre`, value: data[`film_info`][`genre`]}
    };

    this.personalRating = Number(data[`user_details`][`personal_rating`]) || null;
    this.isFavorite = Boolean(data[`user_details`][`favorite`]);
    this.isWatchlist = Boolean(data[`user_details`][`watchlist`]);
    this.isViewed = Boolean(data[`user_details`][`already_watched`]);
    this.viewedDate = data[`user_details`][`watching_date`];
  }

  static parseMovie(data) {
    return new ModelMovie(data);
  }

  static parseMovies(data) {
    return data.map(ModelMovie.parseMovie);
  }

  toRAW() {
    return {
      'id': this.id,
      'comments': this.comments,
      'film_info': {
        'title': this.title,
        'alternative_title': this.titleOriginal,
        'poster': this.poster,
        'description': this.description,
        'total_rating': Number(this.rating),
        'genre': this.genres,
        'age_rating': Number(this.ageRating),
        'runtime': Number(this.runtime),
        'release': {
          'date': new Date(this.date),
          'release_country': this.details[`country`].value
        },
        'director': this.details[`director`].value,
        'writers': this.details[`writers`].value,
        'actors': this.details[`actors`].value,
      },
      'user_details': {
        [`personal_rating`]: Number(this.personalRating),
        favorite: Boolean(this.isFavorite),
        watchlist: Boolean(this.isWatchlist),
        [`already_watched`]: Boolean(this.isViewed),
        [`watching_date`]: new Date(this.viewedDate)
      }
    };
  }
}

export default ModelMovie;
