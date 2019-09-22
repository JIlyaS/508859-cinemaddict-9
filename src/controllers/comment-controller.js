import Comments from '../components/comments';
import {ENTER_KEY, ActionType} from '../constants';
import {render, unrender} from '../utils';

class CommentController {
  constructor(detailsPopup, dataFilm, getState, onDataChangeMain, renderComment) {
    this._detailsPopup = detailsPopup;
    this._dataFilm = dataFilm;
    this._onDataChangeMain = onDataChangeMain;
    this._renderComment = renderComment;
    this._getState = getState;

    this._comments = [];

    this._containerComments = this._detailsPopup.getElement().querySelector(`.form-details__bottom-container`);
  }

  getFormData() {
    const formData = new FormData(this._detailsPopup.getElement().querySelector(`.film-details__inner`));
    return {
      comment: {
        emotion: formData.get(`comment-emoji`) !== null ? formData.get(`comment-emoji`) : `smile`,
        comment: formData.get(`comment`),
        date: new Date(Date.now())
      }
    };
  }

  show(comments) {
    this._comments = comments;
    this._commentComponent = new Comments({comments: this._comments});

    this._init();
  }

  hide() {
    unrender(this._commentComponent.getElement());
    this._commentComponent.removeElement();
  }

  _init() {
    this._commentComponent.getElement().querySelector(`.film-details__add-emoji-label`).innerHTML = `<img src="images/emoji/smile.png" width="55" height="55" alt="emoji">`;

    const onAddComment = (evt) => {
      if (evt.ctrlKey && evt.keyCode === ENTER_KEY) {
        const formData = this.getFormData();
        this._onDataChangeMain(ActionType.CREATE_COMMENT, {movieId: this._dataFilm.id, comment: formData.comment}, this._renderComment);
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
        this._onDataChangeMain(ActionType.DELETE_COMMENT, {id: this._comments[id].id}, this._renderComment);
      });
    });

    this._commentComponent.getElement().querySelectorAll(`.film-details__emoji-item`).forEach((elem) => {
      elem.addEventListener(`click`, (evt) => {
        this._commentComponent.getElement().querySelector(`.film-details__add-emoji-label`).innerHTML = `<img src="images/emoji/${evt.target.value}.png" width="55" height="55" alt="emoji">`;
      });
    });

    render(this._containerComments, this._commentComponent.getElement());
  }
}

export default CommentController;
