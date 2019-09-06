import Comments from '../components/comments';
import {COMMENT_AUTHORS, MINUS_INDEX} from '../constants';
import {render, getRandomValue, unrender, getCommentDate} from '../utils';

class CommentController {
  constructor(container, dataFilm, detailsPopup, getState, onDataChange, onEscKeyDown) {
    this._container = container;
    this._dataFilm = dataFilm;
    this._detailsPopup = detailsPopup;
    this._onDataChange = onDataChange;
    this._comments = new Comments(this._dataFilm);
    this._getState = getState;
    this._onEscKeyDown = onEscKeyDown;
  }

  getFormData() {
    const formData = new FormData(this._detailsPopup.getElement().querySelector(`.film-details__inner`));
    return {
      comment: {
        emoji: formData.get(`comment-emoji`) !== null ? formData.get(`comment-emoji`) : `smile`,
        description: formData.get(`comment`),
        author: COMMENT_AUTHORS[getRandomValue(COMMENT_AUTHORS.length - MINUS_INDEX)],
        dayComment: getCommentDate()
      }
    };
  }

  init() {
    const onAddComment = (evt) => {
      if (evt.ctrlKey && evt.keyCode === 13) {
        const formData = this.getFormData();
        this._dataFilm.comments.push(formData.comment);
        const data = Object.assign(this._dataFilm, this._getState());
        this._onDataChange(data, this._dataFilm);
        unrender(this._comments.getElement());
        this._comments.removeElement();
        render(this._container, this._comments.getElement());
        this.init();
      }
    };

    this._comments.getElement().querySelector(`.film-details__comment-input`)
      .addEventListener(`focus`, () => {
        document.addEventListener(`keydown`, onAddComment);
      });

    this._comments.getElement().querySelector(`.film-details__comment-input`)
      .addEventListener(`blur`, () => {
        document.removeEventListener(`keydown`, onAddComment);
      });

    this._comments.getElement().querySelectorAll(`.film-details__emoji-item`).forEach((elem) => {
      elem.addEventListener(`click`, (evt) => {
        document.querySelector(`.film-details__add-emoji-label`).innerHTML = `<img src="images/emoji/${evt.target.value}.png" width="55" height="55" alt="emoji">`;
      });
    });

    render(this._container, this._comments.getElement());
  }
}

export default CommentController;
