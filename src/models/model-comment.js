import moment from 'moment';

class ModelComment {
  constructor(data) {
    this.id = Number(data[`id`]);
    this.author = data[`author`];
    this.emoji = data[`emotion`];
    this.description = data[`comment`];
    this.date = Number(moment(data[`date`]).format(`x`));
  }

  static parseComment(data) {
    return new ModelComment(data);
  }

  static parseComments(data) {
    return data.map(ModelComment.parseComment);
  }
}

export default ModelComment;
