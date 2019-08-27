import {render} from './utils';
import {Position} from './constants';

class PageController {
  constructor() {

  }

  init() {
    render(this._container, this._board.getElement(), Position.BEFOREEND);
    render(this._board.getElement(), this._taskList.getElement(), Position.BEFOREEND);

    this._tasks.forEach((taskMock) => this._renderTask(taskMock));
  }
}

export default PageController;
