import pytUtils from './pytUtils';
import pytProperty from './pytProperty';

export default class pytTriggerNode {
  constructor(config) {
    pytUtils.requiredParameters('pytTriggerNode', ['el'], config);

    this.el = config.el;
    this.parallaxTarget = config.parallaxTarget || this.el;

    this.class = config.class !== undefined ? config.class : 'animate';
    this.triggerPerc = config.triggerPerc !== undefined ? config.triggerPerc : .8;
    this.animateOnce = !!config.animateOnce;
    this.callback = typeof config.callback === 'function' ? config.callback : false;
    this.reset = typeof config.reset === 'function' ? config.reset : false;
    this.pytState = '';

    this.classTargets = config.classTargets ? [this.parallaxTarget].concat(config.classTargets) : [this.parallaxTarget];

    window.addEventListener('pyt-throttled-scroll', this.updateTriggerClass);
    window.addEventListener('pyt-throttled-resize', this.handleResize);

    this.updateTriggerHeight();
    this.updateTriggerClass();
  }

  handleResize = () => {
    this.updateTriggerHeight();
    this.updateTriggerClass();
  }

  updateTriggerHeight = () => this.triggerHeight = window.innerHeight * this.triggerPerc;

  updateTriggerClass = () => {
    this.elPosition = this.el.getBoundingClientRect();

    if (this.elPosition.top < this.triggerHeight) {
      if (this.pytState !== 'pyt') {
        pytUtils.addClass(this.classTargets, this.class);
        this.callback && this.callback();
        this.pytState = 'pyt';
      }
    } else if (!this.animateOnce && this.pytState !== 'prepyt') {
      pytUtils.removeClass(this.classTargets, this.class);
      this.reset && this.reset();
      this.pytState = 'prepyt';
    }
  }
}
