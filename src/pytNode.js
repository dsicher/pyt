import pytUtils from './pytUtils';
import pytProperty from './pytProperty';

export default class pytNode {
  constructor(scrollController, opts) {
    pytUtils.requiredParameters('pytNode', ['el', 'parallaxConfig'], opts);

    this.el = opts.el;
    this.parallaxOpts = [];
    this.pytState = [];

    if (Array.isArray(opts.parallaxConfig)) {
      opts.parallaxConfig.forEach(this.pushConfig);
    } else {
      this.pushConfig(opts.parallaxConfig);
    }

    this.classTargets = opts.classTargets ? [this.el].concat(opts.classTargets) : [this.el];
    scrollController.pushNewListener(this.parallaxAllProperties);
    this.parallaxAllProperties();
  }
  pushConfig = config => this.parallaxOpts.push(new pytProperty(config))
  calculateStyles = (config, delta) => {
    if (config.isTransform) {
      this.transformStrings.push(config.returnCurrentStyle(delta));
    } else {
      this.el.style[config.property] = config.returnCurrentStyle(delta);
    }
  }
  getParallaxStart = i => window.innerHeight * this.parallaxOpts[i].viewportStart;
  getParallaxEnd = i => window.innerHeight * this.parallaxOpts[i].viewportEnd;
  getParallaxArea = i => {
    var offset = this.parallaxOpts.viewportEndWithTop || this.parallaxOpts.viewportStartWithBottom ? 0 : this.el.offsetHeight;
    return this.parallaxOpts.viewportEnd > this.parallaxOpts.viewportStart ? offset - (this.getParallaxEnd(i) - this.getParallaxStart(i)) : offset + this.getParallaxStart(i) - this.getParallaxEnd(i);
  }
  getParallaxTarget = i => (1-((this.getTargetEnd(i) - this.getParallaxEnd(i)) / this.getParallaxArea(i)));
  getTargetStart = i => this.parallaxOpts[i].startWithBottom ? this.elPosition.bottom : this.elPosition.top;
  getTargetEnd = i => this.parallaxOpts[i].endWithTop ? this.elPosition.top : this.elPosition.bottom;
  checkScroll = (config, i, arr) => {
    if (this.getTargetStart(i) < this.getParallaxStart(i) && this.getTargetEnd(i) > this.getParallaxEnd(i)) {
      if (this.pytState[i] != 'pyt') {
        if (config.pytClass) {
          pytUtils.addClass(this.classTargets, 'pyt_' + config.pytClass);
          pytUtils.removeClass(this.classTargets, ['prepyt_' + config.pytClass, 'postpyt_' + config.pytClass]);
        }
        this.pytState[i] = 'pyt';
      }
      this.calculateStyles(config, this.getParallaxTarget(i));
    } else if (this.getTargetStart(i) >= this.getParallaxStart(i)) {
      if (this.pytState[i] != 'prepyt') {
        if (config.pytClass) {
          pytUtils.addClass(this.classTargets, 'prepyt_' + config.pytClass);
          pytUtils.removeClass(this.classTargets, ['pyt_' + config.pytClass, 'postpyt_' + config.pytClass]);
        }
        this.pytState[i] = 'prepyt';
        this.calculateStyles(config, 0);
      }
    } else if (this.getTargetEnd(i) <= this.getParallaxEnd(i)) {
      if (this.pytState[i] != 'postpyt') {
        if (config.pytClass) {
          pytUtils.addClass(this.classTargets, 'postpyt_' + config.pytClass);
          pytUtils.removeClass(this.classTargets, ['prepyt_' + config.pytClass, 'pyt_' + config.pytClass]);
        }
        this.pytState[i] = 'postpyt';
        this.calculateStyles(config, 1);
      }
    }
  }
  parallaxAllProperties = () => {
    this.transformStrings = [];
    this.elPosition = this.el.getBoundingClientRect();

    this.parallaxOpts.forEach(this.checkScroll);

    if (this.transformStrings.length >= 1) {
      this.el.style.transform = this.transformStrings.join(' ');
      this.el.style.webkitTransform = this.transformStrings.join(' ');
    }
  }
}
