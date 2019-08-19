import {getFilmCards} from './film-cards';
import {getShowBtn} from './show-btn';
import {dataRatedFilms, dataCommentedFilms} from '../utils/constants';
import {dataFilmCards} from './data';

export const getFilmListWrapper = () => {
  return `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

      <div class="films-list__container">
        ${getFilmCards(dataFilmCards)}
      </div>
      ${getShowBtn()}
    </section>
    <section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>
      <div class="films-list__container">
        ${getFilmCards(dataRatedFilms)}
      </div>
    </section>
    <section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container">
        ${getFilmCards(dataCommentedFilms)}
      </div>
    </section>
  </section>`;
};
