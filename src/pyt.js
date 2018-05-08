import pytUtils from './pytUtils';
import pytNode  from './pytNode';
import pytTriggerNode  from './pytTriggerNode';
import pytCallbackNode  from './pytCallbackNode';
import pytResponsiveNode  from './pytResponsiveNode';
import pytResponsiveTriggerNode  from './pytResponsiveTriggerNode';
import pytResponsiveCallbackNode  from './pytResponsiveCallbackNode';

export default class PYT {
  constructor(config) {
    pytUtils.requestAnimationFramePolyfill();

    this.nodes = [];

    var breakpoints = config ? config.breakpoints : undefined;

    this.initBreakpoints(breakpoints);
    pytUtils.emitThrottledScroll();
  }
  initBreakpoints(breakpoints) {
    if (breakpoints) {
      if (breakpoints === 'default') {
        this.breakpoints = {
          mobile: { max: 767 },
          tablet: { min: 768, max: 1023 },
          web: { min: 1024 },
        };
      } else {
        this.breakpoints = { ...breakpoints };
      }
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
    var updatedBreakpoint = false;
    Object.keys(this.breakpoints).forEach(breakpoint => {
      if (!updatedBreakpoint) {
        var minCondition = !this.breakpoints[breakpoint].min || currentWidth >= this.breakpoints[breakpoint].min;
        var maxCondition = !this.breakpoints[breakpoint].max || currentWidth <= this.breakpoints[breakpoint].max;
        if (minCondition && maxCondition) {
          updatedBreakpoint = breakpoint;
        }
      }
    });
    this.currentBreakpoint = updatedBreakpoint;
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
