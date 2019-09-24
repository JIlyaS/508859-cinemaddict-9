export const EMOJI = [`smile`, `sleeping`, `puke`, `angry`];
export const COMMENTS = [`Interesting setting and a good cast`, `Booooooooooring`, `Very very old. Meh`, `Almost two hours? Seriously?`];
export const COMMENT_AUTHORS = [`Tim Macoveev`, `John Doe`, `Ilya Kolmakov`];
export const MONTHS = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];
export const NAME_FILTERS = [
  {title: `All movies`, href: `all`},
  {title: `Watchlist`, href: `watchlist`},
  {title: `History`, href: `history`},
  {title: `Favorites`, href: `favorites`},
  {title: `Stats`, href: `stats`}
];
export const MENU_STATISTIC = [
  {id: `all-time`, title: `All time`, checked: true},
  {id: `today`, title: `Today`},
  {id: `week`, title: `Week`},
  {id: `month`, title: `Month`},
  {id: `year`, title: `Year`}
];
export const AGE_RESTRICTIONS = [`0+`, `6+`, `12+`, `18+`];
export const MAX_HOURS = 3;
export const MIN_MINUTES = 30;
export const MAX_MINUTES = 29;
export const HOUR = 60;
export const COUNT_FILM_CARDS = 5;
export const MILLISECONDS_DAY = 24 * 60 * 60 * 1000;
export const COUNT_DAYS_COMMENTS = 10;
export const MILLISECONDS_YEAR = MILLISECONDS_DAY * 365;
export const STATS_DAYS_AGO = 40;
export const WATCHED_MOVIES = 9;
export const COUNT_FILMS = 21;
export const MINUS_INDEX = 1;
export const RANDOM_COUNT_COMMENTS = 10;
export const RANDOM_YEAR_START = 1990;
export const RANDOM_YEAR_DURATION = 29;
export const ADD_MORE_CARD = 5;
export const DAY_AGO = 20;
export const YEAR_AGO = 29;
export const PERSONAL_RATING_COUNT = 9;
export const ENTER_KEY = 13;
export const MIN_SEARCH_SYMBOLS = 3;
export const SHORT_DESCRIPTION_LENGTH = 140;
export const ANIMATION_TIMEOUT = 600;
export const ANIMATION_DURATION = ANIMATION_TIMEOUT / 1000;
export const ANIMATION = `shake ${ANIMATION_DURATION}s`;
export const Position = {
  BEFOREBEGIN: `beforebegin`,
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`
};
export const RenderPosition = {
  DEFAULT: `default`,
  RATED: `rated`,
  COMMENTED: `commented`
};
export const Sorted = {
  DATE: `date`,
  RATING: `rating`,
  DEFAULT: `default`
};
export const MenuName = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`,
  STATS: `stats`
};

export const PeriodStats = {
  ALL_TIME: `all-time`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`
};

export const FILM_GENRES = [
  `Drama`,
  `Musical`,
  `Western`,
  `Comedy`,
  `Cartoon`,
  `Mystery`,
  `Thriller`,
  `Fighter`,
  `Horror`,
  `Melodrama`,
  `Film-Noir`
];

export const WRITERS = [
  `Gary Scott Thompson`,
  `David Ayer`,
  `Michael Robert Johnson`,
  `Jon Spaihts`,
  `Robert Rodat`,
  `Drew Goddard`,
  `Duane Adler`,
  `Roger Avary`,
  `Fran Walsh`,
  `Jonathan Nolan`,
  `J.J. Abrams`,
  `Ted Elliott`,
  `Bob Peterson`
];

export const ACTORS = [
  `Robert Downey Jr.`,
  `Jude Law`,
  `Rachel McAdams`,
  `Jennifer Lawrence`,
  `Chris Pratt`,
  `Tom Hanks`,
  `Vin Diesel`,
  `Paul Walker`,
  `Matt Damon`,
  `Jessica Chastain`,
  `Channing Tatum`,
  `Radha Mitchell`,
  `Jodelle Ferland`,
  `Sean Bean`,
  `Martin Freeman`,
  `Ian McKellen`,
  `Christian Bale`,
  `Heath Ledger`,
  `Daisy Ridley`,
  `Oscar Isaac`,
  `Adam Driver`,
  `Orlando Bloom`,
  `Johnny Depp`,
  `Keira Knightley`,
  `Alan Rickman`,
  `Bruce Willis`,
  `Daniel Radcliffe`
];

export const COUNTRIES = [
  `USA`,
  `Germany`,
  `Australia`,
  `New Zealand`,
  `Great Britain`,
  `France`
];

export const FILM_NAMES = [
  `Once Upon a Time ... in Hollywood`,
  `The Lion King`,
  `Interstellar`,
  `The Dark Knight`,
  `The Dark Knight Rises`,
  `The Martian`,
  `Passengers`,
  `The Fast and the Furious`,
  `Step Up`,
  `Joker`,
  `Silent Hill`,
  `Intouchables`,
  `The Prestige`,
  `The Lord of the Rings: The Return of the King`,
  `Saving Private Ryan`,
  `The Hobbit: An Unexpected Journey`,
  `The Terminal`,
  `Sherlock Holmes`,
  `Die Hard`,
  `Harry Potter and the Deathly Hallows: Part 2`,
  `Pirates of the Caribbean: At World's End`,
  `Inception`,
  `Up`,
  `Star Wars: The Rise of Skywalker`
];

