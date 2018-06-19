import pytUtils from './pytUtils';
import pytTriggerNode from './pytTriggerNode';

export default class pytResponsiveTriggerNode extends pytTriggerNode {
  constructor(config, pytBreakpoint) {
    super(config);
    this.pytBreakpoint = pytBreakpoint;
    this.breakpoints = { ...config.breakpoints };

    window.requestAnimationFrame(this.updateTriggerClass);
  }

  updateTriggerClass = () => {
    if (!this.breakpoints[this.pytBreakpoint()]) {
      if (this.pytState !== '') {
        pytUtils.removeClass(this.classTargets, this.class);
        this.reset && this.reset();
        this.pytState = '';
      }
    } else {
      super.updateTriggerClass();
    }
  }
}
