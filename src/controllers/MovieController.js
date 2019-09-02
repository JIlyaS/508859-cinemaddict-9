class MovieController {
  constructor(container, dataFilms, onDataChange, onChangeView) {
    this._container = container;
    this._dataFilms = dataFilms;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
  }

  init() {
    const filmCard = new FilmCard(film);
    const detailsPopup = new DetailsPopup(film);

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        unrender(detailsPopup.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    filmCard.getElement()
    .querySelector(`.film-card__poster`)
    .addEventListener(`click`, () => {
      render(this._popupContainer, detailsPopup.getElement(), Position.AFTEREND);
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    filmCard.getElement()
      .querySelector(`.film-card__title`)
      .addEventListener(`click`, () => {
        render(this._popupContainer, detailsPopup.getElement(), Position.AFTEREND);
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    filmCard.getElement()
      .querySelector(`.film-card__comments`)
      .addEventListener(`click`, () => {
        render(this._popupContainer, detailsPopup.getElement(), Position.AFTEREND);
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    detailsPopup.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, () => {
        unrender(detailsPopup.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    detailsPopup.getElement().querySelector(`.film-details__comment-input`)
      .addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    detailsPopup.getElement().querySelector(`.film-details__comment-input`)
      .addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    render(container.getElement().querySelector(`.films-list__container`), filmCard.getElement());
  }
}

export default MovieController;