export const FULL_FILM_NAMES = [
  `Once Upon a Time ... in Hollywood`,
  `The Lion King`,
  `Interstellar`,
  `The Dark Knight`,
  `The Dark Knight Rises`,
  `The Martian`,
  `Passengers`,
  `The Fast and the Furious`,
  `Step Up`,
  `Joker`,
  `Silent Hill`,
  `Intouchables`,
  `The Prestige`,
  `The Lord of the Rings: The Return of the King`,
  `Saving Private Ryan`,
  `The Hobbit: An Unexpected Journey`,
  `The Terminal`,
  `Sherlock Holmes`,
  `Die Hard`,
  `Harry Potter and the Deathly Hallows: Part 2`,
  `Pirates of the Caribbean: At World's End`,
  `Inception`,
  `Up`,
  `Star Wars: The Rise of Skywalker`
];

export const POSTER_LINKS = [
  `once-upon-time-hollywood.jpg`,
  `the-lion-king.jpg`,
  `interstellar.jpg`,
  `the-dark-knight.jpg`,
  `the-dark-knight-rises.jpg`,
  `the-martian.jpg`,
  `passengers.jpg`,
  `the-fast-and-the-furious.jpg`,
  `step-up.jpg`,
  `joker.jpg`,
  `silent-hill.jpg`,
  `intouchables.jpg`,
  `the-prestige.jpg`,
  `the-return-of-the-king.jpg`,
  `saving-private-ryan.jpg`,
  `the-hobbit-an-unexpected-journey.jpg`,
  `the-terminal.jpg`,
  `sherlock-holmes.jpg`,
  `die-hard-4.jpg`,
  `harry-potter-part2.jpg`,
  `inception.jpg`,
  `pirates-caribbean-world-end.jpg`,
  `star-wars-9.jpg`,
  `up.jpg`
];

export const DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`, `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

export const DIRECTORS = [
  `Christopher Nolan`,
  `Todd Phillips`,
  `Quentin Tarantino`,
  `Morten Tyldum`,
  `Jon Favreau`,
  `Ridley Scott`,
  `Guy Ritchie`,
  `Christophe Gans`,
  `Anne Fletcher`,
  `Peter Jackson`,
  `Rob Cohen`,
  `Steven Spielberg`,
  `Olivier Nakache`,
  `J.J. Abrams`,
  `Gore Verbinski`,
  `Pete Docter`,
  `John McTiernan`,
  `David Yates`
];
export const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};
export const ActionType = {
  UPDATE: `update`,
  CREATE: `create`,
  CREATE_COMMENT: `create_comment`,
  DELETE_COMMENT: `delete_comment`,
  UPDATE_RATING: `update_rating`
};
export const AUTHORIZATION = `Basic eo0w590ik29889a=${Math.random()}`;
export const SERVER = `https://htmlacademy-es-9.appspot.com/cinemaddict/`;
