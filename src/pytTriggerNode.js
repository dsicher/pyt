import pytUtils from './pytUtils';
import pytProperty from './pytProperty';

export default class pytTriggerNode {
  constructor(opts) {
    pytUtils.requiredParameters('pytTriggerNode', ['el', 'class'], opts);

    this.el = opts.el;
    this.parallaxTarget = opts.parallaxTarget || this.el;

    this.class = opts.class;
    this.triggerPerc = opts.triggerPerc || .8;
    this.animateOnce = opts.animateOnce || false;
    this.callback = opts.callback || false;
    this.reset = opts.reset || false;
    this.pytState = 'prepyt';

    this.classTargets = opts.classTargets ? [this.parallaxTarget].concat(opts.classTargets) : [this.parallaxTarget];

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
