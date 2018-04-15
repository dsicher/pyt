import pytCallbackNode from './pytCallbackNode';

export default class pytResponsiveCallbackNode extends pytCallbackNode {
  constructor(config, pytBreakpoint) {
    super(config);
    this.pytBreakpoint = pytBreakpoint;
    this.breakpoints = { ...config.breakpoints };

    this.handleScroll();
  }

  callFns = () => {
    if (!this.breakpoints[this.pytBreakpoint()]) {
      if (this.reset && this.pytState !== 'prepyt') {
        this.reset();
        this.pytState = 'prepyt';
      }
    } else {
      super.callFns();
    }
  }
}
