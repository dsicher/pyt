import pytUtils from './pytUtils';
import pytNode  from './pytNode';
import pytTriggerNode  from './pytTriggerNode';
import pytCallbackNode  from './pytCallbackNode';
import pytResponsiveNode  from './pytResponsiveNode';
import pytResponsiveTriggerNode  from './pytResponsiveTriggerNode';
import pytResponsiveCallbackNode  from './pytResponsiveCallbackNode';

export default class PYT {
  constructor(config) {
    this.nodes = [];

    this.initBreakpoints(config.breakpoints);
    pytUtils.emitThrottledScroll();
  }
  initBreakpoints(breakpoints) {
    if (breakpoints) {
      this.breakpoints = { mobile: 768, tablet: 1024, ...breakpoints };
      this.pytBreakpoint = () => this.currentBreakpoint;
      this.setCurrentBreakpoint();
      pytUtils.emitThrottledResize(this.setCurrentBreakpoint);
    } else {
      this.pytBreakpoint = false;
      pytUtils.emitThrottledResize();
    }
  }
  setCurrentBreakpoint = () => {
    var currentWidth = window.innerWidth;
    if (currentWidth < this.breakpoints.mobile) {
      this.currentBreakpoint = 'mobile';
    } else if (currentWidth < this.breakpoints.tablet) {
      this.currentBreakpoint = 'tablet';
    } else {
      this.currentBreakpoint = 'web';
    }
  }
  nodeHandler(node, responsiveNode, config) {
    if (config.breakpoints && this.pytBreakpoint) {
      this.nodes.push(new responsiveNode(config, this.pytBreakpoint));
    } else {
      if (config.breakpoints) {
        console.warn('Attempting to add a responsive node to a non-responsive PYT instance. Add a breakpoint config to your new PYT() call.');
      }
      this.nodes.push(new node(config));
    }
  }
  addNode(config) {
    this.nodeHandler(pytNode, pytResponsiveNode, config);
  }
  addTriggerNode(config) {
    this.nodeHandler(pytTriggerNode, pytResponsiveTriggerNode, config);
  }
  addCallbackNode(config) {
    this.nodeHandler(pytCallbackNode, pytResponsiveCallbackNode, config);
  }
}
