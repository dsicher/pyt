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
      pytUtils.requiredParameters('initBreakpoints', ['mobile', 'tablet'], breakpoints);
      this.breakpoints = { ...breakpoints };
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
  addNode(config) {
    if (config.breakpoints) {
      this.nodes.push(new pytResponsiveNode(config, this.pytBreakpoint));
    } else {
      this.nodes.push(new pytNode(config));
    }
  }
  addTriggerNode(config) {
    if (config.breakpoints) {
      this.nodes.push(new pytResponsiveTriggerNode(config, this.pytBreakpoint));
    } else {
      this.nodes.push(new pytTriggerNode(config));
    }
  }
  addCallbackNode(config) {
    if (config.breakpoints) {
      this.nodes.push(new pytResponsiveCallbackNode(config, this.pytBreakpoint));
    } else {
      this.nodes.push(new pytCallbackNode(config));
    }
  }
}
