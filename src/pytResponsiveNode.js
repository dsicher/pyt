import pytNode from './pytNode';

export default class pytResponsiveNode extends pytNode {
  constructor(config, pytBreakpoint) {
    super(config);
    this.pytBreakpoint = pytBreakpoint;
    this.breakpoints = { ...config.breakpoints };

    window.requestAnimationFrame(this.handleResize);
  }

  resetStyle = (pytProp, i) => {
    if (this.pytState[i] !== '') {
      this.pytState[i] = '';
    }
    if (!pytProp.isTransform) {
      this.parallaxTarget.style[pytProp.property] = null;
    }
  }

  parallaxAllProperties = () => {
    if (!this.breakpoints[this.pytBreakpoint()]) {
      this.transformStrings = [];
      this.elPosition = this.el.getBoundingClientRect();

      this.parallaxOpts.forEach(this.resetStyle);

      if (this.transformStrings.length >= 1) {
        this.parallaxTarget.style.transform = null;
        this.parallaxTarget.style.webkitTransform = null;
      }
    } else {
      super.parallaxAllProperties();
    }
  }
}
