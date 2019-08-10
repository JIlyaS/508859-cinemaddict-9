export const dataFilmCard = [
  {
    title: `The Dance of Life`,
    rating: 8.3,
    year: 1929,
    duration: `1h 55m`,
    genre: `Musical`,
    poster: `./images/posters/the-dance-of-life.jpg`,
    description: `Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…`,
    countComments: 5
  },
  {
    title: `Sagebrush Trail`,
    rating: 3.2,
    year: 1933,
    duration: `54m`,
    genre: `Western`,
    poster: `./images/posters/sagebrush-trail.jpg`,
    description: `Sentenced for a murder he did not commit, John Brant escapes from prison determined to find the real killer. By chance Brant's narrow escap…`,
    countComments: 89
  },
  {
    title: `The Man with the Golden Arm`,
    rating: 9.0,
    year: 1955,
    duration: `1h 59m`,
    genre: `Drama`,
    poster: `./images/posters/the-man-with-the-golden-arm.jpg`,
    description: `Frankie Machine (Frank Sinatra) is released from the federal Narcotic Farm in Lexington, Kentucky with a set of drums and a new outlook on…`,
    countComments: 18
  },
  {
    title: `Santa Claus Conquers the Martians`,
    rating: 2.3,
    year: 1964,
    duration: `1h 21m`,
    genre: `Comedy`,
    poster: `./images/posters/santa-claus-conquers-the-martians.jpg`,
    description: `The Martians Momar ("Mom Martian") and Kimar ("King Martian") are worried that their children Girmar ("Girl Martian") and Bomar ("Boy Marti…`,
    countComments: 465
  },
  {
    title: `Popeye the Sailor Meets Sindbad the Sailor`,
    rating: 6.3,
    year: 1936,
    duration: `16m`,
    genre: `Cartoon`,
    poster: `./images/posters/popeye-meets-sinbad.png`,
    description: `In this short, Sindbad the Sailor (presumably Bluto playing a "role") proclaims himself, in song, to be the greatest sailor, adventurer and…`,
    countComments: 0
  }
];

export const dataRatedFilms = [
  {
    title: `The Man with the Golden Arm`,
    rating: 9.0,
    year: 1955,
    duration: `1h 59m`,
    genre: `Drama`,
    poster: `./images/posters/the-man-with-the-golden-arm.jpg`,
    description: `Frankie Machine (Frank Sinatra) is released from the federal Narcotic Farm in Lexington, Kentucky with a set of drums and a new outlook on…`,
    countComments: 18
  },
  {
    title: `The Great Flamarion`,
    rating: 8.9,
    year: 1945,
    duration: `1h 18m`,
    genre: `Mystery`,
    poster: `./images/posters/the-great-flamarion.jpg`,
    description: `The film opens following a murder at a cabaret in Mexico City in 1936, and then presents the events leading up to it in flashback. The Grea…`,
    countComments: 12
  },
];

export const dataCommentedFilms = [
  {
    title: `Santa Claus Conquers the Martians`,
    rating: 2.3,
    year: 1964,
    duration: `1h 21m`,
    genre: `Comedy`,
    poster: `./images/posters/santa-claus-conquers-the-martians.jpg`,
    description: `The Martians Momar ("Mom Martian") and Kimar ("King Martian") are worried that their children Girmar ("Girl Martian") and Bomar ("Boy Marti…`,
    countComments: 465
  },
  {
    title: `Made for Each Other`,
    rating: 5.8,
    year: 1939,
    duration: `1h 32m`,
    genre: `Comedy`,
    poster: `./images/posters/made-for-each-other.png`,
    description: `John Mason (James Stewart) is a young, somewhat timid attorney in New York City. He has been doing his job well, and he has a chance of bei…`,
    countComments: 56
  }
];

export const dataFilmDetails = {
  poster: `./images/posters/the-great-flamarion.jpg`,
  age: `18+`,
  title: `The Great Flamarion`,
  titleOriginal: `The Great Flamarion`,
  rating: 8.9,
  details: [
    {term: `Director`, cell: `Anthony Mann`},
    {term: `Writers`, cell: `Anne Wigton, Heinz Herald, Richard Wei`},
    {term: `Actors`, cell: `Erich von Stroheim, Mary Beth Hughes, Dan Duryea`},
    {term: `Release Date`, cell: `30 March 1945`},
    {term: `Runtime`, cell: `1h 18m`},
    {term: `Country`, cell: `USA`},
    {term: `Genres`, cell: [`Drama`, `Film-Noir`, `Mystery`]},
  ],
  description: `The film opens following a murder at a cabaret in Mexico City in 1936, and then presents the events leading up to it in flashback. The Great Flamarion (Erich von Stroheim) is an arrogant, friendless, and misogynous marksman who displays his trick gunshot act in the vaudeville circuit. His show features a beautiful assistant, Connie (Mary Beth Hughes) and her drunken husband Al (Dan Duryea), Flamarion's other assistant. Flamarion falls in love with Connie, the movie's femme fatale, and is soon manipulated by her into killing her no good husband during one of their acts.`,
  countComments: 4,
  comments: [
    {emoji: `./images/emoji/smile.png`, comment: `Interesting setting and a good cast`, author: `Tim Macoveev`, day: `3 days ago`},
    {emoji: `./images/emoji/sleeping.png`, comment: `Booooooooooring`, author: `John Doe`, day: `2 days ago`},
    {emoji: `./images/emoji/puke.png`, comment: `Very very old. Meh`, author: `John Doe`, day: `2 days ago`},
    {emoji: `./images/emoji/angry.png`, comment: `Almost two hours? Seriously?`, author: `John Doe`, day: `Today`},
  ]
};
