import pytUtils from './pytUtils';
import pytNode  from './pytNode';

export default class PYT {
  constructor() {
    this.scrollController = pytUtils.throttledScrollController();
    this.nodes = [];
  }
  addNode(opts) {
    this.nodes.push(new pytNode(this.scrollController, opts));
  }
}
