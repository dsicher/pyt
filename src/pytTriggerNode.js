import pytUtils from './pytUtils';

export default class pytTriggerNode {
  constructor(config) {
    pytUtils.requiredParameters('pytTriggerNode', ['el'], config);

    this.el = config.el;
    this.parallaxTarget = config.parallaxTarget || this.el;

    this.class = config.class !== undefined ? config.class : 'animate';
    this.triggerPerc = config.triggerPerc !== undefined ? config.triggerPerc : .8;
    this.triggerFromBottom = !!config.triggerFromBottom;
    this.animateOnce = !!config.animateOnce;
    this.callback = typeof config.callback === 'function' ? config.callback : false;
    this.reset = typeof config.reset === 'function' ? config.reset : false;
    this.pytState = '';

    this.classTargets = config.classTargets ? [this.parallaxTarget].concat(config.classTargets) : [this.parallaxTarget];

    window.addEventListener('pyt-throttled-scroll', this.handleScroll);
    window.addEventListener('pyt-throttled-resize', this.handleResize);
    
    window.requestAnimationFrame(this.handleResize);
  }

  handleResize = () => {
    this.updateTriggerHeight();
    this.updateTriggerClass();
  }

  handleScroll = () => {
    this.updateTriggerClass();
  }

  updateTriggerHeight() {
    this.triggerHeight = window.innerHeight * this.triggerPerc;
  }

  updateTriggerClass() {
    this.elPosition = this.el.getBoundingClientRect();
    var triggerVal = this.triggerFromBottom ? this.elPosition.bottom : this.elPosition.top;

    if (triggerVal < this.triggerHeight) {
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
