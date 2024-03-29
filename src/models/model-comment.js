import moment from 'moment';
import DOMPurify from 'dompurify';

class ModelComment {
  constructor(comment) {
    this.id = comment[`id`];
    this.author = DOMPurify.sanitize(comment[`author`]);
    this.emotion = DOMPurify.sanitize(comment[`emotion`]);
    this.comment = DOMPurify.sanitize(comment[`comment`]);
    this.date = Number(moment(comment[`date`]).format(`x`));
  }

  static parseComment(comment) {
    return new ModelComment(comment);
  }

  static parseComments(comment) {
    return comment.map(ModelComment.parseComment);
  }

  toRAW() {
    return {
      'id': this.id,
      'author': this.author,
      'comment': this.comment,
      'date': this.date,
      'emotion': this.emotion
    };
  }
}

export default ModelComment;
