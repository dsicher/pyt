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

    window.requestAnimationFrame(this.handleResize);
  }
  pushConfig = config => this.parallaxOpts.push(new pytProperty(config))
  calculateStyles = (pytProp, delta) => {
    if (pytProp.isTransform) {
      this.transformStrings.push(pytProp.returnCurrentStyle(delta));
    } else {
      this.parallaxTarget.style[pytProp.property] = pytProp.returnCurrentStyle(delta);
    }
  }
  getParallaxArea = pytProp => pytProp.endingPerc > pytProp.startingPerc
    ? this.el.offsetHeight - pytProp.parallaxStart - pytProp.parallaxEnd
    : this.el.offsetHeight + pytProp.parallaxStart - pytProp.parallaxEnd;
  getParallaxTarget = pytProp => (1-((this.getTargetEnd(pytProp) - pytProp.parallaxEnd) / this.getParallaxArea(pytProp)));
  getTargetStart = pytProp => pytProp.startWithBottom ? this.elPosition.bottom : this.elPosition.top;
  getTargetEnd = pytProp => pytProp.endWithTop ? this.elPosition.top : this.elPosition.bottom;
  checkScroll = (pytProp, i, arr) => {
    if (this.getTargetStart(pytProp) < pytProp.parallaxStart && this.getTargetEnd(pytProp) > pytProp.parallaxEnd) {
      this.calculateStyles(pytProp, this.getParallaxTarget(pytProp));
      if (this.pytState[i] != 'pyt') {
        pytUtils.addClass(this.classTargets, `pyt-${pytProp.pytClass}`);
        pytUtils.removeClass(this.classTargets, [`pre-pyt-${pytProp.pytClass}`, `post-pyt-${pytProp.pytClass}`]);
        this.pytState[i] = 'pyt';
        pytProp.callback && pytProp.callback();
      }
    } else if (this.getTargetStart(pytProp) >= pytProp.parallaxStart) {
      if (this.pytState[i] != 'prepyt') {
        pytUtils.addClass(this.classTargets, `pre-pyt-${pytProp.pytClass}`);
        pytUtils.removeClass(this.classTargets, [`pyt-${pytProp.pytClass}`, `post-pyt-${pytProp.pytClass}`]);
        this.pytState[i] = 'prepyt';
        this.calculateStyles(pytProp, 0);
        pytProp.preFn && pytProp.preFn();
      }
    } else if (this.getTargetEnd(pytProp) <= pytProp.parallaxEnd) {
      if (this.pytState[i] != 'postpyt') {
        pytUtils.addClass(this.classTargets, `post-pyt-${pytProp.pytClass}`);
        pytUtils.removeClass(this.classTargets, [`pre-pyt-${pytProp.pytClass}`, `pyt-${pytProp.pytClass}`]);
        this.pytState[i] = 'postpyt';
        this.calculateStyles(pytProp, 1);
        pytProp.postFn && pytProp.postFn();
      }
    }
  }
  updateAllParallaxPoints = () => {
    this.parallaxOpts.forEach(el => el.updateParallaxPoints());
  }
  parallaxAllProperties() {
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
