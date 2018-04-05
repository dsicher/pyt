import pytUtils from './pytUtils';
import pytProperty from './pytProperty';

export default class pytNode {
  constructor(opts) {
    pytUtils.requiredParameters('pytNode', ['el', 'parallaxConfig'], opts);

    this.el = opts.el;
    this.parallaxTarget = opts.parallaxTarget || this.el;
    this.parallaxOpts = [];
    this.pytState = [];

    if (Array.isArray(opts.parallaxConfig)) {
      opts.parallaxConfig.forEach(this.pushConfig);
    } else {
      this.pushConfig(opts.parallaxConfig);
    }

    this.classTargets = opts.classTargets ? [this.parallaxTarget].concat(opts.classTargets) : [this.parallaxTarget];

    window.addEventListener('pyt-throttled-scroll', this.handleScroll);
    window.addEventListener('pyt-throttled-resize', this.handleResize);

    this.handleResize();
  }
  pushConfig = config => this.parallaxOpts.push(new pytProperty(config))
  calculateStyles = (pytProp, delta) => {
    if (pytProp.isTransform) {
      this.transformStrings.push(pytProp.returnCurrentStyle(delta));
    } else {
      this.parallaxTarget.style[pytProp.property] = pytProp.returnCurrentStyle(delta);
    }
  }
  getParallaxArea = i => this.parallaxOpts[i].endingPerc > this.parallaxOpts[i].startingPerc
    ? this.el.offsetHeight - this.parallaxOpts[i].parallaxStart - this.parallaxOpts[i].parallaxEnd
    : this.el.offsetHeight + this.parallaxOpts[i].parallaxStart - this.parallaxOpts[i].parallaxEnd;
  getParallaxTarget = i => (1-((this.getTargetEnd(i) - this.parallaxOpts[i].parallaxEnd) / this.getParallaxArea(i)));
  getTargetStart = i => this.parallaxOpts[i].startWithBottom ? this.elPosition.bottom : this.elPosition.top;
  getTargetEnd = i => this.parallaxOpts[i].endWithTop ? this.elPosition.top : this.elPosition.bottom;
  checkScroll = (pytProp, i, arr) => {
    if (this.getTargetStart(i) < this.parallaxOpts[i].parallaxStart && this.getTargetEnd(i) > this.parallaxOpts[i].parallaxEnd) {
      this.calculateStyles(pytProp, this.getParallaxTarget(i));
      if (this.pytState[i] != 'pyt') {
        pytUtils.addClass(this.classTargets, `pyt-${pytProp.pytClass}`);
        pytUtils.removeClass(this.classTargets, [`pre-pyt-${pytProp.pytClass}`, `post-pyt-${pytProp.pytClass}`]);
        this.pytState[i] = 'pyt';
        this.parallaxOpts[i].callback && this.parallaxOpts[i].callback();
      }
    } else if (this.getTargetStart(i) >= this.parallaxOpts[i].parallaxStart) {
      if (this.pytState[i] != 'prepyt') {
        pytUtils.addClass(this.classTargets, `pre-pyt-${pytProp.pytClass}`);
        pytUtils.removeClass(this.classTargets, [`pyt-${pytProp.pytClass}`, `post-pyt-${pytProp.pytClass}`]);
        this.pytState[i] = 'prepyt';
        this.calculateStyles(pytProp, 0);
        this.parallaxOpts[i].preFn && this.parallaxOpts[i].preFn();
      }
    } else if (this.getTargetEnd(i) <= this.parallaxOpts[i].parallaxEnd) {
      if (this.pytState[i] != 'postpyt') {
        pytUtils.addClass(this.classTargets, `post-pyt-${pytProp.pytClass}`);
        pytUtils.removeClass(this.classTargets, [`pre-pyt-${pytProp.pytClass}`, `pyt-${pytProp.pytClass}`]);
        this.pytState[i] = 'postpyt';
        this.calculateStyles(pytProp, 1);
        this.parallaxOpts[i].postFn && this.parallaxOpts[i].postFn();
      }
    }
  }
  updateAllParallaxPoints = () => {
    this.parallaxOpts.forEach(el => el.updateParallaxPoints());
  }
  parallaxAllProperties = () => {
    this.transformStrings = [];
    this.elPosition = this.el.getBoundingClientRect();

    this.parallaxOpts.forEach(this.checkScroll);

    if (this.transformStrings.length >= 1) {
      this.parallaxTarget.style.transform = this.transformStrings.join(' ');
      this.parallaxTarget.style.webkitTransform = this.transformStrings.join(' ');
    }
  }
  handleScroll = () => {
    this.parallaxAllProperties();
  }
  handleResize = () => {
    this.updateAllParallaxPoints();
    this.parallaxAllProperties();
  }
}
