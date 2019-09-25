import DOMPurify from 'dompurify';
import Comments from '../components/comment-list';
import {ENTER_KEY, Animation, ActionType} from '../constants';
import {render, unrender} from '../utils';

class CommentController {
  constructor(detailsPopup, dataFilm, getState, onDataChangeMain, queryAddComment, queryDeleteComment) {
    this._detailsPopup = detailsPopup;
    this._dataFilm = dataFilm;
    this._getState = getState;
    this._onDataChangeMain = onDataChangeMain;
    this._queryAddComment = queryAddComment;
    this._queryDeleteComment = queryDeleteComment;

    this._comments = [];

    this._containerComments = this._detailsPopup.getElement().querySelector(`.form-details__bottom-container`);
    this._nodeTextareaComment = null;
  }

  getFormData() {
    const formData = new FormData(this._detailsPopup.getElement().querySelector(`.film-details__inner`));
    return {
      comment: {
        emotion: formData.get(`comment-emoji`) !== null ? formData.get(`comment-emoji`) : `smile`,
        comment: DOMPurify.sanitize(formData.get(`comment`), {SAFE_FOR_JQUERY: true}) ? DOMPurify.sanitize(formData.get(`comment`), {SAFE_FOR_JQUERY: true}) : ` `,
        date: new Date(Date.now())
      }
    };
  }

  show(comments) {
    this._comments = comments;
    this._commentComponent = new Comments({comments: this._comments});
    this._nodeTextareaComment = this._commentComponent.getElement().querySelector(`.film-details__comment-input`);

    this._init();
  }

  hide() {
    unrender(this._commentComponent.getElement());
    this._commentComponent.removeElement();
  }

  shakeErrorComponent() {
    this._nodeTextareaComment.style.animation = Animation.STYLE;
    setTimeout(() => {
      this._nodeTextareaComment.style.animation = ``;
    }, Animation.TIMEOUT);
  }

  viewErrorComponent() {
    this._nodeTextareaComment.classList.add(`film-details__comment-input--error`);
  }

  disabledCommentTextarea() {
    this._nodeTextareaComment.disabled = true;
  }

  enabledCommentTextarea() {
    this._nodeTextareaComment.disabled = false;
  }

  enabledBtnDelete() {
    this._commentComponent.getElement().querySelectorAll(`.film-details__comment-delete`).forEach((btnElem) => {
      btnElem.textContent = `Delete`;
      btnElem.disabled = false;
    });
  }

  disabledBtnDelete(evt) {
    evt.target.textContent = `Delete...`;
    evt.target.disabled = true;
  }

  _init() {
    this._commentComponent.getElement().querySelector(`.film-details__add-emoji-label`).innerHTML = `<img src="images/emoji/smile.png" width="55" height="55" alt="emoji">`;

    const onAddComment = (evt) => {
      if (evt.ctrlKey && evt.keyCode === ENTER_KEY) {
        const formData = this.getFormData();
        this.disabledCommentTextarea();
        this._onDataChangeMain(ActionType.CREATE_COMMENT, {movieId: this._dataFilm.id, comment: formData.comment}, this._queryAddComment);
      }
    };

    this._commentComponent.getElement().querySelector(`.film-details__comment-input`)
      .addEventListener(`focus`, () => {
        this._nodeTextareaComment.classList.remove(`film-details__comment-input--error`);
        document.addEventListener(`keydown`, onAddComment);
      });

    this._commentComponent.getElement().querySelector(`.film-details__comment-input`)
      .addEventListener(`blur`, () => {
        document.removeEventListener(`keydown`, onAddComment);
      });

    this._commentComponent.getElement().querySelectorAll(`.film-details__comment-delete`).forEach((elem, id) => {
      elem.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        this.disabledBtnDelete(evt);
        this._onDataChangeMain(ActionType.DELETE_COMMENT, {id: this._comments[id].id}, this._queryDeleteComment);
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
