import pytUtils from './pytUtils';
import pytNode  from './pytNode';
import pytTriggerNode  from './pytTriggerNode';
import pytCallbackNode  from './pytCallbackNode';

export default class PYT {
  constructor() {
    pytUtils.emitThrottledResize();
    pytUtils.emitThrottledScroll();
    this.nodes = [];
  }
  addNode(config) {
    this.nodes.push(new pytNode(config));
  }
  addTriggerNode(config) {
    this.nodes.push(new pytTriggerNode(config));
  }
  addCallbackNode(config) {
    this.nodes.push(new pytCallbackNode(config));
  }
}
