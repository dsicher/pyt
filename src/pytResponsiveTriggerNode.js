import pytUtils from './pytUtils';
import pytProperty from './pytProperty';
import pytTriggerNode from './pytTriggerNode';

export default class pytResponsiveTriggerNode extends pytTriggerNode {
  constructor(config, pytBreakpoint) {
    super(config);
    this.pytBreakpoint = pytBreakpoint;
    this.breakpoints = { ...config.breakpoints };

    this.updateTriggerClass();
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
