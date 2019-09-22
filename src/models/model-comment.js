import moment from 'moment';

class ModelComment {
  constructor(data) {
    this.id = data[`id`];
    this.author = data[`author`];
    this.emotion = data[`emotion`];
    this.comment = data[`comment`];
    this.date = Number(moment(data[`date`]).format(`x`));
  }

  static parseComment(data) {
    return new ModelComment(data);
  }

  static parseComments(data) {
    return data.map(ModelComment.parseComment);
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
