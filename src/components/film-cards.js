import {getFilmCard} from './film-card';

export const getFilmCards = (cards) => {
  return cards.map((card) => getFilmCard(card)).join(` `);
};
