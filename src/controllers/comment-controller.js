import Comments from '../components/comments';
import {COMMENT_AUTHORS, MINUS_INDEX, ENTER_KEY} from '../constants';
import {render, getRandomValue, unrender, getCommentDate} from '../utils';

class CommentController {
  constructor(container, dataFilm, detailsPopup, getState, onDataChange) {
    this._container = container;
    this._dataFilm = dataFilm;
    this._detailsPopup = detailsPopup;
    this._onDataChange = onDataChange;
    this._commentComponent = {};
    this._getState = getState;
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

  show(comments) {
    this._renderCommentList(comments);
  }

  hide() {
    unrender(this._commentComponent.getElement());
    this._commentComponent.removeElement();
  }

  _renderCommentList(comments) {
    this._commentComponent = new Comments({comments});

    this._init();
  }

  _init() {
    this._commentComponent.getElement().querySelector(`.film-details__add-emoji-label`).innerHTML = `<img src="images/emoji/smile.png" width="55" height="55" alt="emoji">`;

    const onAddComment = (evt) => {
      if (evt.ctrlKey && evt.keyCode === ENTER_KEY) {
        const formData = this.getFormData();
        const data = Object.assign(this._dataFilm, this._getState());
        this._onDataChange(data, null, formData.comment);
        this.hide();
        this._init();
      }
    };

    this._commentComponent.getElement().querySelector(`.film-details__comment-input`)
      .addEventListener(`focus`, () => {
        document.addEventListener(`keydown`, onAddComment);
      });

    this._commentComponent.getElement().querySelector(`.film-details__comment-input`)
      .addEventListener(`blur`, () => {
        document.removeEventListener(`keydown`, onAddComment);
      });

    this._commentComponent.getElement().querySelectorAll(`.film-details__comment-delete`).forEach((elem, id) => {
      elem.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        this._onDataChange(null, this._dataFilm, this._dataFilm.comments[id]);
        this.hide();
        this._init();
      });
    });

    this._commentComponent.getElement().querySelectorAll(`.film-details__emoji-item`).forEach((elem) => {
      elem.addEventListener(`click`, (evt) => {
        this._commentComponent.getElement().querySelector(`.film-details__add-emoji-label`).innerHTML = `<img src="images/emoji/${evt.target.value}.png" width="55" height="55" alt="emoji">`;
      });
    });

    render(this._container, this._commentComponent.getElement());
  }
}

export default CommentController;
