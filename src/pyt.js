import pytUtils from './pytUtils';
import pytNode  from './pytNode';
import pytTriggerNode  from './pytTriggerNode';

export default class PYT {
  constructor() {
    pytUtils.emitThrottledResize();
    pytUtils.emitThrottledScroll();
    this.nodes = [];
  }
  addNode(opts) {
    this.nodes.push(new pytNode(opts));
  }
  addTriggerNode(opts) {
    this.nodes.push(new pytTriggerNode(opts));
  }
}
