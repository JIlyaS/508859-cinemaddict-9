export const getFilmCard = (card) => {
  return `<article class="film-card">
    <h3 class="film-card__title">${card.title}</h3>
    <p class="film-card__rating">${card.rating.toFixed(1)}</p>
    <p class="film-card__info">
      <span class="film-card__year">${card.year}</span>
      <span class="film-card__duration">${card.runtime}</span>
      <span class="film-card__genre">${card.genre}</span>
    </p>
    <img src="./images/posters/${card.poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${card.shortDescription}</p>
    <a class="film-card__comments">${card.countComments} comments</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${card.isWatchlist && `film-card__controls-item--active`}">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${card.isViewed && `film-card__controls-item--active`}">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite ${card.isFavorite && `film-card__controls-item--active`}">Mark as favorite</button>
    </form>
  </article>`;
};
